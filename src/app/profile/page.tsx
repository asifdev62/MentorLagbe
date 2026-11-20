
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  UserRound,
  Mail,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Pencil,
} from "lucide-react";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold">Please Login</h2>
          <p className="text-gray-500">
            You need to login to view your profile.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user;

  const role =
    (user as typeof user & { role?: string }).role || "student";

  const roleInfo: Record<
    string,
    { label: string; description: string; icon: React.ElementType }
  > = {
    student: {
      label: "Student",
      description: "Find tuition opportunities and manage applications.",
      icon: GraduationCap,
    },
    tutor: {
      label: "Tutor",
      description: "Manage your tuition posts and student applications.",
      icon: BookOpen,
    },
    admin: {
      label: "Administrator",
      description: "Manage and monitor the MentorLagbe platform.",
      icon: ShieldCheck,
    },
  };

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
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#0B141A]">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#172A35]">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-cyan-600 to-blue-700" />

          <div className="px-6 pb-8">

            {/* Avatar and Role */}
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 dark:border-[#172A35] dark:bg-[#293F50] dark:text-white">
                  {initials}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium capitalize text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <RoleIcon size={17} />
                {currentRole.label}
              </span>
            </div>

            {/* Role Description */}
            <div className="mt-7 rounded-xl bg-gray-50 p-4 dark:bg-[#293F50]">
              <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                <RoleIcon size={19} />
                {currentRole.label} Account
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {currentRole.description}
              </p>
            </div>

            {/* Personal Information */}
            <div className="mt-8">
              <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                Personal Information
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <UserRound size={17} />
                    Full Name
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={17} />
                    Email Address
                  </div>
                  <p className="break-all font-semibold text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <ShieldCheck size={17} />
                    Account Role
                  </div>
                  <p className="font-semibold capitalize text-gray-900 dark:text-white">
                    {currentRole.label}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <ShieldCheck size={17} />
                    Account Status
                  </div>
                  <p className="font-semibold text-green-600">
                    Active
                  </p>
                </div>

              </div>
            </div>

            {/* Edit Profile */}
            <div className="mt-8 flex justify-end">
              <Link
                href="/profile/edit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Pencil size={17} />
                Edit Profile
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
