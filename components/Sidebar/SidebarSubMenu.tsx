"use client";

import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { MenuItem } from "./types";
import Icon from "../icons/Icon";

interface SidebarSubMenuProps {
  item: MenuItem;
  isSidebarCollapsed: boolean;
  isMobile: boolean;
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({
  item,
  isSidebarCollapsed,
  isMobile,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showExpanded = isExpanded && (!isSidebarCollapsed || isMobile);

  return (
    <div>
      <button
        onClick={toggleExpand}
        className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          isSidebarCollapsed && !isMobile ? "justify-center" : ""
        }`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
          <Icon name={item.icon} className="w-5 h-5" />
          {(!isSidebarCollapsed || isMobile) && (
            <span className="text-sm font-medium">{item.name}</span>
          )}
        </div>
        {(!isSidebarCollapsed || isMobile) && (
          <div className="transition-transform duration-200">
            {isExpanded ? (
              <Icon name="ChevronDownIcon" className="w-4 h-4" />
            ) : (
              <Icon name="ChevronRightIcon" className="w-4 h-4" />
            )}
          </div>
        )}
      </button>

      {showExpanded && item.children && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              isSidebarCollapsed={isSidebarCollapsed}
              isMobile={isMobile}
              level={1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSubMenu;
