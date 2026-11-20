
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

  const role =
    (user as typeof user & { role?: string }).role || "student";

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

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 dark:bg-[#0B141A] md:px-8 md:py-12">

      <div className="mx-auto max-w-5xl space-y-7">

        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <Link
            href={`/dashboard/${role}`}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-700 dark:bg-[#172A35] dark:text-gray-300"
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
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-600">
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
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#172A35]">

          {/* Cover Section */}
          <div className="relative h-44 overflow-hidden bg-gradient-to-r from-[#087E9D] via-[#0D91B5] to-[#145B91] md:h-52">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[30px] border-white/10" />
            <div className="absolute -bottom-32 right-40 h-64 w-64 rounded-full border-[25px] border-white/10" />

            <div className="absolute left-6 top-6 text-white/90 md:left-10 md:top-9">
              <p className="text-xs font-semibold tracking-[0.25em]">
                WELCOME TO
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                MentorLagbe
              </h2>
            </div>
          </div>

          <div className="px-5 pb-8 md:px-10">

            {/* User Information Header */}
            <div className="-mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              <div className="flex flex-wrap items-end gap-4">

                {/* Avatar */}
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-[5px] border-white bg-gradient-to-br from-cyan-500 to-blue-700 text-3xl font-bold text-white shadow-lg dark:border-[#172A35]">
                  {initials}
                </div>

                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                    <RoleIcon size={15} />
                    {currentRole.label}
                  </div>
                </div>

              </div>

              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087E9D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066780]"
              >
                <Pencil size={16} />
                Edit Profile
              </Link>

            </div>

            {/* Welcome Message */}
            <div className="mt-9 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-5 dark:border-cyan-900/40 dark:bg-[#203C48]">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-cyan-600 dark:bg-[#172A35]">
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

                {/* Full Name */}
                <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-700">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <UserRound size={18} className="text-cyan-600" />
                    Full Name
                  </div>

                  <p className="break-words font-semibold text-gray-900 dark:text-white">
                    {user.name || "Not provided"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-700">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Mail size={18} className="text-cyan-600" />
                    Email Address
                  </div>

                  <p className="break-all font-semibold text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-700">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <ShieldCheck size={18} className="text-cyan-600" />
                    Account Role
                  </div>

                  <p className="font-semibold capitalize text-gray-900 dark:text-white">
                    {currentRole.label}
                  </p>
                </div>

                {/* Account Status */}
                <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-700">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle2 size={18} className="text-green-600" />
                    Account Status
                  </div>

                  <p className="flex items-center gap-2 font-semibold text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Active
                  </p>
                </div>

              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3 text-gray-600 dark:bg-[#293F50] dark:text-gray-300">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Your MentorLagbe Account
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You are using MentorLagbe as a {currentRole.label.toLowerCase()}.
                  </p>
                </div>
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
