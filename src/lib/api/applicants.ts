const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ApplicantStatus = "Pending" | "Accepted" | "Rejected";

export type Applicant = {
  id: string;
  _id?: string;
  studentName: string;
  email: string;
  phone: string;
  preferredSchedule: string;
  note: string;
  tuitionTitle: string;
  tuitionId?: string;
  classLevel?: string;
  status: ApplicantStatus;
  appliedDate: string;
  avatar?: string;
};

export const getApplicants = async (): Promise<Applicant[]> => {
  try {
    const res = await fetch(`${BASE_URL}/applications`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.applications || [];
  } catch (error) {
    console.warn("Backend not reachable at", BASE_URL, "; using fallback data.", error);
    return [];
  }
};
