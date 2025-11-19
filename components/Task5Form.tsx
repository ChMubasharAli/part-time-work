"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { BasicTab } from "./tabs/BasicTab";
import { EndDateTab } from "./tabs/EndDateTab";
import { RecordNavigation } from "./navigation/RecordNavigation";
import { FormActions } from "./forms/FormActions";
import { Task5FormData, task5FormSchema } from "@/lib/validations";
import { FORM_MODES, FormMode } from "@/lib/constants";
import { crudOperations, User } from "@/lib/crud";
import { LoadingState } from "./states/LoadingState";
import { EmptyState } from "./states/EmptyState";
import { TabsNavigation } from "./navigation/TabNavigation";

interface Task5FromProps {
  mode: FormMode;
}

export const Task5Form = ({ mode }: Task5FromProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");
  const [loading, setLoading] = useState(mode !== FORM_MODES.CREATE);

  const currentUser = users[currentIndex];
  const isReadOnly = mode === FORM_MODES.READONLY;
  const isCreateMode = mode === FORM_MODES.CREATE;
  const isEditMode = mode === FORM_MODES.EDIT;

  const formMethods = useForm<Task5FormData>({
    resolver: isReadOnly ? undefined : zodResolver(task5FormSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    clearErrors,
  } = formMethods;

  // Single useEffect for all data operations
  useEffect(() => {
    const handleFormData = async () => {
      if (isCreateMode) {
        // For create mode, just reset to empty form
        reset(getDefaultValues());
        setLoading(false);
        return;
      }

      // For edit/readonly modes
      try {
        setLoading(true);

        // Load users only if we don't have them or we're not just navigating
        if (users.length === 0) {
          const userData = await crudOperations.read("/api/records");
          setUsers(userData);
        }

        // If we have users and a current user, populate the form
        if (users.length > 0 && currentUser) {
          populateFormWithUserData(currentUser);
        }
      } catch (error) {
        toast.error("Error loading records");
      } finally {
        setLoading(false);
      }
    };

    handleFormData();
  }, [mode, currentIndex, users.length]); // Dependencies for all scenarios

  const populateFormWithUserData = (user: User) => {
    const values = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      status: user.status || "",
      maritalStatus: user.maritalStatus || "",
      gender: user.gender || "",
      estimatedStartDate: formatDate(user.estimatedStartDate) || "",
      country: user.country || "",
      address: user.address || "",
      city: user.city || "",
      estimatedEndDate: formatDate(user.estimatedEndDate) || "",
    };

    reset(values);
  };

  // Handle form submission
  const onSubmit = async (data: Task5FormData) => {
    setSubmitting(true);

    try {
      if (isCreateMode) {
        const response = await crudOperations.create(data, "/api/records");
        if (response.message) {
          toast.success(response.message || "Record created successfully");
          reset(getDefaultValues());
          setActiveTab("BASIC");
        } else {
          toast.error(response.error || "Error creating record");
        }
      } else if (isEditMode && typeof currentUser?.id === "number") {
        const response = await crudOperations.update(
          currentUser.id,
          data,
          "/api/records"
        );
        if (response.message) {
          toast.success(response.message || "Record updated successfully");
        } else {
          toast.error(response.error || "Error updating record");
        }
      }
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle save with validation
  const handleSave = handleSubmit(onSubmit, (errors) => {
    const firstError = Object.keys(errors)[0] as keyof Task5FormData;
    if (firstError) {
      setFocus(firstError);
      handleTabSwitch(firstError);
    }
  });

  const handleTabSwitch = (field: keyof Task5FormData) => {
    const basicFields = [
      "firstName",
      "lastName",
      "email",
      "status",
      "maritalStatus",
      "gender",
      "estimatedStartDate",
    ];
    const endDateFields = ["country", "address", "city", "estimatedEndDate"];

    if (basicFields.includes(field)) setActiveTab("BASIC");
    else if (endDateFields.includes(field)) setActiveTab("END DATE");
  };

  // Handle cancel - reset to current user data
  const handleCancel = () => {
    if (isCreateMode) {
      reset(getDefaultValues());
    } else if (currentUser) {
      clearErrors();
      populateFormWithUserData(currentUser);
    }
    setActiveTab("BASIC");
  };

  // Navigation functions
  const navigationHandlers = {
    goToFirst: () => setCurrentIndex(0),
    goToPrevious: () => setCurrentIndex(Math.max(0, currentIndex - 1)),
    goToNext: () =>
      setCurrentIndex(Math.min(users.length - 1, currentIndex + 1)),
    goToLast: () => setCurrentIndex(users.length - 1),
  };

  const formatDate = (dateString: string) =>
    dateString ? dateString.split("T")[0] : "";

  // Render states
  if (loading) return <LoadingState />;
  if (mode !== FORM_MODES.CREATE && users.length === 0) return <EmptyState />;

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {activeTab === "BASIC" && (
            <BasicTab
              register={register}
              errors={errors}
              readOnly={isReadOnly}
            />
          )}

          {activeTab === "END DATE" && (
            <EndDateTab
              register={register}
              errors={errors}
              readOnly={isReadOnly}
            />
          )}

          <div className="flex gap-10 pt-20 justify-center items-center">
            {mode !== FORM_MODES.CREATE && (
              <RecordNavigation
                currentIndex={currentIndex}
                totalRecords={users.length}
                onFirst={navigationHandlers.goToFirst}
                onPrevious={navigationHandlers.goToPrevious}
                onNext={navigationHandlers.goToNext}
                onLast={navigationHandlers.goToLast}
                disabled={submitting}
              />
            )}

            <FormActions
              onSubmit={handleSave}
              onCancel={handleCancel}
              submitting={submitting}
              navigating={false}
              readOnly={isReadOnly}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

function getDefaultValues(): Task5FormData {
  return {
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
  };
}
