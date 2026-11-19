
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTuition } from "@/lib/actions/tuitions";

interface Props {
  id: string;
}

const TuitionsDelete = ({ id }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tuition?"
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const result = await deleteTuition(id);

      if (result.success) {
        toast.success("Tuition deleted successfully!");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete tuition");
      }
    } catch (error) {
      console.error("Delete tuition error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      title="Delete Tuition"
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 size={14} />
          Delete
        </>
      )}
    </button>
  );
};

export default TuitionsDelete;
