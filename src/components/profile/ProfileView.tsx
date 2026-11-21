import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  BookOpen,
  Camera,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getMyProfile } from "@/lib/actions/profile";

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

const formatDate = (value?: string) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export async function ProfileView() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const profile = await getMyProfile();

  const role = profile.role || "student";
  const currentRole = roleInfo[role] || roleInfo.student;
  const RoleIcon = currentRole.icon;

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const completenessItems = [
    { label: "full name", done: Boolean(profile.name) },
    { label: "email address", done: Boolean(profile.email) },
    { label: "phone number", done: Boolean(profile.phone) },
    { label: "address", done: Boolean(profile.address) },
    { label: "profile photo", done: Boolean(profile.image) },
  ];

  const completed = completenessItems.filter((item) => item.done).length;
  const completeness = Math.round(
    (completed / completenessItems.length) * 100
  );
  const missing = completenessItems.filter((item) => !item.done);

  const details = [
    {
      label: "Phone Number",
      value: profile.phone || "Not provided yet",
      icon: Phone,
      muted: !profile.phone,
      breakAll: false,
    },
    {
      label: "Address",
      value: profile.address || "Not provided yet",
      icon: MapPin,
      muted: !profile.address,
      breakAll: false,
    },
    {
      label: "Email Address",
      value: profile.email || "Not provided",
      icon: Mail,
      muted: !profile.email,
      breakAll: true,
    },
    {
      label: "Account Role",
      value: currentRole.label,
      icon: RoleIcon,
      muted: false,
      breakAll: false,
    },
  ];

  // Logout Server Action
  async function logout() {
    "use server";

    await auth.api.signOut({
      headers: await headers(),
    });

    redirect("/auth/sign-in");
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-700 dark:bg-[#172A35] dark:shadow-none">
        {/* Cover Section */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#087F9F] via-[#078CAE] to-[#066B85] sm:h-48 md:h-52">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[36px] border-white/10" />
          <div className="absolute -bottom-40 right-24 h-80 w-80 rounded-full border-[28px] border-white/10" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-1/3 -top-24 h-56 w-56 rounded-full bg-[#0AA3C4]/40 blur-3xl" />

          <div className="absolute left-5 top-6 text-white sm:left-8 sm:top-7">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-white/75 sm:text-[11px]">
              WELCOME TO
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
              Mentor<span className="text-white/80">Lagbe</span>
            </h2>
          </div>

          {/* Actions */}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
            <Link
              href="/profile/edit"
              title="Edit profile"
              aria-label="Edit profile"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold text-[#066B85] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-white/95 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <Pencil size={15} />
              <span>
                Edit<span className="hidden sm:inline"> Profile</span>
              </span>
            </Link>

            <form action={logout}>
              <button
                type="submit"
                title="Logout"
                aria-label="Logout"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3.5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>

        <div className="px-5 pb-8 md:px-9">
          {/* User Information Header */}
          <div className="-mt-14 w-fit">
            {/* Avatar */}
            <div className="relative shrink-0">
              {profile.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.image}
                  alt={profile.name || "Profile photo"}
                  className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-xl shadow-[#087F9F]/25 dark:border-[#172A35]"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-[#0A93B8] to-[#066B85] text-3xl font-bold text-white shadow-xl shadow-[#087F9F]/25 dark:border-[#172A35]">
                  {initials}
                </div>
              )}

              {!profile.image && (
                <span className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#087F9F] text-white shadow-md dark:border-[#172A35]">
                  <Camera size={15} />
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {profile.name || "User"}
            </h1>

            <p className="mt-1 flex items-center gap-1.5 break-all text-sm text-gray-500 dark:text-gray-400">
              <Mail size={14} className="shrink-0" />
              {profile.email || "Email not provided"}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#087F9F]/10 px-3 py-1.5 text-xs font-bold text-[#087F9F] ring-1 ring-[#087F9F]/15 dark:bg-[#087F9F]/15 dark:text-[#5BC6DC] dark:ring-[#087F9F]/30">
                <RoleIcon size={14} />
                {currentRole.label}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Active
              </span>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="mt-8 rounded-2xl border border-[#087F9F]/15 bg-gradient-to-r from-[#087F9F]/10 via-[#087F9F]/5 to-transparent p-4 sm:p-5 dark:border-[#087F9F]/25 dark:from-[#087F9F]/15 dark:via-[#087F9F]/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#087F9F] ring-1 ring-[#087F9F]/10 dark:bg-[#172A35] dark:text-[#5BC6DC] dark:ring-[#087F9F]/25">
                  <UserRound size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-white">
                    Profile completeness
                  </h3>
                  <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                    {missing.length === 0
                      ? "Your profile is complete. Nicely done!"
                      : `Add ${missing
                          .map((item) => item.label)
                          .join(", ")} to complete your profile.`}
                  </p>
                </div>
              </div>

              <span className="text-2xl font-extrabold text-[#066B85] dark:text-[#5BC6DC]">
                {completeness}%
              </span>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/70 dark:bg-[#0B141A]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#087F9F] to-[#066B85] transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="mt-8">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                Personal Information
              </h3>
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                Your basic account and contact details.
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {details.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="group rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087F9F]/40 hover:shadow-lg hover:shadow-[#087F9F]/5 sm:p-5 dark:border-gray-700 dark:bg-[#172A35] dark:hover:border-[#087F9F]/50"
                  >
                    <div className="mb-2.5 flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F] transition-colors group-hover:bg-[#087F9F] group-hover:text-white dark:bg-[#087F9F]/15 dark:text-[#5BC6DC] dark:group-hover:bg-[#087F9F] dark:group-hover:text-white">
                        <Icon size={17} />
                      </span>

                      <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {detail.label}
                      </span>
                    </div>

                    <p
                      className={`text-sm font-semibold sm:text-base ${
                        detail.muted
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-900 dark:text-white"
                      } ${detail.breakAll ? "break-all" : "break-words"}`}
                    >
                      {detail.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 dark:border-gray-700 dark:bg-[#0F1F28]">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F] dark:bg-[#087F9F]/15 dark:text-[#5BC6DC]">
                <CalendarDays size={19} />
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                  Member since
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                  {formatDate(profile.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 dark:border-gray-700 dark:bg-[#0F1F28]">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                  Account status
                </p>
                <p className="mt-0.5 text-sm font-semibold text-emerald-600 sm:text-base dark:text-emerald-400">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Role description */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gray-200 p-4 sm:p-5 dark:border-gray-700">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F] dark:bg-[#087F9F]/15 dark:text-[#5BC6DC]">
              <RoleIcon size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                {currentRole.label} on MentorLagbe
              </h3>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                {currentRole.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MentorLagbe. All rights reserved.
      </p>
    </div>
  );
}
