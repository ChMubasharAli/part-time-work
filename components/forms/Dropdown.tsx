"use client ";

import { FieldError } from "react-hook-form";

interface DropdownProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  options: string[];
  readOnly?: boolean;
  error?: FieldError;
}

export const Dropdown = ({
  label,
  value,
  onChange,
  options,
  readOnly = false,
  error,
}: DropdownProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      {readOnly ? (
        <input
          type="text"
          value={value}
          readOnly
          className={`px-3 text-gray-400 py-3 border  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
        />
      ) : (
        <select
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="px-3 text-gray-400 py-3 border border-gray-400 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400"
        >
          <option>Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
