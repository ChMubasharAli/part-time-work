"use client";

interface SubmitButtonProps {
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

export const SubmitButton = ({
  disabled = false,
  label = "SUBMIT",
  loading,
}: SubmitButtonProps) => {
  return (
    <button
      disabled={disabled}
      className="px-6 py-3 font-semibold bg-blue-600  text-white rounded-[8px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200  disabled:cursor-not-allowed  border-2 border-blue-600 "
    >
      {loading ? "SUBMITTING..." : label}
    </button>
  );
};
