"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const getCurrentUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Please sign in to continue.");
  }

  return session.user;
};



//application
export type ApplicationData = {
  tuitionId: string;
  tuitionTitle: string;
  classLevel?: string;
  studentName: string;
  email: string;
  userId: string;
  status?: "Pending";
  appliedDate?: string;
};

export type ApplicationStatus = "Pending" | "Accepted" | "Rejected";

export type ApplicationItem = {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  classLevel?: string;
  studentName: string;
  email: string;
  userId: string;
  status: ApplicationStatus | string;
  appliedDate?: string;
  tutorName?: string;
  tutorEmail?: string;
  monthlyFee?: number;
};

export const applyToATuition = async (data: ApplicationData) => {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}/applications`, {
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
    throw new Error(`Failed to submit application (${res.status})`);
  }

  return res.json();
};



//applications of the signed-in student
export const getMyApplications = async (): Promise<ApplicationItem[]> => {
  const user = await getCurrentUser();

  let res: Response;

  try {
    res = await fetch(
      `${BASE_URL}/applications?userId=${encodeURIComponent(user.id)}`,
      { cache: "no-store" }
    );
  } catch {
    throw new Error(
      `Could not connect to the API server at ${BASE_URL}. Make sure the backend is running.`
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch applications (${res.status})`);
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
};



//cancel/delete a pending application
export const cancelApplication = async (id: string) => {
  const user = await getCurrentUser();

  let res: Response;

  try {
    res = await fetch(
      `${BASE_URL}/applications/${id}?userId=${encodeURIComponent(user.id)}`,
      { method: "DELETE" }
    );
  } catch {
    throw new Error(
      `Could not connect to the API server at ${BASE_URL}. Make sure the backend is running.`
    );
  }

  if (!res.ok) {
    let message = `Failed to cancel application (${res.status})`;

    try {
      const body = await res.json();

      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Keep the default message when the response is not JSON.
    }

    throw new Error(message);
  }

  return res.json();
};



//application get 
export const getApplicationById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch application");
    }

    return await res.json();
  } catch (error) {
    console.error("Get application error:", error);
    throw error;
  }
};


  //update application

export const updateApplicantStatus = async (
  id: string,
  status: "Accepted" | "Rejected"
) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      return { success: false, message: `Server responded with ${res.status}` };
    }

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Backend server not reachable",
    };
  }
};
