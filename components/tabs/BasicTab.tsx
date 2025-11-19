import { ValidatedTextInput } from "../validatedForm/ValidatedTextInput";
import { ValidatedDropdown } from "../validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "../validatedForm/ValidatedDatePicker";

interface BasiTabProps {
  register: any;
  errors: any;
  readOnly: boolean;
}

// options
const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];

export const BasicTab = ({ register, errors, readOnly }: BasiTabProps) => {
  return (
    <section className="min-h-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
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
