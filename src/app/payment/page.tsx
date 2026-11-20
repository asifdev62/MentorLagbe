
"use client";

import React, { useState } from "react";
import {
  Check,
  CreditCard,
  ShieldCheck,
  Lock,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const plans = [
    {
      id: "monthly",
      name: "Monthly Plan",
      price: 99,
      duration: "per month",
      description: "Perfect for getting started",
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: 999,
      duration: "per year",
      description: "Save more with yearly billing",
      popular: true,
    },
  ];

  const currentPlan = plans.find((plan) => plan.id === selectedPlan)!;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <CreditCard size={28} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Complete Your Payment
            </h1>

            <p className="mt-3 text-slate-500">
              Choose your plan and unlock more opportunities with Taka Lagbe.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">

          {/* Left Side - Plans */}
          <div className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold">Choose Your Plan</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a subscription that works for you.
              </p>

              <div className="mt-6 space-y-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative w-full rounded-xl border-2 p-5 text-left transition ${
                      selectedPlan === plan.id
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        Best Value
                      </span>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{plan.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {plan.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">
                          ৳{plan.price}
                        </p>
                        <p className="text-xs text-slate-500">
                          {plan.duration}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">
                        {plan.id === "monthly"
                          ? "Billed monthly"
                          : "Billed yearly"}
                      </span>

                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selectedPlan === plan.id
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {selectedPlan === plan.id && <Check size={13} />}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold">What You Get</h2>

              <div className="mt-5 space-y-4">
                {[
                  "Apply for more tuition opportunities",
                  "Access to premium features",
                  "Manage your applications easily",
                  "Get more chances to connect with tutors",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check size={15} />
                    </span>
                    <p className="text-sm text-slate-600">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Checkout */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{currentPlan.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {currentPlan.duration}
                  </p>
                </div>
                <p className="font-bold">৳{currentPlan.price}</p>
              </div>

              <div className="my-6 border-t border-dashed border-slate-200" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>৳{currentPlan.price}</span>
                </div>

                <div className="flex justify-between text-slate-500">
                  <span>Discount</span>
                  <span className="font-medium text-green-600">৳0</span>
                </div>
              </div>

              <div className="my-6 border-t border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="font-bold">Total Amount</span>
                <span className="text-3xl font-bold text-blue-600">
                  ৳{currentPlan.price}
                </span>
              </div>

              {/* Payment Method */}
              <div className="mt-7">
                <h3 className="mb-3 text-sm font-bold">Payment Method</h3>

                <div className="flex items-center justify-between rounded-xl border-2 border-blue-600 bg-blue-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <p className="font-semibold">Stripe Checkout</p>
                      <p className="text-xs text-slate-500">
                        Secure online payment
                      </p>
                    </div>
                  </div>

                  <span className="h-4 w-4 rounded-full border-4 border-blue-600" />
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock size={13} />
                  Secure payment powered by Stripe
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => alert("Stripe integration coming soon!")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <Lock size={17} />
                Checkout ৳{currentPlan.price}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={16} className="text-green-600" />
                Your payment information is secure
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Zap size={15} className="text-blue-600" />
            Thank you for choosing Taka Lagbe
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
