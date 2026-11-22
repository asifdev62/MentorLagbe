import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  GraduationCap,
  Hash,
  LayoutDashboard,
  Mail,
  Receipt,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import { recordPayment } from "@/lib/actions/payments";

type PaymentSuccessPageProps = {
  searchParams: Promise<{ session_id?: string | string[] }>;
};

type PlanKey = "student" | "tutor";

const PLAN_DETAILS: Record<
  PlanKey,
  {
    name: string;
    tagline: string;
    icon: LucideIcon;
    dashboardHref: string;
    dashboardLabel: string;
    features: string[];
  }
> = {
  student: {
    name: "Student Premium",
    tagline: "Unlimited tuition applications are now unlocked.",
    icon: GraduationCap,
    dashboardHref: "/dashboard/student",
    dashboardLabel: "Go to Student Dashboard",
    features: [
      "Unlimited tuition applications",
      "Complete tuition details",
      "Priority application access",
    ],
  },
  tutor: {
    name: "Tutor Pro",
    tagline: "Unlimited tuition posting is now unlocked.",
    icon: BookOpen,
    dashboardHref: "/dashboard/tutor/manage-tuition",
    dashboardLabel: "Manage Your Tuitions",
    features: [
      "Unlimited tuition posts",
      "Manage student applications",
      "Priority profile visibility",
    ],
  },
};

function formatMoney(amount: number | null | undefined, currency: string | null) {
  if (amount == null) return "—";

  const value = amount / 100;
  const code = (currency ?? "usd").toUpperCase();

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${code} ${value.toFixed(2)}`;
  }
}

function formatDate(unixSeconds: number) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(unixSeconds * 1000));
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5 sm:px-5">
      <dt className="flex items-center gap-2.5 text-sm text-slate-500">
        <Icon size={16} className="shrink-0 text-slate-400" />
        {label}
      </dt>
      <dd className="max-w-[60%] text-right text-sm font-semibold text-slate-800">
        {children}
      </dd>
    </div>
  );
}

function PaymentError({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7FC] px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white text-center shadow-xl shadow-slate-200/50">
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 px-6 py-9 text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
            <XCircle size={34} />
          </div>
          <h1 className="mt-5 text-xl font-extrabold sm:text-2xl">{title}</h1>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-6 text-slate-500">{message}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/payment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066B85]"
            >
              <CreditCard size={16} />
              Try Payment Again
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;

  if (!sessionId) {
    return (
      <PaymentError
        title="Payment reference is missing"
        message="We could not find a checkout session for this page. If you just completed a payment, please open the confirmation link from your receipt or contact support."
      />
    );
  }

  let session: Stripe.Checkout.Session;

  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: [
        "line_items.data.price.product",
        "payment_intent.latest_charge",
        "subscription",
      ],
    });
  } catch {
    return (
      <PaymentError
        title="We couldn't verify this payment"
        message="The payment session is invalid or has expired. Please check your Stripe receipt, or start a new payment from the pricing page."
      />
    );
  }

  const planKey: PlanKey =
    session.metadata?.plan === "tutor" ? "tutor" : "student";
  const plan = PLAN_DETAILS[planKey];
  const PlanIcon = plan.icon;

  // An open session means checkout was never completed. Send the user back
  // to the plan selection instead of showing an empty receipt.
  if (session.status === "open") {
    redirect(`/payment?plan=${planKey}`);
  }

  if (session.status === "expired") {
    return (
      <PaymentError
        title="This checkout session expired"
        message="No payment was taken. Please choose your plan again to create a fresh Stripe checkout session."
      />
    );
  }

  const isPaid =
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required";

  const paymentIntent =
    session.payment_intent && typeof session.payment_intent !== "string"
      ? session.payment_intent
      : null;

  const charge =
    paymentIntent?.latest_charge &&
    typeof paymentIntent.latest_charge !== "string"
      ? paymentIntent.latest_charge
      : null;

  const card = charge?.payment_method_details?.card;
  const cardLabel = card
    ? `${card.brand ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1) : "Card"} •••• ${card.last4 ?? "----"}`
    : session.payment_method_types?.length
      ? session.payment_method_types.join(", ").toUpperCase()
      : "Card";

  const lineItems = session.line_items?.data ?? [];
  const product = lineItems[0]?.price?.product;
  const productName =
    product && typeof product === "object" && "name" in product
      ? product.name
      : plan.name;

  const customerName = session.customer_details?.name?.trim();
  const firstName = customerName?.split(" ")[0];
  const email = session.customer_details?.email ?? session.customer_email;
  const amount = formatMoney(session.amount_total, session.currency);
  const isSubscription = session.mode === "subscription";
  const transactionId = paymentIntent?.id ?? session.id;
  const receiptUrl = charge?.receipt_url ?? null;

  // Save the payment so membership checks can unlock unlimited
  // applications/posts. Refreshing this page is safe (upsert by session id).
  if (session.status === "complete" && session.metadata?.userId) {
    try {
      await recordPayment({
        userId: session.metadata.userId,
        email: email ?? null,
        plan: planKey,
        stripeSessionId: session.id,
        paymentIntentId: paymentIntent?.id ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
        status: isPaid ? "paid" : "processing",
      });
    } catch (error) {
      console.error("Failed to record Stripe payment:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-10 text-slate-800 sm:py-14">
      <div className="mx-auto max-w-3xl">

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

          {/* Header */}
          <div
            className={`relative overflow-hidden px-6 py-10 text-center text-white sm:px-10 ${
              isPaid
                ? "bg-gradient-to-br from-[#087F9F] via-[#0A8FAF] to-[#066B85]"
                : "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600"
            }`}
          >
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                {isPaid ? <CheckCircle2 size={34} /> : <Clock size={34} />}
              </div>

              <p className="mt-5 text-[11px] font-bold tracking-[0.22em] text-white/80 uppercase">
                {isPaid ? "Payment successful" : "Payment processing"}
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {isPaid
                  ? `Thank you${firstName ? `, ${firstName}` : ""}!`
                  : "Almost there!"}
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/85">
                {isPaid
                  ? `Your ${plan.name} membership is active. ${plan.tagline}`
                  : "Your payment is being confirmed by the bank. This page will show the receipt once Stripe marks the payment as paid."}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Amount summary */}
            <div
              className={`flex flex-col items-start justify-between gap-4 rounded-2xl border px-5 py-5 sm:flex-row sm:items-center ${
                isPaid
                  ? "border-emerald-100 bg-emerald-50/70"
                  : "border-amber-100 bg-amber-50/70"
              }`}
            >
              <div>
                <p
                  className={`text-[11px] font-bold tracking-wider uppercase ${
                    isPaid ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {isPaid ? "Amount paid" : "Amount due"}
                </p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900">
                  {amount}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isSubscription
                    ? "Monthly subscription"
                    : "One-time payment"}{" "}
                  · {formatDate(session.created)}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#087F9F]/10 text-[#087F9F]">
                  <PlanIcon size={21} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {plan.name}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-600">
                    {isPaid ? "Active" : "Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <section className="mt-7">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Receipt size={17} className="text-[#087F9F]" />
                Payment details
              </h2>

              <dl className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                <DetailRow icon={Sparkles} label="Membership">
                  {productName}
                </DetailRow>

                <DetailRow icon={CreditCard} label="Payment method">
                  {cardLabel}
                </DetailRow>

                <DetailRow icon={Mail} label="Customer">
                  <span className="block">{customerName ?? "MentorLagbe user"}</span>
                  {email && (
                    <span className="mt-0.5 block text-xs font-normal break-all text-slate-500">
                      {email}
                    </span>
                  )}
                </DetailRow>

                <DetailRow icon={CalendarDays} label="Date">
                  {formatDate(session.created)}
                </DetailRow>

                <DetailRow icon={Hash} label="Transaction ID">
                  <span className="block max-w-[220px] truncate text-xs font-medium text-slate-600 sm:max-w-none">
                    {transactionId}
                  </span>
                </DetailRow>

                <DetailRow icon={ShieldCheck} label="Status">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {isPaid ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {isPaid ? "Paid" : "Processing"}
                  </span>
                </DetailRow>
              </dl>
            </section>

            {/* Order summary */}
            {lineItems.length > 0 && (
              <section className="mt-7">
                <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Receipt size={17} className="text-[#087F9F]" />
                  Order summary
                </h2>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                  <ul className="divide-y divide-slate-100">
                    {lineItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {item.description ?? productName}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Quantity {item.quantity ?? 1}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-slate-800">
                          {formatMoney(item.amount_total, session.currency)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                    <span className="text-sm font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-lg font-extrabold text-[#087F9F]">
                      {amount}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* What's unlocked */}
            {isPaid && (
              <section className="mt-7 rounded-2xl border border-[#087F9F]/10 bg-gradient-to-br from-[#087F9F]/5 to-white p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#066B85]">
                  <Sparkles size={17} />
                  What&apos;s unlocked
                </h2>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#087F9F] text-white">
                        <Check size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={plan.dashboardHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F9F] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#087F9F]/20 transition hover:bg-[#066B85]"
              >
                <LayoutDashboard size={17} />
                {plan.dashboardLabel}
                <ArrowRight size={17} />
              </Link>

              <div className="flex items-center justify-center gap-2">
                {receiptUrl && (
                  <a
                    href={receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <Receipt size={16} />
                    View receipt
                  </a>
                )}

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs leading-5 text-slate-400">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-emerald-600" />
              {isPaid
                ? "A payment confirmation has been sent to your email by Stripe. Keep the transaction ID for your records."
                : "Stripe will update this payment shortly. You can safely close this page and check your email for confirmation."}
            </p>
          </div>
        </div>

        {/* Support */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Need help with this payment?{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#087F9F] transition hover:text-[#066B85]"
          >
            Contact support
          </Link>
        </p>
      </div>
    </main>
  );
}
