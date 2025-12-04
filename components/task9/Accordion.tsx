"use client";

import { ReactNode, useState } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  loading?: boolean;
  showMoreButton?: boolean;
  onShowMore?: () => Promise<void> | void;
  showMoreLabel?: string;
}

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
  loading = false,
  showMoreButton = false,
  onShowMore,
  showMoreLabel = "Show More",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleToggle = async () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // If opening and we need to load more data
    if (newIsOpen && showMoreButton && onShowMore) {
      setIsLoadingMore(true);
      try {
        await onShowMore();
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="p-6 bg-white">
          {loading || isLoadingMore ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading data...</span>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};
