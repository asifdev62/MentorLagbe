import PaymentPageClient from "./PaymentPageClient";

type PaymentPageProps = {
  searchParams: Promise<{
    plan?: string | string[];
    canceled?: string | string[];
  }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;

  const rawPlan = Array.isArray(params.plan) ? params.plan[0] : params.plan;
  const initialPlan = rawPlan === "tutor" ? "tutor" : "student";

  const canceled = Array.isArray(params.canceled)
    ? params.canceled[0] === "true"
    : params.canceled === "true";

  return <PaymentPageClient initialPlan={initialPlan} canceled={canceled} />;
}
