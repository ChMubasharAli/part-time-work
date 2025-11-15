"use client";

import { Task3FormData } from "@/lib/validations";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedDatePickerProps {
  label: string;
  name: keyof Task3FormData;
  register: UseFormRegister<Task3FormData>;
  error?: FieldError;
}

export const ValidatedDatePicker = ({
  label,
  name,
  register,
  error,
}: ValidatedDatePickerProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type="date"
        {...register(name)}
        className={`px-3 text-gray-400 py-3 border  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
