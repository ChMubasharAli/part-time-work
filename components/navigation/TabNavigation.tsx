import { EndDateIcon } from "../svgIcons/EndDateIcon";
import { UserIcon } from "../svgIcons/UserIcons";

interface TabsNavigationProps {
  activeTab: "BASIC" | "END DATE";
  onTabChange: (tab: "BASIC" | "END DATE") => void;
}

export const TabsNavigation = ({
  activeTab,
  onTabChange,
}: TabsNavigationProps) => (
  <div className="flex border-b border-gray-200 mb-6">
    <TabButton
      active={activeTab === "BASIC"}
      onClick={() => onTabChange("BASIC")}
      icon={<UserIcon />}
      label="BASIC"
    />
    <TabButton
      active={activeTab === "END DATE"}
      onClick={() => onTabChange("END DATE")}
      icon={<EndDateIcon />}
      label="END DATE"
    />
  </div>
);

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    type="button"
    className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-400"
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);
