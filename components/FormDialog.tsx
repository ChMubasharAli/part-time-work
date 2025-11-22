// components/FormDialog.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "./svgIcons/CrossIcons";
import { ExpandIcon } from "./svgIcons/ExpandIcon";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FormDialog = ({ isOpen, onClose, children }: FormDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogWidth, setDialogWidth] = useState(600);

  // Size constraints
  const MIN_WIDTH = 500;
  const MAX_WIDTH = 1200;

  // Initialize dialog when isOpen changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setDialogWidth(600);
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Smooth resize handler
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = dialogWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, startWidth + deltaX)
      );
      setDialogWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed left-0 top-5 h-screen rounded-tr-[8px] rounded-br-[8px] m-0 p-0 bg-white shadow-2xl border-r border-gray-300 backdrop:bg-black backdrop:bg-opacity-50 overflow-hidden"
      style={{ width: `${dialogWidth}px` }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute  top-2 right-2  w-8 h-8 rounded-[8px] bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-lg font-bold"
        aria-label="Close dialog"
      >
        <CrossIcon />
      </button>
      {/* Content - Full height */}
      <div className="h-full overflow-y-auto p-6">{children}</div>
      {/* Bottom-right resize handle */}
      <div
        className="absolute bottom-1 right-1 "
        onMouseDown={handleResizeStart}
        title="Drag to resize width"
      >
        <ExpandIcon />
      </div>
    </dialog>
  );
};
