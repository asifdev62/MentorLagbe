"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import type { TuitionItem } from "@/lib/api/tuitions";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ProfileUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  emailVerified?: boolean;
};

export type UpdateProfileInput = {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
};

export type UpdateProfileResult = {
  success: boolean;
  message: string;
};

const getSessionUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Please sign in to continue.");
  }

  return session.user;
};

const normalizeRole = (role?: string) => {
  if (role === "tutor" || role === "admin") return role;
  return "student";
};

const toIsoString = (value: unknown): string | undefined => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }

  if (typeof value === "string") return value;

  return undefined;
};

// Get the signed-in user's full profile from the backend.
export async function getMyProfile(): Promise<ProfileUser> {
  const user = await getSessionUser();
  const sessionRole = normalizeRole(
    (user as typeof user & { role?: string }).role
  );

  try {
    const response = await fetch(`${BASE_URL}/users/${user.id}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      if (data) {
        return {
          ...data,
          _id: data._id ?? user.id,
          id: data.id ?? user.id,
          name: data.name ?? user.name,
          email: data.email ?? user.email,
          role: normalizeRole(data.role ?? sessionRole),
          createdAt: toIsoString(data.createdAt),
        };
      }
    }
  } catch (error) {
    console.warn("Could not load profile from backend:", error);
  }

  // Fallback to the session data when the API is unreachable.
  return {
    id: user.id,
    _id: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? undefined,
    role: sessionRole,
    createdAt: toIsoString(
      (user as typeof user & { createdAt?: unknown }).createdAt
    ),
  };
}

// Update the signed-in user's editable profile fields.
export async function updateMyProfile(
  input: UpdateProfileInput
): Promise<UpdateProfileResult> {
  let user;

  try {
    user = await getSessionUser();
  } catch {
    return { success: false, message: "Please sign in to continue." };
  }

  const payload: Record<string, string> = {};

  if (typeof input.name === "string") {
    const name = input.name.trim();

    if (name.length < 2) {
      return {
        success: false,
        message: "Name must be at least 2 characters long.",
      };
    }

    if (name.length > 80) {
      return {
        success: false,
        message: "Name cannot be longer than 80 characters.",
      };
    }

    payload.name = name;
  }

  if (typeof input.phone === "string") {
    const phone = input.phone.trim();

    if (phone.length > 30) {
      return {
        success: false,
        message: "Phone number cannot be longer than 30 characters.",
      };
    }

    payload.phone = phone;
  }

  if (typeof input.address === "string") {
    const address = input.address.trim();

    if (address.length > 300) {
      return {
        success: false,
        message: "Address cannot be longer than 300 characters.",
      };
    }

    payload.address = address;
  }

  if (typeof input.image === "string") {
    const image = input.image.trim();

    if (image && !/^https?:\/\//i.test(image)) {
      return {
        success: false,
        message: "Profile image must be a valid http(s) URL.",
      };
    }

    payload.image = image;
  }

  if (Object.keys(payload).length === 0) {
    return { success: false, message: "Nothing to update." };
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Could not update your profile (server responded with ${response.status}).`,
      };
    }
  } catch {
    return {
      success: false,
      message: `Could not reach the API server at ${BASE_URL}. Make sure the backend is running.`,
    };
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/dashboard");

  return { success: true, message: "Profile updated successfully." };
}

// Get every tuition post owned by the signed-in tutor.
export async function getMyTuitions(): Promise<TuitionItem[]> {
  const user = await getSessionUser();
  const email = user.email?.toLowerCase();

  try {
    const response = await fetch(
      `${BASE_URL}/tuitions?userId=${encodeURIComponent(user.id)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const list: TuitionItem[] = Array.isArray(data) ? data : [];

    return list.filter(
      (item) =>
        item.userId === user.id ||
        (Boolean(email) && item.tutorEmail?.toLowerCase() === email)
    );
  } catch (error) {
    console.warn("Could not load tutor tuitions:", error);
    return [];
  }
}
