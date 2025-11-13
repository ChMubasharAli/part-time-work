"use client";

import { Value } from "@prisma/client/runtime/library";

interface TextAreaProps {
  label: string;
  value: string;
  onChange?: (Value: string) => void;
  placeholder: string;
  rows?: number;
  readOnly?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="px-3 py-3 text-gray-400 border border-gray-400 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 resize-vertical read-only:cursor-not-allowed"
      />
    </div>
  );
};
