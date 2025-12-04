"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function MenuPage() {
  const queryClient = useQueryClient();

  // Prefetch ALL patients when menu page loads (NO PAGINATION)
  useEffect(() => {
    const prefetchPatients = async () => {
      try {
        await queryClient.prefetchQuery({
          queryKey: ["task9-patients"],
          queryFn: async () => {
            // Remove page and limit parameters for all patients
            const response = await fetch("/api/task9/patients");
            if (!response.ok) throw new Error("Failed to fetch patients");
            return response.json();
          },
          staleTime: 5 * 60 * 1000, // 5 minutes cache
        });
      } catch (error) {
        // Silent fail - prefetch is just optimization
      }
    };

    prefetchPatients();
  }, [queryClient]);

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-shadow-lg/30 mb-4">
          Choose Task-9 Mode
        </h2>
      </div>

      {/* Task-9 Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Task-9: Patient Management System
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/task9?mode=create"
            className="px-6 py-3 bg-blue-600 text-white text-center rounded-[12px] 
                      hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Create Patient
          </Link>

          <Link
            href="/task9?mode=read"
            className="px-6 py-3 bg-green-600 text-white text-center rounded-[12px] 
                      hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Read Patients
          </Link>
        </div>
      </div>
    </div>
  );
}
