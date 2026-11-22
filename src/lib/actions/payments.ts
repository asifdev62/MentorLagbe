"use server";

import { ObjectId } from "mongodb";

import { db } from "@/lib/auth";

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
);

const payments = () => db.collection("payments");
const users = () => db.collection("user");

/**
 * Ask the backend to verify a Stripe checkout session. The backend inserts
 * the payment record and sets `premium: true` on the user document.
 */
export const checkoutVerify = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/payment/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Payment verification failed (${response.status})`);
  }

  return response.json();
};

/**
 * Verify a session once. Re-opening the success page will not insert
 * duplicate payment rows for a session that is already recorded.
 */
export async function verifyCheckout(sessionId: string) {
  try {
    const existing = await payments().findOne({
      $or: [
        { sessionId, payment_status: "paid" },
        { stripeSessionId: sessionId, status: "paid" },
      ],
    });

    if (existing) {
      return { success: true, alreadyVerified: true };
    }
  } catch {
    // If the lookup fails, let the backend decide.
  }

  return checkoutVerify(sessionId);
}

/**
 * A user is premium when the backend has flagged the user document.
 * Falls back to the payments collection for older records.
 */
export async function hasActiveMembership(userId: string): Promise<boolean> {
  if (!userId || !ObjectId.isValid(userId)) return false;

  try {
    const user = await users().findOne(
      { _id: new ObjectId(userId) },
      { projection: { premium: 1 } }
    );

    if (user?.premium === true) return true;

    const payment = await payments().findOne({
      $or: [
        { userid: userId, payment_status: "paid" },
        { userId: userId, status: "paid" },
      ],
    });

    return Boolean(payment);
  } catch {
    return false;
  }
}

export type AdminPayment = {
  _id: string;
  sessionId: string | null;
  userId: string;
  userName: string;
  email: string | null;
  role: string;
  plan: string;
  planName: string;
  amount: number | null;
  currency: string | null;
  status: string | null;
  transactionId: string | null;
  paymentDate: string | null;
};

/**
 * Load every payment record for the admin payments page.
 */
export async function getPayments(): Promise<AdminPayment[]> {
  const response = await fetch(`${BASE_URL}/payments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}
