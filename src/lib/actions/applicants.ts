"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
