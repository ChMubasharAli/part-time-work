import { User } from "@/utils/crud";
import { TextInput } from "../forms/TextInput";
import { Dropdown } from "../forms/Dropdown";
import { DatePicker } from "../forms/DatePicker";

interface BasicTabProps {
  user: User | undefined;
}

const statusOptions = ["Not Started", "In Progress", "Completed"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const genderOptions = ["Male", "Female", "Other"];

export const BasicTab = ({ user }: BasicTabProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  return (
    <section className="min-h-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <TextInput
          label="First Name"
          value={user?.firstName || ""}
          placeholder="Enter first name"
          readOnly={true}
        />

        <TextInput
          label="Last Name"
          value={user?.lastName || ""}
          placeholder="Enter last name"
          readOnly={true}
        />

        <TextInput
          label="Email"
          value={user?.email || ""}
          placeholder="Enter email"
          type="email"
          readOnly={true}
        />

        <Dropdown
          label="Status"
          value={user?.status || ""}
          options={statusOptions}
          readOnly={true}
        />

        <Dropdown
          label="Marital Status"
          value={user?.maritalStatus || ""}
          options={maritalStatusOptions}
          readOnly={true}
        />

        <Dropdown
          label="Gender"
          value={user?.gender || ""}
          options={genderOptions}
          readOnly={true}
        />

        <DatePicker
          label="Estimated Start Date"
          value={formatDate(user?.estimatedStartDate || "")}
          readOnly={true}
        />
      </div>
    </section>
  );
};
