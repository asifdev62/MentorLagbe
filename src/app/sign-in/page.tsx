
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

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-110">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-7">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-200">
            <GraduationCap size={25} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mentor<span className="text-blue-600">Lagbe</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">

          {/* Heading */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600">
              <Sparkles size={22} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Welcome Back!
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to continue your learning journey.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
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
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition duration-200"
            >
              Sign In
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Sign Up */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-blue-600 hover:text-blue-700"
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
