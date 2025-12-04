import React from "react";
import HomeIcon from "./Home";
import FolderIcon from "./Folder";
import UsersIcon from "./Users";
import SettingsIcon from "./Settings";
import DocumentTextIcon from "./DocumentText";
import ChartBarIcon from "./ChartBar";
import ChevronRightIcon from "./ChevronRight";
import ChevronDownIcon from "./ChevronDown";
import BellIcon from "./Bell";
import EnvelopeIcon from "./Envelope";

export type IconName =
  | "HomeIcon"
  | "FolderIcon"
  | "UsersIcon"
  | "SettingsIcon"
  | "DocumentTextIcon"
  | "ChartBarIcon"
  | "ChevronRightIcon"
  | "ChevronDownIcon";

interface IconProps {
  name: IconName;
  className?: string;
}

const iconComponents = {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  SettingsIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
   BellIcon,     
  EnvelopeIcon, 
} as const;

const Icon = ({ name, className = "w-5 h-5" }: IconProps) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} />;
};

export default Icon;
