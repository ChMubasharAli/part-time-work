import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CrossIcon } from "./svgIcons/CrossIcons";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FormDialog = ({ isOpen, onClose, children }: FormDialogProps) => {
  const [dialogWidth, setDialogWidth] = useState(600);

  const MIN_WIDTH = 500;
  const MAX_WIDTH = 1200;

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = dialogWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, startWidth + deltaX)
      );
      setDialogWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none max-w-full">
        {/* REQUIRED FOR ACCESSIBILITY */}
        <DrawerHeader className="hidden">
          <VisuallyHidden>
            <DrawerTitle>Form Dialog</DrawerTitle>
            <DrawerDescription>Resizable form drawer</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>

        <div
          className="h-full bg-white relative ml-auto border-l-2 border-orange-500 shadow-2xl"
          style={{ width: `${dialogWidth}px` }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -left-8 -top-7 z-50 w-8 h-8 bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors text-lg font-bold shadow-md border-2 border-orange-500"
            aria-label="Close dialog"
          >
            <CrossIcon />
          </button>

          {/* Resize Handle */}
          <div
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 cursor-col-resize bg-orange-500 rounded opacity-80 hover:opacity-100 flex items-center justify-center"
            onMouseDown={handleResizeStart}
          >
            <div className="flex flex-col space-y-1">
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>

          {/* Drawer Content */}
          <div className="h-full overflow-y-auto p-6">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
