// import React from 'react';

// const UnauthorizedPage = () => {
//     return (
//         <div>
//             <h1>Unauthorized!</h1>
//             <p>User is unauthorized. Do not have permission to view this page.</p>
//         </div>
//     );
// };

// export default UnauthorizedPage;





import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600">
        403
      </h1>

      <h2 className="text-2xl font-bold text-gray-900">
        Access Denied
      </h2>

      <p className="text-gray-600">
        You are not authorized to view this page.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-[#087F9F] px-6 py-3 font-semibold text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
