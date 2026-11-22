"use client";

import { useState } from "react";
import type { TuitionItem } from "@/lib/api/tuitions";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  Loader2,
  MapPin,
  Wallet,
  GraduationCap,
  Mail,
  Layers,
  Users,
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type Props = {
  initialTuitions: TuitionItem[];
};

type Status = "pending" | "approved" | "rejected";

const statusConfig: Record<
  Status,
  {
    label: string;
    badge: string;
    bar: string;
    dot: string;
    activeTab: string;
  }
> = {
  pending: {
    label: "Pending",
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    bar: "bg-amber-400",
    dot: "bg-amber-500",
    activeTab: "text-amber-700",
  },
  approved: {
    label: "Approved",
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    activeTab: "text-emerald-700",
  },
  rejected: {
    label: "Rejected",
    badge:
      "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    activeTab: "text-rose-700",
  },
};

export default function TuitionsClient({ initialTuitions }: Props) {
  const [tuitions, setTuitions] = useState(initialTuitions);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const updateStatus = async (id: string, approvalStatus: Status) => {
    setLoadingId(id);

    try {
      const response = await fetch(
        `${BASE_URL}/tuitions/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvalStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setTuitions((previous) =>
        previous.map((item) =>
          (item._id || item.id) === id
            ? { ...item, approvalStatus }
            : item
        )
      );

      toast.success(data.message || "Status updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTuition = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tuition?")) {
      return;
    }

    setLoadingId(id);

    try {
      const response = await fetch(`${BASE_URL}/tuitions/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setTuitions((previous) =>
        previous.filter((item) => (item._id || item.id) !== id)
      );

      toast.success("Tuition deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const pending = tuitions.filter(
    (item) => (item.approvalStatus || "pending") === "pending"
  ).length;

  const approved = tuitions.filter(
    (item) => item.approvalStatus === "approved"
  ).length;

  const rejected = tuitions.filter(
    (item) => item.approvalStatus === "rejected"
  ).length;

  const filteredTuitions = tuitions.filter((item) => {
    const status = item.approvalStatus || "pending";
    return filter === "all" || status === filter;
  });

  const countFor = (status: string) => {
    if (status === "pending") return pending;
    if (status === "approved") return approved;
    if (status === "rejected") return rejected;
    return tuitions.length;
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Tuitions"
          value={tuitions.length}
          total={tuitions.length}
          icon={<Layers size={18} />}
          tone="teal"
        />
        <StatCard
          title="Pending"
          value={pending}
          total={tuitions.length}
          icon={<Clock size={18} />}
          tone="amber"
        />
        <StatCard
          title="Approved"
          value={approved}
          total={tuitions.length}
          icon={<CheckCircle2 size={18} />}
          tone="emerald"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          total={tuitions.length}
          icon={<XCircle size={18} />}
          tone="rose"
        />
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            Tuition Posts
          </h2>
          <p className="text-xs text-slate-500">
            Review, approve or reject submitted tuition posts.
          </p>
        </div>

        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600">
          {["all", "pending", "approved", "rejected"].map((status) => {
            const isActive = filter === status;
            const config =
              status === "all" ? null : statusConfig[status as Status];

            return (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 capitalize transition ${
                  isActive
                    ? `bg-white font-bold shadow-sm ${
                        config ? config.activeTab : "text-[#087F9F]"
                      }`
                    : "hover:text-slate-900"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    config ? config.dot : "bg-[#087F9F]"
                  }`}
                />
                {status}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-slate-100 text-slate-600"
                      : "bg-slate-200/70 text-slate-500"
                  }`}
                >
                  {countFor(status)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tuition List */}
      {filteredTuitions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
            <BookOpen size={24} />
          </div>
          <h2 className="font-semibold text-slate-900">No Tuitions Found</h2>
          <p className="mt-1 text-sm text-slate-500">
            There are no tuition posts in this category.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredTuitions.map((item) => {
            const status = (item.approvalStatus || "pending") as Status;
            const config = statusConfig[status] ?? statusConfig.pending;
            const itemId = item._id || item.id || "";
            const isLoading = loadingId === itemId;
            const location = [item.area, item.district]
              .filter(Boolean)
              .join(", ");

            return (
              <article
                key={itemId}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#087F9F]/30 hover:shadow-md"
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 ${config.bar}`}
                />

                <div className="flex flex-col gap-4 p-4 pl-5 sm:p-5 sm:pl-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                        {item.title}
                      </h3>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${config.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                        />
                        {config.label}
                      </span>

                      {typeof item.applicantCount === "number" &&
                        item.applicantCount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#087F9F]/10 px-2.5 py-1 text-xs font-semibold text-[#087F9F]">
                            <Users size={12} />
                            {item.applicantCount} applicants
                          </span>
                        )}
                    </div>

                    <div className="mt-3 grid gap-x-5 gap-y-2 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-3">
                      <Meta icon={<BookOpen size={14} />}>
                        {item.subject || "Subject not set"}
                      </Meta>

                      <Meta icon={<GraduationCap size={14} />}>
                        {item.classLevel || "Class not set"}
                      </Meta>

                      <Meta icon={<MapPin size={14} />}>
                        {location || "Location not set"}
                      </Meta>

                      <Meta icon={<Wallet size={14} />}>
                        <span className="font-semibold text-[#066B85]">
                          {item.budget
                            ? `৳ ${Number(item.budget).toLocaleString("en-BD")}`
                            : "Negotiable"}
                        </span>
                      </Meta>

                      <Meta icon={<Layers size={14} />}>
                        Medium: {item.medium || "Not specified"}
                      </Meta>

                      <Meta icon={<Mail size={14} />}>
                        <span className="truncate">
                          {item.tutorEmail || "No tutor email"}
                        </span>
                      </Meta>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
                    {status !== "approved" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(itemId, "approved")}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                        Approve
                      </button>
                    )}

                    {status !== "rejected" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(itemId, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    )}

                    {status !== "pending" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(itemId, "pending")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                      >
                        <Clock className="h-4 w-4" />
                        Pending
                      </button>
                    )}

                    <button
                      disabled={isLoading}
                      onClick={() => deleteTuition(itemId)}
                      title="Delete tuition"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Meta({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span className="shrink-0 text-[#087F9F]/70">{icon}</span>
      <span className="truncate">{children}</span>
    </span>
  );
}

type Tone = "teal" | "amber" | "emerald" | "rose";

const tones: Record<
  Tone,
  { card: string; label: string; chip: string; value: string; track: string; bar: string }
> = {
  teal: {
    card: "border-[#087F9F]/15 bg-gradient-to-br from-[#087F9F]/10 via-white to-white",
    label: "text-[#066B85]",
    chip: "bg-[#087F9F] text-white shadow-sm shadow-[#087F9F]/30",
    value: "text-[#066B85]",
    track: "bg-[#087F9F]/10",
    bar: "bg-[#087F9F]",
  },
  amber: {
    card: "border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white",
    label: "text-amber-700",
    chip: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
    value: "text-amber-700",
    track: "bg-amber-100",
    bar: "bg-amber-500",
  },
  emerald: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white",
    label: "text-emerald-700",
    chip: "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30",
    value: "text-emerald-700",
    track: "bg-emerald-100",
    bar: "bg-emerald-500",
  },
  rose: {
    card: "border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white",
    label: "text-rose-700",
    chip: "bg-rose-500 text-white shadow-sm shadow-rose-500/30",
    value: "text-rose-700",
    track: "bg-rose-100",
    bar: "bg-rose-500",
  },
};

function StatCard({
  title,
  value,
  total,
  icon,
  tone,
}: {
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  tone: Tone;
}) {
  const style = tones[tone];
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div
      className={`rounded-2xl border p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4 ${style.card}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p
          className={`truncate text-[10px] font-bold tracking-wider uppercase sm:text-xs ${style.label}`}
        >
          {title}
        </p>

        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl sm:size-9 ${style.chip}`}
        >
          {icon}
        </span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2 sm:mt-3">
        <h2 className={`text-2xl font-extrabold tracking-tight ${style.value}`}>
          {value}
        </h2>
        <span className={`text-[10px] font-semibold sm:text-[11px] ${style.label}`}>
          {percent}%
        </span>
      </div>

      <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${style.track}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
