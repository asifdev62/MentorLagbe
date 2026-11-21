"use client";

import {
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";
import type { TuitionItem } from "@/lib/api/tuitions";

type TuitionDetailsModalProps = {
  tuition: TuitionItem;
  onClose: () => void;
  onEditClick: () => void;
};

export function TuitionDetailsModal({
  tuition,
  onClose,
  onEditClick,
}: TuitionDetailsModalProps) {
  const approvalStatus = (tuition.approvalStatus || "pending").toLowerCase();
  const isActive = (tuition.status || "active").toLowerCase() === "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg md:max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
        >
          <X size={16} />
        </button>

        {/* Badges Header: Tuition Type, Admin Approval, Active Status */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tuition Type */}
          <span className="rounded-full bg-[#087F9F]/10 px-3 py-0.5 sm:py-1 text-xs font-bold text-[#066B85] capitalize">
            {tuition.tuitionType === "home" ? "Home Tutoring" : tuition.tuitionType}
          </span>

          {/* Admin Approval Status */}
          {approvalStatus === "approved" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 sm:py-1 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={13} />
              Admin: Approved
            </span>
          )}
          {approvalStatus === "pending" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 sm:py-1 text-xs font-bold text-amber-700">
              <Clock size={13} />
              Admin: Pending Approval
            </span>
          )}
          {approvalStatus === "rejected" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 sm:py-1 text-xs font-bold text-rose-700">
              <XCircle size={13} />
              Admin: Rejected
            </span>
          )}

          {/* Active Status */}
          <span
            className={`rounded-full px-2.5 py-0.5 sm:py-1 text-xs font-bold ${
              isActive
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            {isActive ? "Status: Active" : "Status: Closed"}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900">
          {tuition.title}
        </h2>

        {/* Key Highlights Grid */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 rounded-2xl bg-slate-50 p-3 sm:p-4 sm:grid-cols-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
              Class
            </span>
            <span className="text-xs font-bold text-slate-800">
              {tuition.classLevel}
            </span>
          </div>

          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
              Medium
            </span>
            <span className="text-xs font-bold text-slate-800">
              {tuition.medium || "Bangla Medium"}
            </span>
          </div>

          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
              Salary
            </span>
            <span className="text-xs font-extrabold text-[#087F9F]">
              ৳ {Number(tuition.budget).toLocaleString()}{" "}
              {tuition.negotiable ? "(Neg)" : ""}
            </span>
          </div>

          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block uppercase">
              Schedule
            </span>
            <span className="text-xs font-bold text-slate-800">
              {tuition.daysPerWeek} ({tuition.duration})
            </span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <BookOpen size={15} className="text-[#087F9F]" />
              Subject(s)
            </h3>
            <p className="mt-1 text-slate-700 bg-[#087F9F]/10 p-2 sm:p-2.5 rounded-xl border border-[#087F9F]/10 font-semibold text-xs sm:text-sm">
              {tuition.subject}
            </p>
          </div>

          {tuition.institution && (
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Building2 size={15} className="text-[#087F9F]" />
                Student&apos;s Institution
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                {tuition.institution}
              </p>
            </div>
          )}

          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <MapPin size={15} className="text-[#087F9F]" />
              Tuition Location
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {tuition.area}, {tuition.district || "Dhaka"}
              {tuition.landmark && ` (${tuition.landmark})`}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <UserCheck size={15} className="text-[#087F9F]" />
              Preferred Tutor Requirements
            </h3>
            <div className="mt-1.5 space-y-1 text-xs text-slate-600">
              <p>
                • <strong>Gender:</strong>{" "}
                {tuition.tutorGender === "Any"
                  ? "Any Gender"
                  : `${tuition.tutorGender} Tutor`}
              </p>
              {tuition.tutorUniversity && (
                <p>
                  • <strong>Preferred University:</strong>{" "}
                  {tuition.tutorUniversity}
                </p>
              )}
              {tuition.tutorDepartment && (
                <p>
                  • <strong>Department / Major:</strong>{" "}
                  {tuition.tutorDepartment}
                </p>
              )}
              {tuition.experience && (
                <p>
                  • <strong>Experience:</strong>{" "}
                  {tuition.experience}
                </p>
              )}
            </div>
          </div>

          {tuition.description && (
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Additional Instructions / Description
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 rounded-xl bg-slate-50 p-2.5 sm:p-3">
                {tuition.description}
              </p>
            </div>
          )}

          {/* Contact Box */}
          <div className="rounded-2xl border border-[#087F9F]/10 bg-[#087F9F]/10 p-3 sm:p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#044A5C] flex items-center gap-1.5">
              <Phone size={13} className="text-[#087F9F]" />
              Contact Details
            </h3>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs sm:text-sm">
              <div>
                <p className="font-bold text-slate-800">
                  {tuition.guardianName || "Guardian"} (
                  {tuition.guardianRelation || "Contact"})
                </p>
                <p className="text-xs text-slate-500">
                  {tuition.contactNumber || "Contact not provided"}
                </p>
              </div>

              <div className="flex gap-2">
                {tuition.contactNumber && (
                  <a
                    href={`tel:${tuition.contactNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#087F9F] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#066B85]"
                  >
                    <Phone size={12} />
                    Call Now
                  </a>
                )}
                {tuition.whatsapp && (
                  <a
                    href={`https://wa.me/${tuition.whatsapp.replace(/[^0-9]/g, "")}`}
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

        {/* Footer Actions */}
        <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-2 border-t border-slate-100 pt-3.5 sm:pt-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEditClick();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#087F9F]/20 bg-[#087F9F]/5 px-4 py-2 text-xs font-semibold text-[#066B85] hover:bg-[#087F9F]/10"
          >
            <Pencil size={13} />
            Edit This Circular
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
