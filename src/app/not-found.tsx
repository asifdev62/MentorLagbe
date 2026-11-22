
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Home,
  SearchX,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-12">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#087F9F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#087F9F]/10 blur-3xl" />

      <div className="relative w-full max-w-3xl">

        {/* Brand */}
        <div className="mb-10 flex justify-center">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087F9F] text-white shadow-lg shadow-[#087F9F]/20 transition group-hover:scale-105">
              <GraduationCap size={25} />
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-black">
              Mentor<span className="text-[#087F9F]">Lagbe</span>
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.07)]">

          {/* Top Accent */}
          <div className="h-1.5 w-full bg-[#087F9F]" />

          <div className="px-6 py-12 text-center sm:px-12 sm:py-16">

            {/* Illustration */}
            <div className="relative mx-auto mb-9 flex h-44 w-44 items-center justify-center">

              <div className="absolute inset-0 rounded-full border border-[#087F9F]/20" />

              <div className="absolute inset-4 rounded-full border border-dashed border-[#087F9F]/30" />

              <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-[#087F9F] text-white shadow-2xl shadow-[#087F9F]/25">
                <SearchX size={54} strokeWidth={1.5} />
              </div>

              <span className="absolute right-2 top-5 h-4 w-4 rounded-full bg-black" />
              <span className="absolute bottom-5 left-1 h-3 w-3 rounded-full bg-[#087F9F]" />
              <span className="absolute left-3 top-9 h-2 w-2 rounded-full bg-gray-300" />
            </div>

            {/* Error Label */}
            <div className="mx-auto inline-flex items-center rounded-full border border-[#087F9F]/20 bg-[#087F9F]/5 px-4 py-2">
              <span className="mr-2 h-2 w-2 rounded-full bg-[#087F9F]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#087F9F]">
                ERROR 404
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
              Oops! Page
              <br />
              <span className="text-[#087F9F]">Not Found.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
              Let&apos;s get you back on track!
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F9F]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#06677F]"
              >
                <Home size={17} />
                Back to Home
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/tuitions"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:border-[#087F9F] hover:text-[#087F9F]"
              >
                <BookOpen size={17} />
                Explore Tuitions
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Bottom Note */}
            <div className="mt-10 border-t border-gray-100 pt-7">
              <p className="text-sm text-gray-400">
                Need a fresh start?
                <Link
                  href="/"
                  className="ml-1 font-semibold text-[#087F9F] transition hover:underline"
                >
                  Visit Homepage
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026 MentorLagbe. All rights reserved.
        </p>
      </div>
    </main>
  );
}
