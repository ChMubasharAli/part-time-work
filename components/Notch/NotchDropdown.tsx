"use client";

import { useState } from "react";
import * as Icons from "./icons";

interface MenuItem {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NotchDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Menu items data - 12 items for 2 rows of 6
  const menuItems: MenuItem[] = [
    { id: 1, name: "WiFi", icon: Icons.WifiIcon },
    { id: 2, name: "Mobile Data", icon: Icons.MobileDataIcon },
    { id: 3, name: "Bluetooth", icon: Icons.BluetoothIcon },
    { id: 4, name: "Torch", icon: Icons.TorchIcon },
    { id: 5, name: "Airplane Mode", icon: Icons.AirplaneIcon },
    { id: 6, name: "Battery Saver", icon: Icons.BatteryIcon },
    { id: 7, name: "Flashlight", icon: Icons.FlashlightIcon },
    { id: 8, name: "Hotspot", icon: Icons.HotspotIcon },
    { id: 9, name: "Location", icon: Icons.LocationIcon },
    { id: 10, name: "Rotation Lock", icon: Icons.RotationIcon },
    { id: 11, name: "Settings", icon: Icons.SettingsIcon },
    { id: 12, name: "Sound", icon: Icons.SoundIcon },
  ];

  return (
    <div className="relative">
      {/* Notch Trigger with smooth transition */}
      <div
        className="relative w-40 h-8 z-50 bg-black rounded-b-2xl cursor-pointer flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: isOpen ? "translateY(202px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
      </div>

      {/* Dropdown Menu with staggered animation */}
      <div
        className={`absolute  -top-2 left-1/2 w-screen transform -translate-x-1/2 transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          transform: isOpen ? "translate(-50%, 8px)" : "translate(-50%, -20px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Animated content container */}
        <div
          className={`bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 shadow-2xl transition-all duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {/* Row 1 - Independently Scrollable */}
          <div className="mb-8 w-full cursor-pointer">
            <div className="overflow-x-auto flex items-center justify-between scrollbar-hide gap-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center gap-1 min-w-[60px] group cursor-pointer flex-shrink-0"
                  >
                    <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-blue-600 transition-all duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-300 text-center whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2 - Independently Scrollable */}
          <div className="w-full cursor-pointer">
            <div className="overflow-x-auto flex gap-6 items-center justify-between scrollbar-hide">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center gap-1 min-w-[60px] group cursor-pointer flex-shrink-0"
                  >
                    <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-blue-600 transition-all duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-300 text-center whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotchDropdown;
