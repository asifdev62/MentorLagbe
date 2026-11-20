"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type UserRole = "student" | "tutor" | "admin";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role?: UserRole;
  image?: string;
  createdAt?: string;
};

export async function getAllUsers(): Promise<AdminUser[]> {
  const response = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}