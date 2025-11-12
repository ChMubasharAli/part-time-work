"use client";

// import components
import { TextInput } from "./forms/TextInput";
import { Dropdown } from "./forms/Dropdown";
import { DatePicker } from "./forms/DatePicker";
import { TextArea } from "./forms/TextArea";
import { SubmitButton } from "./forms/SubmitButton";
import { DiscardButton } from "./forms/DiscardButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { Task3FormData, task3FormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidatedTextInput } from "./validatedForm/ValidatedTextInput";
import { ValidatedDropdown } from "./validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "./validatedForm/ValidatedDatePicker";
import { ValidatedTextArea } from "./validatedForm/ValidatedTextArea";

// Dropdown options
const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];
const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const Task3Form: React.FC = () => {
  // Tab state - BASIC is selected by default
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setFocus,
    reset,
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

  //   handle form submission with validation
  const onsubmit = async (data: Task3FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || "Data saved successfully");
        reset();
        setActiveTab("BASIC");
      } else {
        toast.error(responseData.error || "Error Saving data");
      }
    } catch (error: any) {
      toast.error(error.error || "Error Saving data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  //   handle save button click with validation
  const handleSave = handleSubmit(onsubmit, (errors) => {
    // if validation failed focus on first validation field
    const firstError = Object.keys(errors)[0] as keyof Task3FormData;
    if (firstError) {
      setFocus(firstError);
      setActiveTab("BASIC");
    }

    // switch to the appropriate tab if error is in End Date tab
    const endDateFeields = ["country", "address", "city", "estimatedEndDate"];
    if (endDateFeields.includes(firstError)) {
      setActiveTab("END DATE");
    }
  });

  // Handle cancel button click - clear all entries
  const handleCancel = () => {
    reset();
    clearErrors();
    setActiveTab("BASIC");
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6  ">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
            activeTab === "BASIC"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("BASIC")}
        >
          <FaRegUser size={13} />
          BASIC
        </button>

        <button
          className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
            activeTab === "END DATE"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("END DATE")}
        >
          <TfiMenuAlt size={13} />
          END DATE
        </button>
      </div>

      <div className="space-y-6 ">
        {/* BASIC Tab Content */}
        {activeTab === "BASIC" && (
          <section className="min-h-80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4  ">
              {/* First Name */}
              <ValidatedTextInput
                label="First Name"
                name="firstName"
                register={register}
                error={errors.firstName}
                placeholder="Enter first name"
              />

              {/* Last Name */}
              <ValidatedTextInput
                label="Last Name"
                name="lastName"
                register={register}
                error={errors.lastName}
                placeholder="Enter last name"
              />

              {/* Email */}
              <ValidatedTextInput
                label="Email"
                name="email"
                register={register}
                error={errors.email}
                placeholder="Enter email"
                type="email"
              />

              {/* Status */}
              <ValidatedDropdown
                label="Status"
                name="status"
                register={register}
                error={errors.status}
                options={statusOptions}
              />

              {/* Marital Status */}
              <ValidatedDropdown
                label="Marital Status"
                name="maritalStatus"
                register={register}
                error={errors.maritalStatus}
                options={maritalStatusOptions}
              />

              {/* Gender */}
              <ValidatedDropdown
                label="Gender"
                name="gender"
                register={register}
                error={errors.gender}
                options={genderOptions}
              />

              {/* Estimated Start Date */}
              <ValidatedDatePicker
                label="Estimated Start Date"
                name="estimatedStartDate"
                register={register}
                error={errors.estimatedStartDate}
              />
            </div>
          </section>
        )}

        {activeTab === "END DATE" && (
          <section className="min-h-80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4  ">
              {/* Country */}
              <ValidatedDropdown
                label="Country"
                name="country"
                register={register}
                error={errors.country}
                options={countryOptions}
              />

              {/* City */}
              <ValidatedDropdown
                label="City"
                name="city"
                register={register}
                error={errors.city}
                options={cityOptions}
              />

              {/* Estimated End Date */}
              <ValidatedDatePicker
                label="Estimated End Date"
                name="estimatedEndDate"
                register={register}
                error={errors.estimatedEndDate}
              />

              {/* Text Area */}
              <ValidatedTextArea
                label="Address"
                name="address"
                register={register}
                error={errors.address}
                placeholder="Enter your address"
                rows={3}
              />
            </div>
          </section>
        )}

        {/* Buttons - Outside of tabs */}
        <div className="flex space-x-2 pt-20 justify-center">
          <SubmitButton
            onClick={handleSave}
            disabled={isLoading}
            label="SUBMIT"
          />
          <DiscardButton
            onClick={handleCancel}
            disabled={isLoading}
            label="DISCARD"
          />
        </div>
      </div>
    </div>
  );
};
