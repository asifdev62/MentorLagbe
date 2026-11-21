
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Zap,
  Headphones,
  Users,
  ArrowRight,
  GraduationCap,
  Star,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FC]">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-137.5 w-137.5 rounded-full bg-[#087F9F]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#087F9F]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-20">

        {/* Main Hero Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-6">

          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-155">

            {/* Trust Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/10 px-4 py-2">
              <ShieldCheck size={17} className="text-[#087F9F]" />

              <span className="text-sm font-semibold text-[#087F9F]">
                Your Trusted Learning Partner
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[42px] font-extrabold leading-[1.13] tracking-[-2px] text-[#111B35] sm:text-5xl lg:text-[56px] xl:text-[62px]">
              Find the Right
              <br />
              <span className="text-[#087F9F]">Tutor</span> for Your
              <br />
              Learning Journey
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-132.5 text-base leading-8 text-slate-600 sm:text-lg">
              Connect with expert tutors, explore personalized tuition
              batches, and take the next step toward your academic goals.
            </p>

            {/* Search Card */}
            <div className="mt-8 max-w-147.5 rounded-2xl border border-[#087F9F]/20 bg-white p-2 shadow-lg shadow-[#087F9F]/10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                {/* Search Input */}
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search size={21} className="shrink-0 text-[#087F9F]" />

                  <input
                    type="text"
                    placeholder="Search subject, e.g. Math, Physics"
                    className="w-full min-w-0 bg-transparent py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                {/* Class Select */}
                <select
                  className="cursor-pointer bg-transparent px-3 py-3 text-sm text-slate-600 outline-none sm:w-33.75"
                  defaultValue=""
                >
                  <option value="">All Classes</option>
                  <option>Class 6-8</option>
                  <option>Class 9-10</option>
                  <option>HSC</option>
                  <option>University</option>
                </select>

                {/* Search Button */}
                <Link
                  href="/browse-tuitions"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#087F9F]/20 transition-all hover:bg-[#066B85]"
                >
                  Search
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">

              {/* Verified Tutors */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087F9F]/10">
                  <ShieldCheck size={19} className="text-[#087F9F]" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Verified Tutors
                </span>
              </div>

              {/* Easy Application */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087F9F]/10">
                  <Zap size={19} className="text-[#087F9F]" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Easy Application
                </span>
              </div>

              {/* Support */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087F9F]/10">
                  <Headphones size={19} className="text-[#087F9F]" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Support
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[560px] lg:justify-end">

            {/* Soft Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087F9F]/10 blur-[90px]" />

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute right-5 top-10 h-72 w-72 rounded-full bg-[#087F9F]/5 blur-2xl sm:h-96 sm:w-96" />

            {/* Main Image - Blended with Hero Background */}
            <div className="relative z-10 w-full max-w-[620px] lg:translate-x-5">
              <Image
                src="/images/mentorlagbe-student-tutor.png"
                alt="Tutor helping a student learn on a laptop"
                width={1280}
                height={1217}
                priority
                sizes="(min-width: 1024px) 620px, (min-width: 640px) 85vw, 100vw"
                className="h-auto w-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-5 left-2 z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl shadow-[#087F9F]/10 sm:flex lg:bottom-12 lg:left-0">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087F9F]/10">
                <GraduationCap size={25} className="text-[#087F9F]" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Learn With Experts
                </p>

                <p className="text-xs text-slate-500">
                  Your learning, our priority
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM STATS */}
        <div className="relative z-20 mb-10 mt-12 grid grid-cols-1 gap-5 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-lg shadow-[#087F9F]/10 sm:grid-cols-3">

          {/* Students */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
              <Users size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Students
              </h3>

              <p className="text-sm text-slate-500">
                Find your perfect tutor
              </p>
            </div>
          </div>

          {/* Tutors */}
          <div className="flex items-center justify-center gap-4 border-slate-100 sm:border-x sm:px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
              <GraduationCap size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tutors
              </h3>

              <p className="text-sm text-slate-500">
                Share your knowledge
              </p>
            </div>
          </div>

          {/* Better Learning */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
              <Star size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Better Learning
              </h3>

              <p className="text-sm text-slate-500">
                Grow with confidence
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
