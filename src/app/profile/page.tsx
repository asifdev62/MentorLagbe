import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const role = (
    (session.user as typeof session.user & { role?: string }).role ?? "student"
  ).toLowerCase();

  const dashboardRole =
    role === "tutor" || role === "admin" ? role : "student";

  redirect(`/dashboard/${dashboardRole}/profile`);
}
