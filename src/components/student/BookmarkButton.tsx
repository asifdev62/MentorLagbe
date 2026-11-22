
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bookmark, Loader2 } from "lucide-react";

import { addBookmark, removeBookmark } from "@/lib/actions/student";

type Props = {
  tuitionId: string;
  initialBookmarked?: boolean;
};

export default function BookmarkButton({
  tuitionId,
  initialBookmarked = false,
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (isBookmarked) {
        const result = await removeBookmark(tuitionId);

        if (!result.success) {
          throw new Error(
            result.message || "Failed to remove bookmark"
          );
        }

        setIsBookmarked(false);
        toast.success("Bookmark removed successfully");
      } else {
        const result = await addBookmark(tuitionId);

        if (!result.success) {
          throw new Error(
            result.message || "Failed to bookmark tuition"
          );
        }

        setIsBookmarked(true);
        toast.success("Tuition added to bookmarks");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBookmark}
      disabled={isLoading}
      aria-label={
        isBookmarked ? "Remove bookmark" : "Add bookmark"
      }
      aria-pressed={isBookmarked}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isBookmarked
          ? "border-[#087F9F]/20 bg-[#087F9F]/10 text-[#087F9F] hover:bg-[#087F9F]/15"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#087F9F]/30 hover:bg-[#087F9F]/5 hover:text-[#087F9F]"
      }`}
    >
      {isLoading ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <Bookmark
          size={17}
          className={isBookmarked ? "fill-current" : ""}
        />
      )}

      {isLoading
        ? "Please wait..."
        : isBookmarked
          ? "Bookmarked"
          : "Add Bookmark"}
    </button>
  );
}
