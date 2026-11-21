"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import {
  updateMyProfile,
  type ProfileUser,
} from "@/lib/actions/profile";

type Props = {
  profile: ProfileUser;
};

export default function EditProfileForm({ profile }: Props) {
  const router = useRouter();

  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");
  const [image, setImage] = useState(profile.image || "");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    toast.loading("Saving your profile...", { id: "profile-update" });

    startTransition(async () => {
      try {
        const result = await updateMyProfile({
          name,
          phone,
          address,
          image,
        });

        if (result.success) {
          toast.success(
            result.message || "Profile updated successfully!",
            { id: "profile-update" }
          );

          router.push("/profile");
          router.refresh();
          return;
        }

        setMessage(result.message);
        setIsError(true);

        toast.error(result.message || "Failed to update profile.", {
          id: "profile-update",
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.";

        setMessage(message);
        setIsError(true);

        toast.error(message, { id: "profile-update" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 dark:bg-[#0B141A] md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-7">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-[#087F9F]/50 hover:text-[#087F9F] dark:border-gray-700 dark:bg-[#172A35] dark:text-gray-300 dark:hover:border-[#087F9F]/60 dark:hover:text-[#5BC6DC]"
          >
            <ArrowLeft size={17} />
            Back to Profile
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#087F9F]/10 px-3 py-1.5 text-xs font-semibold text-[#087F9F] dark:bg-[#087F9F]/15 dark:text-[#5BC6DC]">
            <UserRound size={13} />
            Edit profile
          </span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Update your information
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Change your name, phone number, address and profile picture.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm shadow-gray-200/60 dark:border-gray-700 dark:bg-[#172A35] dark:shadow-none"
        >
          {/* Cover */}
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#087F9F] via-[#078CAE] to-[#066B85] md:h-36">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
            <div className="absolute -bottom-24 right-20 h-52 w-52 rounded-full border-[20px] border-white/10" />
          </div>

          <div className="px-5 pb-7 md:px-8">
            {/* Avatar preview */}
            <div className="-mt-12 mb-7 flex flex-wrap items-end gap-4">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="Profile preview"
                  className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-lg shadow-[#087F9F]/20 dark:border-[#172A35]"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-[#0A93B8] to-[#066B85] text-2xl font-bold text-white shadow-lg shadow-[#087F9F]/20 dark:border-[#172A35]">
                  {initials}
                </div>
              )}

              <div className="pb-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Profile picture
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Paste a public image URL to update your photo.
                </p>
              </div>
            </div>

            {message && (
              <div
                className={`mb-6 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
                  isError
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {isError ? (
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                )}
                {message}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <label className="sm:col-span-2">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <UserRound size={15} className="text-[#087F9F]" />
                  Full Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Your full name"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10 dark:border-gray-700 dark:bg-[#0F1F28] dark:text-white"
                />
              </label>

              {/* Email (read only) */}
              <label>
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <Mail size={15} className="text-[#087F9F]" />
                  Email Address
                </span>
                <input
                  type="email"
                  value={profile.email || ""}
                  readOnly
                  disabled
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-3.5 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-[#0F1F28] dark:text-gray-400"
                />
                <span className="mt-1 block text-xs text-gray-400">
                  Email cannot be changed here.
                </span>
              </label>

              {/* Phone */}
              <label>
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <Phone size={15} className="text-[#087F9F]" />
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={30}
                  placeholder="+880 1XXX XXXXXX"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10 dark:border-gray-700 dark:bg-[#0F1F28] dark:text-white"
                />
              </label>

              {/* Address */}
              <label className="sm:col-span-2">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <MapPin size={15} className="text-[#087F9F]" />
                  Address
                </span>
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="House, road, area, city"
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10 dark:border-gray-700 dark:bg-[#0F1F28] dark:text-white"
                />
              </label>

              {/* Image URL */}
              <label className="sm:col-span-2">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <Camera size={15} className="text-[#087F9F]" />
                  Profile Image URL
                </span>
                <input
                  type="url"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10 dark:border-gray-700 dark:bg-[#0F1F28] dark:text-white"
                />
              </label>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6 dark:border-gray-700">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#087F9F]/20 transition hover:-translate-y-0.5 hover:bg-[#066B85] hover:shadow-xl hover:shadow-[#087F9F]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#172A35] dark:text-gray-300 dark:hover:bg-[#0F1F28]"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
