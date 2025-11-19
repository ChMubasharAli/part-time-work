"use client";

import { FirstRecordIcon } from "../svgIcons/FirsRecordIcon";

interface FirstButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const FirstButton = ({ disabled, onClick }: FirstButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 hover:bg-gray-300 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <FirstRecordIcon />
    </button>
  );
};
