import { getTuitions } from "@/lib/api/tuitions";
import TuitionsClient from "./TuitionsClient";

export default async function AdminTuitionsPage() {
  const tuitions = await getTuitions();

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Tuitions</h1>
        <p className="text-sm text-muted-foreground">
          Manage all tuition posts submitted by tutors.
        </p>
      </div>

      <TuitionsClient initialTuitions={tuitions} />
    </div>
  );
}