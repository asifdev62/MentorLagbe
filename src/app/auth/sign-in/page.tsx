
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import CurrentYear from "@/components/current-year";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      toast.success("Login successful!");

      const role = (
        data?.user as { role?: string } | undefined
      )?.role?.toLowerCase();

      const dashboardUrl =
        role === "admin"
          ? "/dashboard/admin"
          : role === "tutor"
            ? "/dashboard/tutor"
            : "/dashboard/student";

      router.push(dashboardUrl);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      setGoogleLoading(true);

      toast.loading("Connecting to Google...", {
        id: "google-signIn",
      });

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed.", {
          id: "google-signIn",
        });
        return;
      }

      if (data) {
        toast.success("Redirecting to Google...", {
          id: "google-signIn",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: "google-signIn",
      });

      console.error("Google sign-in exception:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#087F9F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#087F9F]/10 blur-3xl" />

      <div className="relative w-full max-w-[440px]">

        {/* Logo */}
        <Link
          href="/"
          className="group mb-8 flex items-center justify-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087F9F] text-white shadow-lg shadow-[#087F9F]/20 transition duration-300 group-hover:scale-105">
            <GraduationCap size={28} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-black">
            Mentor<span className="text-[#087F9F]">Lagbe</span>
          </span>
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.07)]">

          {/* Top Accent */}
          <div className="h-1.5 w-full bg-[#087F9F]" />

          <div className="px-6 py-9 sm:px-9 sm:py-10">

            {/* Heading */}
            <div className="mb-8 text-center">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
                <Sparkles size={27} />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-black">
                Welcome Back!
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in to continue your learning journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-12 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-black"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#087F9F] transition hover:text-[#06677F] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-12 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#087F9F] focus:bg-white focus:ring-4 focus:ring-[#087F9F]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#087F9F]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[#087F9F]"
                />

                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087F9F] text-sm font-bold text-white shadow-lg shadow-[#087F9F]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#06677F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google Button */}
              <button
                onClick={handleSignInWithGoogle}
                type="button"
                disabled={loading || googleLoading}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:border-[#087F9F]/40 hover:bg-[#087F9F]/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FcGoogle className="text-xl transition-transform group-hover:scale-110" />

                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </button>
            </form>

            {/* Sign Up */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-bold text-[#087F9F] transition hover:text-[#06677F] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={15} className="text-[#087F9F]" />
          Secure login powered by MentorLagbe
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-400">
          © <CurrentYear /> MentorLagbe. All rights reserved.
        </p>
      </div>
    </main>
  );
}
