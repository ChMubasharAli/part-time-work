"use client";

import { LuChevronFirst } from "react-icons/lu";

interface FirstButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const FirstButton = ({ disabled, onClick }: FirstButtonProps) => {
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
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>
    </button>
  );
};
