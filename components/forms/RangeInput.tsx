"use client";

interface RangeInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  readOnly: boolean;
  error?: any;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeInput = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  error,
  min = 0,
  max = 200000,
  step = 5000,
}: RangeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onChange(e.target.value);
    }
  };

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <span className="text-lg font-semibold text-blue-600">
          {formatCurrency(value)}
        </span>
      </div>

      {readOnly ? (
        <input
          type="text"
          readOnly
          value={formatCurrency(value)}
          className="px-3 py-2 border border-gray-300 rounded w-full bg-gray-100"
        />
      ) : (
        <>
          <input
            type="range"
            name={name}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatCurrency(min.toString())}</span>
            <span>{formatCurrency(max.toString())}</span>
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
