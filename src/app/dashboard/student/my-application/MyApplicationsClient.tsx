"use client";

import Link from "next/link";
import { useState, type ElementType } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  cancelApplication,
  getMyApplications,
  type ApplicationItem,
} from "@/lib/actions/applicants";

type Props = {
  initialApplications: ApplicationItem[];
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

const formatFee = (fee?: number) => {
  if (typeof fee !== "number" || !Number.isFinite(fee) || fee <= 0) {
    return "Not specified";
  }

  return `৳${fee.toLocaleString("en-BD")}`;
};

const StatusBadge = ({ status }: { status?: string }) => {
  const key = getStatusKey(status);
  const Icon =
    key === "accepted" ? CheckCircle2 : key === "rejected" ? XCircle : Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${statusStyles[key]}`}
    >
      <Icon size={13} />
      {key}
    </span>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: ElementType;
  label: string;
  value: string;
  sub?: string;
}) => (
  <div className="flex items-start gap-3">
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
      {sub && (
        <p className="mt-0.5 break-all text-xs text-slate-500">{sub}</p>
      )}
    </div>
  </div>
);

const StatCard = ({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: number;
  icon: ElementType;
  className: string;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${className}`}
    >
      <Icon size={19} />
    </div>

    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  </div>
);

export default function MyApplicationsClient({
  initialApplications,
  initialError = "",
}: Props) {
  const [applications, setApplications] =
    useState<ApplicationItem[]>(initialApplications);
  const [error, setError] = useState(initialError);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const stats = {
    total: applications.length,
    pending: applications.filter(
      (item) => getStatusKey(item.status) === "pending"
    ).length,
    accepted: applications.filter(
      (item) => getStatusKey(item.status) === "accepted"
    ).length,
    rejected: applications.filter(
      (item) => getStatusKey(item.status) === "rejected"
    ).length,
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      const data = await getMyApplications();
      setApplications(data);
      setError("");
      toast.success("Applications refreshed");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load applications";

      setError(message);
      toast.error(message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      setCancellingId(id);

      await cancelApplication(id);

      setApplications((current) =>
        current.filter((application) => application._id !== id)
      );
      setConfirmId(null);
      toast.success("Application cancelled");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to cancel application"
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-svh bg-[#F4F7FC] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              My Applications
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Track the tuitions you have applied for and cancel any
              application that is still pending.
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

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Applications"
            value={stats.total}
            icon={FileText}
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

        {/* Error */}
        {error && (
          <div className="mt-6 flex flex-wrap items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="font-semibold">Could not load your applications</p>
              <p className="mt-1 text-rose-600">{error}</p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={13}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {applications.length === 0 && !error && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F9F]/5 text-[#087F9F]">
              <Search size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No applications yet
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-slate-500">
              You have not applied for any tuition yet. Browse the available
              tuitions and apply to the ones that match you.
            </p>

            <Link
              href="/browse-tuitions"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#087F9F] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#066B85]"
            >
              Browse Tuitions
            </Link>
          </div>
        )}

        {applications.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {applications.map((application) => {
              const id = application._id;
              const statusKey = getStatusKey(application.status);
              const isPending = statusKey === "pending";
              const isCancelling = cancellingId === id;

              const tutorName =
                application.tutorName?.trim() ||
                application.tutorEmail?.trim() ||
                "Not available";
              const tutorEmail =
                application.tutorName?.trim() && application.tutorEmail?.trim()
                  ? application.tutorEmail.trim()
                  : undefined;

              return (
                <article
                  key={id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:border-[#087F9F]/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Tuition Title
                      </p>
                      <h2 className="mt-1 line-clamp-2 text-base font-bold text-slate-900">
                        {application.tuitionTitle || "Untitled Tuition"}
                      </h2>
                    </div>

                    <StatusBadge status={application.status} />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <InfoItem
                      icon={UserRound}
                      label="Tutor"
                      value={tutorName}
                      sub={tutorEmail}
                    />

                    <InfoItem
                      icon={Wallet}
                      label="Monthly Fee"
                      value={formatFee(application.monthlyFee)}
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label="Applied Date"
                      value={formatDate(application.appliedDate)}
                    />

                    <InfoItem
                      icon={GraduationCap}
                      label="Class / Level"
                      value={application.classLevel || "Not specified"}
                    />
                  </div>

                  <div className="mt-auto pt-5">
                    {isPending ? (
                      <div className="border-t border-slate-100 pt-4">
                        {confirmId === id ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-auto text-xs font-medium text-slate-500">
                              Cancel this application?
                            </span>

                            <button
                              onClick={() => handleCancel(id)}
                              disabled={isCancelling}
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isCancelling ? (
                                <Loader2 size={13} className="animate-spin" />
                              ) : (
                                <Trash2 size={13} />
                              )}
                              Yes, cancel
                            </button>

                            <button
                              onClick={() => setConfirmId(null)}
                              disabled={isCancelling}
                              type="button"
                              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Keep
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(id)}
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                          >
                            <Trash2 size={14} />
                            Cancel Application
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="border-t border-slate-100 pt-4 text-xs text-slate-400">
                        Only pending applications can be cancelled.
                      </p>
                    )}
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
