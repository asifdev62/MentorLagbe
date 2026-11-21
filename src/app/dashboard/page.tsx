import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const role = (session.user as { role?: string }).role?.toLowerCase();

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  if (role === "tutor") {
    redirect("/dashboard/tutor");
  }

  redirect("/dashboard/student");
}
