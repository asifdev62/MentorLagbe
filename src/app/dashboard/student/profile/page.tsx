import { ProfileView } from "@/components/profile/ProfileView";

export const dynamic = "force-dynamic";

export default function StudentProfilePage() {
  return (
    <div className="p-4 md:p-6">
      <ProfileView />
    </div>
  );
}
