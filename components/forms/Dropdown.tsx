"use client ";

import { Input } from "postcss";

interface DropdownProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  options: string[];
  readOnly?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      {readOnly ? (
        <input
          type="text"
          value={value}
          readOnly
          className="px-3 text-gray-400 py-3 border border-gray-400 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400"
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
    </div>
  );
};
