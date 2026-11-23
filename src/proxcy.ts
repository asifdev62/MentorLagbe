
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verify Better Auth session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // User is not logged in
  if (!session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const role = (
    session.user as typeof session.user & { role?: string }
  ).role?.toLowerCase();

  // Role-based route protection
  let requiredRole: string | null = null;

  if (
    pathname === "/dashboard/admin" ||
    pathname.startsWith("/dashboard/admin/")
  ) {
    requiredRole = "admin";
  } else if (
    pathname === "/dashboard/tutor" ||
    pathname.startsWith("/dashboard/tutor/")
  ) {
    requiredRole = "tutor";
  } else if (
    pathname === "/dashboard/student" ||
    pathname.startsWith("/dashboard/student/")
  ) {
    requiredRole = "student";
  }

  // Wrong role
  if (requiredRole && role !== requiredRole) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
