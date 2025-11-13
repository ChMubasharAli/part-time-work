"use client";

import { LuChevronLast } from "react-icons/lu";

interface LastButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const LastButton: React.FC<LastButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 disabled:cursor-not-allowed"
    >
      <LuChevronLast style={{ stroke: "#9ca3af", strokeWidth: 3 }} />
    </button>
  );
};
