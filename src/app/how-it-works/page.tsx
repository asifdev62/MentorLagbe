
import React from "react";
import {
  UserPlus,
  Search,
  FileText,
  Send,
  ClipboardCheck,
  BookOpen,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const studentSteps: Step[] = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Sign up on MentorLagbe and create your student account to get started.",
  },
  {
    icon: Search,
    title: "Find Your Tuition",
    description:
      "Explore available tuition posts based on your subject, class, and preferences.",
  },
  {
    icon: FileText,
    title: "View Details",
    description:
      "Check tuition information, requirements, location, and salary before applying.",
  },
  {
    icon: Send,
    title: "Apply for Tuition",
    description:
      "Choose a suitable tuition opportunity and submit your application.",
  },
  {
    icon: ClipboardCheck,
    title: "Track Application",
    description:
      "Visit your dashboard to check your application status and stay updated.",
  },
];

const tutorSteps: Step[] = [
  {
    icon: UserPlus,
    title: "Register as a Tutor",
    description:
      "Create your tutor account and get ready to share your teaching expertise.",
  },
  {
    icon: FileText,
    title: "Post a Tuition",
    description:
      "Add tuition details including subject, class, salary, and tutor requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Admin Review",
    description:
      "Your tuition post will be reviewed by the admin before becoming publicly available.",
  },
  {
    icon: Users,
    title: "Receive Applications",
    description:
      "Once approved, students can discover your tuition and send applications.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage Applicants",
    description:
      "View and manage student applications from your tutor dashboard.",
  },
];

const adminSteps: Step[] = [
  {
    icon: LayoutDashboard,
    title: "Access Dashboard",
    description:
      "Access the admin dashboard to monitor users and tuition activities.",
  },
  {
    icon: BookOpen,
    title: "Review Tuition Posts",
    description:
      "View all tuition posts submitted by tutors, including pending listings.",
  },
  {
    icon: CheckCircle2,
    title: "Manage Listings",
    description:
      "Approve, reject, or set tuition posts to pending when necessary.",
  },
  {
    icon: Users,
    title: "Manage Users",
    description:
      "View registered students and tutors and monitor platform activities.",
  },
];

const StepCard = ({
  step,
  index,
}: {
  step: Step;
  index: number;
}) => {
  const Icon = step.icon;

  return (
    <div className="group relative rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#087E9D]/40 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087E9D]/10 text-[#087E9D] transition-colors group-hover:bg-[#087E9D] group-hover:text-white">
          <Icon size={23} />
        </div>

        <span className="text-3xl font-bold text-base-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-bold">{step.title}</h3>

      <p className="text-sm leading-7 text-base-content/65">
        {step.description}
      </p>
    </div>
  );
};

const HowitWorksPage = () => {
  return (
    <main className="min-h-screen bg-base-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#087E9D]/5 px-2 py-33 md:py-25">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#087E9D]/20 bg-[#087E9D]/10 px-4 py-2 text-sm font-semibold text-[#087E9D]">
            <GraduationCap size={17} />
            How MentorLagbe Works
          </span>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your Journey to Better
            <span className="text-[#087E9D]"> Learning </span>
            Starts Here
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-base-content/65 md:text-lg">
            Whether you are a student searching for the right tutor or a
            tutor looking for teaching opportunities, MentorLagbe makes
            the process simple and convenient.
          </p>

         
<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
  {/* Browse Tuitions Button */}
  <Link
    href="/browse-tuitions"
    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#087E9D] px-8 py-3 font-sans text-base font-semibold text-white shadow-lg shadow-[#087E9D]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#066780] hover:shadow-xl hover:shadow-[#087E9D]/30 active:scale-95"
  >
    Browse Tuitions
    <ArrowRight
      size={19}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>

  {/* Join MentorLagbe Button */}
  <Link
    href="/register"
    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#087E9D] bg-white px-8 py-3 font-sans text-base font-semibold text-[#087E9D] transition-all duration-300 hover:-translate-y-1 hover:bg-[#087E9D] hover:text-white hover:shadow-lg hover:shadow-[#087E9D]/20 active:scale-95"
  >
    <UserPlus size={18} />
    Join MentorLagbe
  </Link>
</div>

        </div>
      </section>

      {/* Student Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087E9D]/10 text-[#087E9D]">
            <GraduationCap size={28} />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#087E9D]">
            For Students
          </p>

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Find Your Perfect Tutor
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base-content/60">
            Finding the right tuition is easy. Follow these simple steps
            to connect with teaching opportunities.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studentSteps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* Tutor Section */}
      <section className="bg-base-200/50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <BriefcaseBusiness size={27} />
            </div>

            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#087E9D]">
              For Tutors
            </p>

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Grow Your Teaching Career
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base-content/60">
              Share your expertise, publish tuition opportunities, and
              connect with students looking for quality education.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tutorSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600">
            <ShieldCheck size={27} />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#087E9D]">
            For Administrators
          </p>

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Keeping MentorLagbe Organized
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base-content/60">
            Admins help maintain the platform by reviewing tuition posts
            and managing registered users.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {adminSteps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#087E9D] px-6 py-14 text-center text-white md:px-12">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 opacity-85">
            Take the next step towards better learning or new teaching
            opportunities with MentorLagbe.
          </p>

          <Link
            href="/register"
            className="btn mt-8 rounded-xl border-0 bg-white px-8 text-[#087E9D] hover:bg-white/90"
          >
            Create Your Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HowitWorksPage;
