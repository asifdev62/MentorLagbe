
"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AlertCircle,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MessageSquareQuote,
  Phone,
  RefreshCw,
  RotateCcw,
  Search,
  Users,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import {
  getTutorApplicants,
  updateApplicantStatus,
  type TutorApplicant,
} from "@/lib/actions/applicants";

type Props = {
  initialApplicants: TutorApplicant[];
  tutorEmail: string;
  initialError?: string;
};

type StatusKey = "pending" | "accepted" | "rejected";

const statusStyles: Record<StatusKey, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const getStatusKey = (status?: string): StatusKey => {
  const value = (status || "pending").toLowerCase();

  if (value === "accepted") return "accepted";
  if (value === "rejected") return "rejected";

  return "pending";
};

const formatDate = (value?: string) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInitial = (name?: string) =>
  name?.trim().charAt(0).toUpperCase() || "S";

const StatusBadge = ({ status }: { status?: string }) => {
  const key = getStatusKey(status);

  const Icon =
    key === "accepted"
      ? CheckCircle2
      : key === "rejected"
        ? XCircle
        : Clock;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${statusStyles[key]}`}
    >
      <Icon size={12} />
      {key}
    </span>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  className: string;
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4">
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10 ${className}`}
    >
      <Icon size={18} />
    </div>

    <div className="min-w-0">
      <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
        {label}
      </p>

      <p className="text-lg font-extrabold text-slate-900 sm:text-xl">
        {value}
      </p>
    </div>
  </div>
);

const InfoRow = ({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: ReactNode;
}) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      <Icon size={14} />
    </span>

    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-0.5 min-w-0 break-words text-xs font-semibold text-slate-800">
        {children}
      </div>
    </div>
  </div>
);

export default function ApplicantsClient({
  initialApplicants,
  tutorEmail,
  initialError = "",
}: Props) {
  const [applicants, setApplicants] =
    useState<TutorApplicant[]>(initialApplicants);

  const [error, setError] = useState(initialError);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [updating, setUpdating] = useState<{
    id: string;
    status: "Pending" | "Accepted" | "Rejected";
  } | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"all" | StatusKey>("all");

  // Statistics
  const stats = useMemo(
    () => ({
      total: applicants.length,

      pending: applicants.filter(
        (item) => getStatusKey(item.status) === "pending"
      ).length,

      accepted: applicants.filter(
        (item) => getStatusKey(item.status) === "accepted"
      ).length,

      rejected: applicants.filter(
        (item) => getStatusKey(item.status) === "rejected"
      ).length,
    }),
    [applicants]
  );

  // Search and filter
  const filteredApplicants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applicants.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.studentName,
          item.email,
          item.phone,
          item.tuitionTitle,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        getStatusKey(item.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applicants, search, statusFilter]);

  const hasFilters = search.trim() !== "" || statusFilter !== "all";

  // Refresh applicants
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError("");

      const data = await getTutorApplicants(tutorEmail);

      setApplicants(data);
      toast.success("Applicants refreshed");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load applicants";

      setError(message);
      toast.error(message);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Accept, reject or move an application back to pending
  const handleStatusChange = async (
    id: string,
    status: "Pending" | "Accepted" | "Rejected"
  ) => {
    if (updating) return;

    const previous = applicants;

    setUpdating({ id, status });

    // Optimistic update
    setApplicants((current) =>
      current.map((item) =>
        item._id === id ? { ...item, status } : item
      )
    );

    try {
      const result = await updateApplicantStatus(id, status);

      if (result?.success === false) {
        throw new Error(
          result.message || "Failed to update application status"
        );
      }

      toast.success(`Application ${status.toLowerCase()}`);
    } catch (err) {
      setApplicants(previous);

      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to update application status"
      );
    } finally {
      setUpdating(null);
    }
  };

  const isUpdating = (
    id: string,
    status: "Pending" | "Accepted" | "Rejected"
  ) => updating?.id === id && updating.status === status;

  return (
    <div className="min-h-svh px-3.5 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#066B85] sm:size-9">
                <Users size={18} />
              </span>

              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                Applicants
              </h1>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Students who applied to your tuition posts. Review their
              details and accept or reject each application.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-initial sm:py-2.5 sm:text-sm"
            >
              <RefreshCw
                size={14}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <Link
              href="/dashboard/tutor/manage-tuition"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#087F9F] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#066B85] sm:flex-initial sm:py-2.5 sm:text-sm"
            >
              <BookOpen size={15} />
              My Tuitions
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          <StatCard
            label="Total Applicants"
            value={stats.total}
            icon={Users}
            className="bg-[#087F9F]/5 text-[#087F9F]"
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            icon={Clock}
            className="bg-amber-50 text-amber-600"
          />

          <StatCard
            label="Accepted"
            value={stats.accepted}
            icon={CheckCircle2}
            className="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={XCircle}
            className="bg-rose-50 text-rose-600"
          />
        </div>

        {/* Search and Filter */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by student name, email, phone or tuition title..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-9 pl-9 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10 sm:h-10 sm:pl-10 sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600">
              {(
                [
                  ["all", `All (${stats.total})`],
                  ["pending", `Pending (${stats.pending})`],
                  ["accepted", `Accepted (${stats.accepted})`],
                  ["rejected", `Rejected (${stats.rejected})`],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition sm:py-1.5 ${
                    statusFilter === value
                      ? "bg-white font-bold text-[#087F9F] shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-[#087F9F]"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex flex-wrap items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                Could not load applicants
              </p>

              <p className="mt-1 text-rose-600">{error}</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-60"
            >
              <RefreshCw
                size={13}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Try again
            </button>
          </div>
        )}

        {/* Empty States and Applicants */}
        {applicants.length === 0 && !error ? (
          <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#087F9F]/5 text-[#087F9F]">
              <UserRound size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No applicants yet
            </h2>

            <p className="mt-1.5 max-w-md text-sm text-slate-500">
              No student has applied to your tuition posts so far.
              Once someone applies, their details will show up here.
            </p>

            <Link
              href="/dashboard/tutor/add-tuition"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#087F9F] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#066B85]"
            >
              Post a Tuition
            </Link>
          </div>
        ) : filteredApplicants.length === 0 && !error ? (
          <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#087F9F]/5 text-[#087F9F]">
              <Search size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No applicants match your filters
            </h2>

            <p className="mt-1.5 max-w-md text-sm text-slate-500">
              Try a different keyword or reset the status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredApplicants.map((applicant) => {
              const statusKey = getStatusKey(applicant.status);

              const acceptedLoading = isUpdating(
                applicant._id,
                "Accepted"
              );

              const rejectedLoading = isUpdating(
                applicant._id,
                "Rejected"
              );

              const pendingLoading = isUpdating(
                applicant._id,
                "Pending"
              );

              const isBusy = updating?.id === applicant._id;

              return (
                <article
                  key={applicant._id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#087F9F]/20 hover:shadow-md"
                >
                  {/* Student */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#087F9F] to-[#066B85] text-sm font-bold text-white">
                        {getInitial(applicant.studentName)}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                          {applicant.studentName || "Unknown Student"}
                        </h2>

                        <p className="truncate text-xs text-slate-500">
                          {applicant.email || "Email not provided"}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={applicant.status} />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* Tuition */}
                    <div className="rounded-xl border border-[#087F9F]/10 bg-[#087F9F]/10 px-3 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#066B85]">
                        Applied to
                      </p>

                      <p className="mt-0.5 line-clamp-1 text-sm font-bold text-slate-900">
                        {applicant.tuitionTitle || "Tuition"}
                      </p>

                      {applicant.classLevel && (
                        <span className="mt-1.5 inline-flex rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#066B85]">
                          {applicant.classLevel}
                        </span>
                      )}
                    </div>

                    {/* Contact and Schedule */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <InfoRow icon={Mail} label="Email">
                        {applicant.email ? (
                          <a
                            href={`mailto:${applicant.email}`}
                            className="block truncate text-[#087F9F] hover:underline"
                          >
                            {applicant.email}
                          </a>
                        ) : (
                          <span className="text-slate-400">
                            Not provided
                          </span>
                        )}
                      </InfoRow>

                      <InfoRow icon={Phone} label="Phone">
                        {applicant.phone ? (
                          <a
                            href={`tel:${applicant.phone}`}
                            className="block truncate text-[#087F9F] hover:underline"
                          >
                            {applicant.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400">
                            Not provided
                          </span>
                        )}
                      </InfoRow>

                      <InfoRow
                        icon={CalendarClock}
                        label="Preferred Schedule"
                      >
                        {applicant.preferredSchedule || (
                          <span className="text-slate-400">
                            Flexible
                          </span>
                        )}
                      </InfoRow>

                      <InfoRow icon={Clock} label="Applied On">
                        {formatDate(applicant.appliedDate)}
                      </InfoRow>
                    </div>

                    {/* Student Note */}
                    {applicant.note && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          <MessageSquareQuote size={12} />
                          Note from student
                        </p>

                        <p className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-600">
                          {applicant.note}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(applicant._id, "Accepted")
                          }
                          disabled={isBusy || statusKey === "accepted"}
                          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                            statusKey === "accepted"
                              ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          } disabled:cursor-not-allowed disabled:opacity-70`}
                        >
                          {acceptedLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Check size={14} />
                          )}

                          {statusKey === "accepted" ? "Accepted" : "Accept"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(applicant._id, "Rejected")
                          }
                          disabled={isBusy || statusKey === "rejected"}
                          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                            statusKey === "rejected"
                              ? "cursor-default border border-rose-200 bg-rose-50 text-rose-700"
                              : "border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          } disabled:cursor-not-allowed disabled:opacity-70`}
                        >
                          {rejectedLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <X size={14} />
                          )}

                          {statusKey === "rejected" ? "Rejected" : "Reject"}
                        </button>
                      </div>

                      {statusKey === "pending" ? (
                        <p className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700">
                          <Clock size={13} />
                          Waiting for your decision
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(applicant._id, "Pending")
                          }
                          disabled={isBusy}
                          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {pendingLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Clock size={14} />
                          )}
                          Move back to Pending
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
