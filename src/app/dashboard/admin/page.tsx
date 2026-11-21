import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getAllUsers, type AdminUser } from "@/lib/actions/admin-users";
import { getTuitions, type TuitionItem } from "@/lib/api/tuitions";
import { getApplicants, type Applicant } from "@/lib/api/applicants";
import { OverviewStatCard } from "@/components/dashboard/OverviewStatCard";

export const dynamic = "force-dynamic";

const formatDate = (value?: string) => {
  if (!value) return "Unknown";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const roleBadgeStyles: Record<string, string> = {
  student: "bg-violet-50 text-violet-700 ring-violet-200",
  tutor: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  admin: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default async function AdminOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in?redirectTo=/dashboard/admin");
  }

  const role = (
    (session.user as typeof session.user & { role?: string }).role ?? "student"
  ).toLowerCase();

  if (role === "student") {
    redirect("/dashboard/student");
  }

  if (role === "tutor") {
    redirect("/dashboard/tutor");
  }

  const [users, tuitions, applications] = await Promise.all([
    getAllUsers().catch(() => [] as AdminUser[]),
    getTuitions().catch(() => [] as TuitionItem[]),
    getApplicants().catch(() => [] as Applicant[]),
  ]);

  const pendingTuitions = tuitions.filter(
    (item) => (item.approvalStatus || "pending") === "pending"
  );
  const approvedTuitions = tuitions.filter(
    (item) => item.approvalStatus === "approved"
  );

  const recentPending = pendingTuitions.slice(0, 5);
  const recentUsers = [...users].slice(-5).reverse();

  const firstName = session.user.name?.split(" ")[0] || "Admin";

  const quickActions = [
    {
      href: "/dashboard/admin/users",
      title: "Manage Users",
      description: `${users.length} registered account${users.length === 1 ? "" : "s"}`,
      icon: Users,
      className:
        "border-[#087F9F]/20 bg-[#087F9F]/5 text-[#087F9F] hover:bg-[#087F9F]/10",
    },
    {
      href: "/dashboard/admin/tuitions",
      title: "Manage Tuitions",
      description: `${pendingTuitions.length} awaiting review`,
      icon: BookOpen,
      className:
        "border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F9F] to-[#066B85] text-white shadow-lg shadow-[#087F9F]/25">
            <ShieldCheck size={21} />
          </span>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              A quick overview of users, tuition posts and platform activity.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/admin/tuitions"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#087F9F]/20 transition hover:bg-[#066B85]"
        >
          <BookOpen size={16} />
          Review Tuitions
        </Link>
      </div>

      {/* Pending banner */}
      {pendingTuitions.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock size={18} />
            </span>
            <div>
              <p className="font-semibold">
                {pendingTuitions.length} tuition post
                {pendingTuitions.length === 1 ? "" : "s"} waiting for review
              </p>
              <p className="text-amber-700/90">
                Approve them so students can see and apply.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/tuitions"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-amber-600"
          >
            Review now
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <OverviewStatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          tone="teal"
          hint="Students, tutors and admins"
        />
        <OverviewStatCard
          title="Total Tuitions"
          value={tuitions.length}
          icon={BookOpen}
          tone="violet"
          hint={`${approvedTuitions.length} currently live`}
        />
        <OverviewStatCard
          title="Pending Review"
          value={pendingTuitions.length}
          icon={Clock}
          tone="amber"
          hint="Needs admin approval"
        />
        <OverviewStatCard
          title="Applications"
          value={applications.length}
          icon={FileText}
          tone="emerald"
          hint="Submitted by students"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Pending tuitions */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
              <div>
                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Pending Tuition Review
                </h2>
                <p className="text-xs text-slate-500">
                  Newest posts waiting for approval
                </p>
              </div>

              <Link
                href="/dashboard/admin/tuitions"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F9F] transition hover:text-[#066B85]"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              {recentPending.length === 0 ? (
                <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-10 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    All caught up
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    There are no tuition posts waiting for review.
                  </p>
                </div>
              ) : (
                recentPending.map((item) => (
                  <Link
                    key={item._id}
                    href="/dashboard/admin/tuitions"
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-[#087F9F]/30 hover:bg-[#087F9F]/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <BookOpen size={18} />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.title || "Untitled tuition"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {[item.subject, item.classLevel, item.area]
                            .filter(Boolean)
                            .join(" · ") || "Details not set"}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                      <Clock size={13} />
                      Pending
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Recent users */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Newest Users
                </h2>
                <p className="text-xs text-slate-500">Recently joined</p>
              </div>

              <Link
                href="/dashboard/admin/users"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F9F] transition hover:text-[#066B85]"
              >
                All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentUsers.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-500">
                  No users found.
                </p>
              ) : (
                recentUsers.map((user) => {
                  const userRole =
                    user.role === "tutor" || user.role === "admin"
                      ? user.role
                      : "student";

                  return (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#087F9F]/10 text-sm font-bold text-[#087F9F]">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {user.name || "Unknown User"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ring-1 ${roleBadgeStyles[userRole]}`}
                      >
                        {userRole}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">Quick Actions</h2>

            <div className="mt-3 space-y-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition hover:-translate-y-0.5 ${action.className}`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/70">
                      <Icon size={17} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {action.title}
                      </span>
                      <span className="block truncate text-xs opacity-80">
                        {action.description}
                      </span>
                    </span>

                    <ArrowRight size={15} className="shrink-0 opacity-70" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
