"use client";

import { GrFormNext } from "react-icons/gr";

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 disabled:cursor-not-allowed"
    >
      <GrFormNext size={21} style={{ stroke: "#9ca3af", strokeWidth: 3 }} />
    </button>
  );
};
