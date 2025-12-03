import { EndDateIcon } from "../svgIcons/EndDateIcon";
import { UserIcon } from "../svgIcons/UserIcons";

interface TabsNavigationProps {
  activeTab: "BASIC" | "END_DATE" | "ADDITIONAL";
  onTabChange: (tab: "BASIC" | "END_DATE" | "ADDITIONAL") => void;
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
      active={activeTab === "END_DATE"}
      onClick={() => onTabChange("END_DATE")}
      icon={<EndDateIcon />}
      label="END DATE"
    />
    <TabButton
      active={activeTab === "ADDITIONAL"}
      onClick={() => onTabChange("ADDITIONAL")}
      icon={<EndDateIcon />}
      label="Additional Details"
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
