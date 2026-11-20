import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import {
  getMyApplications,
  type ApplicationItem,
} from "@/lib/actions/applicants";
import MyApplicationsClient from "./MyApplicationsClient";

export const instant = false;

const MyApplicationPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(
      "/auth/sign-in?redirectTo=/dashboard/student/my-application"
    );
  }

  const role = (
    (session.user as { role?: string }).role ?? "student"
  ).toLowerCase();

  if (role === "tutor") {
    redirect("/dashboard/tutor");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  let applications: ApplicationItem[] = [];
  let loadError = "";

  try {
    applications = await getMyApplications();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Failed to load your applications.";
  }

  return (
    <MyApplicationsClient
      initialApplications={applications}
      initialError={loadError}
    />
  );
};

export default MyApplicationPage;
