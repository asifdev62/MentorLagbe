import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AlertTriangle, CreditCard } from "lucide-react";

import { auth } from "@/lib/auth";
import { getPayments, type AdminPayment } from "@/lib/actions/payments";
import PaymentsClient from "./PaymentsClient";

export const instant = false;

export default async function AdminPaymentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in?redirectTo=/dashboard/admin/payments");
  }

  const role = (
    (session.user as typeof session.user & { role?: string }).role ?? "student"
  ).toLowerCase();

  if (role !== "admin") {
    redirect(role === "tutor" ? "/dashboard/tutor" : "/dashboard/student");
  }

  let payments: AdminPayment[] = [];
  let errorMessage = "";

  try {
    payments = await getPayments();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load payments";
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F9F] to-[#066B85] text-white shadow-lg shadow-[#087F9F]/25">
            <CreditCard size={21} />
          </span>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
              Payments
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Every Stripe premium payment made by students and tutors.
            </p>
          </div>
        </div>

        {!errorMessage && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#087F9F]/20 bg-[#087F9F]/5 px-3.5 py-1.5 text-xs font-semibold text-[#066B85]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#087F9F] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#087F9F]" />
            </span>
            {payments.length} payment{payments.length === 1 ? "" : "s"} recorded
          </span>
        )}
      </div>

      {errorMessage ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <AlertTriangle size={17} />
          </span>
          <div>
            <p className="font-semibold">Could not load payments</p>
            <p className="mt-0.5 text-rose-600/90">{errorMessage}</p>
          </div>
        </div>
      ) : (
        <PaymentsClient initialPayments={payments} />
      )}
    </div>
  );
}
