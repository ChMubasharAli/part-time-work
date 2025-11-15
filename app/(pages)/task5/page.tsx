"use client";
import { useSearchParams } from "next/navigation";
import { Task5Form } from "@/components/Task5Form";
import { FormMode } from "@/lib/constants";

export default function Task5Page() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as FormMode) || "readonly";

  const validModes: FormMode[] = ["create", "edit", "readonly"];
  const currentMode = validModes.includes(mode) ? mode : "readonly";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <Task5Form mode={currentMode} />
    </main>
  );
}
