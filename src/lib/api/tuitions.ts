
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ActiveStatus = "active" | "closed";

export type TuitionItem = {
  _id: string;
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

// Get all tuitions
export const getTuitions = async (): Promise<TuitionItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/tuitions`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
    return [];
  }
};

// Get single tuition by ID
export const getTuitionById = async (
  id: string
): Promise<TuitionItem | null> => {
  try {
    const res = await fetch(`${BASE_URL}/tuitions/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tuition:", error);
    return null;
  }
};
