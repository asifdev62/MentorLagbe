import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  SearchX,
} from "lucide-react";
import CurrentYear from "@/components/current-year";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-600">
          <SearchX size={42} />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-blue-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to your learning journey.
        </p>

        {/* Brand */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
          <GraduationCap size={21} className="text-blue-600" />
          MentorLagbe
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <Link
            href="/tuitions"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <BookOpen size={17} />
            Explore Tuitions
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-400">
          © <CurrentYear /> MentorLagbe. All rights reserved.
        </p>
      </div>
    </div>
  );
}