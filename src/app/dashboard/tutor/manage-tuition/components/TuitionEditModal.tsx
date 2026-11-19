"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Pencil, Save, X } from "lucide-react";
import type { TuitionItem } from "@/lib/api/tuitions";
import { updateTuition } from "@/lib/actions/tuitions";

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

type TuitionEditModalProps = {
  tuition: TuitionItem;
  onClose: () => void;
  onSuccess: (updated: TuitionItem) => void;
};

export function TuitionEditModal({
  tuition,
  onClose,
  onSuccess,
}: TuitionEditModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const id = (tuition._id || tuition.id) as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedData: TuitionItem = {
      ...tuition,
      title: String(formData.get("title") || "").trim(),
      classLevel: String(formData.get("classLevel") || tuition.classLevel),
      medium: String(formData.get("medium") || tuition.medium),
      subject: String(formData.get("subject") || "").trim(),
      tuitionType: String(formData.get("tuitionType") || tuition.tuitionType),
      area: String(formData.get("area") || "").trim(),
      landmark: String(formData.get("landmark") || "").trim(),
      daysPerWeek: String(formData.get("daysPerWeek") || tuition.daysPerWeek),
      duration: String(formData.get("duration") || tuition.duration),
      preferredTime: String(formData.get("preferredTime") || tuition.preferredTime),
      budget: Number(formData.get("budget") || 0),
      negotiable: formData.has("negotiable"),
      tutorGender: String(formData.get("tutorGender") || "Any"),
      experience: String(formData.get("experience") || "1+ years"),
      description: String(formData.get("description") || "").trim(),
      contactNumber: String(formData.get("contactNumber") || "").trim(),
    };

    try {
      setIsSaving(true);
      await updateTuition(id, updatedData);
      toast.success("Tuition post updated successfully!");
      onSuccess(updatedData);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update tuition. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-lg md:max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 sm:space-y-4">
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
              defaultValue={tuition.title}
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
                  defaultValue={tuition.classLevel}
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
                  defaultValue={tuition.medium || "Bangla Medium"}
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
                defaultValue={tuition.subject}
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
                  defaultValue={tuition.tuitionType}
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
                defaultValue={tuition.area}
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
                defaultValue={tuition.landmark || ""}
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
                  defaultValue={tuition.daysPerWeek || "3 days"}
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
                  defaultValue={tuition.duration || "1.5 hours"}
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
                  defaultValue={tuition.preferredTime || "Evening (5:00 PM - 8:00 PM)"}
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
                defaultValue={tuition.budget}
                className={inputClass}
              />
              <label className="mt-1.5 flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                <input
                  type="checkbox"
                  name="negotiable"
                  defaultChecked={tuition.negotiable}
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
                defaultValue={tuition.contactNumber || ""}
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
              defaultValue={tuition.description || ""}
              className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-2.5 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Save size={14} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
