"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { BasicTab } from "./tabs/BasicTab";
import { EndDateTab } from "./tabs/EndDateTab";
import { TabNavigation } from "./navigation/TabNavigation";
import { FormActions } from "./forms/FormActions";

// Utilities & Validations
import { crudOperations } from "@/utils/crud";
import { Task3FormData, task3FormSchema } from "@/lib/user.schema";

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
    setValue,
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
      // ONLY THESE 3 metadata defaults
      clientTimestamp: "",
      timezoneOffset: 0,
      browserTimezone: "",
    },
  });

  // Get client metadata function
  const getClientMetadata = () => {
    const now = new Date();

    // JavaScript gives opposite sign
    const jsOffset = now.getTimezoneOffset();

    // Multiply by -1 to get YOUR convention
    const myOffset = jsOffset * -1;

    return {
      clientTimestamp: now.toISOString(),
      timezoneOffset: myOffset, // YOUR convention: GMT+5 = +300
      browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  // Handle successful form submission
  const onSubmit = async (data: Task3FormData) => {
    setIsLoading(true);

    try {
      // 1. Get client metadata at the moment of Save button press
      const clientMetadata = getClientMetadata();

      // 2. Combine form data with client metadata
      const dataWithMetadata = {
        ...data,
        ...clientMetadata,
      };

      // 3. Send to server
      await crudOperations.create(dataWithMetadata, "/api/records");
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
