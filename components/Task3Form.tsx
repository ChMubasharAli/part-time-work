// components/tasks/Task3Form.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components

// Utilities & Validations
import { crudOperations } from "@/utils/crud";
import { Task3FormData, task3FormSchema } from "@/lib/user.schema";
import { BasicTab } from "./tabs/BasicTab";
import { EndDateTab } from "./tabs/EndDateTab";
import { TabNavigation } from "./navigation/TabNavigation";
import { FormActions } from "./forms/FormActions";

export const Task3Form: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"BASIC" | "END_DATE">("BASIC");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
    clearErrors,
  } = useForm<Task3FormData>({
    resolver: zodResolver(task3FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      maritalStatus: "",
      gender: "",
      estimatedStartDate: "",
      country: "",
      address: "",
      city: "",
      estimatedEndDate: "",
    },
  });

  // Handle successful form submission
  const onSubmit = async (data: Task3FormData) => {
    setIsLoading(true);

    try {
      await crudOperations.create(data, "/api/records");
      toast.success("Data saved successfully");
      handleCancel();
    } catch (error: any) {
      toast.error(error.message || "Error Saving data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle validation errors and tab switching
  const handleSave = handleSubmit(onSubmit, (validationErrors) => {
    const firstError = Object.keys(validationErrors)[0] as keyof Task3FormData;

    if (firstError) {
      setFocus(firstError);

      // Switch to appropriate tab based on error field
      const endDateFields = ["country", "address", "city", "estimatedEndDate"];
      if (endDateFields.includes(firstError)) {
        setActiveTab("END_DATE");
      } else {
        setActiveTab("BASIC");
      }
    }
  });

  // Handle cancel - reset form
  const handleCancel = () => {
    reset();
    clearErrors();
    setActiveTab("BASIC");
  };

  // Render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "BASIC":
        return <BasicTab register={register} errors={errors} />;
      case "END_DATE":
        return <EndDateTab register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="space-y-6">
        {renderActiveTab()}

        <FormActions
          onSubmit={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
