
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  // Get user role
  const role = (user as typeof user & {
    role?: string;
  })?.role?.toLowerCase();

  // Dashboard URL based on role
  const dashboardUrl =
    role === "admin"
      ? "/dashboard/admin"
      : role === "tutor"
        ? "/dashboard/tutor"
        : "/dashboard/student";

  // User initial
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  // Sign Out
  const handleSignOut = async () => {
    try {
      setLoggingOut(true);

      await authClient.signOut();

      setProfileOpen(false);
      setIsOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <GraduationCap size={26} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mentor<span className="text-blue-600">Lagbe</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-3 md:flex">

          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (

            /* Logged In User */
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-blue-700">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>

                <div className="text-left">
                  <p className="max-w-28 truncate text-sm font-bold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-xs font-semibold capitalize text-blue-600">
                    {role || "User"}
                  </p>
                </div>

                <ChevronDown size={16} className="text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">

                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href={dashboardUrl}
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <UserRound size={18} />
                    Update Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>

          ) : (

            /* Logged Out User */
            <>
              <Link
                href="/auth/sign-in"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg md:hidden">

          <div className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 border-t border-slate-100 pt-4">

              {isPending ? (
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
              ) : user ? (

                <div className="space-y-3">

                  <div className="flex items-center gap-3 px-2">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-blue-700">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      ) : initial}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {user.name}
                      </p>
                      <p className="text-xs font-semibold capitalize text-blue-600">
                        {role || "User"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardUrl}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50"
                  >
                    <UserRound size={18} />
                    Update Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Signing Out..." : "Sign Out"}
                  </button>

                </div>

              ) : (

                <div className="flex gap-3">
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>

              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
