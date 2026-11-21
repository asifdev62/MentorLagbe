
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    CalendarDays,
    Clock,
    BookOpen,
    GraduationCap,
    SlidersHorizontal,
    RotateCcw,
    Wallet,
    VenusAndMars,
    Home,
    Sparkles,
    ChevronDown,
    ArrowRight,
    Users,
    X,
} from "lucide-react";

import Navbar from "@/app/components/navbar";
import type { TuitionItem } from "@/lib/api/tuitions";

type Props = {
    tuitions: TuitionItem[];
};

const formatDate = (value?: string) =>
    value
        ? new Date(value).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "Date unavailable";

const BrowseTuitions = ({ tuitions }: Props) => {
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [subjectFilter, setSubjectFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Dynamic filter options
    const classes = useMemo(
        () => [...new Set(tuitions.map((item) => item.classLevel).filter(Boolean))],
        [tuitions]
    );

    const subjects = useMemo(
        () => [...new Set(tuitions.map((item) => item.subject).filter(Boolean))],
        [tuitions]
    );

    const locations = useMemo(
        () => [...new Set(tuitions.map((item) => item.area).filter(Boolean))],
        [tuitions]
    );

    // Search and filter
    const filteredTuitions = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = tuitions.filter((item) => {
            const searchableText = [
                item.title,
                item.subject,
                item.classLevel,
                item.area,
                item.district,
                item.medium,
                item.description,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchableText.includes(query);
            const matchesClass =
                classFilter === "all" || item.classLevel === classFilter;
            const matchesSubject =
                subjectFilter === "all" || item.subject === subjectFilter;
            const matchesLocation =
                locationFilter === "all" || item.area === locationFilter;
            const matchesType =
                typeFilter === "all" || item.tuitionType === typeFilter;

            return (
                matchesSearch &&
                matchesClass &&
                matchesSubject &&
                matchesLocation &&
                matchesType
            );
        });

        return result.sort((a, b) => {
            if (sortBy === "salary-high") {
                return Number(b.budget || 0) - Number(a.budget || 0);
            }

            if (sortBy === "salary-low") {
                return Number(a.budget || 0) - Number(b.budget || 0);
            }

            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

            return bTime - aTime;
        });
    }, [
        tuitions,
        search,
        classFilter,
        subjectFilter,
        locationFilter,
        typeFilter,
        sortBy,
    ]);

    // Clear filters
    const clearFilters = () => {
        setSearch("");
        setClassFilter("all");
        setSubjectFilter("all");
        setLocationFilter("all");
        setTypeFilter("all");
        setExpandedCard(null);
    };

    const hasActiveFilters =
        search !== "" ||
        classFilter !== "all" ||
        subjectFilter !== "all" ||
        locationFilter !== "all" ||
        typeFilter !== "all";

    // Removable filter chips
    const activeChips: { key: string; label: string; clear: () => void }[] = [];

    if (search.trim()) {
        activeChips.push({
            key: "search",
            label: `“${search.trim()}”`,
            clear: () => setSearch(""),
        });
    }

    if (classFilter !== "all") {
        activeChips.push({
            key: "class",
            label: classFilter,
            clear: () => setClassFilter("all"),
        });
    }

    if (subjectFilter !== "all") {
        activeChips.push({
            key: "subject",
            label: subjectFilter,
            clear: () => setSubjectFilter("all"),
        });
    }

    if (locationFilter !== "all") {
        activeChips.push({
            key: "location",
            label: locationFilter,
            clear: () => setLocationFilter("all"),
        });
    }

    if (typeFilter !== "all") {
        activeChips.push({
            key: "type",
            label:
                typeFilter === "home"
                    ? "Home Tutoring"
                    : typeFilter === "online"
                      ? "Online"
                      : "Batch",
            clear: () => setTypeFilter("all"),
        });
    }

    const selectClass =
        "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10";

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-[#087F9F]/5">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header / Hero */}
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#087F9F] via-[#087F9F] to-[#066B85] p-6 text-white shadow-xl shadow-[#087F9F]/20 sm:p-8">
                        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-[#087F9F]/30 blur-3xl" />
                        <div className="pointer-events-none absolute -left-10 bottom-0 hidden h-40 w-40 rounded-full bg-white/5 blur-xl sm:block" />

                        <div className="relative flex flex-wrap items-start justify-between gap-6">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                                    <Sparkles size={14} />
                                    Explore Opportunities
                                </span>

                                <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                                    Browse Tuitions
                                </h1>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                                    Discover verified teaching opportunities, compare salary and
                                    schedule, and find the perfect tuition that fits you.
                                </p>

                                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur-sm">
                                        <GraduationCap size={15} />
                                        {tuitions.length} tuition
                                        {tuitions.length === 1 ? "" : "s"} available
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur-sm">
                                        <MapPin size={15} />
                                        {locations.length} location
                                        {locations.length === 1 ? "" : "s"}
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur-sm">
                                        <BookOpen size={15} />
                                        {subjects.length} subject
                                        {subjects.length === 1 ? "" : "s"}
                                    </span>
                                </div>
                            </div>

                            <div className="hidden h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm lg:flex">
                                <GraduationCap size={64} strokeWidth={1.4} />
                            </div>
                        </div>
                    </section>

                    {/* Search & Filters */}
                    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

                            {/* Search */}
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by title, subject, class or location..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        aria-label="Clear search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-[#087F9F] lg:w-auto"
                                >
                                    <option value="newest">Newest first</option>
                                    <option value="salary-high">Salary: high to low</option>
                                    <option value="salary-low">Salary: low to high</option>
                                </select>
                            </div>
                        </div>

                        {/* Filter Options */}
                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            <select
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                                aria-label="Filter by class"
                                className={selectClass}
                            >
                                <option value="all">All Classes</option>
                                {classes.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={subjectFilter}
                                onChange={(e) => setSubjectFilter(e.target.value)}
                                aria-label="Filter by subject"
                                className={selectClass}
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                aria-label="Filter by location"
                                className={selectClass}
                            >
                                <option value="all">All Locations</option>
                                {locations.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                aria-label="Filter by tuition type"
                                className={selectClass}
                            >
                                <option value="all">All Tuition Types</option>
                                <option value="home">Home Tutoring</option>
                                <option value="online">Online</option>
                                <option value="batch">Batch</option>
                            </select>
                        </div>

                        {/* Active filter chips */}
                        {activeChips.length > 0 && (
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                {activeChips.map((chip) => (
                                    <span
                                        key={chip.key}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/5 py-1 pl-2.5 pr-1.5 text-xs font-semibold text-[#087F9F]"
                                    >
                                        {chip.label}
                                        <button
                                            type="button"
                                            onClick={chip.clear}
                                            aria-label={`Remove ${chip.label} filter`}
                                            className="rounded-full p-0.5 transition hover:bg-[#087F9F]/10"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Result Count */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span className="inline-flex size-6 items-center justify-center rounded-lg bg-[#087F9F]/5 text-[#087F9F]">
                                    <SlidersHorizontal size={13} />
                                </span>

                                <span>
                                    Showing{" "}
                                    <strong className="text-slate-900">
                                        {filteredTuitions.length}
                                    </strong>{" "}
                                    of{" "}
                                    <strong className="text-slate-900">
                                        {tuitions.length}
                                    </strong>{" "}
                                    tuitions
                                </span>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#087F9F] transition hover:bg-[#087F9F]/5"
                                >
                                    <RotateCcw size={12} />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </section>

                    {/* Tuition Cards */}
                    <section className="mt-6">
                        {filteredTuitions.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#087F9F]/5 text-[#087F9F]">
                                    <BookOpen size={26} />
                                </div>

                                <h2 className="mt-4 text-lg font-bold text-slate-800">
                                    No Tuitions Found
                                </h2>

                                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                    We couldn&apos;t find any tuition matching your search. Try
                                    changing the keyword or clearing some filters.
                                </p>

                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#087F9F] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#087F9F]/20 transition hover:bg-[#066B85]"
                                    >
                                        <RotateCcw size={14} />
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {filteredTuitions.map((item, index) => {
                                    const cardId =
                                        item._id || item._id || `${item.title}-${index}`;

                                    const isExpanded = expandedCard === cardId;
                                    const postedDate = formatDate(item.createdAt);
                                    const jobId = cardId.slice(-5).toUpperCase();

                                    const tuitionTypeLabel =
                                        item.tuitionType === "home"
                                            ? "Home Tutoring"
                                            : item.tuitionType === "online"
                                              ? "Online Tutoring"
                                              : "Batch Tutoring";

                                    const details = [
                                        {
                                            label: "Subjects",
                                            value: item.subject || "Not specified",
                                            icon: BookOpen,
                                        },
                                        {
                                            label: "Per Week",
                                            value: item.daysPerWeek || "Flexible",
                                            icon: CalendarDays,
                                        },
                                        {
                                            label: "Tutoring Mode",
                                            value: tuitionTypeLabel,
                                            icon: Home,
                                        },
                                        {
                                            label: "Salary",
                                            value: `৳${Number(item.budget || 0).toLocaleString("en-BD")}`,
                                            icon: Wallet,
                                        },
                                        {
                                            label: "Tutor Gender",
                                            value: item.tutorGender || "Any",
                                            icon: VenusAndMars,
                                        },
                                        {
                                            label: "Tutoring Time",
                                            value: item.preferredTime || "Flexible",
                                            icon: Clock,
                                        },
                                    ];

                                    return (
                                        <article
                                            key={cardId}
                                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087F9F]/30 hover:shadow-lg hover:shadow-[#087F9F]/10"
                                        >
                                            <div className="h-1 w-full bg-gradient-to-r from-[#087F9F] to-[#066B85] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                            <div className="flex flex-1 flex-col p-4 sm:p-5">
                                                {/* Card Header */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h2 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition group-hover:text-[#087F9F]">
                                                            {item.title}
                                                        </h2>

                                                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                                                Active
                                                            </span>

                                                            {item.classLevel && (
                                                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                                                    {item.classLevel}
                                                                </span>
                                                            )}

                                                            {item.medium && (
                                                                <span className="inline-flex items-center rounded-full bg-[#087F9F]/5 px-2 py-0.5 text-[10px] font-semibold text-[#087F9F]">
                                                                    {item.medium}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 text-right">
                                                        <p className="text-[11px] text-slate-400">
                                                            Job ID:{" "}
                                                            <span className="font-semibold text-slate-600">
                                                                {jobId}
                                                            </span>
                                                        </p>

                                                        <p className="mt-1 text-[10px] text-slate-400">
                                                            {postedDate}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Location */}
                                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                                    <MapPin
                                                        size={15}
                                                        className="shrink-0 text-[#087F9F]"
                                                    />

                                                    <span className="min-w-0 truncate">
                                                        {item.area}
                                                        {item.district ? `, ${item.district}` : ""}
                                                    </span>

                                                    {typeof item.applicantCount === "number" && (
                                                        <>
                                                            <span className="shrink-0 text-slate-300">
                                                                |
                                                            </span>
                                                            <span className="inline-flex shrink-0 items-center gap-1 text-slate-500">
                                                                <Users size={13} />
                                                                {item.applicantCount} applied
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Details Grid */}
                                                <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
                                                    {details.map((detail) => {
                                                        const Icon = detail.icon;

                                                        return (
                                                            <div
                                                                key={detail.label}
                                                                className="flex min-w-0 items-start gap-2"
                                                            >
                                                                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#087F9F]/5 text-[#087F9F]">
                                                                    <Icon size={14} />
                                                                </span>

                                                                <div className="min-w-0">
                                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                        {detail.label}
                                                                    </p>

                                                                    <p className="mt-0.5 break-words text-xs font-semibold text-slate-800">
                                                                        {detail.value}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Expanded Details */}
                                                {isExpanded && (
                                                    <div className="mt-4 rounded-xl border border-[#087F9F]/20 bg-[#087F9F]/5 p-3.5">
                                                        <h3 className="text-xs font-bold text-slate-800">
                                                            Tuition Description
                                                        </h3>

                                                        <p className="mt-1.5 whitespace-pre-line text-xs leading-5 text-slate-600">
                                                            {item.description ||
                                                                "No description available."}
                                                        </p>

                                                        <div className="mt-2.5 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
                                                            {item.landmark && (
                                                                <p>
                                                                    <strong className="text-slate-700">
                                                                        Landmark:
                                                                    </strong>{" "}
                                                                    {item.landmark}
                                                                </p>
                                                            )}

                                                            {item.studentCount ? (
                                                                <p>
                                                                    <strong className="text-slate-700">
                                                                        Students:
                                                                    </strong>{" "}
                                                                    {item.studentCount}
                                                                </p>
                                                            ) : null}

                                                            {item.medium && (
                                                                <p>
                                                                    <strong className="text-slate-700">
                                                                        Medium:
                                                                    </strong>{" "}
                                                                    {item.medium}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Footer */}
                                                <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setExpandedCard(
                                                                isExpanded ? null : cardId
                                                            )
                                                        }
                                                        aria-expanded={isExpanded}
                                                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#087F9F]"
                                                    >
                                                        <ChevronDown
                                                            size={14}
                                                            className={`transition-transform duration-200 ${
                                                                isExpanded ? "rotate-180" : ""
                                                            }`}
                                                        />
                                                        {isExpanded
                                                            ? "Hide details"
                                                            : "Quick view"}
                                                    </button>

                                                    <Link
                                                        href={`/browse-tuitions/${item._id || item._id}`}
                                                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#087F9F] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#087F9F]/20 transition hover:bg-[#066B85] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#087F9F]/10"
                                                    >
                                                        View Details
                                                        <ArrowRight
                                                            size={14}
                                                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default BrowseTuitions;
