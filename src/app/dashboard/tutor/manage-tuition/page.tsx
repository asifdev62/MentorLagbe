"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  LayoutGrid,
  LogIn,
  Plus,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Search,
  Table as TableIcon,
} from "lucide-react";
import { getTuitions, type TuitionItem } from "@/lib/api/tuitions";
import { deleteTuition, updateTuition } from "@/lib/actions/tuitions";
import { useSession } from "@/lib/auth-client";
import { TuitionCard } from "./components/TuitionCard";
import { TuitionDetailsModal } from "./components/TuitionDetailsModal";
import { TuitionEditModal } from "./components/TuitionEditModal";
import { TuitionTableRow } from "./components/TuitionTableRow";

export default function ManageTuitionPage() {
  const { data: session, isPending: isSessionPending } = useSession();

  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedTuition, setSelectedTuition] = useState<TuitionItem | null>(null);
  const [editingTuition, setEditingTuition] = useState<TuitionItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Refresh tuitions from the database API (used by the refresh button)
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

  // Initial load. State updates happen inside promise callbacks, never
  // synchronously in the effect body, so React Compiler's
  // "set-state-in-effect" rule stays happy.
  useEffect(() => {
    let cancelled = false;

    getTuitions()
      .then((data) => {
        if (!cancelled) setTuitions(data);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load tuitions from database:", error);
        toast.error("Failed to fetch tuitions from database");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const tutorId = session?.user?.id;
  const tutorEmail = session?.user?.email?.toLowerCase();

  // Only tuitions created by the signed-in tutor
  const myTuitions = useMemo(() => {
    if (!tutorId && !tutorEmail) return [];

    return tuitions.filter((item) => {
      const matchesId = Boolean(tutorId) && item.userId === tutorId;
      const matchesEmail =
        Boolean(tutorEmail) &&
        item.tutorEmail?.toLowerCase() === tutorEmail;

      return matchesId || matchesEmail;
    });
  }, [tuitions, tutorId, tutorEmail]);

  // Filtered & searched tuitions
  const filteredTuitions = useMemo(() => {
    return myTuitions.filter((item) => {
      const title = item.title || "";
      const subject = item.subject || "";
      const area = item.area || "";
      const classLevel = item.classLevel || "";
      const medium = item.medium || "";

      const searchTarget =
        `${title} ${subject} ${area} ${classLevel} ${medium}`.toLowerCase();
      const matchesSearch = searchTarget.includes(searchTerm.toLowerCase());

      const itemStatus = (item.status || "active").toLowerCase();
      const matchesStatus =
        statusFilter === "all" || itemStatus === statusFilter;

      const itemApproval = (item.approvalStatus || "pending").toLowerCase();
      const matchesApproval =
        approvalFilter === "all" || itemApproval === approvalFilter;

      const matchesType =
        typeFilter === "all" || item.tuitionType === typeFilter;

      return matchesSearch && matchesStatus && matchesApproval && matchesType;
    });
  }, [myTuitions, searchTerm, statusFilter, approvalFilter, typeFilter]);

  // Status & approval metrics
  const stats = useMemo(() => {
    const total = myTuitions.length;
    const active = myTuitions.filter(
      (t) => (t.status || "active").toLowerCase() === "active"
    ).length;
    const closed = myTuitions.filter(
      (t) => (t.status || "").toLowerCase() === "closed"
    ).length;
    const pending = myTuitions.filter(
      (t) => (t.approvalStatus || "pending").toLowerCase() === "pending"
    ).length;
    const approved = myTuitions.filter(
      (t) => (t.approvalStatus || "").toLowerCase() === "approved"
    ).length;
    const rejected = myTuitions.filter(
      (t) => (t.approvalStatus || "").toLowerCase() === "rejected"
    ).length;

    return { total, active, closed, pending, approved, rejected };
  }, [myTuitions]);

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

  // Toggle Active / Closed status
  const handleToggleStatus = async (id: string, currentStatus?: string) => {
    const previousStatus = currentStatus || "active";
    const nextStatus = previousStatus === "active" ? "closed" : "active";

    // Optimistically update the UI
    setTuitions((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, status: nextStatus } : item
      )
    );

    try {
      await updateTuition(id, { status: nextStatus });
      toast.success(
        `Tuition status changed to ${nextStatus === "active" ? "Active" : "Closed"}`
      );
    } catch (error) {
      // Roll back if the database update fails
      setTuitions((prev) =>
        prev.map((item) =>
          (item._id || item.id) === id
            ? { ...item, status: previousStatus }
            : item
        )
      );
      console.error("Status update failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update tuition status"
      );
    }
  };

  const handleEditSuccess = (updated: TuitionItem) => {
    setTuitions((prev) =>
      prev.map((item) =>
        (item._id || item.id) === (updated._id || updated.id) ? updated : item
      )
    );
    if (
      selectedTuition &&
      (selectedTuition._id === updated._id || selectedTuition.id === updated.id)
    ) {
      setSelectedTuition(updated);
    }
  };

  const isPageLoading = isLoading || isSessionPending;

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
              All tuition posts created by your tutor account, with admin
              approval and live status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => fetchTuitions(true)}
              disabled={isRefreshing || isPageLoading}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 sm:flex-initial sm:px-3.5 sm:py-2.5 sm:text-sm"
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
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 sm:flex-initial sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <PlusCircle size={16} className="sm:size-[18px]" />
              Post Tuition
            </Link>
          </div>
        </div>

        {/* KPI / Summary Cards */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                Total Posts
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:size-8">
                <Layers size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
              <span className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                {stats.total}
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:inline">
                Tuitions
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-emerald-700 sm:text-xs">
                Active
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:size-8">
                <CheckCircle2 size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
              <span className="text-xl font-extrabold text-emerald-700 sm:text-2xl">
                {stats.active}
              </span>
              <span className="hidden text-[11px] text-emerald-600 sm:inline">
                Open
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-amber-700 sm:text-xs">
                Pending Approval
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:size-8">
                <Clock size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
              <span className="text-xl font-extrabold text-amber-700 sm:text-2xl">
                {stats.pending}
              </span>
              <span className="hidden text-[11px] text-amber-600 sm:inline">
                Waiting
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-indigo-700 sm:text-xs">
                Approved
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:size-8">
                <Check size={14} className="sm:size-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
              <span className="text-xl font-extrabold text-indigo-700 sm:text-2xl">
                {stats.approved}
              </span>
              {stats.rejected > 0 && (
                <span className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {stats.rejected} rejected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
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
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-4 pl-9 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:h-10 sm:pl-10 sm:text-sm"
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
            {/* Status Filter Tabs */}
            <div className="flex max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600">
              <button
                onClick={() => setStatusFilter("all")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition sm:py-1.5 ${
                  statusFilter === "all"
                    ? "bg-white font-bold text-blue-600 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition sm:py-1.5 ${
                  statusFilter === "active"
                    ? "bg-white font-bold text-emerald-600 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                Active ({stats.active})
              </button>
              <button
                onClick={() => setStatusFilter("closed")}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition sm:py-1.5 ${
                  statusFilter === "closed"
                    ? "bg-white font-bold text-slate-800 shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                Closed ({stats.closed})
              </button>
            </div>

            {/* Admin Approval Filter */}
            <select
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="h-8 rounded-xl border border-slate-200 bg-slate-50/80 px-2 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 sm:h-9 sm:px-2.5"
            >
              <option value="all">All Approvals</option>
              <option value="pending">Pending ({stats.pending})</option>
              <option value="approved">Approved ({stats.approved})</option>
              <option value="rejected">Rejected ({stats.rejected})</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-8 rounded-xl border border-slate-200 bg-slate-50/80 px-2 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 sm:h-9 sm:px-2.5"
            >
              <option value="all">All Types</option>
              <option value="home">Home Tutoring</option>
              <option value="online">Online</option>
              <option value="batch">Batch / Group</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50/80 p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex size-7 items-center justify-center rounded-lg transition sm:size-8 ${
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
                className={`flex size-7 items-center justify-center rounded-lg transition sm:size-8 ${
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
        {isPageLoading ? (
          /* Loading Skeleton */
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
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
        ) : !session ? (
          /* Signed-out State */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:size-14">
              <LogIn size={22} className="sm:size-6" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
              Sign in to manage your tuitions
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Only the tuitions created by your own tutor account are shown
              here.
            </p>
            <Link
              href="/auth/sign-in"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <LogIn size={14} />
              Sign In
            </Link>
          </div>
        ) : myTuitions.length === 0 ? (
          /* Empty State */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:size-14">
              <BookOpen size={22} className="sm:size-6" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
              You haven&apos;t posted any tuition yet
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Create your first tuition post. After admin approval it will be
              visible to students.
            </p>
            <Link
              href="/dashboard/tutor/add-tuition"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Plus size={14} />
              Post a Tuition
            </Link>
          </div>
        ) : filteredTuitions.length === 0 ? (
          /* No Matches */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:size-14">
              <Search size={22} className="sm:size-6" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
              No tuition posts match your criteria
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setApprovalFilter("all");
                setTypeFilter("all");
              }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {filteredTuitions.map((item) => {
              const id = (item._id || item.id) as string;

              return (
                <TuitionCard
                  key={id}
                  item={item}
                  onEdit={setEditingTuition}
                  onViewDetails={setSelectedTuition}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                  isDeleting={isDeleting === id}
                />
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3.5 sm:px-5">Tuition Details</th>
                    <th className="px-3 py-3.5 sm:px-4">Class & Medium</th>
                    <th className="px-3 py-3.5 sm:px-4">Location</th>
                    <th className="px-3 py-3.5 sm:px-4">Schedule</th>
                    <th className="px-3 py-3.5 sm:px-4">Salary</th>
                    <th className="px-3 py-3.5 sm:px-4">Admin Approval</th>
                    <th className="px-3 py-3.5 sm:px-4">Status</th>
                    <th className="px-4 py-3.5 text-right sm:px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTuitions.map((item) => {
                    const id = (item._id || item.id) as string;

                    return (
                      <TuitionTableRow
                        key={id}
                        item={item}
                        onEdit={setEditingTuition}
                        onViewDetails={setSelectedTuition}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                        isDeleting={isDeleting === id}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: Edit Tuition */}
        {editingTuition && (
          <TuitionEditModal
            tuition={editingTuition}
            onClose={() => setEditingTuition(null)}
            onSuccess={handleEditSuccess}
          />
        )}

        {/* MODAL: View Full Tuition Details */}
        {selectedTuition && (
          <TuitionDetailsModal
            tuition={selectedTuition}
            onClose={() => setSelectedTuition(null)}
            onEditClick={() => {
              const toEdit = selectedTuition;
              setSelectedTuition(null);
              setEditingTuition(toEdit);
            }}
          />
        )}

      </div>
    </div>
  );
}
