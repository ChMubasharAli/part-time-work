"use client";

interface ValidatedDropdownProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  options: string[];
  readOnly?: boolean;
}

export const ValidatedDropdown = ({
  label,
  name,
  register,
  error,
  options,
  readOnly = false,
}: ValidatedDropdownProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <select
        {...register(name)}
        disabled={readOnly}
        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? "border-red-500"
            : readOnly
            ? "border-gray-300 bg-gray-50"
            : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
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
