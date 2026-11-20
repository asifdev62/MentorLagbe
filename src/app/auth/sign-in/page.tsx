
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
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

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

      const role = (data?.user as { role?: string } | undefined)?.role?.toLowerCase();

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
      toast.loading("Connecting to Google...", {
        id: "google-signIn",
      });

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign-In failed.", {
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

      console.error("Google sign-In exception:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-7">
          <div className="bg-[#087E9D] text-white p-2 rounded-xl shadow-md shadow-[#087E9D]/20">
            <GraduationCap size={25} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mentor<span className="text-[#087E9D]">Lagbe</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">

          {/* Heading */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex items-center justify-center w-11 h-11 rounded-xl bg-[#087E9D]/10 text-[#087E9D]">
              <Sparkles size={22} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Welcome Back!
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to continue your learning journey.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#087E9D] focus:bg-white focus:ring-4 focus:ring-[#087E9D]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#087E9D] hover:text-[#066780]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#087E9D] focus:bg-white focus:ring-4 focus:ring-[#087E9D]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-[#087E9D] cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#087E9D] hover:bg-[#066780] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-[#087E9D]/20 transition duration-200"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={17} />}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-slate-200" />
              <span className="text-[11px] font-medium tracking-wider text-slate-400">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            {/* Google Button */}
            <button
              onClick={handleSignInWithGoogle}
              type="button"
              className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087E9D]/40 hover:bg-[#087E9D]/5 hover:shadow-md active:translate-y-0"
            >
              <FcGoogle className="text-xl transition-transform duration-300 group-hover:scale-110" />
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Sign Up */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-[#087E9D] hover:text-[#066780]"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 MentorLagbe. All rights reserved.
        </p>
      </div>
    </main>
  );
}
