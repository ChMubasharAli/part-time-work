"use client";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export const SubmitButton = ({
  onClick,
  disabled = false,
  label = "SUBMIT",
}: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 font-semibold bg-blue-600 text-white rounded-[8px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200  disabled:cursor-not-allowed"
    >
      {disabled ? "SUBMITTING..." : label}
    </button>
  );
};
