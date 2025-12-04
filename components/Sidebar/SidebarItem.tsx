"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarSubMenu from "./SidebarSubMenu";
import { MenuItem } from "./types";
import Icon from "../icons/Icon";

interface SidebarItemProps {
  item: MenuItem;
  isSidebarCollapsed: boolean;
  isMobile: boolean;
  level: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isSidebarCollapsed,
  isMobile,
  level,
}) => {
  const pathname = usePathname();
  const isActive = item.href && pathname === item.href;

  // If item has children, render as submenu
  if (item.children && item.children.length > 0) {
    return (
      <SidebarSubMenu
        item={item}
        isSidebarCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
      />
    );
  }

  // Regular menu item with link
  return (
    <Link
      href={item.href || "#"}
      className={`flex items-center p-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      } ${isSidebarCollapsed && !isMobile ? "justify-center" : ""}`}
      title={isSidebarCollapsed && !isMobile ? item.name : undefined}
    >
      <div className="flex items-center space-x-3">
        <Icon name={item.icon} className="w-5 h-5" />
        {(!isSidebarCollapsed || isMobile) && (
          <span className="text-sm font-medium">{item.name}</span>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
