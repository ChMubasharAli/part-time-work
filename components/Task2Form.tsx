"use client";

import { useState } from "react";
import { toast } from "react-toastify";

// components imports
import { TabNavigation } from "./navigation/TabNavigation";
import { BasicTab } from "./tabs/BasicTab";
import { FormActions } from "./forms/FormActions";

// import crud operations file
import { crudOperations, FormData } from "@/utils/crud";
import { EndDateTab } from "./tabs/EndDateTab";

export const Task2Form = () => {
  const [activeTab, setActiveTab] = useState<"BASIC" | "END_DATE">("BASIC");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    // Task-1 fields
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    maritalStatus: "",
    gender: "",
    estimatedStartDate: "",
    // Task-2 new fields
    country: "",
    address: "",
    city: "",
    estimatedEndDate: "",
  });

  // function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  // function handleCancle

  const handleCancel = () => {
    setFormData({
      // Task-1 fields
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      maritalStatus: "",
      gender: "",
      estimatedStartDate: "",
      // Task-2 new fields
      country: "",
      address: "",
      city: "",
      estimatedEndDate: "",
    });
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      await crudOperations.create(formData, "/api/records");
      toast.success("User record saved successfully");
      handleCancel();
    } catch (error: any) {
      toast.error(
        error.message || "Error saving user record. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "BASIC":
        return (
          <BasicTab formData={formData} onInputChange={handleInputChange} />
        );

      case "END_DATE":
        return (
          <EndDateTab formData={formData} onInputChange={handleInputChange} />
        );

      // add more cases accroding to your choice

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="space-y-6">{renderActiveTab()}</div>
      <FormActions
        isLoading={isLoading}
        onSubmit={handleSave}
        onCancel={handleCancel}
        submitButtonLabel="SUBMIT"
        discardButtonLabel="DISCARD"
      />
    </div>
  );
};
