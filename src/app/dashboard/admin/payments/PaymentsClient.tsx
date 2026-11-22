"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  GraduationCap,
  Hash,
  Mail,
  Receipt,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";

import type { AdminPayment } from "@/lib/actions/payments";

type Props = {
  initialPayments: AdminPayment[];
};

type RoleKey = "all" | "student" | "tutor" | "admin";

const roleStyles: Record<
  Exclude<RoleKey, "all">,
  { label: string; icon: typeof Users; badge: string; avatar: string }
> = {
  student: {
    label: "Student",
    icon: GraduationCap,
    badge:
      "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    avatar: "bg-violet-100 text-violet-700",
  },
  tutor: {
    label: "Tutor",
    icon: BookOpen,
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    avatar: "bg-emerald-100 text-emerald-700",
  },
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    avatar: "bg-amber-100 text-amber-700",
  },
};

const filterTabs: { key: RoleKey; label: string }[] = [
  { key: "all", label: "All Payments" },
  { key: "student", label: "Students" },
  { key: "tutor", label: "Tutors" },
  { key: "admin", label: "Admins" },
];

function getRole(payment: AdminPayment): Exclude<RoleKey, "all"> {
  const role = (payment.role || "").toLowerCase();
  return role === "tutor" || role === "admin" ? role : "student";
}

const currencySymbols: Record<string, string> = {
  bdt: "৳",
  usd: "$",
  eur: "€",
  gbp: "£",
  inr: "₹",
};

function formatAmount(amount: number | null, currency: string | null) {
  if (amount == null) return "—";

  const value = amount / 100;
  const code = (currency || "bdt").toLowerCase();
  const symbol = currencySymbols[code];

  const formatted = value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  return symbol ? `${symbol}${formatted}` : `${code.toUpperCase()} ${formatted}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PaymentsClient({ initialPayments }: Props) {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleKey>("all");

  const filteredPayments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !term ||
        payment.userName?.toLowerCase().includes(term) ||
        payment.email?.toLowerCase().includes(term) ||
        payment.transactionId?.toLowerCase().includes(term) ||
        payment.planName?.toLowerCase().includes(term) ||
        payment.sessionId?.toLowerCase().includes(term);

      const matchesRole =
        roleFilter === "all" || getRole(payment) === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [payments, search, roleFilter]);

  const stats = useMemo(() => {
    const revenue = payments.reduce(
      (sum, payment) => sum + (payment.amount ?? 0),
      0
    );

    const currency =
      payments.find((payment) => payment.currency)?.currency ?? "bdt";

    const uniqueUsers = new Set(
      payments.map(
        (payment) => payment.userId || payment.email || payment._id
      )
    ).size;

    const students = new Set(
      payments
        .filter((payment) => payment.plan === "student")
        .map((payment) => payment.userId || payment.email || payment._id)
    ).size;

    const tutors = new Set(
      payments
        .filter((payment) => payment.plan === "tutor")
        .map((payment) => payment.userId || payment.email || payment._id)
    ).size;

    return { revenue, currency, uniqueUsers, students, tutors };
  }, [payments]);

  const countFor = (key: RoleKey) => {
    if (key === "all") return payments.length;
    return payments.filter((payment) => getRole(payment) === key).length;
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatAmount(stats.revenue, stats.currency)}
          icon={<Wallet size={18} />}
          tone="teal"
          caption="Collected"
        />
        <StatCard
          title="Total Payments"
          value={String(payments.length)}
          icon={<Receipt size={18} />}
          tone="violet"
          caption="Transactions"
        />
        <StatCard
          title="Premium Students"
          value={String(stats.students)}
          icon={<GraduationCap size={18} />}
          tone="emerald"
          caption="Student plans"
        />
        <StatCard
          title="Premium Tutors"
          value={String(stats.tutors)}
          icon={<BookOpen size={18} />}
          tone="amber"
          caption="Tutor plans"
        />
      </div>

      {/* Search and Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name, email or transaction ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-10 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setRoleFilter(tab.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 transition ${
                  roleFilter === tab.key
                    ? "bg-white font-bold text-[#087F9F] shadow-sm"
                    : "hover:text-slate-900"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    roleFilter === tab.key
                      ? "bg-[#087F9F]/10 text-[#087F9F]"
                      : "bg-slate-200/70 text-slate-500"
                  }`}
                >
                  {countFor(tab.key)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredPayments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {payments.length}
          </span>{" "}
          payments ·{" "}
          <span className="font-semibold text-slate-700">
            {stats.uniqueUsers}
          </span>{" "}
          premium user{stats.uniqueUsers === 1 ? "" : "s"}
        </p>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            <CreditCard size={17} className="text-[#087F9F]" />
            Payment Records
          </h2>
          <span className="rounded-full bg-[#087F9F]/10 px-3 py-1 text-xs font-semibold text-[#087F9F]">
            {filteredPayments.length}{" "}
            {filteredPayments.length === 1 ? "payment" : "payments"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] tracking-wider text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold sm:px-5">User Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Plan Name</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Transaction ID</th>
                <th className="px-4 py-3 font-semibold">Payment Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const role = getRole(payment);
                const style = roleStyles[role];
                const RoleIcon = style.icon;
                const isTutorPlan = payment.plan === "tutor";

                return (
                  <tr
                    key={payment._id}
                    className="group transition hover:bg-[#087F9F]/5"
                  >
                    <td className="px-4 py-3.5 sm:px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${style.avatar}`}
                        >
                          {payment.userName?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {payment.userName || "Unknown user"}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Premium member
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail size={14} className="shrink-0 text-slate-400" />
                        {payment.email || "—"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style.badge}`}
                      >
                        <RoleIcon size={12} />
                        {style.label}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isTutorPlan
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-violet-50 text-violet-700 ring-1 ring-violet-200"
                        }`}
                      >
                        {isTutorPlan ? (
                          <BookOpen size={12} />
                        ) : (
                          <GraduationCap size={12} />
                        )}
                        {payment.planName || (isTutorPlan ? "Tutor Pro" : "Student Premium")}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-bold text-slate-900">
                        {formatAmount(payment.amount, payment.currency)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex max-w-[190px] items-center gap-1.5 truncate font-mono text-[11px] text-slate-500"
                        title={payment.transactionId || undefined}
                      >
                        <Hash size={13} className="shrink-0 text-slate-400" />
                        <span className="truncate">
                          {payment.transactionId || "—"}
                        </span>
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-slate-400"
                        />
                        {formatDate(payment.paymentDate)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="px-4 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
              <CreditCard size={22} />
            </div>
            <h3 className="font-semibold text-slate-900">
              {payments.length === 0 ? "No payments yet" : "No matching payments"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {payments.length === 0
                ? "Completed student and tutor Stripe payments will appear here."
                : "Try a different search term or role filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type Tone = "teal" | "violet" | "emerald" | "amber";

const tones: Record<
  Tone,
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
  emerald: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white",
    label: "text-emerald-700",
    chip: "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30",
    value: "text-emerald-700",
  },
  amber: {
    card: "border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white",
    label: "text-amber-700",
    chip: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
    value: "text-amber-700",
  },
};

function StatCard({
  title,
  value,
  icon,
  tone,
  caption,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone: Tone;
  caption: string;
}) {
  const style = tones[tone];

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${style.card}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-[10px] font-bold tracking-wider uppercase sm:text-[11px] ${style.label}`}
          >
            {title}
          </p>
          <p className={`mt-2 text-xl font-extrabold sm:text-2xl ${style.value}`}>
            {value}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">{caption}</p>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.chip}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}
