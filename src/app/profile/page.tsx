import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  UserRound,
  Mail,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  LogOut,
  Pencil,
  Sparkles,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

const roleInfo: Record<
  string,
  {
    label: string;
    description: string;
    icon: typeof GraduationCap;
  }
> = {
  student: {
    label: "Student",
    description: "Find the right tutor and manage your tuition applications.",
    icon: GraduationCap,
  },
  tutor: {
    label: "Tutor",
    description: "Manage your tuition posts and connect with students.",
    icon: BookOpen,
  },
  admin: {
    label: "Administrator",
    description: "Manage users, tuition posts and platform activities.",
    icon: ShieldCheck,
  },
};

// Logout Server Action
async function logout() {
  "use server";

  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/login");
}

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const role = (user as typeof user & { role?: string }).role || "student";

  const currentRole = roleInfo[role] || roleInfo.student;
  const RoleIcon = currentRole.icon;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const infoCards = [
    {
      label: "Full Name",
      value: user.name || "Not provided",
      icon: UserRound,
      breakAll: false,
    },
    {
      label: "Email Address",
      value: user.email ?? "Not provided",
      icon: Mail,
      breakAll: true,
    },
    {
      label: "Account Role",
      value: currentRole.label,
      icon: ShieldCheck,
      breakAll: false,
      capitalize: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 dark:bg-[#0B141A] md:px-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-7">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/dashboard/${role}`}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-[#087F9F]/50 hover:text-[#087F9F] dark:border-gray-700 dark:bg-[#172A35] dark:text-gray-300 dark:hover:border-[#087F9F]/60 dark:hover:text-[#5BC6DC]"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950"
            >
              <LogOut size={17} />
              Logout
            </button>
          </form>
        </div>

        {/* Page Heading */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#087F9F] dark:text-[#5BC6DC]">
            <Sparkles size={16} />
            MENTORLAGBE ACCOUNT
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            View and manage your personal account information.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm shadow-gray-200/60 dark:border-gray-700 dark:bg-[#172A35] dark:shadow-none">
          {/* Cover Section */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#087F9F] via-[#078CAE] to-[#066B85] md:h-56">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[36px] border-white/10" />
            <div className="absolute -bottom-40 right-24 h-80 w-80 rounded-full border-[28px] border-white/10" />
            <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute left-1/3 -top-24 h-56 w-56 rounded-full bg-[#0AA3C4]/40 blur-3xl" />

            <div className="absolute left-6 top-6 text-white md:left-10 md:top-9">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-white/80">
                WELCOME TO
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
                Mentor<span className="text-white/80">Lagbe</span>
              </h2>
            </div>

            <div className="absolute right-6 bottom-6 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:inline-flex md:right-10">
              <Sparkles size={14} />
              Member Account
            </div>
          </div>

          <div className="px-5 pb-8 md:px-10">
            {/* User Information Header */}
            <div className="-mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-wrap items-end gap-4">
                {/* Avatar */}
                <div className="flex h-28 w-28 items-center justify-center rounded-[28px] border-4 border-white bg-gradient-to-br from-[#0A93B8] to-[#066B85] text-3xl font-bold text-white shadow-xl shadow-[#087F9F]/25 dark:border-[#172A35]">
                  {initials}
                </div>

                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#087F9F]/10 px-3 py-1.5 text-xs font-bold text-[#087F9F] ring-1 ring-[#087F9F]/15 dark:bg-[#087F9F]/15 dark:text-[#5BC6DC] dark:ring-[#087F9F]/30">
                    <RoleIcon size={15} />
                    {currentRole.label}
                  </div>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#087F9F]/20 transition hover:-translate-y-0.5 hover:bg-[#066B85] hover:shadow-xl hover:shadow-[#087F9F]/25 active:translate-y-0"
              >
                <Pencil size={16} />
                Edit Profile
              </Link>
            </div>

            {/* Welcome Message */}
            <div className="mt-9 rounded-2xl border border-[#087F9F]/15 bg-gradient-to-r from-[#087F9F]/10 via-[#087F9F]/5 to-transparent p-5 dark:border-[#087F9F]/25 dark:from-[#087F9F]/15 dark:via-[#087F9F]/10">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#087F9F] ring-1 ring-[#087F9F]/10 dark:bg-[#172A35] dark:text-[#5BC6DC] dark:ring-[#087F9F]/25">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Welcome back, {user.name?.split(" ")[0] || "User"}!
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {currentRole.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mt-9">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your basic account details.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {infoCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.label}
                      className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087F9F]/40 hover:shadow-lg hover:shadow-[#087F9F]/5 dark:border-gray-700 dark:bg-[#172A35] dark:hover:border-[#087F9F]/50"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F] transition-colors group-hover:bg-[#087F9F] group-hover:text-white dark:bg-[#087F9F]/15 dark:text-[#5BC6DC] dark:group-hover:bg-[#087F9F] dark:group-hover:text-white">
                          <Icon size={18} />
                        </span>

                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {card.label}
                        </span>
                      </div>

                      <p
                        className={`font-semibold text-gray-900 dark:text-white ${
                          card.breakAll ? "break-all" : "break-words"
                        } ${card.capitalize ? "capitalize" : ""}`}
                      >
                        {card.value}
                      </p>
                    </div>
                  );
                })}

                {/* Account Status */}
                <div className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-gray-700 dark:bg-[#172A35] dark:hover:border-emerald-500/50">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <CheckCircle2 size={18} />
                    </span>

                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Account Status
                    </span>
                  </div>

                  <p className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-700 dark:bg-[#0F1F28]">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F] dark:bg-[#087F9F]/15 dark:text-[#5BC6DC]">
                <CalendarDays size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Your MentorLagbe Account
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  You are using MentorLagbe as a{" "}
                  {currentRole.label.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="pb-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
