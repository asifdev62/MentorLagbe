import { getTuitions, type TuitionItem } from "@/lib/api/tuitions";

import StudentBrowseTuitions from "./StudentBrowseTuitions";

export const instant = false;

const StudentBrowseTuitionsPage = async () => {
  let tuitions: TuitionItem[] = [];

  try {
    tuitions = await getTuitions();
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
  }

  const availableTuitions = tuitions.filter((item) => {
    const status = (item.status || "active").toLowerCase();
    const approvalStatus = (item.approvalStatus || "approved").toLowerCase();

    return status === "active" && approvalStatus === "approved";
  });

  return <StudentBrowseTuitions tuitions={availableTuitions} />;
};

export default StudentBrowseTuitionsPage;
