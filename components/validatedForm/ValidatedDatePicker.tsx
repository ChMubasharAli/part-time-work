"use client";

interface ValidatedDatePickerProps {
  label: string;
  name: string;
  register: any;
  error?: any;
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
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type="date"
        {...register(name)}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? "border-red-500"
            : readOnly
            ? "border-gray-300 bg-gray-50"
            : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
