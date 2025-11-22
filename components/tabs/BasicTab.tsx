// components/tabs/BasicTab.tsx (with hook)
"use client";

import { ValidatedTextInput } from "../validatedForm/ValidatedTextInput";
import { ValidatedDropdown } from "../validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "../validatedForm/ValidatedDatePicker";
import { useContainerWidth } from "@/hooks/useContainerWIdth";

interface BasiTabProps {
  register: any;
  errors: any;
  readOnly: boolean;
}

const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];

export const BasicTab = ({ register, errors, readOnly }: BasiTabProps) => {
  const { containerRef, columns } = useContainerWidth(768);
  const gridClass = columns === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <section className="min-h-80" ref={containerRef}>
      <div className={`grid ${gridClass} gap-4 px-4`}>
        <ValidatedTextInput
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
          placeholder="Enter first name"
          readOnly={readOnly}
        />
        <ValidatedTextInput
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
          placeholder="Enter last name"
          readOnly={readOnly}
        />
        <ValidatedTextInput
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          placeholder="Enter email"
          type="email"
          readOnly={readOnly}
        />
        <ValidatedDropdown
          label="Status"
          name="status"
          register={register}
          error={errors.status}
          options={statusOptions}
          readOnly={readOnly}
        />
        <ValidatedDropdown
          label="Marital Status"
          name="maritalStatus"
          register={register}
          error={errors.maritalStatus}
          options={maritalStatusOptions}
          readOnly={readOnly}
        />
        <ValidatedDropdown
          label="Gender"
          name="gender"
          register={register}
          error={errors.gender}
          options={genderOptions}
          readOnly={readOnly}
        />
        <ValidatedDatePicker
          label="Estimated Start Date"
          name="estimatedStartDate"
          register={register}
          error={errors.estimatedStartDate}
          readOnly={readOnly}
        />
      </div>
    </section>
  );
};
