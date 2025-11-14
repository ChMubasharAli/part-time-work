"use client";

// import components
import { TextInput } from "./forms/TextInput";
import { Dropdown } from "./forms/Dropdown";
import { DatePicker } from "./forms/DatePicker";
import { TextArea } from "./forms/TextArea";
import { SubmitButton } from "./forms/SubmitButton";
import { DiscardButton } from "./forms/DiscardButton";
import { useEffect, useState } from "react";
import { PreviousButton } from "./forms/PreviousButton";
import { NextButton } from "./forms/NextButton";
import { LastButton } from "./forms/LastButton";
import { FirstButton } from "./forms/FirstButton";

// Simple interface for user data
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

// Dropdown options
const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];
const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const Task4Form: React.FC = () => {
  // Tab state - BASIC is selected by default
  const [activeTab, setActiveTab] = useState<"BASIC" | "END DATE">("BASIC");

  // State for users data and current record index
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  //   get current user record
  const currentUser = users[currentIndex];

  //   calculate buttons states
  const isFirstRecord = currentIndex === 0;
  const isLastRecord = currentIndex === users.length - 1;

  //   function to load all users from the database
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/records");
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData.userData);
      }
    } catch (error) {
      console.error("Error loading users : ", error);
    } finally {
      setLoading(false);
    }
  };

  //   navigation functions
  const goToFirst = () => setCurrentIndex(0);
  const gotToPrevious = () => setCurrentIndex((prev) => prev - 1);
  const goToNext = () => setCurrentIndex((prev) => prev + 1);
  const gotToLast = () => setCurrentIndex(users.length - 1);

  //   format date to display
  const fromatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  //   fetch all the users from database on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  //   handleSave function
  const handleSave = () => {};

  //   handleCancel function
  const handleCancel = () => {};

  //   show loading state
  if (loading) {
    return (
      <p className="h-12 w-12 border-b-4 border-blue-500 rounded-full animate-spin"></p>
    );
  }

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
          {/* user SVG  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
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
          className={`py-2 flex items-center gap-1 px-4 font-medium text-lg border-b-2 transition-colors ${
            activeTab === "END DATE"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("END DATE")}
        >
          {/* //end Date  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
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

      <div className="space-y-6 ">
        {/* BASIC Tab Content */}
        {activeTab === "BASIC" && (
          <section className="min-h-80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4  ">
              {/* First Name */}
              <TextInput
                label="First Name"
                value={currentUser?.firstName}
                placeholder="Enter first name"
                readOnly={true}
              />

              {/* Last Name */}
              <TextInput
                label="Last Name"
                value={currentUser?.lastName}
                placeholder="Enter last name"
                readOnly={true}
              />

              {/* Email */}
              <TextInput
                label="Email"
                value={currentUser?.email}
                placeholder="Enter email"
                type="email"
                readOnly={true}
              />

              {/* Status */}
              <Dropdown
                label="Status"
                value={currentUser?.status}
                options={statusOptions}
                readOnly={true}
              />

              {/* Marital Status */}
              <Dropdown
                label="Marital Status"
                value={currentUser?.maritalStatus}
                options={maritalStatusOptions}
                readOnly={true}
              />

              {/* Gender */}
              <Dropdown
                label="Gender"
                value={currentUser?.gender}
                options={genderOptions}
                readOnly={true}
              />

              {/* Estimated Start Date */}
              <DatePicker
                label="Estimated Start Date"
                value={fromatDate(currentUser?.estimatedStartDate)}
                readOnly={true}
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
                value={currentUser?.country}
                options={countryOptions}
                readOnly={true}
              />

              {/* City */}
              <Dropdown
                label="City"
                value={currentUser?.city}
                options={cityOptions}
                readOnly={true}
              />

              {/* Estimated End Date */}
              <DatePicker
                label="Estimated End Date"
                value={fromatDate(currentUser?.estimatedEndDate)}
                readOnly={true}
              />

              {/* Text Area */}
              <TextArea
                label="Address"
                value={currentUser?.address}
                placeholder="Enter Address"
                readOnly
              />
            </div>
          </section>
        )}

        {/* Buttons - Outside of tabs */}
        <div className="flex gap-10 pt-20 justify-center items-center">
          {/* first and previous buttons  */}
          <div className="flex items-center gap-2">
            <FirstButton onClick={goToFirst} disabled={isFirstRecord} />
            <PreviousButton onClick={gotToPrevious} disabled={isFirstRecord} />
          </div>
          <div className="flex items-center gap-2">
            <SubmitButton onClick={handleSave} disabled={true} label="SUBMIT" />
            <DiscardButton
              onClick={handleCancel}
              disabled={true}
              label="DISCARD"
            />
          </div>

          <div className="flex items-center gap-2">
            <NextButton onClick={goToNext} disabled={isLastRecord} />
            <LastButton onClick={gotToLast} disabled={isLastRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};
