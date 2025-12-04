"use client";

import Sidebar from "@/components/Sidebar";
import { MenuItem } from "@/components/Sidebar/types";

// Example menu data with IconName type
const menuData: MenuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/",
    icon: "HomeIcon", // Now uses IconName type
  },
  {
    id: "projects",
    name: "Projects",
    icon: "FolderIcon",
    children: [
      {
        id: "all-projects",
        name: "All Projects",
        href: "/projects",
        icon: "FolderIcon",
      },
      {
        id: "new-project",
        name: "New Project",
        href: "/projects/new",
        icon: "FolderIcon",
      },
    ],
  },
  {
    id: "team",
    name: "Team",
    href: "/team",
    icon: "UsersIcon",
  },
  {
    id: "reports",
    name: "Reports",
    icon: "ChartBarIcon",
    children: [
      {
        id: "monthly",
        name: "Monthly",
        href: "/reports/monthly",
        icon: "ChartBarIcon",
      },
      {
        id: "quarterly",
        name: "Quarterly",
        href: "/reports/quarterly",
        icon: "ChartBarIcon",
      },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    href: "/settings",
    icon: "SettingsIcon",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar menu={menuData} />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to the Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Card 1</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your content goes here
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Card 2</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your content goes here
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Card 3</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your content goes here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
