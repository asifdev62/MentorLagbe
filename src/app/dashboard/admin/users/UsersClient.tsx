
"use client";

import { useMemo, useState } from "react";
import { Search, Users, GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import type { AdminUser } from "@/lib/actions/admin-users";

type Props = {
  initialUsers: AdminUser[];
};

export default function UsersClient({ initialUsers }: Props) {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || (user.role || "student") === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const students = users.filter(
    (user) => (user.role || "student") === "student"
  ).length;

  const tutors = users.filter(
    (user) => user.role === "tutor"
  ).length;

  const admins = users.filter(
    (user) => user.role === "admin"
  ).length;

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard title="Total Users" value={users.length} icon={<Users />} />

        <StatCard title="Students" value={students} icon={<GraduationCap />} />

        <StatCard title="Tutors" value={tutors} icon={<BookOpen />} />

        <StatCard title="Admins" value={admins} icon={<ShieldCheck />} />

      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-11 rounded-lg border bg-background px-4"
        >
          <option value="all">All Users</option>
          <option value="student">Students</option>
          <option value="tutor">Tutors</option>
          <option value="admin">Admins</option>
        </select>

      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl border bg-card">

        <table className="w-full min-w-[650px] text-left text-sm">

          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {filteredUsers.map((user) => (

              <tr key={user._id} className="hover:bg-muted/30">

                <td className="p-4">
                  <div className="flex items-center gap-3">

                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}

                    <span className="font-medium">
                      {user.name || "Unknown User"}
                    </span>

                  </div>
                </td>

                <td className="p-4 text-muted-foreground">
                  {user.email}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize">
                    {user.role || "student"}
                  </span>
                </td>

                <td className="p-4 text-muted-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredUsers.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No users found.
          </p>
        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="text-primary">{icon}</div>
      </div>

      <h2 className="mt-3 text-2xl font-bold">{value}</h2>

    </div>
  );
}
