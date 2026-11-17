
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  GraduationCap,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Check,
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");

  return (
    <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-110">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-200">
            <GraduationCap size={25} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mentor<span className="text-blue-600">Lagbe</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-7">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Create an Account
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Join MentorLagbe and start your journey.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                I want to join as a
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Student */}
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`relative flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                    role === "student"
                      ? "border-blue-500 bg-blue-50/70 text-blue-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    role === "student"
                      ? "bg-blue-100"
                      : "bg-slate-100"
                  }`}>
                    <UserRound size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Student</p>
                    <p className="text-[11px] text-slate-500">Find a tutor</p>
                  </div>

                  {role === "student" && (
                    <Check size={15} className="absolute top-2 right-2 text-blue-600" />
                  )}
                </button>

                {/* Tutor */}
                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`relative flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                    role === "tutor"
                      ? "border-blue-500 bg-blue-50/70 text-blue-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    role === "tutor"
                      ? "bg-blue-100"
                      : "bg-slate-100"
                  }`}>
                    <BookOpen size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Tutor</p>
                    <p className="text-[11px] text-slate-500">Teach students</p>
                  </div>

                  {role === "tutor" && (
                    <Check size={15} className="absolute top-2 right-2 text-blue-600" />
                  )}
                </button>

              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 bg-slate-50/70 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

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
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 bg-slate-50/70 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-200 bg-slate-50/70 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded accent-blue-600 cursor-pointer"
              />

              <label
                htmlFor="terms"
                className="text-xs text-slate-500 leading-5 cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition duration-200"
            >
              Create Account
              <ArrowRight size={17} />
            </button>

          </form>

          {/* Sign In */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in
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
