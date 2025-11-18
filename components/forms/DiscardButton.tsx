"use client";

interface DiscardButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export const DiscardButton = ({
  onClick,
  disabled = false,
  label = "DISCARD",
}: DiscardButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 font-semibold  text-gray-500 rounded-[8px] border-2 border-gray-400 focus:outline-none  disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};
