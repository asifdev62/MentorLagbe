"use client";

import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  getTutorApplicants,
  type TutorApplicant,
} from "@/lib/actions/applicants";
import ApplicantsClient from "./ApplicantsClient";

export default function ApplicantsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [applicants, setApplicants] = useState<TutorApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tutorEmail = session?.user?.email;

  useEffect(() => {
    if (isPending || !tutorEmail) return;

    let cancelled = false;

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTutorApplicants(tutorEmail);

        if (!cancelled) {
          setApplicants(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load applicants"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchApplicants();

    return () => {
      cancelled = true;
    };
  }, [tutorEmail, isPending]);

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // User not logged in
  if (!tutorEmail) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <Users className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Please login first</h2>
        <p className="text-sm text-muted-foreground">
          You need to login to see your applicants.
        </p>
      </div>
    );
  }

  // Applicants loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading applicants...
        </span>
      </div>
    );
  }

  return (
    <ApplicantsClient
      key={tutorEmail}
      initialApplicants={applicants}
      tutorEmail={tutorEmail}
      initialError={error}
    />
  );
}