import { ValidatedDropdown } from "../validatedForm/ValidatedDropdown";
import { ValidatedDatePicker } from "../validatedForm/ValidatedDatePicker";
import { ValidatedTextArea } from "../validatedForm/ValidatedTextArea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Task3FormData } from "@/lib/user.schema";

interface EndDateTabProps {
  register: UseFormRegister<Task3FormData>;
  errors: FieldErrors<Task3FormData>;
}

const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const EndDateTab = ({ register, errors }: EndDateTabProps) => {
  return (
    <section className="min-h-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <ValidatedDropdown
          label="Country"
          name="country"
          register={register}
          error={errors.country}
          options={countryOptions}
        />

        <ValidatedDropdown
          label="City"
          name="city"
          register={register}
          error={errors.city}
          options={cityOptions}
        />

        <ValidatedDatePicker
          label="Estimated End Date"
          name="estimatedEndDate"
          register={register}
          error={errors.estimatedEndDate}
        />

        <ValidatedTextArea
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          placeholder="Enter your address"
          rows={3}
        />
      </div>
    </section>
  );
};
