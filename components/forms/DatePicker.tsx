"use client";
import { FieldError } from "react-hook-form";
interface DatePickerProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  error?: FieldError;
}

export const DatePicker = ({
  label,
  onChange,
  value,
  readOnly = false,
  error,
}: DatePickerProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        readOnly={readOnly}
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`px-3 text-gray-400 py-3 border  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
       {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
