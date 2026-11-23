import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import HeroSection from "./components/banner";
import TheWayes from "./components/TheWaye";
import TutoringMethod from "./components/tutoring-method";
import SubjectMarquee from "./components/subject-marquee";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { PricingCards } from "./components/pricing-cards";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SubjectMarquee />
      <TheWayes />
      <TutoringMethod />
      <PricingSection />
      <Footer />
    </div>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#F4F7FC] px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[#087F9F]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 -bottom-24 h-72 w-72 rounded-full bg-[#087F9F]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-semibold text-brand sm:text-sm">
              <Sparkles size={15} />
              Simple &amp; Transparent Pricing
            </span>

            <h2 className="mt-5 text-balance text-2xl leading-snug font-bold tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
              Choose the Right Plan for Your{" "}
              <span className="text-brand">Learning Journey</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5B6472] sm:text-base">
              Whether you are looking for a tutor or want to teach students,
              MentorLagbe has a plan that fits your needs.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <PricingCards />
        </div>

        <Reveal delay={120}>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark"
            >
              Compare all plans
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
