"use client";

interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  readOnly: boolean;
  error?: any;
}

export const RadioGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  readOnly,
  error,
}: RadioGroupProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-400 mb-2 block">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg transition-colors ${
              readOnly
                ? "cursor-default bg-gray-50"
                : "cursor-pointer hover:bg-gray-50"
            } ${
              value === option.id
                ? "bg-blue-50 border-blue-300"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => !readOnly && onChange(option.id)}
              disabled={readOnly}
              className="mr-3 h-4 w-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-400">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-500">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
