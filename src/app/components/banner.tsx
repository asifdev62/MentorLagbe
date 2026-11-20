
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Zap,
  Headphones,
  Users,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Star,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F8FF]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-137.5 h-137.5 bg-[#087E9D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#087E9D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 lg:pt-20">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-6">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-155">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#087E9D]/10 border border-[#087E9D]/20 px-4 py-2 mb-7">
              <ShieldCheck size={17} className="text-[#087E9D]" />
              <span className="text-sm font-semibold text-[#087E9D]">
                Your Trusted Learning Partner
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[42px] sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-[#111B35] leading-[1.13] tracking-[-2px]">
              Find the Right
              <br />
              <span className="text-[#087E9D]">Tutor</span> for Your
              <br />
              Learning Journey
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-8 max-w-132.5">
              Connect with expert tutors, explore personalized tuition
              batches, and take the next step toward your academic goals.
            </p>

            {/* Search Card */}
            <div className="mt-8 max-w-147.5 bg-white p-2 rounded-2xl border border-[#087E9D]/20 shadow-lg shadow-[#087E9D]/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-3 flex-1 px-3">
                  <Search size={21} className="text-[#087E9D] shrink-0" />

                  <input
                    type="text"
                    placeholder="Search subject, e.g. Math, Physics"
                    className="w-full min-w-0 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                  />
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-200" />

                <select
                  className="sm:w-33.75 px-3 py-3 text-sm text-slate-600 bg-transparent outline-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="">All Classes</option>
                  <option>Class 6-8</option>
                  <option>Class 9-10</option>
                  <option>HSC</option>
                  <option>University</option>
                </select>

                <Link
                  href="/browse-tuitions"
                  className="flex items-center justify-center gap-2 bg-[#087E9D] hover:bg-[#066780] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#087E9D]/20"
                >
                  Search
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-8">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#087E9D]/10 flex items-center justify-center">
                  <ShieldCheck size={19} className="text-[#087E9D]" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Verified Tutors
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#087E9D]/10 flex items-center justify-center">
                  <Zap size={19} className="text-[#087E9D]" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Easy Application
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#087E9D]/10 flex items-center justify-center">
                  <Headphones size={19} className="text-[#087E9D]" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Support
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center lg:pl-4">
            {/* Image Background */}
            <div className="absolute w-[85%] aspect-square rounded-full bg-[#087E9D]/15 blur-2xl" />

            <div className="relative w-full max-w-147.5">
              <Image
                src="/images/mentorlagbe-student-tutor.png"
                alt="Student learning with a tutor"
                width={705}
                height={665}
                priority
                className="relative z-10 w-full h-auto object-contain"
              />

              {/* Floating Card */}
              <div className="absolute z-20 top-[15%] -left-2 sm:-left-5 bg-white rounded-2xl shadow-xl shadow-slate-300/40 p-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#087E9D]/10 flex items-center justify-center text-[#087E9D]">
                  <GraduationCap size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Learn Better
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Grow Faster
                  </p>
                </div>
              </div>

              {/* Second Card */}
              <div className="absolute z-20 bottom-[13%] right-0 bg-white rounded-2xl shadow-xl shadow-slate-300/40 p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <BookOpen size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Start Learning
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Find your mentor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATS */}
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-5 bg-white border border-slate-100 shadow-lg shadow-[#087E9D]/10 rounded-2xl p-6 mt-12 mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#087E9D]/5 flex items-center justify-center text-[#087E9D]">
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

          <div className="flex items-center justify-center gap-4 sm:border-x border-slate-100 sm:px-4">
            <div className="w-12 h-12 rounded-xl bg-[#087E9D]/5 flex items-center justify-center text-[#087E9D]">
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

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
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
