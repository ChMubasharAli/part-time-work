// components/tasks/Task4Form.tsx
"use client";

import { useEffect, useState } from "react";

// Utilities
import { crudOperations, User } from "@/utils/crud";
import { BasicTab } from "./tabs/BasicTab";
import { EndDateTab } from "./tabs/EndDateTab";
import { LoadingSpinner } from "./forms/LoadingSpinner";
import { TabNavigation } from "./navigation/TabNavigation";
import { RecordNavigationButtons } from "./forms/RecordNavigationButtons";
import { ReadOnlyFormActions } from "./forms/FormActions";

export const Task4Form: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentUser = users[currentIndex];
  const isFirstRecord = currentIndex === 0;
  const isLastRecord = currentIndex === users.length - 1;

  // Load users from database
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await crudOperations.readAll();
      setUsers(data.userData);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const goToFirst = () => setCurrentIndex(0);
  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(users.length - 1, prev + 1));
  const goToLast = () => setCurrentIndex(users.length - 1);

  // Fetch users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "BASIC":
        return <BasicTab user={currentUser} />;
      case "END DATE":
        return <EndDateTab user={currentUser} />;
      default:
        return null;
    }
  };

  // Show loading state
  if (loading) {
    return <LoadingSpinner size="md" />;
  }

  // Show empty state
  if (!loading && users.length === 0) {
    return (
      <div className="max-w-4xl w-full mx-auto p-6 text-center">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="py-20 text-gray-500">
          No records found in the database.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="space-y-6">
        {renderActiveTab()}

        {/* Action Buttons Container */}
        <div className="flex flex-col md:flex-row gap-6 pt-20 justify-center items-center">
          {/* Record Navigation */}
          <RecordNavigationButtons
            onFirst={goToFirst}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onLast={goToLast}
            isFirstRecord={isFirstRecord}
            isLastRecord={isLastRecord}
            currentIndex={currentIndex}
            totalRecords={users.length}
          />

          {/* Read-only Form Actions */}
          <ReadOnlyFormActions />

          {/* Spacer for mobile layout */}
          <div className="md:hidden w-full"></div>
        </div>
      </div>
    </div>
  );
};
