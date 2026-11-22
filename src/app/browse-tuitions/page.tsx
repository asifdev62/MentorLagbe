import { connection } from "next/server";

import {
  getTuitions,
  type TuitionItem,
} from "@/lib/api/tuitions";

import BrowseTuitions from "./BrowseTuitions";

export const instant = false;

const TuitionsPage = async () => {
  await connection();

  let tuitions: TuitionItem[] = [];

  try {
    tuitions = await getTuitions();
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
  }

  const approvedTuitions = tuitions.filter((item) => {
    const approvalStatus = (item.approvalStatus || "").toLowerCase();
    // Posts created before the `status` field was saved have no status yet.
    // Treat a missing status as active so approved posts stay visible.
    const status = (item.status || "active").toLowerCase();

    return approvalStatus === "approved" && status === "active";
  });

  return (
    <>
      <BrowseTuitions tuitions={approvedTuitions} />
    </>
  );
};

export default TuitionsPage;