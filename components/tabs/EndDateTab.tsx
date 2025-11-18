import { Dropdown } from "../forms/Dropdown";
import { DatePicker } from "../forms/DatePicker";
import { TextArea } from "../forms/TextArea";

interface BasicTabProps {
  formData: {
    country: string;
    address: string;
    city: string;
    estimatedEndDate: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const EndDateTab = ({ formData, onInputChange }: BasicTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
      {/* country  */}
      <Dropdown
        label="Country"
        value={formData.country}
        onChange={(value) => onInputChange("country", value)}
        options={countryOptions}
      />

      {/* City */}
      <Dropdown
        label="City"
        value={formData.city}
        onChange={(value) => onInputChange("city", value)}
        options={cityOptions}
      />

      {/* Estimated End Date */}
      <DatePicker
        label="Estimated End Date"
        value={formData.estimatedEndDate}
        onChange={(value) => onInputChange("estimatedEndDate", value)}
      />

      {/* Text Area */}
      <TextArea
        label="Address"
        value={formData.address}
        onChange={(value) => onInputChange("address", value)}
        placeholder="Enter Address"
        rows={3}
      />
    </div>
  );
};
