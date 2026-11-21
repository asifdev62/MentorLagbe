import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getMyProfile } from "@/lib/actions/profile";

import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const profile = await getMyProfile();

  return <EditProfileForm profile={profile} />;
}
