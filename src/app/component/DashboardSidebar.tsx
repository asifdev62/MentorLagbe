"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useSession } from "@/lib/auth-client";

type SidebarRole = "student" | "tutor" | "admin";

type MenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
  /** Only highlight when the path matches exactly (used for overview pages). */
  exact?: boolean;
};

const menuItemsByRole: Record<SidebarRole, MenuItem[]> = {
  student: [
    {
      id: "student-overview",
      name: "Overview",
      url: "/dashboard/student",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "student-browse-tuitions",
      name: "Browse Tuitions",
      url: "/tuitions",
      icon: GraduationCap,
    },
    {
      id: "student-applications",
      name: "My Applications",
      url: "/dashboard/student/applications",
      icon: FileText,
    },
    {
      id: "student-profile",
      name: "My Profile",
      url: "/dashboard/student/profile",
      icon: UserRound,
    },
  ],

  tutor: [
    {
      id: "tutor-overview",
      name: "Overview",
      url: "/dashboard/tutor",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "tutor-add-tuition",
      name: "Post a Tuition",
      url: "/dashboard/tutor/add-tuition",
      icon: PlusCircle,
    },
    {
      id: "tutor-tuitions",
      name: "Manage Tuitions",
      url: "/dashboard/tutor/manage-tuition",
      icon: BookOpen,
    },
    {
      id: "tutor-applicants",
      name: "Applicants",
      url: "/dashboard/tutor/applicants",
      icon: Users,
    },
    {
      id: "tutor-profile",
      name: "My Profile",
      url: "/dashboard/tutor/profile",
      icon: UserRound,
    },
  ],

  admin: [
    {
      id: "admin-overview",
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-tutors",
      name: "Tutors",
      url: "/dashboard/admin/tutors",
      icon: ShieldCheck,
    },
    {
      id: "admin-tuitions",
      name: "Tuitions",
      url: "/dashboard/admin/tuitions",
      icon: BookOpen,
    },
    {
      id: "admin-applications",
      name: "Applications",
      url: "/dashboard/admin/applications",
      icon: FileText,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

const roleLabels: Record<SidebarRole, string> = {
  student: "Student",
  tutor: "Tutor",
  admin: "Admin",
};

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  if (isPending) {
    return null;
  }

  const roleFromSession = (
    session?.user as { role?: string } | undefined
  )?.role?.toLowerCase();

  const role: SidebarRole =
    roleFromSession === "tutor" || roleFromSession === "admin"
      ? roleFromSession
      : "student";

  const menuItems = menuItemsByRole[role];

  const user = session?.user;

  const userInitial =
    user?.name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarHeader>
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2 py-3 text-lg font-extrabold tracking-tight text-sidebar-foreground"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <GraduationCap size={20} />
            </span>
            <span>
              Mentor<span className="text-blue-600">Lagbe</span>
            </span>
          </Link>

          {user && (
            <div className="mb-1 flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-2.5">
              {/* Avatar */}
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                ) : (
                  userInitial
                )}
              </div>

              {/* Name, email, role */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-sidebar-foreground">
                    {user.name}
                  </p>

                  <span className="shrink-0 rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-700 uppercase">
                    {roleLabels[role]}
                  </span>
                </div>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{roleLabels[role]} Panel</SidebarGroupLabel>

            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.url
                  : pathname.startsWith(item.url);

                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.name}
                    >
                      <Icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </TooltipProvider>
  );
}
