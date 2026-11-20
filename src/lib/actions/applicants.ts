
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


// Get Current User
const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Please sign in to continue.");
  }

  return session.user;
};


// Application Types
export type ApplicationData = {
  tuitionId: string;
  tuitionTitle: string;
  classLevel?: string;
  studentName: string;
  email: string;
  userId: string;
  tutorEmail: string;
  phone?: string;
  preferredSchedule?: string;
  note?: string;
  status?: "Pending" | "Accepted" | "Rejected";
  appliedDate?: string;
};


export type ApplicationStatus =
  | "Pending"
  | "Accepted"
  | "Rejected";


export type ApplicationItem = {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  classLevel?: string;
  studentName: string;
  email: string;
  userId: string;
  tutorEmail?: string;
  phone?: string;
  preferredSchedule?: string;
  note?: string;
  status: ApplicationStatus;
  appliedDate?: string;
  tutorName?: string;
  monthlyFee?: number;
};


export interface TutorApplicant {
  _id: string;
  tuitionId: string;
  userId: string;
  studentName: string;
  email: string;
  tutorEmail?: string;
  phone?: string;
  tuitionTitle: string;
  classLevel?: string;
  preferredSchedule?: string;
  appliedDate?: string;
  note?: string;
  status: ApplicationStatus;
}



// Apply for Tuition
export const applyToATuition = async (data: ApplicationData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      status: "Pending",
      appliedDate: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit application");
  }

  return res.json();
};


// Get My Applications
export const getMyApplications = async (): Promise<ApplicationItem[]> => {
  const user = await getCurrentUser();

  const res = await fetch(
    `${BASE_URL}/applications?userId=${encodeURIComponent(user.id)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
};


// Cancel Application
export const cancelApplication = async (id: string) => {
  const user = await getCurrentUser();

  const res = await fetch(
    `${BASE_URL}/applications/${id}?userId=${encodeURIComponent(user.id)}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to cancel application");
  }

  return res.json();
};


// Get Single Application
export const getApplicationById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch application");
  }

  return res.json();
};


// Update Applicant Status
export const updateApplicantStatus = async (
  id: string,
  status: "Accepted" | "Rejected"
) => {
  const res = await fetch(
    `${BASE_URL}/applications/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    return {
      success: false,
      message: `Server responded with ${res.status}`,
    };
  }

  return res.json();
};


// Get Tutor Applicants
export const getTutorApplicants = async (
  email: string
): Promise<TutorApplicant[]> => {
  const res = await fetch(
    `${BASE_URL}/applications/tutor/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch applicants");
  }

  return res.json();
};
