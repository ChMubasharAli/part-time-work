import { UserIcon } from "../icons/UserIcon";
import { EndDateIcon } from "../icons/EndDateIcon";

interface Task3TabNavigationProps {
  activeTab: "BASIC" | "END DATE";
  onTabChange: (tab: "BASIC" | "END DATE") => void;
}

export const TabNavigation = ({
  activeTab,
  onTabChange,
}: Task3TabNavigationProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
          activeTab === "BASIC"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => onTabChange("BASIC")}
      >
        <UserIcon />
        BASIC
      </button>

      <button
        className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
          activeTab === "END DATE"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => onTabChange("END DATE")}
      >
        <EndDateIcon />
        END DATE
      </button>
    </div>
  );
};
