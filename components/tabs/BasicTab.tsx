import { TextInput } from "../forms/TextInput";
import { Dropdown } from "../forms/Dropdown";
import { DatePicker } from "../forms/DatePicker";

interface BasicTabProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    maritalStatus: string;
    gender: string;
    estimatedStartDate: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];

export const BasicTab = ({ formData, onInputChange }: BasicTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChange={(value) => onInputChange("firstName", value)}
        placeholder="Enter first name"
      />

      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChange={(value) => onInputChange("lastName", value)}
        placeholder="Enter last name"
      />

      <TextInput
        label="Email"
        value={formData.email}
        onChange={(value) => onInputChange("email", value)}
        placeholder="Enter email"
        type="email"
      />

      <Dropdown
        label="Status"
        value={formData.status}
        onChange={(value) => onInputChange("status", value)}
        options={statusOptions}
      />

      <Dropdown
        label="Marital Status"
        value={formData.maritalStatus}
        onChange={(value) => onInputChange("maritalStatus", value)}
        options={maritalStatusOptions}
      />

      <Dropdown
        label="Gender"
        value={formData.gender}
        onChange={(value) => onInputChange("gender", value)}
        options={genderOptions}
      />

      <DatePicker
        label="Estimated Start Date"
        value={formData.estimatedStartDate}
        onChange={(value) => onInputChange("estimatedStartDate", value)}
      />
    </div>
  );
};
