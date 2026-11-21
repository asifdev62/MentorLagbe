
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  CreditCard,
  ShieldCheck,
  Lock,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("student");

  const plans = [
    {
      id: "student",
      name: "Student Premium",
      subtitle: "Find your perfect tutor",
      price: 199,
      duration: "per month",
      description:
        "Get more opportunities to find the right tuition and achieve your learning goals.",
      icon: GraduationCap,
      popular: true,
      features: [
        "Browse all available tuitions",
        "Unlimited tuition applications",
        "Track application status",
        "Access complete tuition details",
        "Priority application access",
        "Priority customer support",
      ],
    },
    {
      id: "tutor",
      name: "Tutor Pro",
      subtitle: "Grow your tutoring career",
      price: 299,
      duration: "per month",
      description:
        "Build your professional profile and connect with more students.",
      icon: BookOpen,
      popular: false,
      features: [
        "Create a professional tutor profile",
        "Post tuition opportunities",
        "Manage student applications",
        "Connect with potential students",
        "Priority profile visibility",
        "Priority customer support",
      ],
    },
  ];

  const currentPlan = plans.find((plan) => plan.id === selectedPlan)!;
  const PlanIcon = currentPlan.icon;

  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-10 sm:py-14 text-slate-800">
      <div className="mx-auto max-w-6xl">

        {/* Back Navigation */}
        <Link
          href="/pricing"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#087F9F]"
        >
          <ArrowLeft size={17} />
          Back to Pricing
        </Link>

        {/* Header */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-white border border-slate-200/80 px-6 py-10 sm:px-10 text-center shadow-sm">
          <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#087F9F]/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#087F9F]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F9F]/10 text-[#087F9F]">
              <CreditCard size={28} />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#087F9F]/10 px-4 py-2 text-xs font-bold text-[#087F9F]">
              <Sparkles size={14} />
              MentorLagbe Premium
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Choose Your{" "}
              <span className="text-[#087F9F]">Membership</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Select the membership that matches your goals and unlock more
              opportunities with MentorLagbe.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-5">

          {/* Left Side */}
          <div className="space-y-7 lg:col-span-3">

            {/* Plan Selection */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Select Your Plan
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Choose a membership based on your account type.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                        isSelected
                          ? "border-[#087F9F] bg-[#087F9F]/5 shadow-lg shadow-[#087F9F]/10"
                          : "border-slate-200 bg-white hover:border-[#087F9F]/40"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 right-4 rounded-full bg-[#087F9F] px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-md">
                          POPULAR
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
                          <Icon size={25} />
                        </div>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#087F9F] bg-[#087F9F] text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check size={13} />}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-900">
                        {plan.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {plan.subtitle}
                      </p>

                      <div className="mt-5 flex items-end gap-2">
                        <span className="text-3xl font-extrabold text-slate-900">
                          ৳{plan.price}
                        </span>
                        <span className="mb-1 text-xs text-slate-500">
                          / month
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-6 text-slate-500">
                        {plan.description}
                      </p>

                      <div
                        className={`mt-5 rounded-lg py-2.5 text-center text-xs font-bold transition ${
                          isSelected
                            ? "bg-[#087F9F] text-white"
                            : "bg-[#087F9F]/5 text-[#087F9F]"
                        }`}
                      >
                        {isSelected ? "Selected Plan" : "Choose This Plan"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Selected Plan Features */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
                  <PlanIcon size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    What&apos;s Included
                  </h2>
                  <p className="text-xs text-slate-500">
                    Benefits of {currentPlan.name}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {currentPlan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#087F9F]/10 text-[#087F9F]">
                      <Check size={14} />
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side - Order Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">

              {/* Summary Header */}
              <div className="bg-[#087F9F] px-6 py-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <CreditCard size={23} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Order Summary</h2>
                    <p className="text-xs text-white/75">
                      Review your membership
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">

                {/* Selected Plan */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
                    <PlanIcon size={25} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      {currentPlan.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Monthly Membership
                    </p>
                  </div>

                  <span className="rounded-full bg-[#087F9F]/10 px-2.5 py-1 text-[10px] font-bold text-[#087F9F]">
                    Active Plan
                  </span>
                </div>

                <div className="my-6 border-t border-dashed border-slate-200" />

                {/* Price Details */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Plan Price</span>
                    <span className="font-semibold text-slate-700">
                      ৳{currentPlan.price}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>Billing Cycle</span>
                    <span className="font-medium text-slate-700">
                      Monthly
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      ৳0
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-slate-200" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Total Amount
                  </span>

                  <span className="text-3xl font-extrabold text-[#087F9F]">
                    ৳{currentPlan.price}
                  </span>
                </div>

                {/* Payment Method */}
                <div className="mt-7">
                  <h3 className="mb-3 text-sm font-bold text-slate-800">
                    Payment Method
                  </h3>

                  <div className="flex items-center justify-between rounded-xl border-2 border-[#087F9F] bg-[#087F9F]/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#087F9F] shadow-sm">
                        <CreditCard size={22} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Stripe Checkout
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          Secure online payment
                        </p>
                      </div>
                    </div>

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#087F9F] text-white">
                      <Check size={13} />
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Lock size={13} />
                    Secure payment powered by Stripe
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={() => alert("Payment integration coming soon!")}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#087F9F]/20 transition hover:bg-[#066B85] active:scale-[0.98]"
                >
                  <Lock size={16} />
                  Continue to Payment
                  <ArrowRight size={17} />
                </button>

                {/* Security */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={16} className="text-green-600" />
                  Your payment information is secure
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Support */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/10 text-[#087F9F]">
            <Headphones size={23} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Need help with your payment?
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Contact our support team if you have any questions.
            </p>
          </div>

          <Link
            href="/contact"
            className="text-sm font-bold text-[#087F9F] transition hover:text-[#066B85] sm:ml-auto"
          >
            Contact Support →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            © 2026 MentorLagbe. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
