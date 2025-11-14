"use client";

import { GrFormPrevious } from "react-icons/gr";

interface PreviousButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PreviousButton = ({ onClick, disabled }: PreviousButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 hover:bg-gray-300 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3.2"
        stroke="#9ca3af "
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
};
