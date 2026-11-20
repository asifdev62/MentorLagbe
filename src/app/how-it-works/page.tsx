
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
import Link from "next/link";

const studentSteps = [
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

const tutorSteps = [
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

const adminSteps = [
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
  step: (typeof studentSteps)[number];
  index: number;
}) => {
  const Icon = step.icon;

  return (
    <div className="group relative rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
          <Icon size={23} />
        </div>

        <span className="text-3xl font-bold text-base-300">
          0{index + 1}
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <GraduationCap size={17} />
            How MentorLagbe Works
          </span>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your Journey to Better
            <span className="text-primary"> Learning </span>
            Starts Here
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-base-content/65 md:text-lg">
            Whether you are a student searching for the right tutor or a
            tutor looking for teaching opportunities, MentorLagbe makes
            the process simple and convenient.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/browse-tuitions"
              className="btn btn-primary rounded-xl px-7"
            >
              Browse Tuitions
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="btn btn-outline btn-primary rounded-xl px-7"
            >
              Join MentorLagbe
            </Link>
          </div>
        </div>
      </section>

      {/* Student Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <GraduationCap size={28} />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
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

            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
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

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
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
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-6 py-14 text-center text-primary-content md:px-12">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 opacity-85">
            Take the next step towards better learning or new teaching
            opportunities with MentorLagbe.
          </p>

          <Link
            href="/register"
            className="btn mt-8 rounded-xl border-0 bg-white px-8 text-primary hover:bg-white/90"
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
