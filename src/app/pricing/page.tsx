
import React from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import Navbar from "../components/navbar";

const plans = [
  {
    name: "Starter",
    subtitle: "Get started with MentorLagbe",
    price: "Free",
    period: "Forever",
    description: "Perfect for exploring the platform.",
    icon: GraduationCap,
    popular: false,
    buttonText: "Get Started",
    buttonLink: "/auth/sign-up",
    features: [
      { text: "Browse available tuitions", included: true },
      { text: "Apply for 2 tuitions", included: true },
      { text: "Basic profile access", included: true },
      { text: "Application status tracking", included: true },
      { text: "Unlimited applications", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Student Premium",
    subtitle: "Find your perfect tutor",
    price: "৳199",
    period: "/ month",
    description: "More opportunities to find the right tuition.",
    icon: Sparkles,
    popular: true,
    buttonText: "Choose Premium",
    buttonLink: "/payment",
    features: [
      { text: "Browse available tuitions", included: true },
      { text: "Unlimited tuition applications", included: true },
      { text: "Complete profile access", included: true },
      { text: "Application status tracking", included: true },
      { text: "Priority application access", included: true },
      { text: "Priority support", included: true },
    ],
  },
  {
    name: "Tutor Pro",
    subtitle: "Grow your tutoring career",
    price: "৳299",
    period: "/ month",
    description: "Everything you need to grow as a tutor.",
    icon: BookOpen,
    popular: false,
    buttonText: "Become Pro",
    buttonLink: "/payment",
    features: [
      { text: "Create tutoring profile", included: true },
      { text: "Post tuition opportunities", included: true },
      { text: "Manage student applications", included: true },
      { text: "Professional tutor profile", included: true },
      { text: "Priority visibility", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-[#F4F7FC]">
        <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-12 text-center">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#087E9D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-52 h-52 bg-[#087E9D]/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#087E9D]/20 bg-[#087E9D]/10 px-4 py-2 text-sm font-semibold text-[#087E9D] mb-5">
            <Sparkles size={16} />
            Simple & Transparent Pricing
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Choose the Right Plan for Your{" "}
            <span className="text-[#087E9D]">Learning Journey</span>
          </h1>

          <p className="mt-5 text-slate-500 text-sm sm:text-base leading-7 max-w-2xl mx-auto">
            Whether you are looking for a tutor or want to teach students,
            MentorLagbe has a plan that fits your needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-2 border-[#087E9D] shadow-xl shadow-[#087E9D]/10 lg:scale-105"
                    : "border border-slate-200 shadow-lg shadow-slate-200/50"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#087E9D] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-[#087E9D]/20">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#087E9D]/10 text-[#087E9D]">
                  <Icon size={25} />
                </div>

                {/* Plan Info */}
                <h2 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <p className="mt-3 min-h-10 text-sm leading-6 text-slate-500">
                  {plan.description}
                </p>

                {/* Button */}
                <Link
                  href={plan.buttonLink}
                  className={`mt-6 flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#087E9D] text-white hover:bg-[#066780] shadow-lg shadow-[#087E9D]/20"
                      : "border border-[#087E9D]/30 bg-[#087E9D]/5 text-[#087E9D] hover:bg-[#087E9D] hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight size={17} />
                </Link>

                <div className="my-7 border-t border-slate-100" />

                {/* Features */}
                <h3 className="mb-5 text-sm font-bold text-slate-800">
                  What&apos;s included:
                </h3>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-[#087E9D]"
                        />
                      ) : (
                        <X
                          size={18}
                          className="mt-0.5 shrink-0 text-slate-300"
                        />
                      )}

                      <span
                        className={
                          feature.included
                            ? "text-slate-600"
                            : "text-slate-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#087E9D] px-6 py-10 sm:p-12 text-center text-white">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <ShieldCheck size={30} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Your Learning Journey Matters
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
            Find the right tutor, explore teaching opportunities, and
            build meaningful learning connections with MentorLagbe.
          </p>

          <Link
            href="/auth/sign-up"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#087E9D] transition hover:bg-slate-100"
          >
            Join MentorLagbe
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:text-left shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087E9D]/10 text-[#087E9D]">
            <Headphones size={24} />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-slate-900">
              Need help choosing a plan?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Our team is here to help you find the right option.
            </p>
          </div>

          <Link
            href="/contact"
            className="text-sm font-semibold text-[#087E9D] hover:text-[#066780] transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
