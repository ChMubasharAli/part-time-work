// /components/navigation/RecordNavigation.tsx - UPDATED
import { FirstButton } from "../forms/FirstButton";
import { LastButton } from "../forms/LastButton";
import { NextButton } from "../forms/NextButton";
import { PreviousButton } from "../forms/PreviousButton";

interface RecordNavigationProps {
  currentIndex: number;
  totalRecords: number;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  disabled: boolean;
}

export const RecordNavigation = ({
  currentIndex,
  totalRecords,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  disabled,
}: RecordNavigationProps) => {
  const isFirstRecord = currentIndex === 0;
//  Next button should only be disabled if we're at the absolute last record
  // We don't know if there are more records, so we can't disable based on current index alone
  const isAbsoluteLastRecord = false; // We don't know this from props

  return (
    <div className="flex items-center space-x-8">
      <div className="flex items-center gap-2">
        <FirstButton onClick={onFirst} disabled={isFirstRecord || disabled} />
        <PreviousButton
          onClick={onPrevious}
          disabled={isFirstRecord || disabled}
        />
      </div>
      <div className="flex items-center gap-2">
        <NextButton onClick={onNext} disabled={disabled} /> {/* Never disable Next based on position */}
        <LastButton onClick={onLast} disabled={disabled} /> {/* Never disable Last based on position */}
      </div>
    </div>
  );
};