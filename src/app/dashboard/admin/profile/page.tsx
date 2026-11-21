import { ProfileView } from "@/components/profile/ProfileView";

export const instant = false;

export default function AdminProfilePage() {
  return (
    <div className="p-4 md:p-6">
      <ProfileView />
    </div>
  );
}
