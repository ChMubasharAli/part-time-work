"use client";

interface ValidatedTextInputProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}

export const ValidatedTextInput = ({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
  readOnly = false,
}: ValidatedTextInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
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
