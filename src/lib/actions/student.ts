
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Verify Student
async function getStudent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Please login first");
  }

  if (session.user.role !== "student") {
    throw new Error("Only students can access this feature");
  }

  return session.user;
}

// API Headers
async function getApiHeaders() {
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret || !BASE_URL) {
    throw new Error("API configuration is missing");
  }

  return {
    "Content-Type": "application/json",
    "x-admin-api-secret": secret,
  };
}

// Add Bookmark
export async function addBookmark(tuitionId: string) {
  try {
    const student = await getStudent();

    const response = await fetch(`${BASE_URL}/bookmarks`, {
      method: "POST",
      headers: await getApiHeaders(),
      body: JSON.stringify({
        tuitionId,
        studentEmail: student.email,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Bookmark failed",
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

// Get Bookmarks
export async function getBookmarks() {
  try {
    const student = await getStudent();

    const response = await fetch(
      `${BASE_URL}/bookmarks?studentEmail=${encodeURIComponent(
        student.email
      )}`,
      {
        headers: await getApiHeaders(),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch bookmarks");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      bookmarks: [],
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

// Remove Bookmark
export async function removeBookmark(tuitionId: string) {
  try {
    const student = await getStudent();

    const response = await fetch(
      `${BASE_URL}/bookmarks/${tuitionId}`,
      {
        method: "DELETE",
        headers: await getApiHeaders(),
        body: JSON.stringify({
          studentEmail: student.email,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove bookmark",
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}
