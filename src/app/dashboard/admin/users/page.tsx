import {
  getAllUsers,
  type AdminUser,
} from "@/lib/actions/admin-users";

import UsersClient from "./UsersClient";

export default async function UsersPage() {
  let users: AdminUser[] = [];
  let errorMessage = "";

  try {
    users = await getAllUsers();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load users";
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">
          View all registered users.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
          {errorMessage}
        </div>
      ) : (
        <UsersClient initialUsers={users} />
      )}
    </div>
  );
}