
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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

// Verify Admin
async function verifyAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
}

// Get All Users
export async function getAllUsers(): Promise<AdminUser[]> {
  await verifyAdmin();

  const response = await fetch(`${BASE_URL}/admin/users`, {
    method: "GET",
    headers: {
      "x-admin-api-secret": process.env.ADMIN_API_SECRET || "",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.users;
}

// Update User Role
export async function updateUserRole(
  userId: string,
  role: UserRole
) {
  await verifyAdmin();

  const response = await fetch(
    `${BASE_URL}/admin/users/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-api-secret": process.env.ADMIN_API_SECRET || "",
      },
      body: JSON.stringify({ role }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    return {
      success: false,
      message: data.message || "Failed to update user role",
    };
  }

  revalidatePath("/dashboard/admin/users");

  return {
    success: true,
    message: data.message,
  };
}
