
import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <GraduationCap size={36} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Mentor<span className="text-blue-600">Lagbe</span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Finding the right learning experience...
        </p>

        {/* Spinner */}
        <div className="mt-8 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

        <p className="mt-4 text-xs font-medium text-slate-400">
          Please wait a moment
        </p>
      </div>
    </div>
  );
}
