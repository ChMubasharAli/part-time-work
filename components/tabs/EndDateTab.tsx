// components/tabs/EndDateTab.tsx (with hook)
"use client";

import { useContainerWidth } from "@/hooks/useContainerWIdth";
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

export const EndDateTab = ({ register, errors, readOnly }: EndDateTabProps) => {
  const { containerRef, columns } = useContainerWidth(768);
  const gridClass = columns === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <section className="min-h-80" ref={containerRef}>
      <div className={`grid ${gridClass} gap-4 px-4`}>
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
        <div className={columns === 3 ? "" : "col-span-1"}>
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
      </div>
    </section>
  );
};
