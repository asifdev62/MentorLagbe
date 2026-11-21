import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

const PRICE_ID =
  process.env.STRIPE_PRICE_ID ?? "price_1UeLq9RxznHYYJr5vwhDqRGo";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") ??
      process.env.BETTER_AUTH_URL ??
      "http://localhost:3000";

    const formData = await request.formData();
    const plan = formData.get("plan") === "tutor" ? "tutor" : "student";

    // Support both one-time and monthly recurring prices.
    const price = await stripe.prices.retrieve(PRICE_ID);
    const mode = price.type === "recurring" ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode,
      metadata: { plan },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?canceled=true`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
