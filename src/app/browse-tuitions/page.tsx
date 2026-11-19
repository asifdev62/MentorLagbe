
import { getTuitions } from "@/lib/api/tuitions";

const BrowseTuitionsPage = async () => {
  const tuitions = await getTuitions();

  // Only approved and active tuitions
  const approvedTuitions = tuitions.filter(
    (item) =>
      item.approvalStatus === "approved" &&
      item.status === "active"
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Browse Tuitions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Find the perfect tuition opportunity.
          </p>
        </div>

        <p className="mb-5 text-sm text-slate-600">
          {approvedTuitions.length} Tuitions Available
        </p>

        {approvedTuitions.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              No Tuitions Available
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              No approved tuition listings are available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {approvedTuitions.map((item) => (
              <div
                key={item._id || item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  {item.classLevel} · {item.subject}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {item.area}
                </p>

                <p className="mt-4 text-xl font-bold text-blue-700">
                  ৳{Number(item.budget).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BrowseTuitionsPage;
