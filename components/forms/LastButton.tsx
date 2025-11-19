"use client";

import { LastRecordIcon } from "../svgIcons/LastRecordIcon";

interface LastButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const LastButton = ({ onClick, disabled }: LastButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="h-9 w-9 flex items-center justify-center border-2  rounded-full  border-gray-400 hover:bg-gray-300 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <LastRecordIcon />
    </button>
  );
};
