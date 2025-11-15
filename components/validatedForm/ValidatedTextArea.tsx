"use client";

import { Task3FormData } from "@/lib/validations";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedTextAreaProps {
  label: string;
  name: keyof Task3FormData;
  register: UseFormRegister<Task3FormData>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
}

export const ValidatedTextArea = ({
  label,
  name,
  register,
  error,
  placeholder = "",
  rows = 4,
  readOnly = false,
}: ValidatedTextAreaProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className={`px-3 text-gray-400 py-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 resize-vertical ${
          error ? "border-red-500" : "border-gray-400"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
