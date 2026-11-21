
import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import Navbar from "../components/navbar";
import { PricingCards } from "../components/pricing-cards";

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-[#F4F7FC]">
        <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-12 text-center">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#087F9F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-52 h-52 bg-[#087F9F]/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/10 px-4 py-2 text-sm font-semibold text-[#087F9F] mb-5">
            <Sparkles size={16} />
            Simple & Transparent Pricing
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Choose the Right Plan for Your{" "}
            <span className="text-[#087F9F]">Learning Journey</span>
          </h1>

          <p className="mt-5 text-slate-500 text-sm sm:text-base leading-7 max-w-2xl mx-auto">
            Whether you are looking for a tutor or want to teach students,
            MentorLagbe has a plan that fits your needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <PricingCards />
      </section>

      {/* Benefits Section */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#087F9F] px-6 py-10 sm:p-12 text-center text-white">
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
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#087F9F] transition hover:bg-slate-100"
          >
            Join MentorLagbe
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:text-left shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
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
            className="text-sm font-semibold text-[#087F9F] hover:text-[#066B85] transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
