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
  const isLastRecord = currentIndex === totalRecords - 1;

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
        <NextButton onClick={onNext} disabled={isLastRecord || disabled} />
        <LastButton onClick={onLast} disabled={isLastRecord || disabled} />
      </div>
    </div>
  );
};
