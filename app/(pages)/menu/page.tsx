// app/menu/page.tsx
"use client";

import { useState } from "react";

import { Task5Form } from "@/components/Task5Form";
import { FormMode } from "@/lib/constants";
import { FormDialog } from "@/components/FormDialog";

export default function MenuPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<FormMode>("readonly");

  const handleOpenDialog = (mode: FormMode) => {
    setCurrentMode(mode);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Main Menu Content - Dimmed when dialog is open */}
      <div
        className={` flex items-center justify-center bg-gray-100 py-8
        transition-opacity duration-300
        ${isDialogOpen ? "opacity-40" : "opacity-100"}
      `}
      >
        <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Choose Form Mode
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleOpenDialog("create")}
              className="px-6 py-3 bg-blue-600 text-white text-center rounded-[12px] hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Create
            </button>

            <button
              onClick={() => handleOpenDialog("edit")}
              className="px-6 py-3 bg-green-600 text-white text-center rounded-[12px] hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Edit
            </button>

            <button
              onClick={() => handleOpenDialog("readonly")}
              className="px-6 py-3 bg-purple-600 text-white text-center rounded-[12px] hover:bg-purple-700 transition-colors duration-200 font-medium"
            >
              Read Only
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      <FormDialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <Task5Form mode={currentMode} />
      </FormDialog>
    </>
  );
}
