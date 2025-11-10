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

// Dropdown options
const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];
const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const Task2Form: React.FC = () => {
  // Tab state - BASIC is selected by default
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");

  //from State
  const [formData, setFormData] = useState({
    // Task-1 fields
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    maritalStatus: "",
    gender: "",
    estimatedStartDate: "2022-11-03",
    // Task-2 new fields
    country: "",
    address: "",
    city: "",
    estimatedEndDate: "2023-11-03",
  });

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  //   handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  //   handle save button click
  const handleSave = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Data saved successfully");
        handleCancel();
      } else {
        toast.error(data.error || "Error Saving data");
      }
    } catch (error: any) {
      toast.error(error.error || "Error Saving data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button click - clear all entries
  const handleCancel = () => {
    setFormData({
      // Task-1 fields
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      maritalStatus: "",
      gender: "",
      estimatedStartDate: "2022-11-03",
      // Task-2 new fields
      country: "",
      address: "",
      city: "",
      estimatedEndDate: "2023-11-03",
    });
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
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
                placeholder="Enter first name"
              />

              {/* Last Name */}
              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
                placeholder="Enter last name"
              />

              {/* Email */}
              <TextInput
                label="Email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                placeholder="Enter email"
                type="email"
              />

              {/* Status */}
              <Dropdown
                label="Status"
                value={formData.status}
                onChange={(value) => handleInputChange("status", value)}
                options={statusOptions}
              />

              {/* Marital Status */}
              <Dropdown
                label="Marital Status"
                value={formData.maritalStatus}
                onChange={(value) => handleInputChange("maritalStatus", value)}
                options={maritalStatusOptions}
              />

              {/* Gender */}
              <Dropdown
                label="Gender"
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
                options={genderOptions}
              />

              {/* Estimated Start Date */}
              <DatePicker
                label="Estimated Start Date"
                value={formData.estimatedStartDate}
                onChange={(value) =>
                  handleInputChange("estimatedStartDate", value)
                }
              />
            </div>
          </section>
        )}

        {activeTab === "END DATE" && (
          <section className="min-h-80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4  ">
              {/* Country */}
              <Dropdown
                label="Country"
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
                options={countryOptions}
              />

              {/* City */}
              <Dropdown
                label="City"
                value={formData.city}
                onChange={(value) => handleInputChange("city", value)}
                options={cityOptions}
              />

              {/* Estimated End Date */}
              <DatePicker
                label="Estimated End Date"
                value={formData.estimatedEndDate}
                onChange={(value) =>
                  handleInputChange("estimatedEndDate", value)
                }
              />

              {/* Text Area */}
              <TextArea
                label="Address"
                value={formData.address}
                onChange={(value) => handleInputChange("address", value)}
                placeholder="Enter Address"
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
