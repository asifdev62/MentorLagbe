import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mentorlagbe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MentorLagbe — Find the Right Tutor in Bangladesh",
    template: "%s | MentorLagbe",
  },
  description:
    "MentorLagbe connects students and parents with verified home, online, crash-course and batch tutors across Bangladesh. Browse tuition opportunities or apply as a tutor in minutes.",
  keywords: [
    "MentorLagbe",
    "tutor Bangladesh",
    "home tutor Dhaka",
    "online tutor",
    "tuition",
    "private tutor",
    "find a tutor",
  ],
  applicationName: "MentorLagbe",
  authors: [{ name: "MentorLagbe" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MentorLagbe",
    title: "MentorLagbe — Find the Right Tutor in Bangladesh",
    description:
      "Verified tutors, personalized tuition batches and a simple application flow. Find the right tutor for your learning journey.",
    locale: "en_US",
    images: [
      {
        url: "/images/mentorlagbe-student-tutor.png",
        width: 1280,
        height: 1217,
        alt: "A tutor helping a student learn online with MentorLagbe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MentorLagbe — Find the Right Tutor in Bangladesh",
    description:
      "Verified tutors, personalized tuition batches and a simple application flow.",
    images: ["/images/mentorlagbe-student-tutor.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#087F9F",
  colorScheme: "light",
};

export const instant = false;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{ duration: 3500 }}
        />
      </body>
    </html>
  );
}
