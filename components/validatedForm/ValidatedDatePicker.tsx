"use client";


import { Task5FormData } from "@/lib/validations";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedDatePickerProps {
  label: string;
  name: keyof Task5FormData;
  register: UseFormRegister<Task5FormData>;
  error?: FieldError;
  readOnly?: boolean;
}

export const ValidatedDatePicker = ({
  label,
  name,
  register,
  error,
  readOnly = false,
}: ValidatedDatePickerProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type="date"
        {...register(name)}
        readOnly={readOnly}
        className={`px-3 text-gray-400 py-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
