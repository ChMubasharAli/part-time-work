"use client";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const DatePicker = ({ label, onChange, value }: DatePickerProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-gray-400 px-3 py-3 border border-gray-400 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
      />
    </div>
  );
};
