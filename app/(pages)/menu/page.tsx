// app/menu/page.tsx
"use client";

import Link from "next/link";

export default function MenuPage() {
  return (
    <div className=" max-w-2xl w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-shadow-lg/30 mb-4">
          Choose Form Mode
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/task5?mode=create"
          className=" px-6  py-3 bg-blue-600 text-white text-center rounded-[12px] 
                      hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Create
        </Link>

        <Link
          href="/task5?mode=edit"
          className=" px-6 py-3 bg-green-600 text-white text-center rounded-[12px] 
                      hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          Edit
        </Link>

        <Link
          href="/task5?mode=readonly"
          className=" px-6 py-3 bg-purple-600 text-white text-center rounded-[12px] 
                      hover:bg-purple-700 transition-colors duration-200 font-medium"
        >
          Read Only
        </Link>
      </div>
    </div>
  );
}
