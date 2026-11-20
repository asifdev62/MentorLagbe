"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";



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
