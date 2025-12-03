"use client";

import { Task8FormData } from "@/lib/validations";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import { SingleFileUpload } from "../files/SingleFileUpload";
import { MultipleFileUpload } from "../files/MultipleFileUpload";
import { NamedFilesUpload } from "../files/NamedFilesUpload";
import { RadioGroup } from "../forms/RadioGroup";
import { RangeInput } from "../forms/RangeInput";
import { SUBSCRIPTION_OPTIONS, COMMUNICATION_OPTIONS } from "@/lib/constants";

interface AdditionalTabProps {
  register: UseFormRegister<Task8FormData>;
  errors: any;
  readOnly: boolean;
  watch: UseFormWatch<Task8FormData>;
  setValue: UseFormSetValue<Task8FormData>;
  control?: Control<Task8FormData>;
}

export const AdditionalTab = ({
  register,
  errors,
  readOnly,
  watch,
  setValue,
}: AdditionalTabProps) => {
  // Watch form values
  const subscriptionType = watch("subscriptionType") || "basic";
  const communicationPref = watch("communicationPref") || "email";
  const salaryRange = watch("salaryRange") || "50000";
  const profilePicture = watch("profilePicture");
  const supportingDocuments = watch("supportingDocuments") || [];
  const namedFiles = watch("namedFiles") || [];

  // Handlers
  const handleSubscriptionChange = (value: string) => {
    setValue("subscriptionType", value, { shouldValidate: true });
  };

  const handleCommunicationChange = (value: string) => {
    setValue("communicationPref", value, { shouldValidate: true });
  };

  const handleSalaryChange = (value: string) => {
    setValue("salaryRange", value, { shouldValidate: true });
  };

  const handleProfilePictureChange = (file: any) => {
    setValue("profilePicture", file, { shouldValidate: true });
  };

  const handleSupportingDocsChange = (files: any[]) => {
    setValue("supportingDocuments", files, { shouldValidate: true });
  };

  const handleNamedFilesChange = (files: any[]) => {
    setValue("namedFiles", files, { shouldValidate: true });
  };

  return (
    <section className="min-h-80">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Subscription Type Radio Group */}
          <RadioGroup
            label="Subscription Type"
            name="subscriptionType"
            value={subscriptionType}
            options={SUBSCRIPTION_OPTIONS}
            onChange={handleSubscriptionChange}
            readOnly={readOnly}
            error={errors.subscriptionType}
          />

          {/* Communication Preference Radio Group */}
          <RadioGroup
            label="Communication Preference"
            name="communicationPref"
            value={communicationPref}
            options={COMMUNICATION_OPTIONS}
            onChange={handleCommunicationChange}
            readOnly={readOnly}
            error={errors.communicationPref}
          />

          {/* Salary Range */}
          <RangeInput
            label="Expected Salary Range"
            name="salaryRange"
            value={salaryRange}
            onChange={handleSalaryChange}
            readOnly={readOnly}
            error={errors.salaryRange}
            min={0}
            max={200000}
            step={5000}
          />
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Profile Picture Upload */}
          <SingleFileUpload
            label="Profile Picture"
            value={profilePicture}
            onChange={handleProfilePictureChange}
            readOnly={readOnly}
            error={errors.profilePicture}
          />

          {/* Supporting Documents Upload */}
          <MultipleFileUpload
            label="Supporting Documents"
            value={supportingDocuments}
            onChange={handleSupportingDocsChange}
            readOnly={readOnly}
            error={errors.supportingDocuments}
          />

          {/* Named Files with Document Type */}
          <NamedFilesUpload
            label="Official Documents (with Type & Custom Name)"
            value={namedFiles}
            onChange={handleNamedFilesChange}
            readOnly={readOnly}
            error={errors.namedFiles}
          />
        </div>
      </div>
    </section>
  );
};
