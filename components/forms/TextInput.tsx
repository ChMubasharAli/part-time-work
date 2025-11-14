"use client ";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type,
}: TextInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="px-3 text-gray-400 py-3 border border-gray-400 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder:text-gray-400"
      />
    </div>
  );
};
