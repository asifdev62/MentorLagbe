import {
  getTuitions,
  type TuitionItem,
} from "@/lib/api/tuitions";

import BrowseTuitions from "./BrowseTuitions";
import Navbar from "../components/navbar";

const TuitionsPage = async () => {
  let tuitions: TuitionItem[] = [];

  try {
    tuitions = await getTuitions();
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
  }

  const approvedTuitions = tuitions.filter(
    (item) =>
      item.approvalStatus?.toLowerCase() === "approved" &&
      item.status?.toLowerCase() === "active"
  );

  return (
    <>
      <Navbar />
      <BrowseTuitions tuitions={approvedTuitions} />
    </>
  );
};

export default TuitionsPage;