import "server-only";

import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily create the Stripe client so importing this module never throws
 * during `next build` when deployment secrets are not available yet.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Add it to your environment variables."
    );
  }

  stripeClient ??= new Stripe(secretKey);

  return stripeClient;
}
