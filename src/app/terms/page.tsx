
import type { Metadata } from "next";

import InfoPage from "../components/info-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules for using MentorLagbe as a student, parent or tutor.",
};

const sections = [
  {
    title: "Acceptance of terms",
    body: [
      "By accessing or using MentorLagbe you agree to these terms. If you do not agree with any part of them, please do not use the platform.",
    ],
  },
  {
    title: "Your account",
    body: [
      "You are responsible for the accuracy of the information in your account and for keeping your login credentials secure.",
      "Accounts are personal. Do not share your credentials or create accounts on behalf of someone else without permission.",
    ],
  },
  {
    title: "Using the platform",
    body: [
      "Use MentorLagbe only for lawful purposes related to tuition and learning. Do not post false, misleading, abusive or infringing content.",
      "We may suspend or remove accounts that misuse the platform, attempt to bypass payments or harm other users.",
    ],
  },
  {
    title: "Tuition posts and applications",
    body: [
      "Students, parents and tutors are responsible for the information they publish, including requirements, schedules and rates.",
      "MentorLagbe helps users connect but is not a party to any agreement between a student and a tutor. Please verify details before you commit.",
    ],
  },
  {
    title: "Payments and subscriptions",
    body: [
      "Paid plans are billed through our payment provider at the price shown at checkout. Subscriptions renew until cancelled.",
      "Fees for completed billing periods are non-refundable unless required by law. You can cancel a subscription at any time from your account.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "The platform is provided on an as-is basis. To the extent permitted by law, MentorLagbe is not liable for indirect or consequential losses arising from the use of the service.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms as the platform evolves. Continued use after an update means you accept the revised terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Questions about these terms? Email support@mentorlagbe.com and we will be happy to help.",
    ],
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of Service"
      description="The ground rules that keep MentorLagbe safe and useful for students, parents and tutors."
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">
        Last updated: November 2026
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {section.title}
            </h2>

            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </InfoPage>
  );
}
