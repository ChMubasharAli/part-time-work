// /components/Task5Form.tsx - FIXED VERSION
'use client';

import { useState, useEffect, useCallback } from "react";
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
import { useRecords } from "@/hooks/useRecords";
import { useManualFetch } from "@/hooks/useManualFetch";

interface Task5FromProps {
  mode: FormMode;
}

export const Task5Form = ({ mode }: Task5FromProps) => {
  // State declarations
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");
  const [allRecords, setAllRecords] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // TanStack Query hooks
  const { 
    records: currentPageRecords, 
    totalCount, 
    hasMore, 
    isLoading, 
    isFetching,
    prefetchNextPage 
  } = useRecords(currentPage);

  const { fetchPage } = useManualFetch();

  // Derived values
  const currentUser = allRecords[currentIndex];
  const isReadOnly = mode === FORM_MODES.READONLY;
  const isCreateMode = mode === FORM_MODES.CREATE;
  const isEditMode = mode === FORM_MODES.EDIT;

  // Form setup
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
    clearErrors,
  } = formMethods;

  // Stable helper functions with useCallback
  const populateFormWithUserData = useCallback((user: User) => {
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
  }, [reset]);

  const formatDate = (dateString: string) => 
    dateString ? dateString.split("T")[0] : "";

  // EFFECT 1: Handle initial data setup and record updates
  useEffect(() => {
    if (isCreateMode) {
      reset(getDefaultValues());
      return;
    }

    // Only update records when we have new currentPageRecords
    if (currentPageRecords.length > 0) {
      setAllRecords(prev => {
        const existingIds = new Set(prev.map(record => record.id));
        const newRecords = currentPageRecords.filter(record => 
          !existingIds.has(record.id)
        );
        
        // Only update if we actually have new records
        return newRecords.length > 0 ? [...prev, ...newRecords] : prev;
      });
    }
  }, [isCreateMode, currentPageRecords, reset]);

  // EFFECT 2: Handle form population when current user changes
  useEffect(() => {
    if (isCreateMode || !currentUser) return;
    
    populateFormWithUserData(currentUser);
  }, [isCreateMode, currentUser, populateFormWithUserData]);

  // EFFECT 3: Handle smart prefetching
  useEffect(() => {
    if (isCreateMode || allRecords.length === 0) return;
    
    const sixtyPercentThreshold = Math.floor(allRecords.length * 0.6);
    if (currentIndex >= sixtyPercentThreshold) {
      prefetchNextPage(currentIndex, allRecords);
    }
  }, [isCreateMode, currentIndex, allRecords, prefetchNextPage]);

  // Form submission
  const onSubmit = async (data: Task5FormData) => {
    setSubmitting(true);
    try {
      if (isCreateMode) {
        const response = await crudOperations.create(data, "/api/records");
        response.message 
          ? toast.success(response.message) 
          : toast.error(response.error || "Error creating record");
        reset(getDefaultValues());
        setActiveTab("BASIC");
      } else if (isEditMode && currentUser?.id) {
        const response = await crudOperations.update(currentUser.id, data, "/api/records");
        response.message 
          ? toast.success(response.message) 
          : toast.error(response.error || "Error updating record");
      }
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setSubmitting(false);
    }
  };

  // Save with validation
  const handleSave = handleSubmit(onSubmit, (errors) => {
    const firstError = Object.keys(errors)[0] as keyof Task5FormData;
    if (firstError) {
      setFocus(firstError);
      handleTabSwitch(firstError);
    }
  });

  const handleTabSwitch = (field: keyof Task5FormData) => {
    const basicFields = [
      "firstName", "lastName", "email", "status", 
      "maritalStatus", "gender", "estimatedStartDate",
    ];
    const endDateFields = ["country", "address", "city", "estimatedEndDate"];

    basicFields.includes(field) ? setActiveTab("BASIC") : 
    endDateFields.includes(field) && setActiveTab("END DATE");
  };

  // Cancel handler
  const handleCancel = () => {
    if (isCreateMode) {
      reset(getDefaultValues());
    } else if (currentUser) {
      clearErrors();
      populateFormWithUserData(currentUser);
    }
    setActiveTab("BASIC");
  };

  // Navigation handlers
  const navigationHandlers = {
    goToFirst: () => setCurrentIndex(0),
    goToPrevious: () => setCurrentIndex(Math.max(0, currentIndex - 1)),
    goToNext: async () => {
      const nextIndex = currentIndex + 1;
      
      if (nextIndex >= allRecords.length && hasMore) {
        try {
          const nextPage = currentPage + 1;
          const newData = await fetchPage(nextPage);
          if (newData.records.length > 0) {
            setCurrentPage(nextPage);
            setCurrentIndex(nextIndex);
          }
        } catch (error) {
          toast.error("Error loading more records");
        }
      } else if (nextIndex < allRecords.length) {
        setCurrentIndex(nextIndex);
      }
    },
    goToLast: () => {
      hasMore 
        ? toast.info("Loading all records...") 
        : setCurrentIndex(allRecords.length - 1);
    },
  };

  // Render states
  if (isLoading && allRecords.length === 0) return <LoadingState />;
  if (mode !== FORM_MODES.CREATE && allRecords.length === 0) return <EmptyState />;

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {activeTab === "BASIC" && (
            <BasicTab register={register} errors={errors} readOnly={isReadOnly} />
          )}

          {activeTab === "END DATE" && (
            <EndDateTab register={register} errors={errors} readOnly={isReadOnly} />
          )}

          <div className="flex gap-10 pt-20 justify-center items-center">
            {mode !== FORM_MODES.CREATE && (
              <RecordNavigation
                currentIndex={currentIndex}
                totalRecords={allRecords.length}
                onFirst={navigationHandlers.goToFirst}
                onPrevious={navigationHandlers.goToPrevious}
                onNext={navigationHandlers.goToNext}
                onLast={navigationHandlers.goToLast}
                disabled={submitting || isFetching}
              />
            )}

            <FormActions
              onSubmit={handleSave}
              onCancel={handleCancel}
              submitting={submitting}
              navigating={isFetching}
              readOnly={isReadOnly}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// Default values outside component
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