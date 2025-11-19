"use client";

import { NextRecordIcon } from "../svgIcons/NextRecordIcon";

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const NextButton = ({ onClick, disabled }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 hover:bg-gray-300 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <NextRecordIcon />
    </button>
  );
};
