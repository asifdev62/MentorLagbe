
"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
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
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("student");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!terms) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      toast.success("Account created successfully!");

      router.push(role === "tutor" ? "/dashboard/tutor" : "/dashboard/student");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithGoogle = async () => {
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
    <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[450px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 mb-7 group"
        >
          <div className="bg-[#087E9D] text-white p-2.5 rounded-xl shadow-lg shadow-[#087E9D]/20 transition-transform duration-300 group-hover:-rotate-6">
            <GraduationCap size={26} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mentor<span className="text-[#087E9D]">Lagbe</span>
          </span>
        </Link>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
          {/* Heading */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#087E9D]/10 text-[#087E9D] text-xs font-semibold mb-3">
              <Sparkles size={13} />
              Start Learning Today
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create Your Account
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Join MentorLagbe and connect with the right people.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                I want to join as a
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Student */}
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                    role === "student"
                      ? "border-[#087E9D] bg-[#087E9D]/10 text-[#087E9D] shadow-sm shadow-[#087E9D]/10"
                      : "border-slate-200 bg-white hover:border-[#087E9D]/50 text-slate-600"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg ${
                      role === "student"
                        ? "bg-[#087E9D]/15"
                        : "bg-slate-100"
                    }`}
                  >
                    <UserRound size={20} />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold">Student</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Find a tutor
                    </p>
                  </div>

                  {role === "student" && (
                    <Check
                      size={16}
                      className="absolute top-2 right-2 text-[#087E9D]"
                    />
                  )}
                </button>

                {/* Tutor */}
                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                    role === "tutor"
                      ? "border-[#087E9D] bg-[#087E9D]/10 text-[#087E9D] shadow-sm shadow-[#087E9D]/10"
                      : "border-slate-200 bg-white hover:border-[#087E9D]/50 text-slate-600"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg ${
                      role === "tutor"
                        ? "bg-[#087E9D]/15"
                        : "bg-slate-100"
                    }`}
                  >
                    <BookOpen size={20} />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold">Tutor</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Teach students
                    </p>
                  </div>

                  {role === "tutor" && (
                    <Check
                      size={16}
                      className="absolute top-2 right-2 text-[#087E9D]"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#087E9D] focus:bg-white focus:ring-4 focus:ring-[#087E9D]/10"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#087E9D] focus:bg-white focus:ring-4 focus:ring-[#087E9D]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>

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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#087E9D] focus:bg-white focus:ring-4 focus:ring-[#087E9D]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#087E9D] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-[#087E9D] cursor-pointer"
              />

              <label
                htmlFor="terms"
                className="text-xs text-slate-500 leading-5 cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#087E9D] font-semibold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#087E9D] font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#087E9D] hover:bg-[#066780] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-[#087E9D]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

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
            onClick={handleSignUpWithGoogle}
            type="button"
            className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087E9D]/40 hover:bg-[#087E9D]/5 hover:shadow-md active:translate-y-0"
          >
            <FcGoogle className="text-xl transition-transform duration-300 group-hover:scale-110" />
            <span>Continue with Google</span>
          </button>

          <div className="flex justify-center mt-4">
            <p className="text-xs text-[#A8BAC5]">
              Your information is securely protected.
            </p>
          </div>

          {/* Sign In */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold text-[#087E9D] hover:text-[#066780] transition-colors"
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
