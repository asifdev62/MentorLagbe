"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    if (isPending) return;

    try {
      setIsPending(true);

      toast.loading("Signing you out...", { id: "sign-out" });

      await authClient.signOut();

      toast.success("You have been signed out.", { id: "sign-out" });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);

      toast.error("Failed to sign out. Please try again.", {
        id: "sign-out",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      title="Logout"
      aria-label="Logout"
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3.5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70 sm:gap-2 sm:px-4 sm:text-sm"
    >
      {isPending ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <LogOut size={15} />
      )}
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
