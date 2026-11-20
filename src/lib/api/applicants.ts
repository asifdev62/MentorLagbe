
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ApplicantStatus = "Pending" | "Accepted" | "Rejected";

export type Applicant = {
  id?: string;
  _id: string;
  studentName: string;
  email: string;
  phone?: string;
  preferredSchedule?: string;
  note?: string;
  tuitionTitle: string;
  tuitionId?: string;
  classLevel?: string;
  status: ApplicantStatus;
  appliedDate?: string;
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

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Backend not reachable:", error);
    return [];
  }
};



//get user profile 

export const getUserProfile = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
};

// Update Profile
export const updateUserProfile = async (
  id: string,
  data: {
    name?: string;
    phone?: string;
    address?: string;
    image?: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
};