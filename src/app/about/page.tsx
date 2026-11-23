
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

import InfoPage from "../components/info-page";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MentorLagbe connects students and parents with verified tutors across Bangladesh through a simple, transparent tuition matching process.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified first",
    description:
      "Every tutor profile is reviewed before it goes live, so families can focus on learning instead of second-guessing.",
  },
  {
    icon: HeartHandshake,
    title: "Built around people",
    description:
      "We keep the process human — clear communication, honest expectations and support whenever you need it.",
  },
  {
    icon: Sparkles,
    title: "Simple by design",
    description:
      "Post a requirement or apply for a tuition in minutes. No clutter, no unnecessary steps, no hidden fees.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About MentorLagbe"
      title={
        <>
          Making quality education{" "}
          <span className="text-brand">accessible to everyone</span>
        </>
      }
      description="MentorLagbe is a tuition marketplace built for Bangladesh — helping students find the right tutor and helping tutors build a meaningful teaching career."
    >
      <div className="space-y-14">
        <Reveal>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Our mission
            </h2>

            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Finding a good tutor should not depend on who you already know.
              MentorLagbe brings students, parents and tutors onto one platform
              where requirements are clear, profiles are verified and the next
              step is always obvious.
            </p>

            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Whether you are looking for home tuition, online classes, a crash
              course or a batch program, you can compare options and apply with
              confidence — from your phone, in a few minutes.
            </p>
          </section>
        </Reveal>

        <section>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            What we care about
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 110} className="h-full">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-slate-200/70">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="rounded-2xl bg-[#111B35] px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-xl font-bold sm:text-2xl">
              Ready to get started?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70">
              Create a free account to browse tuitions, or post your first
              tuition and start receiving applications.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/sign-up"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark sm:w-auto"
              >
                Create free account
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/browse-tuitions"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Browse tuitions
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </InfoPage>
  );
}
