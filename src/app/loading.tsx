
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#087F9F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#087F9F]/10 blur-3xl" />

      {/* Main Content */}
      <div className="relative w-full max-w-md text-center">

        {/* Logo */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#087F9F] text-white shadow-xl shadow-[#087F9F]/20">
          <GraduationCap size={42} strokeWidth={1.8} />
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          Mentor<span className="text-[#087F9F]">Lagbe</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Your journey to better learning starts here.
        </p>

        {/* Loading Card */}
        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_15px_60px_rgba(0,0,0,0.06)]">

          {/* Spinner */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#087F9F]/10 border-t-[#087F9F]" />

            <BookOpen size={25} className="text-[#087F9F]" />
          </div>

          <h2 className="mt-6 text-lg font-bold text-black">
            Preparing Your Experience
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we get everything ready for you.
          </p>

          {/* Loading Indicator */}
          <div className="mt-7 flex justify-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#087F9F]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#087F9F] [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#087F9F] [animation-delay:300ms]" />
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#087F9F]">
            <Sparkles size={14} />
            LOADING
          </p>
        </div>

        {/* Footer */}
        <p className="mt-9 text-xs text-gray-400">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved.
        </p>
      </div>
    </main>
  );
}
