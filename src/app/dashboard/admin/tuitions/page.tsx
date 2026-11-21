import { BookOpen, Clock } from "lucide-react";
import { connection } from "next/server";

import { getTuitions } from "@/lib/api/tuitions";
import TuitionsClient from "./TuitionsClient";

export const instant = false;

export default async function AdminTuitionsPage() {
  await connection();

  const tuitions = await getTuitions();

  const pending = tuitions.filter(
    (item) => (item.approvalStatus || "pending") === "pending"
  ).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F9F] to-[#066B85] text-white shadow-lg shadow-[#087F9F]/25">
            <BookOpen size={21} />
          </span>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
              Manage Tuitions
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Review and moderate every tuition post submitted by tutors.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/5 px-3.5 py-1.5 text-xs font-semibold text-[#066B85]">
            {tuitions.length} total posts
          </span>

          {pending > 0 && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700">
              <Clock size={13} />
              {pending} awaiting review
            </span>
          )}
        </div>
      </div>

      <TuitionsClient initialTuitions={tuitions} />
    </div>
  );
}
