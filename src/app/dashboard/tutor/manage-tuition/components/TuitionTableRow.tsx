"use client";

import { CheckCircle2, Clock, Eye, Pencil, Trash2, XCircle } from "lucide-react";
import type { TuitionItem } from "@/lib/api/tuitions";

type TuitionTableRowProps = {
  item: TuitionItem;
  onEdit: (item: TuitionItem) => void;
  onViewDetails: (item: TuitionItem) => void;
  onToggleStatus: (id: string, currentStatus?: string) => void;
  onDelete: (id: string, title: string) => void;
  isDeleting: boolean;
};

export function TuitionTableRow({
  item,
  onEdit,
  onViewDetails,
  onToggleStatus,
  onDelete,
  isDeleting,
}: TuitionTableRowProps) {
  const id = (item._id || item.id) as string;
  const status = (item.status || "active").toLowerCase();
  const isActive = status === "active";
  const approvalStatus = (item.approvalStatus || "pending").toLowerCase();

  return (
    <tr className="transition hover:bg-slate-50/70">
      {/* Title & Subjects */}
      <td className="px-4 sm:px-5 py-4">
        <button
          onClick={() => onViewDetails(item)}
          className="font-bold text-slate-900 hover:text-[#087F9F] text-left line-clamp-1 max-w-[260px]"
        >
          {item.title}
        </button>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-[#087F9F]">{item.subject}</span>
          <span>•</span>
          <span className="capitalize">{item.tuitionType}</span>
        </div>
      </td>

      {/* Class & Medium */}
      <td className="px-3 sm:px-4 py-4 text-xs font-medium text-slate-600">
        <div className="font-semibold text-slate-800">{item.classLevel}</div>
        <div className="text-slate-400">{item.medium}</div>
      </td>

      {/* Location */}
      <td className="px-3 sm:px-4 py-4 text-xs text-slate-600">
        <div className="font-semibold text-slate-800">
          {item.area || item.district}
        </div>
        {item.landmark && (
          <div className="truncate max-w-[120px] text-slate-400">
            {item.landmark}
          </div>
        )}
      </td>

      {/* Schedule */}
      <td className="px-3 sm:px-4 py-4 text-xs text-slate-600">
        <div className="font-semibold text-slate-800">{item.daysPerWeek}</div>
        <div className="text-slate-400">{item.duration}</div>
      </td>

      {/* Salary */}
      <td className="px-3 sm:px-4 py-4 text-xs">
        <div className="font-extrabold text-[#066B85]">
          ৳ {Number(item.budget).toLocaleString()}
        </div>
        {item.negotiable && (
          <span className="text-[10px] text-slate-400">Negotiable</span>
        )}
      </td>

      {/* Admin Approval Status */}
      <td className="px-3 sm:px-4 py-4">
        {approvalStatus === "approved" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <CheckCircle2 size={12} />
            Approved
          </span>
        )}
        {approvalStatus === "pending" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
            <Clock size={12} />
            Pending
          </span>
        )}
        {approvalStatus === "rejected" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">
            <XCircle size={12} />
            Rejected
          </span>
        )}
      </td>

      {/* Active Status & Toggle */}
      <td className="px-3 sm:px-4 py-4">
        <button
          onClick={() => onToggleStatus(id, item.status)}
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
            isActive
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
          title="Click to toggle status"
        >
          {isActive ? "Active" : "Closed"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 sm:px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Edit */}
          <button
            onClick={() => onEdit(item)}
            className="rounded-lg border border-[#087F9F]/20 bg-[#087F9F]/5 p-1.5 text-[#087F9F] hover:bg-[#087F9F]/10"
            title="Edit Tuition"
          >
            <Pencil size={14} />
          </button>

          {/* View Details */}
          <button
            onClick={() => onViewDetails(item)}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50"
            title="View Details"
          >
            <Eye size={14} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(id, item.title)}
            disabled={isDeleting}
            className="rounded-lg border border-red-100 p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
