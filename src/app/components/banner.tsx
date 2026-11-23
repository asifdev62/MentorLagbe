
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

import { CountUp } from "@/components/reveal";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FC]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-137.5 w-137.5 rounded-full bg-brand/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-20">
        {/* Main Hero Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-155">
            {/* Trust Badge */}
            <div
              className="hero-rise mb-7 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2"
              style={{ animationDelay: "40ms" }}
            >
              <ShieldCheck size={17} className="text-brand" />

              <span className="text-sm font-semibold text-brand">
                Your Trusted Learning Partner
              </span>
            </div>

            {/* Heading */}
            <h1
              className="hero-rise text-[42px] leading-[1.13] font-extrabold tracking-[-2px] text-[#111B35] sm:text-5xl lg:text-[56px] xl:text-[62px]"
              style={{ animationDelay: "120ms" }}
            >
              Find the Right
              <br />
              <span className="text-brand">Tutor</span> for Your
              <br />
              Learning Journey
            </h1>

            {/* Description */}
            <p
              className="hero-rise mt-6 max-w-132.5 text-base leading-8 text-slate-600 sm:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              Connect with expert tutors, explore personalized tuition
              batches, and take the next step toward your academic goals.
            </p>

            {/* Search Card */}
            <div
              className="hero-rise group mt-8 max-w-147.5 rounded-2xl border border-brand/20 bg-white p-2 shadow-lg shadow-brand/10 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-brand/40 focus-within:shadow-xl focus-within:shadow-brand/20"
              style={{ animationDelay: "280ms" }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* Search Input */}
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search size={21} className="shrink-0 text-brand" />

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
                  className="group/btn flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
                >
                  Search
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
              style={{ animationDelay: "360ms" }}
            >
              {/* Verified Tutors */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 transition-transform duration-300 hover:scale-110">
                  <ShieldCheck size={19} className="text-brand" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Verified Tutors
                </span>
              </div>

              {/* Easy Application */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 transition-transform duration-300 hover:scale-110">
                  <Zap size={19} className="text-brand" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Easy Application
                </span>
              </div>

              {/* Support */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 transition-transform duration-300 hover:scale-110">
                  <Headphones size={19} className="text-brand" />
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
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[75%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[90px]" />

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute top-10 right-5 h-72 w-72 rounded-full bg-brand/5 blur-2xl sm:h-96 sm:w-96" />

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
            <div
              className="hero-rise absolute bottom-5 left-2 z-20 hidden sm:block lg:bottom-12 lg:left-0"
              style={{ animationDelay: "480ms" }}
            >
              <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl shadow-brand/10 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                  <GraduationCap size={25} className="text-brand" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Learn With Experts
                  </p>

                  <p className="text-xs text-slate-500">
                    Your learning, our priority
                  </p>
                </div>

                <span className="relative ml-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATS */}
        <div
          className="hero-rise relative z-20 mt-12 mb-10 grid grid-cols-1 gap-5 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-lg shadow-brand/10 backdrop-blur-sm sm:grid-cols-3"
          style={{ animationDelay: "420ms" }}
        >
          {/* Students */}
          <div className="group flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/5 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
              <Users size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                <CountUp end={500} suffix="+" /> Students
              </h3>

              <p className="text-sm text-slate-500">
                Find your perfect tutor
              </p>
            </div>
          </div>

          {/* Tutors */}
          <div className="group flex items-center justify-center gap-4 border-slate-100 sm:border-x sm:px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/5 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
              <GraduationCap size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                <CountUp end={120} suffix="+" /> Tutors
              </h3>

              <p className="text-sm text-slate-500">
                Share your knowledge
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="group flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/5 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
              <Star size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                <CountUp end={4.9} decimals={1} suffix="/5" /> Rating
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
