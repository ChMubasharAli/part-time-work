"use client";

import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const Hamburger = ({ isOpen, onClick, className = "" }: HamburgerProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 focus:outline-none ${className}`}
      aria-label="Toggle menu"
    >
      <span className="sr-only">Toggle menu</span>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6">
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        />
      </div>
    </button>
  );
};

export default Hamburger;
