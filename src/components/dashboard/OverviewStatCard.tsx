import type { LucideIcon } from "lucide-react";

export type OverviewStatTone =
  | "teal"
  | "violet"
  | "amber"
  | "emerald"
  | "rose";

const tones: Record<
  OverviewStatTone,
  { card: string; label: string; chip: string; value: string }
> = {
  teal: {
    card: "border-[#087F9F]/15 bg-gradient-to-br from-[#087F9F]/10 via-white to-white",
    label: "text-[#066B85]",
    chip: "bg-[#087F9F] text-white shadow-sm shadow-[#087F9F]/30",
    value: "text-[#066B85]",
  },
  violet: {
    card: "border-violet-100 bg-gradient-to-br from-violet-50 via-white to-white",
    label: "text-violet-700",
    chip: "bg-violet-500 text-white shadow-sm shadow-violet-500/30",
    value: "text-violet-700",
  },
  amber: {
    card: "border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white",
    label: "text-amber-700",
    chip: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
    value: "text-amber-700",
  },
  emerald: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white",
    label: "text-emerald-700",
    chip: "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30",
    value: "text-emerald-700",
  },
  rose: {
    card: "border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white",
    label: "text-rose-700",
    chip: "bg-rose-500 text-white shadow-sm shadow-rose-500/30",
    value: "text-rose-700",
  },
};

export function OverviewStatCard({
  title,
  value,
  icon: Icon,
  tone,
  hint,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  tone: OverviewStatTone;
  hint?: string;
}) {
  const style = tones[tone];

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${style.card}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className={`truncate text-[11px] font-bold tracking-wider uppercase ${style.label}`}
          >
            {title}
          </p>
          <p
            className={`mt-2 text-2xl font-extrabold tracking-tight ${style.value}`}
          >
            {value}
          </p>
        </div>

        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.chip}`}
        >
          <Icon size={19} />
        </span>
      </div>

      {hint && (
        <p className="mt-2 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}
