
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessagesSquare,
  Users,
} from "lucide-react";

import InfoPage from "../components/info-page";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the MentorLagbe team for help with finding a tutor, managing your tuition or billing questions.",
};

const helpTopics = [
  {
    icon: Users,
    title: "Student & parent support",
    description:
      "Need help choosing a tutor, understanding a tuition post or managing an application? We are here.",
  },
  {
    icon: GraduationCap,
    title: "Tutor support",
    description:
      "Questions about your profile, applications or visibility on the platform? Let us know.",
  },
  {
    icon: MessagesSquare,
    title: "Billing & plans",
    description:
      "Anything about subscriptions, payments or invoices — reach out and we will sort it out.",
  },
];

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title={
        <>
          We would love to <span className="text-brand">hear from you</span>
        </>
      }
      description="Whether you are a student, a parent or a tutor, the MentorLagbe team is one message away."
    >
      <div className="space-y-14">
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Mail size={22} />
              </div>

              <p className="mt-4 text-xs font-bold tracking-[0.14em] text-slate-400 uppercase">
                Email us
              </p>

              <a
                href="mailto:support@mentorlagbe.com"
                className="mt-1 block text-sm font-semibold break-all text-slate-800 transition-colors hover:text-brand"
              >
                support@mentorlagbe.com
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <MapPin size={22} />
              </div>

              <p className="mt-4 text-xs font-bold tracking-[0.14em] text-slate-400 uppercase">
                Our location
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Clock size={22} />
              </div>

              <p className="mt-4 text-xs font-bold tracking-[0.14em] text-slate-400 uppercase">
                Response time
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                Within 24 hours
              </p>
            </div>
          </div>
        </Reveal>

        <section>
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              How can we help?
            </h2>
          </Reveal>

          <div className="mt-7 space-y-4">
            {helpTopics.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 100}>
                <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="rounded-2xl bg-brand px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-xl font-bold sm:text-2xl">
              Still have a question?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80">
              Send us an email with a short description of what you need and we
              will get back to you as soon as possible.
            </p>

            <Link
              href="mailto:support@mentorlagbe.com"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Email support
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </section>
        </Reveal>
      </div>
    </InfoPage>
  );
}
