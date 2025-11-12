"use client ";

import { Task3FormData } from "@/lib/validations";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedDropdownProps {
  label: string;
  name: keyof Task3FormData;
  register: UseFormRegister<Task3FormData>;
  error?: FieldError;
  options: string[];
}

export const ValidatedDropdown: React.FC<ValidatedDropdownProps> = ({
  label,
  name,
  register,
  error,

  options,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <select
        {...register(name)}
        className={`px-3 text-gray-400 py-3 border  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
