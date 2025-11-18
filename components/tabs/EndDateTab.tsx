// components/tasks/task4/EndDateTab.tsx
import { User } from "@/utils/crud";
import { Dropdown } from "../forms/Dropdown";
import { DatePicker } from "../forms/DatePicker";
import { TextArea } from "../forms/TextArea";

interface EndDateTabProps {
  user: User | undefined;
}

const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const EndDateTab = ({ user }: EndDateTabProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  return (
    <section className="min-h-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <Dropdown
          label="Country"
          value={user?.country || ""}
          options={countryOptions}
          readOnly={true}
        />

        <Dropdown
          label="City"
          value={user?.city || ""}
          options={cityOptions}
          readOnly={true}
        />

        <DatePicker
          label="Estimated End Date"
          value={formatDate(user?.estimatedEndDate || "")}
          readOnly={true}
        />

        <TextArea
          label="Address"
          value={user?.address || ""}
          placeholder="Enter Address"
          readOnly={true}
        />
      </div>
    </section>
  );
};
