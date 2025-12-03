// /app/task8/page.tsx - EXACT SAME AS TASK-7 PAGE
"use client";
import { useSearchParams } from "next/navigation";
import { Task8FormMode } from "@/lib/constants";
import { Task8Form } from "@/components/Task8Form";

export default function Task8Page() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Task8FormMode) || "readonly";

  const validModes: Task8FormMode[] = ["create", "edit", "readonly"];
  const currentMode = validModes.includes(mode) ? mode : "readonly";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <Task8Form mode={currentMode} />
    </main>
  );
}
