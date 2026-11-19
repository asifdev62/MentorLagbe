const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ActiveStatus = "active" | "closed";

export type TuitionItem = {
  _id?: string;
  id?: string;
  title: string;
  classLevel: string;
  subject: string;
  medium?: string;
  studentGender?: string;
  studentCount?: number;
  institution?: string;
  tuitionType: string;
  district?: string;
  area: string;
  landmark?: string;
  preferredDays?: string[];
  preferredTime?: string;
  duration?: string;
  daysPerWeek?: string;
  joiningDate?: string;
  budget: number;
  negotiable?: boolean;
  tutorGender?: string;
  tutorUniversity?: string;
  tutorDepartment?: string;
  experience?: string;
  description?: string;
  guardianName?: string;
  guardianRelation?: string;
  contactNumber?: string;
  whatsapp?: string;
  status?: ActiveStatus | string;
  approvalStatus?: ApprovalStatus | string;
  tutorEmail?: string;
  userId?: string;
  createdAt?: string;
  applicantCount?: number;
};

export const getTuitions = async (): Promise<TuitionItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/tuitions`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Failed to fetch tuitions: HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.tuitions || [];
  } catch (error) {
    console.warn("Backend not reachable at", BASE_URL, error);
    return [];
  }
};
