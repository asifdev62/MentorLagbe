"use server";

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
);

export type TuitionFormData = {
  title: string;
  classLevel: string;
  subject: string;
  medium: string;
  studentGender: string;
  studentCount: number;
  institution?: string;
  tuitionType: string;
  district?: string;
  area: string;
  landmark?: string;
  preferredDays: string[];
  preferredTime: string;
  duration: string;
  daysPerWeek: string;
  joiningDate?: string;
  budget: number;
  negotiable: boolean;
  tutorGender: string;
  tutorUniversity?: string;
  tutorDepartment?: string;
  experience: string;
  description: string;
  guardianName?: string;
  guardianRelation?: string;
  contactNumber: string;
  whatsapp: string;
  whatsappSameAsContact: boolean;
  // Ownership: the tutor who created the post
  userId?: string;
  tutorEmail?: string;
  approvalStatus?: string;
  tuitionId?: string;
};



//add tuition
export const addTuitions = async (data: TuitionFormData) => {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}/tuitions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      `Could not connect to the API server at ${BASE_URL}. Make sure the backend is running.`
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to add tuition (${res.status})`);
  }

  return res.json();
};




//delete tuition
export const deleteTuition = async (id: string) => {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}/tuitions/${id}`, {
      method: "DELETE",
    });
  } catch {
    throw new Error(
      `Could not connect to the API server at ${BASE_URL}. Make sure the backend is running.`
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to delete tuition (${res.status})`);
  }

  return res.json();
};



//update tuition
export const updateTuition = async (
  id: string,
  data: Partial<TuitionFormData> & {
    status?: string;
    approvalStatus?: string;
  }
) => {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}/tuitions/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      `Could not connect to the API server at ${BASE_URL}. Make sure the backend is running.`
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to update tuition (${res.status})`);
  }

  return res.json();
};



 
