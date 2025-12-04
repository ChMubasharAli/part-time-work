"use client";

import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import Hamburger from "../ui/Hamburger";
import { SidebarProps } from "./types";
import Icon from "../icons/Icon";

const Sidebar = ({ menu, className = "" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setIsMounted(true);

    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }

    // Check if mobile on mount and on resize
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Save to localStorage when collapsed state changes
  useEffect(() => {
    if (!isMobile && isMounted) {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isMobile, isMounted]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const sidebarWidth = isCollapsed && !isMobile ? "w-16" : "w-64";
  const mobileClasses = isMobile
    ? `fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`
    : "relative";

  // Prevent rendering on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Hamburger isOpen={isMobileMenuOpen} onClick={toggleSidebar} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${mobileClasses} ${sidebarWidth} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen transition-all duration-300 ease-in-out ${className}`}
        aria-label="Main navigation"
      >
        {/* Header with toggle button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          {(!isCollapsed || isMobile) && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Navigation
            </h2>
          )}

          {/* Desktop toggle button */}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none "
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Icon
                name="ChevronRightIcon"
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  !isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav
          className="flex-1 p-4 space-y-1 overflow-y-auto"
          aria-label="Sidebar menu"
        >
          {menu.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isSidebarCollapsed={isCollapsed && !isMobile}
              isMobile={isMobile}
              level={0}
            />
          ))}
        </nav>

        {/* Footer/Collapse button for mobile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {isMobile ? (
            <button
              onClick={closeMobileMenu}
              className="w-full p-2 text-sm text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Close Menu
            </button>
          ) : (
            <div
              className={` font-bold text-gray-500 text-center dark:text-gray-400 ${
                isCollapsed ? "text-center" : ""
              }`}
            >
              {!isCollapsed && <p>Footer Section </p>}
            </div>
          )}
        </div>
      </aside>

      {/* Spacer for desktop sidebar */}
      {!isMobile && (
        <div
          className={`${sidebarWidth} transition-all duration-300 ease-in-out`}
        />
      )}
    </>
  );
};

export default Sidebar;
