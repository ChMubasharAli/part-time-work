"use client";

import { FieldError } from "react-hook-form";

interface TextAreaProps {
  label: string;
  value: string;
  onChange?: (Value: string) => void;
  placeholder: string;
  rows?: number;
  readOnly?: boolean;
  error?: FieldError;
}

export const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  readOnly = false,
  error,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
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
