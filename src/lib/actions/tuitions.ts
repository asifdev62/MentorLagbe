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
  tuitionType: string;
  area: string;
  preferredDays: string[];
  preferredTime: string;
  duration: string;
  daysPerWeek: string;
  budget: number;
  negotiable: boolean;
  tutorGender: string;
  experience: string;
  description: string;
  contactNumber: string;
  whatsapp: string;
  whatsappSameAsContact: boolean;
};

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
