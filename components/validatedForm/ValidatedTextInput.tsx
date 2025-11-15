"use client";

import { UseFormRegister, FieldError } from "react-hook-form";
import { Task3FormData } from "@/lib/validations";

interface ValidatedTextInputProps {
  label: string;
  name: keyof Task3FormData;
  register: UseFormRegister<Task3FormData>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}

export const ValidatedTextInput = ({
  label,
  name,
  register,
  error,
  placeholder,
  type,
  readOnly = false,
}: ValidatedTextInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`px-3 text-gray-400 py-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
