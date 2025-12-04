"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  VISIT_TYPE_OPTIONS,
  CHRONIC_DISEASES,
  PAST_SURGERIES,
  CURRENT_CONDITIONS,
} from "@/lib/constants";
import { Task9FormData, task9FormSchema } from "@/lib/validations";

import { CheckboxGroup } from "../forms/CheckboxGroup";
import { ValidatedTextInput } from "../validatedForm/ValidatedTextInput";
import { ValidatedDropdown } from "../validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "../validatedForm/ValidatedDatePicker";

export const Task9CreateForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Task9FormData>({
    resolver: zodResolver(task9FormSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      age: "",
      cnic: "",
      maritalStatus: "",
      bloodGroup: "",
      phoneNumber: "",
      emergencyContact: "",
      email: "",
      address: "",
      city: "",
      chronicDiseases: [],
      pastSurgeries: [],
      currentConditions: [],
      visitType: "",
      reason: "",
      assignedDoctor: "",
    },
    mode: "onChange",
  });

  // Watch checkbox values
  const chronicDiseases = watch("chronicDiseases") || [];
  const pastSurgeries = watch("pastSurgeries") || [];
  const currentConditions = watch("currentConditions") || [];

  const onSubmit = async (data: Task9FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/task9/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "create",
          ...data,
          age: parseInt(data.age),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Patient record created successfully!");
        reset();
        queryClient.invalidateQueries({
          queryKey: ["task9-patients"],
        });
      } else {
        toast.error(result.error || "Error creating patient record");
      }
    } catch (error: any) {
      toast.error("Error saving data");
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Patient Record
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in all sections to create a comprehensive patient record
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* 1️⃣ Personal Information */}
          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              1️⃣ Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedTextInput
                label="Full Name"
                name="fullName"
                register={register}
                error={errors.fullName}
                placeholder="Enter full name"
              />
              <ValidatedDropdown
                label="Gender"
                name="gender"
                register={register}
                error={errors.gender}
                options={GENDER_OPTIONS}
              />
              <ValidatedDatePicker
                label="Date of Birth"
                name="dateOfBirth"
                register={register}
                error={errors.dateOfBirth}
              />
              <ValidatedTextInput
                label="Age"
                name="age"
                register={register}
                error={errors.age}
                placeholder="25"
                type="number"
              />
              <ValidatedTextInput
                label="CNIC / ID Number"
                name="cnic"
                register={register}
                error={errors.cnic}
                placeholder="42101-1234567-8"
              />
              <ValidatedDropdown
                label="Marital Status"
                name="maritalStatus"
                register={register}
                error={errors.maritalStatus}
                options={MARITAL_STATUS_OPTIONS}
              />
              <ValidatedDropdown
                label="Blood Group"
                name="bloodGroup"
                register={register}
                error={errors.bloodGroup}
                options={BLOOD_GROUP_OPTIONS}
              />
            </div>
          </section>

          {/* 2️⃣ Contact & Address Details */}
          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              2️⃣ Contact & Address Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedTextInput
                label="Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber}
                placeholder="03XX-XXXXXXX"
              />
              <ValidatedTextInput
                label="Emergency Contact"
                name="emergencyContact"
                register={register}
                error={errors.emergencyContact}
                placeholder="03XX-XXXXXXX"
              />
              <ValidatedTextInput
                label="Email Address"
                name="email"
                register={register}
                error={errors.email}
                placeholder="patient@example.com"
                type="email"
              />
              <ValidatedTextInput
                label="City"
                name="city"
                register={register}
                error={errors.city}
                placeholder="Karachi"
              />
              <div className="md:col-span-2">
                <ValidatedTextInput
                  label="Address"
                  name="address"
                  register={register}
                  error={errors.address}
                  placeholder="House #, Street, Area"
                />
              </div>
            </div>
          </section>

          {/* 3️⃣ Medical History */}
          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              3️⃣ Medical History
            </h2>
            <div className="space-y-6">
              <CheckboxGroup
                label="Chronic Diseases (Select all that apply)"
                name="chronicDiseases"
                value={chronicDiseases}
                options={CHRONIC_DISEASES}
                onChange={(value) => setValue("chronicDiseases", value)}
                error={errors.chronicDiseases}
              />
              <CheckboxGroup
                label="Past Surgeries (Select all that apply)"
                name="pastSurgeries"
                value={pastSurgeries}
                options={PAST_SURGERIES}
                onChange={(value) => setValue("pastSurgeries", value)}
                error={errors.pastSurgeries}
              />
              <CheckboxGroup
                label="Current Health Conditions (Select all that apply)"
                name="currentConditions"
                value={currentConditions}
                options={CURRENT_CONDITIONS}
                onChange={(value) => setValue("currentConditions", value)}
                error={errors.currentConditions}
              />
            </div>
          </section>

          {/* 4️⃣ Current Visit & Vitals */}
          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              4️⃣ Current Visit & Vitals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedDropdown
                label="Visit Type"
                name="visitType"
                register={register}
                error={errors.visitType}
                options={VISIT_TYPE_OPTIONS}
              />
              <ValidatedTextInput
                label="Assigned Doctor"
                name="assignedDoctor"
                register={register}
                error={errors.assignedDoctor}
                placeholder="Dr. Ahmed Khan"
              />
              <div className="md:col-span-2">
                <ValidatedTextInput
                  label="Reason for Visit"
                  name="reason"
                  register={register}
                  error={errors.reason}
                  placeholder="Describe symptoms or reason for visit"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting
                ? "Creating Patient Record..."
                : "Create Patient Record"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
