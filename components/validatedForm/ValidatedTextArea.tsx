"use client";

import { Task3FormData } from "@/lib/validations";
import { Value } from "@prisma/client/runtime/library";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedTextAreaProps {
  label: string;
  name: keyof Task3FormData;
  register: UseFormRegister<Task3FormData>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
}

export const ValidatedTextArea = ({
  label,
  register,
  name,
  error,
  placeholder = "",
  rows = 4,
}: ValidatedTextAreaProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        className={`px-3 text-gray-400 py-3 border  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
