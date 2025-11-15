"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task3FormData, task3FormSchema } from "@/lib/validations";
import { FormMode, FORM_MODES } from "@/lib/constants";
import { SubmitButton } from "./forms/SubmitButton";
import { DiscardButton } from "./forms/DiscardButton";
import { FirstButton } from "./forms/FirstButton";
import { PreviousButton } from "./forms/PreviousButton";
import { NextButton } from "./forms/NextButton";
import { LastButton } from "./forms/LastButton";
import { toast } from "react-toastify";
import { ValidatedTextInput } from "./validatedForm/ValidatedTextInput";
import { ValidatedDropdown } from "./validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "./validatedForm/ValidatedDatePicker";
import { ValidatedTextArea } from "./validatedForm/ValidatedTextArea";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  maritalStatus: string;
  gender: string;
  estimatedStartDate: string;
  country: string;
  address: string;
  city: string;
  estimatedEndDate: string;
}

interface Task5FromProps {
  mode: FormMode;
}

const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];
const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const Task5Form = ({ mode }: Task5FromProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState<number | null>(null); // NEW: Track current record ID

  const currentUser = users[currentIndex];
  const isFirstRecord = currentIndex === 0;
  const isLastRecord = currentIndex === users.length - 1;
  const isReadOnly = mode === FORM_MODES.READONLY;
  const isCreateMode = mode === FORM_MODES.CREATE;
  const isEditMode = mode === FORM_MODES.EDIT;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    clearErrors,
  } = useForm<Task3FormData>({
    resolver: isReadOnly ? undefined : zodResolver(task3FormSchema),
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

  // Load users for Edit and ReadOnly modes
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/records");
      if (response.ok) {
        const userData = await response.json();
        const usersArray = userData.userData || userData;
        setUsers(usersArray);

        // After loading users, find and set the current record
        if (currentRecordId && mode !== FORM_MODES.CREATE) {
          const recordIndex = usersArray.findIndex(
            (user: User) => user.id === currentRecordId
          );
          if (recordIndex !== -1) {
            setCurrentIndex(recordIndex);
          }
        }
      }
    } catch (error) {
      toast.error("Error loading records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode !== FORM_MODES.CREATE) {
      loadUsers();
    }
  }, [mode]);

  //   Update form and track current record ID
  useEffect(() => {
    if (currentUser && mode !== FORM_MODES.CREATE) {
      setIsNavigating(true);
      clearErrors();

      // Set current record ID whenever user changes
      setCurrentRecordId(currentUser.id);

      const values = {
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        status: currentUser.status || "",
        maritalStatus: currentUser.maritalStatus || "",
        gender: currentUser.gender || "",
        estimatedStartDate: formatDate(currentUser.estimatedStartDate) || "",
        country: currentUser.country || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        estimatedEndDate: formatDate(currentUser.estimatedEndDate) || "",
      };

      Object.entries(values).forEach(([key, value]) => {
        setValue(key as keyof Task3FormData, value, {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        });
      });

      setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    }
  }, [currentUser, mode, setValue, clearErrors]);

  // Handle form submission
  const onSubmit = async (data: Task3FormData) => {
    if (isNavigating) {
      return;
    }

    setSubmitting(true);

    try {
      if (isCreateMode) {
        // Create new record
        const response = await fetch("/api/records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
          toast.success(responseData.message || "Record created successfully");
          reset();
          setActiveTab("BASIC");
        } else {
          toast.error(responseData.error || "Error creating record");
        }
      } else if (isEditMode && currentUser) {
        // Update existing record and maintain position
        const currentRecordIdBeforeUpdate = currentUser.id; // Remember current record ID

        const response = await fetch(
          `/api/records/${currentRecordIdBeforeUpdate}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          toast.success(responseData.message || "Record updated successfully");

          // Reload users to get updated data
          await loadUsers();

          //   The loadUsers function will automatically find and set the current record because we're tracking currentRecordId
        } else {
          toast.error(responseData.error || "Error updating record");
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
    if (isNavigating) {
      return;
    }

    const firstError = Object.keys(errors)[0] as keyof Task3FormData;
    if (firstError) {
      setFocus(firstError);

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

      if (basicFields.includes(firstError)) {
        setActiveTab("BASIC");
      } else if (endDateFields.includes(firstError)) {
        setActiveTab("END DATE");
      }
    }
  });

  // Handle cancel
  const handleCancel = () => {
    if (isCreateMode) {
      reset();
    } else if (isEditMode && currentUser) {
      clearErrors();
      const values = {
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        status: currentUser.status || "",
        maritalStatus: currentUser.maritalStatus || "",
        gender: currentUser.gender || "",
        estimatedStartDate: formatDate(currentUser.estimatedStartDate) || "",
        country: currentUser.country || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        estimatedEndDate: formatDate(currentUser.estimatedEndDate) || "",
      };

      Object.entries(values).forEach(([key, value]) => {
        setValue(key as keyof Task3FormData, value, {
          shouldValidate: false,
          shouldDirty: false,
        });
      });
    }
    setActiveTab("BASIC");
  };

  // Navigation functions
  const handleNavigation = (newIndex: number) => {
    setIsNavigating(true);
    setCurrentIndex(newIndex);
  };

  const goToFirst = () => handleNavigation(0);
  const goToPrevious = () => handleNavigation(Math.max(0, currentIndex - 1));
  const goToNext = () =>
    handleNavigation(Math.min(users.length - 1, currentIndex + 1));
  const goToLast = () => handleNavigation(users.length - 1);

  const formatDate = (dateString: string) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  if (loading && mode !== FORM_MODES.CREATE) {
    return (
      <div className="max-w-4xl w-full mx-auto p-6 flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="h-12 w-12 border-b-4 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading records...</p>
        </div>
      </div>
    );
  }

  if (mode !== FORM_MODES.CREATE && users.length === 0) {
    return (
      <div className="max-w-4xl w-full mx-auto p-6 text-center">
        <p className="text-lg text-gray-600 mb-3">No records found.</p>
        <p className="text-gray-500">Please create some records first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
            activeTab === "BASIC"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("BASIC")}
        >
          <svg
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          BASIC
        </button>

        <button
          type="button"
          className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
            activeTab === "END DATE"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("END DATE")}
        >
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          END DATE
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* BASIC Tab Content */}
          {activeTab === "BASIC" && (
            <section className="min-h-80">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                <ValidatedTextInput
                  label="First Name"
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                  placeholder="Enter first name"
                  readOnly={isReadOnly}
                />
                <ValidatedTextInput
                  label="Last Name"
                  name="lastName"
                  register={register}
                  error={errors.lastName}
                  placeholder="Enter last name"
                  readOnly={isReadOnly}
                />
                <ValidatedTextInput
                  label="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                  placeholder="Enter email"
                  type="email"
                  readOnly={isReadOnly}
                />
                <ValidatedDropdown
                  label="Status"
                  name="status"
                  register={register}
                  error={errors.status}
                  options={statusOptions}
                  readOnly={isReadOnly}
                />
                <ValidatedDropdown
                  label="Marital Status"
                  name="maritalStatus"
                  register={register}
                  error={errors.maritalStatus}
                  options={maritalStatusOptions}
                  readOnly={isReadOnly}
                />
                <ValidatedDropdown
                  label="Gender"
                  name="gender"
                  register={register}
                  error={errors.gender}
                  options={genderOptions}
                  readOnly={isReadOnly}
                />
                <ValidatedDatePicker
                  label="Estimated Start Date"
                  name="estimatedStartDate"
                  register={register}
                  error={errors.estimatedStartDate}
                  readOnly={isReadOnly}
                />
              </div>
            </section>
          )}

          {/* END DATE Tab Content */}
          {activeTab === "END DATE" && (
            <section className="min-h-80">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                <ValidatedDropdown
                  label="Country"
                  name="country"
                  register={register}
                  error={errors.country}
                  options={countryOptions}
                  readOnly={isReadOnly}
                />
                <ValidatedDropdown
                  label="City"
                  name="city"
                  register={register}
                  error={errors.city}
                  options={cityOptions}
                  readOnly={isReadOnly}
                />
                <ValidatedDatePicker
                  label="Estimated End Date"
                  name="estimatedEndDate"
                  register={register}
                  error={errors.estimatedEndDate}
                  readOnly={isReadOnly}
                />

                <ValidatedTextArea
                  label="Address"
                  name="address"
                  register={register}
                  error={errors.address}
                  placeholder="Enter your address"
                  rows={3}
                  readOnly={isReadOnly}
                />
              </div>
            </section>
          )}

          {/* bUTTON SECTION  */}
          <div className="flex gap-10 pt-20 justify-center items-center">
            {/* Pagination buttons - Show in ALL modes except Create */}
            {mode !== FORM_MODES.CREATE && (
              <div className="flex items-center gap-2">
                <FirstButton
                  onClick={goToFirst}
                  disabled={isFirstRecord || submitting}
                />
                <PreviousButton
                  onClick={goToPrevious}
                  disabled={isFirstRecord || submitting}
                />
              </div>
            )}

            {/* Submit and Discard buttons - Show in ALL modes */}
            <div className="flex items-center gap-2">
              <SubmitButton
                onClick={handleSave}
                disabled={isReadOnly || submitting || isNavigating}
                label={submitting ? "SAVING..." : "SUBMIT"}
              />
              <DiscardButton
                onClick={handleCancel}
                disabled={isReadOnly || submitting || isNavigating}
                label="DISCARD"
              />
            </div>

            {/* Pagination buttons - Show in ALL modes except Create */}
            {mode !== FORM_MODES.CREATE && (
              <div className="flex items-center gap-2">
                <NextButton
                  onClick={goToNext}
                  disabled={isLastRecord || submitting}
                />
                <LastButton
                  onClick={goToLast}
                  disabled={isLastRecord || submitting}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
