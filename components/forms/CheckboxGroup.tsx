"use client";

interface CheckboxGroupProps {
  label: string;
  name: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  readOnly?: boolean;
  error?: any;
}

export const CheckboxGroup = ({
  label,
  name,
  value = [],
  options,
  onChange,
  readOnly = false,
  error,
}: CheckboxGroupProps) => {
  const handleCheckboxChange = (option: string) => {
    if (readOnly) return;

    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center space-x-2 p-2 border rounded ${
              readOnly
                ? "bg-gray-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              disabled={readOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-400">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
