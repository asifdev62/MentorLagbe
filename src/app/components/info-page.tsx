import type { ReactNode } from "react";

import Navbar from "./navbar";
import Footer from "./footer";

type InfoPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
};

/**
 * Shared shell for static marketing / legal pages so they stay consistent
 * with the homepage navbar, footer and typography.
 */
export default function InfoPage({
  eyebrow,
  title,
  description,
  children,
}: InfoPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-100 bg-brand-soft px-5 pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-brand uppercase">
            {eyebrow}
          </span>

          <h1
            className="hero-rise mt-5 text-3xl font-extrabold tracking-tight text-[#111B35] sm:text-4xl lg:text-[44px]"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>

          <p
            className="hero-rise mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-14 lg:py-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}
