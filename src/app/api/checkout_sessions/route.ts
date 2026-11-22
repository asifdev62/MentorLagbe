import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { getStripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

type Plan = "student" | "tutor";

/**
 * Stripe price IDs for each MentorLagbe membership.
 *
 * Tutor Pro price is attached to product `prod_VfrkyWOFuhW321`.
 * Override either value with an environment variable when moving between
 * Stripe test/live mode.
 */
const PRICE_IDS: Record<Plan, string> = {
  student:
    process.env.STRIPE_STUDENT_PRICE_ID ??
    process.env.STRIPE_PRICE_ID ??
    "price_1UeLq9RxznHYYJr5vwhDqRGo",
  tutor:
    process.env.STRIPE_TUTOR_PRICE_ID ?? "price_1UeW0ZRxznHYYJr5mm7hD5yB",
};

export async function POST(request: Request) {
  try {
    const userSession = await getSession();

    if (!userSession?.user) {
      return NextResponse.redirect(
        `${new URL(request.url).origin}/auth/sign-in?redirectTo=%2Fpayment`,
        303
      );
    }

    const headersList = await headers();
    const origin =
      headersList.get("origin") ??
      process.env.BETTER_AUTH_URL ??
      new URL(request.url).origin;

    const formData = await request.formData();
    const plan: Plan = formData.get("plan") === "tutor" ? "tutor" : "student";
    const priceId = PRICE_IDS[plan];

    const stripe = getStripe();

    // Support both one-time and monthly recurring prices.
    const price = await stripe.prices.retrieve(priceId);
    const mode = price.type === "recurring" ? "subscription" : "payment";

    const metadata = {
      plan,
      userId: userSession.user.id,
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      customer_email: userSession.user.email,
      metadata,
      // Keep the plan on the subscription too, so it can be read later
      // from webhooks or the success page.
      ...(mode === "subscription"
        ? { subscription_data: { metadata } }
        : {}),
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?plan=${plan}&canceled=true`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
