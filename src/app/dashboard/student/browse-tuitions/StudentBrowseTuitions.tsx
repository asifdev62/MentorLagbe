"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ElementType } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  RefreshCw,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  VenusAndMars,
  Wallet,
} from "lucide-react";

import type { TuitionItem } from "@/lib/api/tuitions";

type Props = {
  tuitions: TuitionItem[];
};

const formatPostedDate = (value?: string) => {
  if (!value) return "Recently posted";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently posted";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTypeLabel = (value?: string) => {
  const type = (value || "home").toLowerCase();

  if (type === "online") return "Online";
  if (type === "batch") return "Batch";

  return "Home Tuition";
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex min-w-0 items-start gap-2.5">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
      <Icon size={16} />
    </div>

    <div className="min-w-0">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 break-words text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  </div>
);

export default function StudentBrowseTuitions({ tuitions }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const classes = useMemo(
    () =>
      [...new Set(tuitions.map((item) => item.classLevel).filter(Boolean))].sort(),
    [tuitions]
  );

  const subjects = useMemo(
    () =>
      [...new Set(tuitions.map((item) => item.subject).filter(Boolean))].sort(),
    [tuitions]
  );

  const locations = useMemo(
    () =>
      [...new Set(tuitions.map((item) => item.area).filter(Boolean))].sort(),
    [tuitions]
  );

  const filteredTuitions = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = tuitions.filter((item) => {
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
        typeFilter === "all" ||
        (item.tuitionType || "home").toLowerCase() === typeFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSubject &&
        matchesLocation &&
        matchesType
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "salary-high") {
        return Number(b.budget || 0) - Number(a.budget || 0);
      }

      if (sortBy === "salary-low") {
        return Number(a.budget || 0) - Number(b.budget || 0);
      }

      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return dateB - dateA;
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

  const hasActiveFilters =
    search !== "" ||
    classFilter !== "all" ||
    subjectFilter !== "all" ||
    locationFilter !== "all" ||
    typeFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setClassFilter("all");
    setSubjectFilter("all");
    setLocationFilter("all");
    setTypeFilter("all");
    setSortBy("newest");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();

    window.setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-svh bg-[#F4F7FC] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-200/60 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                <Sparkles size={14} />
                Available Tuitions
              </span>

              <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Find your next teaching opportunity
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                Browse all approved tuitions, compare salary and schedule, then
                apply to the ones that fit you best.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard/student/my-application"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
                >
                  <FileText size={16} />
                  My Applications
                </Link>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <GraduationCap size={16} />
                  {tuitions.length} tuition{tuitions.length === 1 ? "" : "s"}{" "}
                  available
                </span>
              </div>
            </div>

            <div className="hidden h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm lg:flex">
              <GraduationCap size={64} strokeWidth={1.4} />
            </div>
          </div>
        </section>

        {/* Search & filters */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, subject, class or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 lg:w-auto"
              >
                <option value="newest">Newest first</option>
                <option value="salary-high">Salary: high to low</option>
                <option value="salary-low">Salary: low to high</option>
              </select>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400"
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
              onChange={(event) => setSubjectFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400"
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
              onChange={(event) => setLocationFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400"
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
              onChange={(event) => setTypeFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400"
            >
              <option value="all">All Tuition Types</option>
              <option value="home">Home Tuition</option>
              <option value="online">Online</option>
              <option value="batch">Batch</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <SlidersHorizontal size={15} className="text-blue-600" />
              <span>
                Showing{" "}
                <strong className="text-slate-900">
                  {filteredTuitions.length}
                </strong>{" "}
                of <strong className="text-slate-900">{tuitions.length}</strong>{" "}
                tuitions
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                <RotateCcw size={13} />
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Cards */}
        <section className="mt-5">
          {filteredTuitions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BookOpen size={26} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No Tuitions Found
              </h2>

              <p className="mt-1.5 max-w-md text-sm text-slate-500">
                {hasActiveFilters
                  ? "No tuition matches your search or filters. Try changing them."
                  : "There are no approved tuitions available right now. Please check back later."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <RotateCcw size={15} />
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredTuitions.map((item, index) => {
                const id = item._id || item.id || `${item.title}-${index}`;
                const budget = Number(item.budget || 0);

                return (
                  <article
                    key={id}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                          {item.classLevel || "Any Class"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                          {getTypeLabel(item.tuitionType)}
                        </span>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </div>

                    <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-600">
                      {item.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={15} className="shrink-0 text-blue-600" />
                      <span className="truncate">
                        {item.area || "Location not specified"}
                        {item.district ? `, ${item.district}` : ""}
                      </span>
                    </p>

                    <div className="mt-4 flex items-end justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">
                          Monthly Salary
                        </p>
                        <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-blue-700">
                          ৳{budget.toLocaleString("en-BD")}
                          <span className="ml-1 text-[11px] font-medium text-slate-500">
                            / month
                          </span>
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Wallet size={19} />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
                      <InfoItem
                        icon={BookOpen}
                        label="Subject"
                        value={item.subject || "Not specified"}
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Days / Week"
                        value={item.daysPerWeek || "Flexible"}
                      />

                      <InfoItem
                        icon={Clock}
                        label="Preferred Time"
                        value={item.preferredTime || "Flexible"}
                      />

                      <InfoItem
                        icon={VenusAndMars}
                        label="Tutor Gender"
                        value={item.tutorGender || "Any"}
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                        <Users size={12} />
                        {item.studentCount || 1} student
                        {Number(item.studentCount || 1) === 1 ? "" : "s"}
                      </span>

                      {item.medium && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                          <Building2 size={12} />
                          {item.medium}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span className="text-[11px] text-slate-400">
                        Posted {formatPostedDate(item.createdAt)}
                      </span>

                      <Link
                        href={`/browse-tuitions/${item._id || item.id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        View & Apply
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
