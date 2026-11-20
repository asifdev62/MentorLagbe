
"use client";

import { useState } from "react";
import type { TuitionItem } from "@/lib/api/tuitions";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  Loader2,
  BookOpen,
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type Props = {
  initialTuitions: TuitionItem[];
};

type Status = "pending" | "approved" | "rejected";

export default function TuitionsClient({
  initialTuitions,
}: Props) {
  const [tuitions, setTuitions] = useState(initialTuitions);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const updateStatus = async (id: string, approvalStatus: Status) => {
    setLoadingId(id);

    try {
      const response = await fetch(
        `${BASE_URL}/tuitions/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvalStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setTuitions((previous) =>
        previous.map((item) =>
          item._id === id ? { ...item, approvalStatus } : item
        )
      );

      toast.success(data.message || "Status updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTuition = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tuition?")) {
      return;
    }

    setLoadingId(id);

    try {
      const response = await fetch(`${BASE_URL}/tuitions/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setTuitions((previous) =>
        previous.filter((item) => item._id !== id)
      );

      toast.success("Tuition deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const pending = tuitions.filter(
    (item) => (item.approvalStatus || "pending") === "pending"
  ).length;

  const approved = tuitions.filter(
    (item) => item.approvalStatus === "approved"
  ).length;

  const rejected = tuitions.filter(
    (item) => item.approvalStatus === "rejected"
  ).length;

  const filteredTuitions = tuitions.filter((item) => {
    const status = item.approvalStatus || "pending";
    return filter === "all" || status === filter;
  });

  const statusStyle = (status: string) => {
    if (status === "approved") return "bg-green-500/10 text-green-600";
    if (status === "rejected") return "bg-red-500/10 text-red-600";
    return "bg-yellow-500/10 text-yellow-600";
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Tuitions", value: tuitions.length },
          { label: "Pending", value: pending },
          { label: "Approved", value: approved },
          { label: "Rejected", value: rejected },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <h2 className="mt-2 text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tuition List */}
      {filteredTuitions.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <h2 className="font-semibold">No Tuitions Found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no tuition posts in this category.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTuitions.map((item) => {
            const status = item.approvalStatus || "pending";
            const isLoading = loadingId === item._id;

            return (
              <div key={item._id} className="rounded-xl border p-4">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        {item.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyle(status)}`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.subject} · {item.classLevel}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Medium: {item.medium || "Not specified"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Tutor: {item.tutorEmail || "Not provided"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {status !== "approved" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(item._id, "approved")}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                        Approve
                      </button>
                    )}

                    {status !== "rejected" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(item._id, "rejected")}
                        className="flex items-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-sm text-red-600 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    )}

                    {status !== "pending" && (
                      <button
                        disabled={isLoading}
                        onClick={() => updateStatus(item._id, "pending")}
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
                      >
                        <Clock className="h-4 w-4" />
                        Pending
                      </button>
                    )}

                    <button
                      disabled={isLoading}
                      onClick={() => deleteTuition(item._id)}
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
