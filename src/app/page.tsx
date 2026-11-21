import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import HeroSection from "./components/banner";
import TheWayes from "./components/TheWaye";
import TutoringMethod from "./components/tutoring-method";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { PricingCards } from "./components/pricing-cards";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
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
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/10 px-4 py-2 text-xs font-semibold text-[#087F9F] sm:text-sm">
            <Sparkles size={15} />
            Simple &amp; Transparent Pricing
          </span>

          <h2 className="mt-5 text-balance text-2xl leading-snug font-bold tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
            Choose the Right Plan for Your{" "}
            <span className="text-[#087F9F]">Learning Journey</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5B6472] sm:text-base">
            Whether you are looking for a tutor or want to teach students,
            MentorLagbe has a plan that fits your needs.
          </p>
        </div>

        <div className="mt-12">
          <PricingCards />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087F9F] transition-colors hover:text-[#066B85]"
          >
            Compare all plans
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
