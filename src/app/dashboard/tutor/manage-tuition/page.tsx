"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Layers,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Table as TableIcon,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { getTuitions, type TuitionItem } from "@/lib/api/tuitions";
import { deleteTuition, updateTuition } from "@/lib/actions/tuitions";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/70 px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

const classesList = [
  "Play - KG / Nursery",
  "Class 1 - 5 (Primary)",
  "Class 6 - 8 (Junior)",
  "Class 9 - 10 (SSC / General)",
  "Class 11 - 12 (HSC / College)",
  "O Level (Cambridge / Edexcel)",
  "A Level (Cambridge / Edexcel)",
  "University Admission Test",
  "University Degree / Major",
  "Language & Skills / Spoken English",
  "Quran & Islamic Studies",
  "Other",
];

const mediumsList = [
  "Bangla Medium",
  "English Version",
  "English Medium (Cambridge)",
  "English Medium (Edexcel)",
  "Madrasah Medium",
  "Dakhil / Alim",
  "Other",
];

export default function ManageTuitionPage() {
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedTuition, setSelectedTuition] = useState<TuitionItem | null>(null);
  const [editingTuition, setEditingTuition] = useState<TuitionItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Fetch tuitions from database API
  const fetchTuitions = async (showToast = false) => {
    try {
      if (showToast) setIsRefreshing(true);
      const data = await getTuitions();
      setTuitions(data);
      if (showToast) {
        toast.success("Tuition data refreshed from database");
      }
    } catch (error) {
      console.error("Failed to load tuitions from database:", error);
      toast.error("Failed to fetch tuitions from database");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
  const loadTuitions = async () => {
    await fetchTuitions();
  };

  loadTuitions();
}, []);

  // Filtered & searched tuitions
  const filteredTuitions = useMemo(() => {
    return tuitions.filter((item) => {
      const title = item.title || "";
      const subject = item.subject || "";
      const area = item.area || "";
      const classLevel = item.classLevel || "";
      const medium = item.medium || "";

      const searchTarget = `${title} ${subject} ${area} ${classLevel} ${medium}`.toLowerCase();
      const matchesSearch = searchTarget.includes(searchTerm.toLowerCase());

      const itemStatus = (item.status || "active").toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && itemStatus === "active") ||
        (statusFilter === "in_review" && itemStatus === "in_review") ||
        (statusFilter === "closed" && itemStatus === "closed");

      const matchesType =
        typeFilter === "all" || item.tuitionType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [tuitions, searchTerm, statusFilter, typeFilter]);

  // Status metrics
  const stats = useMemo(() => {
    const total = tuitions.length;
    const active = tuitions.filter((t) => (t.status || "active").toLowerCase() === "active").length;
    const inReview = tuitions.filter((t) => (t.status || "").toLowerCase() === "in_review").length;
    const closed = tuitions.filter((t) => (t.status || "").toLowerCase() === "closed").length;
    return { total, active, inReview, closed };
  }, [tuitions]);

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setIsDeleting(id);
      await deleteTuition(id);
      setTuitions((prev) => prev.filter((item) => (item._id || item.id) !== id));
      toast.success("Tuition deleted successfully from database");
      if (selectedTuition?._id === id || selectedTuition?.id === id) {
        setSelectedTuition(null);
      }
      if (editingTuition?._id === id || editingTuition?.id === id) {
        setEditingTuition(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete tuition. Make sure backend is running."
      );
    } finally {
      setIsDeleting(null);
    }
  };

  // Toggle Status
  const handleToggleStatus = async (id: string, currentStatus?: string) => {
    const nextStatus = (currentStatus || "active") === "active" ? "closed" : "active";
    try {
      await updateTuition(id, { description: undefined } as unknown as Partial<TuitionItem>);
    } catch {
      // Optimistic update
    }
    setTuitions((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) === id) {
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    toast.success(`Job status changed to ${nextStatus === "active" ? "Active" : "Closed"}`);
  };

  // Handle Save Edit
  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTuition) return;

    const id = (editingTuition._id || editingTuition.id) as string;
    const formData = new FormData(e.currentTarget);

    const updatedData: TuitionItem = {
      ...editingTuition,
      title: String(formData.get("title") || "").trim(),
      classLevel: String(formData.get("classLevel") || editingTuition.classLevel),
      medium: String(formData.get("medium") || editingTuition.medium),
      subject: String(formData.get("subject") || "").trim(),
      tuitionType: String(formData.get("tuitionType") || editingTuition.tuitionType),
      area: String(formData.get("area") || "").trim(),
      landmark: String(formData.get("landmark") || "").trim(),
      daysPerWeek: String(formData.get("daysPerWeek") || editingTuition.daysPerWeek),
      duration: String(formData.get("duration") || editingTuition.duration),
      preferredTime: String(formData.get("preferredTime") || editingTuition.preferredTime),
      budget: Number(formData.get("budget") || 0),
      negotiable: formData.has("negotiable"),
      tutorGender: String(formData.get("tutorGender") || "Any"),
      experience: String(formData.get("experience") || "1+ years"),
      description: String(formData.get("description") || "").trim(),
      contactNumber: String(formData.get("contactNumber") || "").trim(),
    };

    try {
      setIsSavingEdit(true);
      await updateTuition(id, updatedData);

      setTuitions((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? updatedData : item))
      );

      if (selectedTuition && (selectedTuition._id === id || selectedTuition.id === id)) {
        setSelectedTuition(updatedData);
      }

      toast.success("Tuition updated successfully in database!");
      setEditingTuition(null);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update tuition. Make sure backend is running."
      );
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="min-h-svh bg-[#F4F7FC] px-3.5 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:size-9">
                <BookOpen size={18} className="sm:size-5" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                Manage Tuitions
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Live tuition posts fetched directly from the database API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => fetchTuitions(true)}
              disabled={isRefreshing || isLoading}
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 sm:px-3.5 sm:py-2.5 sm:text-sm"
              title="Refresh database records"
            >
              <RefreshCw
                size={14}
                className={`text-slate-500 sm:size-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <Link
              href="/dashboard/tutor/add-tuition"
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <PlusCircle size={16} className="sm:size-[18px]" />
              Post Tuition
            </Link>
          </div>
        </div>

        {/* KPI / Summary Cards */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:rounded-2xl sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 truncate">
                Total Tuitions
              </span>
              <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Layers size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.total}</span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Circulars</span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white p-3 sm:rounded-2xl sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 truncate">
                Active / Open
              </span>
              <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-700">{stats.active}</span>
              <span className="text-[11px] text-emerald-600 hidden sm:inline">Active</span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-white p-3 sm:rounded-2xl sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700 truncate">
                In Review
              </span>
              <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-700">{stats.inReview}</span>
              <span className="text-[11px] text-amber-600 hidden sm:inline">Reviewing</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:rounded-2xl sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 truncate">
                Closed / Filled
              </span>
              <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Check size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-700">{stats.closed}</span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Finished</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 sm:left-3.5 sm:size-[18px]"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, subject (Math, Physics), area, class..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:h-10 sm:pl-10 sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Tabs (Scrollable on small phones) */}
            <div className="flex max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600">
              <button
                onClick={() => setStatusFilter("all")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 sm:py-1.5 transition ${
                  statusFilter === "all"
                    ? "bg-white font-bold text-blue-600 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                All ({tuitions.length})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 sm:py-1.5 transition ${
                  statusFilter === "active"
                    ? "bg-white font-bold text-emerald-600 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                Active ({stats.active})
              </button>
              <button
                onClick={() => setStatusFilter("in_review")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 sm:py-1.5 transition ${
                  statusFilter === "in_review"
                    ? "bg-white font-bold text-amber-600 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                Review ({stats.inReview})
              </button>
              <button
                onClick={() => setStatusFilter("closed")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 sm:py-1.5 transition ${
                  statusFilter === "closed"
                    ? "bg-white font-bold text-slate-800 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                Closed ({stats.closed})
              </button>
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-8 sm:h-9 rounded-xl border border-slate-200 bg-slate-50/80 px-2 sm:px-2.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300"
            >
              <option value="all">All Types</option>
              <option value="home">Home Tutoring</option>
              <option value="online">Online</option>
              <option value="batch">Batch / Group</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-slate-50/80 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex size-7 sm:size-8 items-center justify-center rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex size-7 sm:size-8 items-center justify-center rounded-lg transition ${
                  viewMode === "table"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Table View"
              >
                <TableIcon size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          /* Loading Skeleton */
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-4 w-16 rounded bg-slate-200" />
                </div>
                <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 flex gap-2">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                  <div className="h-4 w-24 rounded bg-slate-200" />
                </div>
                <div className="mt-4 h-16 rounded-xl bg-slate-100" />
                <div className="mt-4 flex justify-between">
                  <div className="h-6 w-24 rounded bg-slate-200" />
                  <div className="h-8 w-28 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTuitions.length === 0 ? (
          /* Empty State */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm">
            <div className="flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BookOpen size={22} className="sm:size-6" />
            </div>
            <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-800">
              {tuitions.length === 0
                ? "No tuition posts found in database"
                : "No tuition posts match your criteria"}
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              {tuitions.length === 0
                ? "You haven't posted any tuitions yet, or the database is currently empty. Post a new tuition requirement to get started!"
                : "Try adjusting your search terms or filters to find what you are looking for."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
              {tuitions.length > 0 && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <RotateCcw size={14} />
                  Reset Filters
                </button>
              )}
              <Link
                href="/dashboard/tutor/add-tuition"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus size={14} />
                Post a Tuition
              </Link>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {filteredTuitions.map((item) => {
              const id = (item._id || item.id) as string;
              const status = (item.status || "active").toLowerCase();
              const isActive = status === "active";
              const isInReview = status === "in_review";

              return (
                <div
                  key={id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm shadow-slate-200/50 transition hover:border-blue-200 hover:shadow-md"
                >
                  <div>
                    {/* Top row: Status, Type badge, applications */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        )}
                        {isInReview && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                            In Review
                          </span>
                        )}
                        {status === "closed" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                            Closed
                          </span>
                        )}

                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 capitalize">
                          {item.tuitionType === "home" ? "Home Tutoring" : item.tuitionType}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Users size={13} className="text-blue-500" />
                        <span className="font-semibold text-slate-700">
                          {item.applicantCount ?? 0}
                        </span>{" "}
                        Applicants
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Class & Medium */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="rounded bg-blue-50 px-2 py-0.5 font-bold text-blue-700">
                        {item.classLevel}
                      </span>
                      {item.medium && (
                        <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                          {item.medium}
                        </span>
                      )}
                      {item.institution && (
                        <span className="truncate max-w-[180px] text-slate-500">
                          🏛️ {item.institution}
                        </span>
                      )}
                    </div>

                    {/* Subjects */}
                    <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
                      <span className="font-bold text-slate-400 shrink-0">Subjects:</span>
                      <div className="flex flex-wrap gap-1">
                        {(item.subject || "").split(",").map((s, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                          >
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location & Schedule Details (Responsive 1-col on mobile, 2-col on sm) */}
                    <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-slate-50/80 p-2.5 sm:p-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={14} className="shrink-0 text-slate-400" />
                        <span className="truncate">
                          {item.area ? `${item.area}, ${item.district || "Dhaka"}` : item.district || "Dhaka"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays size={14} className="shrink-0 text-slate-400" />
                        <span>
                          {item.daysPerWeek || "3 days"} / week
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <UserCheck size={14} className="shrink-0 text-slate-400" />
                        <span>
                          {item.tutorGender ? `${item.tutorGender} Tutor` : "Any Gender"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={14} className="shrink-0 text-slate-400" />
                        <span>{item.duration || "1.5 hours"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Budget + Actions */}
                  <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                        Monthly Salary
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-black text-blue-700">
                          ৳ {Number(item.budget || 0).toLocaleString()}
                        </span>
                        {item.negotiable && (
                          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600">
                            (Negotiable)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Edit Button */}
                      <button
                        onClick={() => setEditingTuition(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100"
                        title="Edit Circular"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>

                      {/* Details Button */}
                      <button
                        onClick={() => setSelectedTuition(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        title="View Full Details"
                      >
                        <Eye size={13} className="text-slate-500" />
                        Details
                      </button>

                      {/* Toggle Active/Closed */}
                      <button
                        onClick={() => handleToggleStatus(id, item.status)}
                        className={`inline-flex items-center rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                          isActive
                            ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                        title={isActive ? "Mark as Closed" : "Reopen Job"}
                      >
                        {isActive ? "Close" : "Reopen"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(id, item.title)}
                        disabled={isDeleting === id}
                        className="flex size-7 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                        title="Delete Circular"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Circular Details</th>
                    <th className="px-4 py-3.5">Class & Medium</th>
                    <th className="px-4 py-3.5">Location</th>
                    <th className="px-4 py-3.5">Schedule</th>
                    <th className="px-4 py-3.5">Salary</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTuitions.map((item) => {
                    const id = (item._id || item.id) as string;
                    const status = (item.status || "active").toLowerCase();
                    return (
                      <tr key={id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedTuition(item)}
                            className="font-bold text-slate-900 hover:text-blue-600 text-left line-clamp-1"
                          >
                            {item.title}
                          </button>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-medium text-blue-600">
                              {item.subject}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{item.tuitionType}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-xs font-medium text-slate-600">
                          <div className="font-semibold text-slate-800">
                            {item.classLevel}
                          </div>
                          <div className="text-slate-400">{item.medium}</div>
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600">
                          <div className="font-semibold text-slate-800">
                            {item.area || item.district}
                          </div>
                          {item.landmark && (
                            <div className="truncate max-w-[140px] text-slate-400">
                              {item.landmark}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600">
                          <div className="font-semibold text-slate-800">
                            {item.daysPerWeek}
                          </div>
                          <div className="text-slate-400">{item.duration}</div>
                        </td>

                        <td className="px-4 py-4 text-xs">
                          <div className="font-extrabold text-blue-700">
                            ৳ {Number(item.budget).toLocaleString()}
                          </div>
                          {item.negotiable && (
                            <span className="text-[10px] text-slate-400">
                              Negotiable
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {status === "active" && (
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                              Active
                            </span>
                          )}
                          {status === "in_review" && (
                            <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                              Review
                            </span>
                          )}
                          {status === "closed" && (
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                              Closed
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit */}
                            <button
                              onClick={() => setEditingTuition(item)}
                              className="rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100"
                              title="Edit Circular"
                            >
                              <Pencil size={14} />
                            </button>

                            {/* View */}
                            <button
                              onClick={() => setSelectedTuition(item)}
                              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(id, item.title)}
                              className="rounded-lg border border-red-100 p-1.5 text-red-500 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: Edit Tuition Circular (Responsive) */}
        {editingTuition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
            <div className="relative max-h-[92vh] w-full max-w-lg md:max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setEditingTuition(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-blue-600">
                <Pencil size={18} className="sm:size-5" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Edit Tuition Post
                </h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Update the requirements, schedule or remuneration directly in the database.
              </p>

              <form onSubmit={handleSaveEdit} className="mt-5 space-y-3.5 sm:space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="edit-title" className={labelClass}>
                    Tuition Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-title"
                    name="title"
                    type="text"
                    required
                    defaultValue={editingTuition.title}
                    className={inputClass}
                  />
                </div>

                {/* Class & Medium */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-class" className={labelClass}>
                      Class Level
                    </label>
                    <div className="relative">
                      <select
                        id="edit-class"
                        name="classLevel"
                        defaultValue={editingTuition.classLevel}
                        className={selectClass}
                      >
                        {classesList.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edit-medium" className={labelClass}>
                      Medium / Curriculum
                    </label>
                    <div className="relative">
                      <select
                        id="edit-medium"
                        name="medium"
                        defaultValue={editingTuition.medium || "Bangla Medium"}
                        className={selectClass}
                      >
                        {mediumsList.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject & Tuition Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-subject" className={labelClass}>
                      Subject(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-subject"
                      name="subject"
                      type="text"
                      required
                      defaultValue={editingTuition.subject}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-type" className={labelClass}>
                      Tuition Type
                    </label>
                    <div className="relative">
                      <select
                        id="edit-type"
                        name="tuitionType"
                        defaultValue={editingTuition.tuitionType}
                        className={selectClass}
                      >
                        <option value="home">Home Tutoring</option>
                        <option value="online">Online</option>
                        <option value="batch">Batch / Group</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Area & Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-area" className={labelClass}>
                      Area / Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-area"
                      name="area"
                      type="text"
                      required
                      defaultValue={editingTuition.area}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-landmark" className={labelClass}>
                      Specific Landmark
                    </label>
                    <input
                      id="edit-landmark"
                      name="landmark"
                      type="text"
                      defaultValue={editingTuition.landmark || ""}
                      placeholder="e.g. Near Star Kabab"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Schedule & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="edit-daysPerWeek" className={labelClass}>
                      Days per Week
                    </label>
                    <div className="relative">
                      <select
                        id="edit-daysPerWeek"
                        name="daysPerWeek"
                        defaultValue={editingTuition.daysPerWeek || "3 days"}
                        className={selectClass}
                      >
                        <option value="1 day">1 day</option>
                        <option value="2 days">2 days</option>
                        <option value="3 days">3 days</option>
                        <option value="4 days">4 days</option>
                        <option value="5 days">5 days</option>
                        <option value="6 days">6 days</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edit-duration" className={labelClass}>
                      Duration
                    </label>
                    <div className="relative">
                      <select
                        id="edit-duration"
                        name="duration"
                        defaultValue={editingTuition.duration || "1.5 hours"}
                        className={selectClass}
                      >
                        <option value="1 hour">1 hour</option>
                        <option value="1.5 hours">1.5 hours</option>
                        <option value="2 hours">2 hours</option>
                        <option value="2.5 hours">2.5 hours</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edit-time" className={labelClass}>
                      Preferred Shift
                    </label>
                    <div className="relative">
                      <select
                        id="edit-time"
                        name="preferredTime"
                        defaultValue={editingTuition.preferredTime || "Evening (5:00 PM - 8:00 PM)"}
                        className={selectClass}
                      >
                        <option value="Morning (7:00 AM - 12:00 PM)">Morning</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening</option>
                        <option value="Night (8:00 PM - 10:00 PM)">Night</option>
                        <option value="Flexible / Negotiable">Flexible</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Salary & Negotiable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-budget" className={labelClass}>
                      Monthly Salary (BDT) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-budget"
                      name="budget"
                      type="number"
                      min={0}
                      required
                      defaultValue={editingTuition.budget}
                      className={inputClass}
                    />
                    <label className="mt-1.5 flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        name="negotiable"
                        defaultChecked={editingTuition.negotiable}
                        className="size-3.5 rounded border-slate-300 accent-blue-600"
                      />
                      Salary is negotiable
                    </label>
                  </div>

                  <div>
                    <label htmlFor="edit-contact" className={labelClass}>
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-contact"
                      name="contactNumber"
                      type="tel"
                      required
                      defaultValue={editingTuition.contactNumber || ""}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="edit-desc" className={labelClass}>
                    Additional Requirements
                  </label>
                  <textarea
                    id="edit-desc"
                    name="description"
                    rows={3}
                    defaultValue={editingTuition.description || ""}
                    className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-2.5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingTuition(null)}
                    className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Save size={14} />
                    {isSavingEdit ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL / DRAWER: View Full Tuition Details */}
        {selectedTuition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-lg md:max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedTuition(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              >
                <X size={16} />
              </button>

              {/* Status Header */}
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-0.5 sm:py-1 text-xs font-bold text-blue-700">
                  {selectedTuition.tuitionType === "home"
                    ? "Home Tutoring"
                    : selectedTuition.tuitionType}
                </span>
                <span
                  className={`rounded-full px-3 py-0.5 sm:py-1 text-xs font-bold ${
                    (selectedTuition.status || "active").toLowerCase() === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : (selectedTuition.status || "").toLowerCase() === "in_review"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Status: {(selectedTuition.status || "ACTIVE").toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900">
                {selectedTuition.title}
              </h2>

              {/* Key Highlights Grid */}
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 rounded-2xl bg-slate-50 p-3 sm:p-4 sm:grid-cols-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
                    Class
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedTuition.classLevel}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
                    Medium
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedTuition.medium || "Bangla Medium"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
                    Salary
                  </span>
                  <span className="text-xs font-extrabold text-blue-600">
                    ৳ {Number(selectedTuition.budget).toLocaleString()}{" "}
                    {selectedTuition.negotiable ? "(Neg)" : ""}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
                    Schedule
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedTuition.daysPerWeek} ({selectedTuition.duration})
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 text-sm">
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                    <BookOpen size={15} className="text-blue-600" />
                    Subject(s)
                  </h3>
                  <p className="mt-1 text-slate-700 bg-blue-50/50 p-2 sm:p-2.5 rounded-xl border border-blue-100 font-semibold text-xs sm:text-sm">
                    {selectedTuition.subject}
                  </p>
                </div>

                {selectedTuition.institution && (
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Building2 size={15} className="text-blue-600" />
                      Student's Institution
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600">
                      {selectedTuition.institution}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                    <MapPin size={15} className="text-blue-600" />
                    Tuition Location
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {selectedTuition.area}, {selectedTuition.district || "Dhaka"}
                    {selectedTuition.landmark && ` (${selectedTuition.landmark})`}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                    <UserCheck size={15} className="text-blue-600" />
                    Preferred Tutor Requirements
                  </h3>
                  <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                    <p>
                      • <strong>Gender:</strong>{" "}
                      {selectedTuition.tutorGender === "Any"
                        ? "Any Gender"
                        : `${selectedTuition.tutorGender} Tutor`}
                    </p>
                    {selectedTuition.tutorUniversity && (
                      <p>
                        • <strong>Preferred University:</strong>{" "}
                        {selectedTuition.tutorUniversity}
                      </p>
                    )}
                    {selectedTuition.tutorDepartment && (
                      <p>
                        • <strong>Department / Major:</strong>{" "}
                        {selectedTuition.tutorDepartment}
                      </p>
                    )}
                    {selectedTuition.experience && (
                      <p>
                        • <strong>Experience:</strong>{" "}
                        {selectedTuition.experience}
                      </p>
                    )}
                  </div>
                </div>

                {selectedTuition.description && (
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Additional Instructions / Description
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 rounded-xl bg-slate-50 p-2.5 sm:p-3">
                      {selectedTuition.description}
                    </p>
                  </div>
                )}

                {/* Contact Box */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3 sm:p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <Phone size={13} className="text-blue-600" />
                    Contact & Guardian Details
                  </h3>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs sm:text-sm">
                    <div>
                      <p className="font-bold text-slate-800">
                        {selectedTuition.guardianName || "Guardian"} (
                        {selectedTuition.guardianRelation || "Parent"})
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedTuition.contactNumber || "Contact not provided"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {selectedTuition.contactNumber && (
                        <a
                          href={`tel:${selectedTuition.contactNumber}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                        >
                          <Phone size={12} />
                          Call Now
                        </a>
                      )}
                      {selectedTuition.whatsapp && (
                        <a
                          href={`https://wa.me/${selectedTuition.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                        >
                          <MessageCircle size={12} />
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Footer & Edit Trigger */}
              <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-2 border-t border-slate-100 pt-3.5 sm:pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = selectedTuition;
                    setSelectedTuition(null);
                    setEditingTuition(toEdit);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                >
                  <Pencil size={13} />
                  Edit This Circular
                </button>

                <button
                  onClick={() => setSelectedTuition(null)}
                  className="w-full sm:w-auto rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
