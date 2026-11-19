
"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Pencil,
  UserCheck,
  Users,
  XCircle,
  Trash2,
  Loader2,
} from "lucide-react";

import type { TuitionItem } from "@/lib/api/tuitions";

type TuitionCardProps = {
  item: TuitionItem;
  onEdit: (item: TuitionItem) => void;
  onViewDetails: (item: TuitionItem) => void;
  onToggleStatus: (id: string, currentStatus?: string) => void;
  onDelete: (id: string, title: string) => void;
  isDeleting: boolean;
};

export function TuitionCard({
  item,
  onEdit,
  onViewDetails,
  onToggleStatus,
  onDelete,
  isDeleting,
}: TuitionCardProps) {
  const id = (item._id || item.id) as string;

  const status = (item.status || "active").toLowerCase();
  const isActive = status === "active";

  const approvalStatus = (item.approvalStatus || "pending").toLowerCase();

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50 transition hover:border-blue-200 hover:shadow-md sm:p-5">

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

            {approvalStatus === "approved" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 size={12} />
                Approved
              </span>
            )}

            {approvalStatus === "pending" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                <Clock size={12} />
                Pending Approval
              </span>
            )}

            {approvalStatus === "rejected" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                <XCircle size={12} />
                Rejected
              </span>
            )}

            {isActive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                Closed
              </span>
            )}

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-600">
              {item.tuitionType === "home" ? "Home Tutoring" : item.tuitionType}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users size={13} className="text-blue-500" />
            <span className="font-semibold text-slate-700">
              {item.applicantCount ?? 0}
            </span>
            Applicants
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-3 line-clamp-2 text-sm font-bold text-slate-900 transition group-hover:text-blue-600 sm:text-base">
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
            <span className="max-w-[180px] truncate text-slate-500">
              🏛️ {item.institution}
            </span>
          )}
        </div>

        {/* Subjects */}
        <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
          <span className="shrink-0 font-bold text-slate-400">
            Subjects:
          </span>

          <div className="flex flex-wrap gap-1">
            {(item.subject || "").split(",").map((subject, idx) => (
              <span
                key={idx}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
              >
                {subject.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Location & Schedule */}
        <div className="mt-3.5 grid grid-cols-1 gap-2 rounded-xl bg-slate-50/80 p-2.5 text-xs sm:grid-cols-2 sm:p-3">

          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={14} className="shrink-0 text-slate-400" />
            <span className="truncate">
              {item.area
                ? `${item.area}, ${item.district || "Dhaka"}`
                : item.district || "Dhaka"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <CalendarDays size={14} className="shrink-0 text-slate-400" />
            <span>{item.daysPerWeek || "3 days"} / week</span>
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

      {/* Budget & Actions */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3.5 sm:flex-row sm:items-center sm:justify-between">

        {/* Budget */}
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[11px]">
            Monthly Salary
          </span>

          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-blue-700 sm:text-lg">
              ৳ {Number(item.budget || 0).toLocaleString()}
            </span>

            {item.negotiable && (
              <span className="text-[10px] font-semibold text-blue-600 sm:text-[11px]">
                (Negotiable)
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100"
            title="Edit Tuition"
          >
            <Pencil size={13} />
            Edit
          </button>

          {/* Details */}
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            title="View Details"
          >
            <Eye size={13} className="text-slate-500" />
            Details
          </button>

          {/* Toggle Status */}
          <button
            type="button"
            onClick={() => onToggleStatus(id, item.status)}
            className={`inline-flex items-center rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
            title={isActive ? "Change status to Closed" : "Change status to Active"}
          >
            {isActive ? "Close" : "Activate"}
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(id, item.title)}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete Tuition"
          >
            {isDeleting ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={13} />
                Delete
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
