"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";

import { Reveal } from "@/components/reveal";

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  icon: LucideIcon;
  popular: boolean;
  buttonText: string;
  buttonLink: string;
  features: { text: string; included: boolean }[];
};

export const plans: Plan[] = [
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
    buttonLink: "/payment?plan=student",
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
    buttonLink: "/payment?plan=tutor",
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

export function PricingCards() {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => {
        const Icon = plan.icon;

        return (
          <Reveal key={plan.name} delay={index * 110} className="h-full">
            <div
              onMouseMove={handleMouseMove}
              className={`spotlight-card group relative flex h-full flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-2 border-brand shadow-xl shadow-brand/10 hover:shadow-2xl hover:shadow-brand/25 lg:scale-105"
                  : "border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-brand/30 hover:shadow-2xl hover:shadow-slate-300/50"
              }`}
            >
              {plan.popular && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-brand/70 to-transparent"
                  />

                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-5 py-2 text-xs font-bold whitespace-nowrap text-white shadow-lg shadow-brand/20">
                    <span className="relative z-10">MOST POPULAR</span>
                  </div>
                </>
              )}

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
                <Icon size={25} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>

              <p className="mt-1 text-sm text-slate-500">{plan.subtitle}</p>

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

              <Link
                href={plan.buttonLink}
                className={`group/btn mt-6 flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30"
                    : "border border-brand/30 bg-brand/5 text-brand hover:bg-brand hover:text-white"
                }`}
              >
                {plan.buttonText}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>

              <div className="my-7 border-t border-slate-100" />

              <h4 className="mb-5 text-sm font-bold text-slate-800">
                What&apos;s included:
              </h4>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-brand"
                      />
                    ) : (
                      <X
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-300"
                      />
                    )}

                    <span
                      className={
                        feature.included ? "text-slate-600" : "text-slate-400"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
