import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  PlusCircle,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getMyTuitions } from "@/lib/actions/profile";
import { OverviewStatCard } from "@/components/dashboard/OverviewStatCard";

export const dynamic = "force-dynamic";

const getStatusKey = (status?: string) => {
  const value = (status || "pending").toLowerCase();

  if (value === "approved") return "approved";
  if (value === "rejected") return "rejected";

  return "pending";
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

function StatusBadge({ status }: { status?: string }) {
  const key = getStatusKey(status);

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ${statusStyles[key]}`}
    >
      {key}
    </span>
  );
}

export default async function TutorOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in?redirectTo=/dashboard/tutor");
  }

  const role = (
    (session.user as typeof session.user & { role?: string }).role ?? "student"
  ).toLowerCase();

  if (role === "student") {
    redirect("/dashboard/student");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  const tuitions = await getMyTuitions();

  const pending = tuitions.filter(
    (item) => getStatusKey(item.approvalStatus) === "pending"
  ).length;
  const approved = tuitions.filter(
    (item) => getStatusKey(item.approvalStatus) === "approved"
  ).length;
  const rejected = tuitions.filter(
    (item) => getStatusKey(item.approvalStatus) === "rejected"
  ).length;

  const totalApplicants = tuitions.reduce(
    (total, item) => total + (item.applicantCount ?? 0),
    0
  );

  const approvalRate =
    tuitions.length > 0 ? Math.round((approved / tuitions.length) * 100) : 0;

  const recent = tuitions.slice(0, 5);

  const firstName = session.user.name?.split(" ")[0] || "there";

  const quickActions = [
    {
      href: "/dashboard/tutor/add-tuition",
      title: "Post a Tuition",
      description: "Create a new tuition post",
      icon: PlusCircle,
      className:
        "border-[#087F9F]/20 bg-[#087F9F]/5 text-[#087F9F] hover:bg-[#087F9F]/10",
    },
    {
      href: "/dashboard/tutor/manage-tuition",
      title: "Manage Tuitions",
      description: "Edit or close your posts",
      icon: BookOpen,
      className:
        "border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100",
    },
    {
      href: "/dashboard/tutor/applicants",
      title: "Applicants",
      description: "Review student applications",
      icon: Users,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    },
    {
      href: "/profile",
      title: "My Profile",
      description: "Keep your details updated",
      icon: UserRound,
      className:
        "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F9F] to-[#066B85] text-white shadow-lg shadow-[#087F9F]/25">
            <BookOpen size={21} />
          </span>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Track your tuition posts, approvals and student applications.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/tutor/add-tuition"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#087F9F]/20 transition hover:bg-[#066B85]"
        >
          <PlusCircle size={16} />
          Post a Tuition
        </Link>
      </div>

      {/* Approval info */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <ShieldCheck size={18} />
        </span>
        <div>
          <p className="font-semibold">Admin approval required</p>
          <p className="mt-0.5 text-amber-700/90">
            A tuition post goes live on the public browse page only after an
            admin approves it. Pending posts stay private until then.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <OverviewStatCard
          title="Total Posts"
          value={tuitions.length}
          icon={Layers}
          tone="teal"
          hint={`${totalApplicants} total applicant${totalApplicants === 1 ? "" : "s"}`}
        />
        <OverviewStatCard
          title="Pending"
          value={pending}
          icon={Clock}
          tone="amber"
          hint="Waiting for admin approval"
        />
        <OverviewStatCard
          title="Approved"
          value={approved}
          icon={CheckCircle2}
          tone="emerald"
          hint="Live on the browse page"
        />
        <OverviewStatCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          tone="rose"
          hint="Needs your attention"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent posts */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
              <div>
                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Recent Tuition Posts
                </h2>
                <p className="text-xs text-slate-500">
                  Your latest {recent.length || 0} post
                  {recent.length === 1 ? "" : "s"}
                </p>
              </div>

              <Link
                href="/dashboard/tutor/manage-tuition"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F9F] transition hover:text-[#066B85]"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              {recent.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
                    <BookOpen size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    No tuition posts yet
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Create your first tuition post and reach more students.
                  </p>
                  <Link
                    href="/dashboard/tutor/add-tuition"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#087F9F] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#066B85]"
                  >
                    Post a tuition
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                recent.map((item) => (
                  <Link
                    key={item._id}
                    href="/dashboard/tutor/manage-tuition"
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-[#087F9F]/30 hover:bg-[#087F9F]/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
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

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden items-center gap-1 text-xs font-semibold text-[#066B85] sm:inline-flex">
                        <Wallet size={13} />
                        {item.budget
                          ? `৳${Number(item.budget).toLocaleString("en-BD")}`
                          : "Negotiable"}
                      </span>

                      <StatusBadge status={item.approvalStatus} />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Approval rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Approval Rate
                </h2>
                <p className="text-xs text-slate-500">
                  How many posts went live
                </p>
              </div>
              <span className="text-2xl font-extrabold text-[#066B85]">
                {approvalRate}%
              </span>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#087F9F] to-[#066B85]"
                style={{ width: `${approvalRate}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {approved} approved out of {tuitions.length} total post
              {tuitions.length === 1 ? "" : "s"}.
            </p>
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
