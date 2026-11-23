
import type { Metadata } from "next";

import InfoPage from "../components/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MentorLagbe collects, uses and protects your personal information.",
};

const sections = [
  {
    title: "Overview",
    body: [
      "MentorLagbe respects your privacy. This policy explains what information we collect when you use the platform, why we collect it and how it is protected.",
      "By creating an account or using MentorLagbe, you agree to the practices described here.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "Account details such as your name, email address, role and profile picture.",
      "Profile and tuition information you choose to share, including subjects, classes, qualifications, location and contact preferences.",
      "Application and payment activity needed to provide the service and keep records accurate.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "To create and maintain your account, match students with tutors and show relevant tuition posts.",
      "To process applications, send service-related notifications and provide customer support.",
      "To improve the platform, prevent misuse and meet legal or accounting obligations.",
    ],
  },
  {
    title: "Sharing your information",
    body: [
      "We do not sell your personal information. Profile details you publish, such as your name and tutor information, may be visible to other users of the platform.",
      "We may share limited data with service providers that help us operate the platform, such as hosting and payment processing, under appropriate confidentiality obligations.",
    ],
  },
  {
    title: "Cookies and sessions",
    body: [
      "We use essential cookies and similar storage to keep you signed in and to remember your preferences. Disabling them may prevent parts of the platform from working correctly.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can update or remove the information in your profile at any time from your account settings.",
      "To request deletion of your account or a copy of your data, contact us at support@mentorlagbe.com.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have questions about this policy, email support@mentorlagbe.com and we will respond as soon as possible.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="A plain-language summary of what we collect, why we collect it and the control you have over your data."
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
