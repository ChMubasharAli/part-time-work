"use client";

import { GrFormPrevious } from "react-icons/gr";

interface PreviousButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PreviousButton: React.FC<PreviousButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 hover:bg-gray-300 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <GrFormPrevious size={21} style={{ stroke: "#9ca3af", strokeWidth: 4 }} />
    </button>
  );
};
