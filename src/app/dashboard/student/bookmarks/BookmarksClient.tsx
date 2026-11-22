
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  Bookmark,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutGrid,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
  Table as TableIcon,
  Trash2,
  Wallet,
  X,
} from "lucide-react";

import {
  getBookmarks,
  removeBookmark,
} from "@/lib/actions/student";

type Tuition = {
  _id: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  class?: string;
  location?: string;
  monthlyFee?: number;
  salary?: number;
  budget?: number;
  tutorEmail?: string;
  description?: string;
  createdAt?: string;
};

type BookmarkItem = {
  _id: string;
  tuitionId: string;
  createdAt?: string;
  tuition?: Tuition | null;
};

type Props = {
  initialBookmarks: BookmarkItem[];
  initialError?: string;
  isPro: boolean;
  limit: number;
};

type ViewMode = "grid" | "table";

const formatFee = (fee?: number) => {
  if (
    typeof fee !== "number" ||
    !Number.isFinite(fee) ||
    fee <= 0
  ) {
    return "Not specified";
  }

  return `৳${fee.toLocaleString("en-BD")}`;
};

const formatDate = (value?: string) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function TuitionCard({
  item,
  onRemove,
  removing,
}: {
  item: BookmarkItem;
  onRemove: (id: string) => void;
  removing: boolean;
}) {
  const tuition = item.tuition;

  if (!tuition) return null;

  const tuitionId = tuition._id || item.tuitionId;
  const title = tuition.title || tuition.subject || "Untitled Tuition";
  const classLevel = tuition.classLevel || tuition.class || "Not specified";
  const fee =
    tuition.monthlyFee ?? tuition.salary ?? tuition.budget;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:border-[#087F9F]/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
            <GraduationCap size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Saved Tuition
            </p>
            <h2 className="mt-1 line-clamp-2 text-base font-bold text-slate-900">
              {title}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(tuitionId)}
          disabled={removing}
          title="Remove bookmark"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {removing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <InfoItem
          icon={BookOpen}
          label="Subject"
          value={tuition.subject || "Not specified"}
        />

        <InfoItem
          icon={GraduationCap}
          label="Class / Level"
          value={classLevel}
        />

        <InfoItem
          icon={MapPin}
          label="Location"
          value={tuition.location || "Not specified"}
        />

        <InfoItem
          icon={Wallet}
          label="Monthly Fee"
          value={formatFee(fee)}
        />

        <InfoItem
          icon={CalendarDays}
          label="Saved Date"
          value={formatDate(item.createdAt)}
        />
      </div>

      {tuition.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {tuition.description}
        </p>
      )}

      <div className="mt-auto border-t border-slate-100 pt-4">
        <Link
          href={`/dashboard/student/browse-tuitions/${tuitionId}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#066B85]"
        >
          View Tuition Details
        </Link>
      </div>
    </article>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#087F9F]/5 text-[#087F9F]">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function BookmarksClient({
  initialBookmarks,
  initialError = "",
  isPro,
  limit,
}: Props) {
  const [bookmarks, setBookmarks] =
    useState<BookmarkItem[]>(initialBookmarks);

  const [error, setError] = useState(initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredBookmarks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return bookmarks.filter((item) => {
      const tuition = item.tuition;

      if (!tuition) return false;

      const searchableText = [
        tuition.title,
        tuition.subject,
        tuition.classLevel,
        tuition.class,
        tuition.location,
        tuition.tutorEmail,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return !term || searchableText.includes(term);
    });
  }, [bookmarks, searchTerm]);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      const result = await getBookmarks();

      if (!result.success) {
        throw new Error(result.message || "Failed to refresh bookmarks");
      }

      setBookmarks(result.bookmarks || []);
      setError("");
      toast.success("Bookmarks refreshed");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to refresh bookmarks";

      setError(message);
      toast.error(message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRemove = async (tuitionId: string) => {
    try {
      setRemovingId(tuitionId);

      const result = await removeBookmark(tuitionId);

      if (!result.success) {
        throw new Error(result.message || "Failed to remove bookmark");
      }

      setBookmarks((current) =>
        current.filter(
          (item) =>
            item.tuition?._id !== tuitionId &&
            item.tuitionId !== tuitionId
        )
      );

      setConfirmId(null);
      toast.success("Bookmark removed successfully");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to remove bookmark"
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-svh bg-[#F4F7FC] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              My Bookmarks
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Keep your favorite tuition opportunities in one place.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#087F9F]/20 hover:text-[#087F9F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Bookmark Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
              <Bookmark size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Bookmarks
              </p>
              <p className="text-xl font-extrabold text-slate-900">
                {bookmarks.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <GraduationCap size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Your Plan
              </p>
              <p className="text-xl font-extrabold text-slate-900">
                {isPro ? "Student Pro" : "Free Student"}
              </p>
              <p className="text-xs text-slate-500">
                {isPro
                  ? "Unlimited bookmarks"
                  : `${bookmarks.length} of ${limit} bookmarks used`}
              </p>
            </div>
          </div>
        </div>

        {/* Plan Limit */}
        {!isPro && (
          <div className="mt-4 rounded-2xl border border-[#087F9F]/15 bg-[#087F9F]/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-800">
                Free plan bookmark limit
              </p>
              <p className="text-sm font-bold text-[#087F9F]">
                {bookmarks.length} / {limit}
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#087F9F] transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    limit > 0 ? (bookmarks.length / limit) * 100 : 0
                  )}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Upgrade to Student Pro to save unlimited tuition bookmarks.
            </p>
          </div>
        )}

        {/* Search and View Controls */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by tuition, subject, class, location..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-10 pl-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <p className="text-xs font-medium text-slate-500">
              {filteredBookmarks.length}{" "}
              {filteredBookmarks.length === 1 ? "result" : "results"}
            </p>

            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/80 p-1">
              <button
                onClick={() => setViewMode("grid")}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-white text-[#087F9F] shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>

              <button
                onClick={() => setViewMode("table")}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  viewMode === "table"
                    ? "bg-white text-[#087F9F] shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Table View"
              >
                <TableIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex flex-wrap items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                Could not load your bookmarks
              </p>
              <p className="mt-1 text-rose-600">{error}</p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              type="button"
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-60"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty Bookmarks */}
        {bookmarks.length === 0 && !error && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F9F]/5 text-[#087F9F]">
              <Bookmark size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No bookmarks yet
            </h2>

            <p className="mt-1.5 max-w-md text-sm text-slate-500">
              You have not saved any tuition yet. Browse available
              tuitions and bookmark the ones you like.
            </p>

            <Link
              href="/dashboard/student/browse-tuitions"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#087F9F] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#066B85]"
            >
              <Search size={16} />
              Browse Tuitions
            </Link>
          </div>
        )}

        {/* No Search Results */}
        {bookmarks.length > 0 &&
          filteredBookmarks.length === 0 && (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <Search size={26} className="text-[#087F9F]" />

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No matching bookmarks
              </h2>

              <p className="mt-1.5 text-sm text-slate-500">
                Try another search term.
              </p>

              <button
                onClick={() => setSearchTerm("")}
                type="button"
                className="mt-5 rounded-xl bg-[#087F9F] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#066B85]"
              >
                Clear Search
              </button>
            </div>
          )}

        {/* Grid View */}
        {filteredBookmarks.length > 0 &&
          viewMode === "grid" && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredBookmarks.map((item) => {
                const tuitionId =
                  item.tuition?._id || item.tuitionId;

                return (
                  <div key={item._id || tuitionId}>
                    {confirmId === tuitionId ? (
                      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                          <Trash2 size={22} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                          Remove Bookmark?
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Are you sure you want to remove this tuition
                          from your bookmarks?
                        </p>

                        <div className="mt-5 flex gap-2">
                          <button
                            onClick={() => handleRemove(tuitionId)}
                            disabled={removingId === tuitionId}
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-60"
                          >
                            {removingId === tuitionId ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                            Yes, Remove
                          </button>

                          <button
                            onClick={() => setConfirmId(null)}
                            disabled={removingId === tuitionId}
                            type="button"
                            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Keep
                          </button>
                        </div>
                      </div>
                    ) : (
                      <TuitionCard
                        item={item}
                        removing={removingId === tuitionId}
                        onRemove={setConfirmId}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

        {/* Table View */}
        {filteredBookmarks.length > 0 &&
          viewMode === "table" && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-3.5 sm:px-5">
                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Saved Tuition List
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] tracking-wider text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Tuition</th>
                      <th className="px-4 py-3 font-semibold">Class</th>
                      <th className="px-4 py-3 font-semibold">Location</th>
                      <th className="px-4 py-3 font-semibold">Monthly Fee</th>
                      <th className="px-4 py-3 font-semibold">Saved Date</th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredBookmarks.map((item) => {
                      const tuition = item.tuition;

                      if (!tuition) return null;

                      const id = tuition._id || item.tuitionId;
                      const fee =
                        tuition.monthlyFee ??
                        tuition.salary ??
                        tuition.budget;

                      return (
                        <tr
                          key={item._id || id}
                          className="transition hover:bg-[#087F9F]/5"
                        >
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-slate-900">
                              {tuition.title ||
                                tuition.subject ||
                                "Untitled Tuition"}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {tuition.subject || "Subject not specified"}
                            </p>
                          </td>

                          <td className="px-4 py-3.5 text-slate-600">
                            {tuition.classLevel ||
                              tuition.class ||
                              "Not specified"}
                          </td>

                          <td className="px-4 py-3.5 text-slate-600">
                            {tuition.location || "Not specified"}
                          </td>

                          <td className="px-4 py-3.5 font-semibold text-[#066B85]">
                            {formatFee(fee)}
                          </td>

                          <td className="px-4 py-3.5 text-slate-600">
                            {formatDate(item.createdAt)}
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/dashboard/student/browse-tuitions/${id}`}
                                className="rounded-lg bg-[#087F9F] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#066B85]"
                              >
                                View
                              </Link>

                              {confirmId === id ? (
                                <>
                                  <button
                                    onClick={() => handleRemove(id)}
                                    disabled={removingId === id}
                                    type="button"
                                    className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-60"
                                  >
                                    {removingId === id ? "Removing..." : "Confirm"}
                                  </button>

                                  <button
                                    onClick={() => setConfirmId(null)}
                                    disabled={removingId === id}
                                    type="button"
                                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                  >
                                    Keep
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setConfirmId(id)}
                                  type="button"
                                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                                >
                                  Remove
                                </button>
                              )}
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
      </div>
    </div>
  );
}
