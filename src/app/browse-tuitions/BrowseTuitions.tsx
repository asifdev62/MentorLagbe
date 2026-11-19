
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
} from "lucide-react";

import type { TuitionItem } from "@/lib/api/tuitions";

type Props = {
    tuitions: TuitionItem[];
};

const BrowseTuitions = ({ tuitions }: Props) => {
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [subjectFilter, setSubjectFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Dynamic filter options
    const classes = useMemo(
        () =>
            [...new Set(tuitions.map((item) => item.classLevel).filter(Boolean))],
        [tuitions]
    );

    const subjects = useMemo(
        () =>
            [...new Set(tuitions.map((item) => item.subject).filter(Boolean))],
        [tuitions]
    );

    const locations = useMemo(
        () => [...new Set(tuitions.map((item) => item.area).filter(Boolean))],
        [tuitions]
    );

    // Search and filter
    const filteredTuitions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tuitions.filter((item) => {
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
    }, [
        tuitions,
        search,
        classFilter,
        subjectFilter,
        locationFilter,
        typeFilter,
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

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <GraduationCap size={14} />
                        Explore Opportunities
                    </div>

                    <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Browse <span className="text-blue-600">Tuitions</span>
                    </h1>

                    <p className="mt-1.5 max-w-xl text-sm text-slate-500">
                        Discover teaching opportunities and find the perfect tuition.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                    {/* Search */}
                    <div className="relative">
                        <Search
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, subject, class or location..."
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                        />
                    </div>

                    {/* Filter Options */}
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">

                        <select
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-400"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-400"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-400"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-400"
                        >
                            <option value="all">All Tuition Types</option>
                            <option value="home">Home Tutoring</option>
                            <option value="online">Online</option>
                            <option value="batch">Batch</option>
                        </select>
                    </div>

                    {/* Result Count */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <SlidersHorizontal size={15} className="text-blue-600" />

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
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                            >
                                <RotateCcw size={12} />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Tuition Cards */}
                <section className="mt-6">

                    {filteredTuitions.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
                            <BookOpen size={30} className="mx-auto text-blue-500" />

                            <h2 className="mt-3 text-lg font-bold text-slate-800">
                                No Tuitions Found
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Try changing your search or filters.
                            </p>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                            {filteredTuitions.map((item, index) => {
                                const cardId =
                                    item._id || item.id || `${item.title}-${index}`;

                                const isExpanded = expandedCard === cardId;

                                const postedDate = item.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "Date unavailable";

                                const jobId = cardId.slice(-5).toUpperCase();

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
                                        value:
                                            item.tuitionType === "home"
                                                ? "Home Tutoring"
                                                : item.tuitionType === "online"
                                                    ? "Online Tutoring"
                                                    : "Batch Tutoring",
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
                                        className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-2">

                                            <div className="min-w-0">
                                                <h2 className="line-clamp-1 text-base font-bold text-slate-800">
                                                    {item.title}
                                                </h2>

                                                <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                                    Active
                                                </span>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <p className="text-[11px] text-slate-500">
                                                    Job ID:{" "}
                                                    <span className="font-semibold text-slate-700">
                                                        {jobId}
                                                    </span>
                                                </p>

                                                <p className="mt-1 text-[10px] text-slate-400">
                                                    {postedDate}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <MapPin
                                                size={16}
                                                className="shrink-0 text-blue-600"
                                            />

                                            <span className="min-w-0 truncate">
                                                {item.area}
                                                {item.district ? `, ${item.district}` : ""}
                                            </span>

                                            <span className="shrink-0 text-slate-300">|</span>

                                            <span className="shrink-0 text-slate-500">
                                                {postedDate}
                                            </span>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="mt-5 grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-3">

                                            {details.map((detail) => {
                                                const Icon = detail.icon;

                                                return (
                                                    <div
                                                        key={detail.label}
                                                        className="flex min-w-0 items-start gap-2"
                                                    >
                                                        <Icon
                                                            size={19}
                                                            className="mt-0.5 shrink-0 text-blue-600"
                                                        />

                                                        <div className="min-w-0">
                                                            <p className="text-xs font-medium text-slate-500">
                                                                {detail.label}
                                                            </p>

                                                            <p className="mt-1 break-words text-xs font-medium text-slate-500">
                                                                {detail.value}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Expanded Details */}
                                        {isExpanded && (
                                            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/60 p-3">

                                                <h3 className="text-xs font-bold text-slate-800">
                                                    Tuition Description
                                                </h3>

                                                <p className="mt-1.5 whitespace-pre-line text-xs leading-5 text-slate-600">
                                                    {item.description ||
                                                        "No description available."}
                                                </p>

                                                {item.landmark && (
                                                    <p className="mt-2 text-xs text-slate-600">
                                                        <strong>Landmark:</strong> {item.landmark}
                                                    </p>
                                                )}

                                                {item.studentCount && (
                                                    <p className="mt-2 text-xs text-slate-600">
                                                        <strong>Students:</strong> {item.studentCount}
                                                    </p>
                                                )}

                                                {item.medium && (
                                                    <p className="mt-2 text-xs text-slate-600">
                                                        <strong>Medium:</strong> {item.medium}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="mt-5 flex justify-end border-t border-slate-100 pt-3">

                                            <Link
                                                href={`/browse-tuitions/${item._id || item.id}`}
                                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            >
                                                View Details
                                            </Link>

                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default BrowseTuitions;
