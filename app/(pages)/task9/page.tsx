"use client";

import { useSearchParams } from "next/navigation";
import { Task9Mode } from "@/lib/constants";
import { Task9CreateForm } from "@/components/task9/Task9CreateForm";
import { Task9ReadView } from "@/components/task9/Task9ReadView";

export default function Task9Page() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Task9Mode) || "read";

  const validModes: Task9Mode[] = ["create", "read"];
  const currentMode = validModes.includes(mode) ? mode : "read";

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      {currentMode === "create" ? <Task9CreateForm /> : <Task9ReadView />}
    </main>
  );
}