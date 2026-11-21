"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Mail,
  CalendarDays,
  X,
} from "lucide-react";
import type { AdminUser } from "@/lib/actions/admin-users";

type Props = {
  initialUsers: AdminUser[];
};

type RoleKey = "all" | "student" | "tutor" | "admin";

const roleStyles: Record<
  Exclude<RoleKey, "all">,
  { label: string; icon: typeof Users; badge: string; avatar: string; dot: string }
> = {
  student: {
    label: "Student",
    icon: GraduationCap,
    badge:
      "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30",
    avatar: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
  },
  tutor: {
    label: "Tutor",
    icon: BookOpen,
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    avatar: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    avatar: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
};

const filterTabs: { key: RoleKey; label: string }[] = [
  { key: "all", label: "All Users" },
  { key: "student", label: "Students" },
  { key: "tutor", label: "Tutors" },
  { key: "admin", label: "Admins" },
];

function getRole(user: AdminUser): Exclude<RoleKey, "all"> {
  return user.role === "tutor" || user.role === "admin" ? user.role : "student";
}

export default function UsersClient({ initialUsers }: Props) {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleKey>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || getRole(user) === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const students = users.filter((user) => getRole(user) === "student").length;
  const tutors = users.filter((user) => getRole(user) === "tutor").length;
  const admins = users.filter((user) => getRole(user) === "admin").length;

  const countFor = (key: RoleKey) => {
    if (key === "all") return users.length;
    if (key === "student") return students;
    if (key === "tutor") return tutors;
    return admins;
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={users.length}
          total={users.length}
          icon={<Users size={18} />}
          tone="teal"
          caption="Registered"
        />
        <StatCard
          title="Students"
          value={students}
          total={users.length}
          icon={<GraduationCap size={18} />}
          tone="violet"
          caption="Learning"
        />
        <StatCard
          title="Tutors"
          value={tutors}
          total={users.length}
          icon={<BookOpen size={18} />}
          tone="emerald"
          caption="Teaching"
        />
        <StatCard
          title="Admins"
          value={admins}
          total={users.length}
          icon={<ShieldCheck size={18} />}
          tone="amber"
          caption="Managing"
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
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {filteredUsers.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{users.length}</span>{" "}
          users
        </p>
      </div>

      {/* User Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            User Directory
          </h2>
          <span className="rounded-full bg-[#087F9F]/10 px-3 py-1 text-xs font-semibold text-[#087F9F]">
            {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] tracking-wider text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold sm:px-5">User</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => {
                const role = getRole(user);
                const style = roleStyles[role];
                const RoleIcon = style.icon;

                return (
                  <tr
                    key={user._id}
                    className="group transition hover:bg-[#087F9F]/5"
                  >
                    <td className="px-4 py-3.5 sm:px-5">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                          />
                        ) : (
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${style.avatar}`}
                          >
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {user.name || "Unknown User"}
                          </p>
                          <p className="text-xs text-slate-400 capitalize">
                            {style.label}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail size={14} className="shrink-0 text-slate-400" />
                        {user.email}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        <RoleIcon size={12} />
                        {style.label}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-slate-400"
                        />
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-4 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
              <Users size={22} />
            </div>
            <h3 className="font-semibold text-slate-900">No users found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search term or role filter.
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
  violet: {
    card: "border-violet-100 bg-gradient-to-br from-violet-50 via-white to-white",
    label: "text-violet-700",
    chip: "bg-violet-500 text-white shadow-sm shadow-violet-500/30",
    value: "text-violet-700",
    track: "bg-violet-100",
    bar: "bg-violet-500",
  },
  emerald: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white",
    label: "text-emerald-700",
    chip: "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30",
    value: "text-emerald-700",
    track: "bg-emerald-100",
    bar: "bg-emerald-500",
  },
  amber: {
    card: "border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white",
    label: "text-amber-700",
    chip: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
    value: "text-amber-700",
    track: "bg-amber-100",
    bar: "bg-amber-500",
  },
};

function StatCard({
  title,
  value,
  total,
  icon,
  tone,
  caption,
}: {
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  tone: Tone;
  caption: string;
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
          {percent}% · {caption}
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
