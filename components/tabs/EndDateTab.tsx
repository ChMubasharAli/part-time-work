"use client";

import { ValidatedDatePicker } from "../validatedForm/ValidatedDatePicker";
import { ValidatedDropdown } from "../validatedForm/ValidatedDropdown";
import { ValidatedTextArea } from "../validatedForm/ValidatedTextArea";

interface EndDateTabProps {
  register: any;
  errors: any;
  readOnly: boolean;
}

const countryOptions = ["Pakistan", "USA", "UK", "Canada", "Australia"];
const cityOptions = ["Karachi", "Washington", "London", "Toronto", "Sydney"];

export const EndDateTab = ({ register, errors, readOnly }: EndDateTabProps) => (
  <section className="min-h-80">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
      <ValidatedDropdown
        label="Country"
        name="country"
        register={register}
        error={errors.country}
        options={countryOptions}
        readOnly={readOnly}
      />
      <ValidatedDropdown
        label="City"
        name="city"
        register={register}
        error={errors.city}
        options={cityOptions}
        readOnly={readOnly}
      />
      <ValidatedDatePicker
        label="Estimated End Date"
        name="estimatedEndDate"
        register={register}
        error={errors.estimatedEndDate}
        readOnly={readOnly}
      />
      <ValidatedTextArea
        label="Address"
        name="address"
        register={register}
        error={errors.address}
        placeholder="Enter your address"
        rows={3}
        readOnly={readOnly}
      />
    </div>
  </section>
);
