"use server";

import { db } from "@/lib/auth";

export type MembershipPlan = "student" | "tutor";

export type PaymentRecordInput = {
  userId: string;
  email?: string | null;
  plan: MembershipPlan;
  stripeSessionId: string;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  status: "paid" | "processing";
};

const payments = () => db.collection("payments");

/**
 * Persist a Stripe checkout result. The Stripe session id is used as the
 * unique key, so refreshing the success page never creates duplicates.
 */
export async function recordPayment(input: PaymentRecordInput) {
  const now = new Date();

  await payments().updateOne(
    { stripeSessionId: input.stripeSessionId },
    {
      $set: {
        ...input,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true }
  );
}

/**
 * A user is considered premium once they have at least one paid checkout
 * session for the requested plan.
 */
export async function hasActiveMembership(
  userId: string,
  plan: MembershipPlan
): Promise<boolean> {
  if (!userId) return false;

  const record = await payments().findOne({
    userId,
    plan,
    status: "paid",
  });

  return Boolean(record);
}
