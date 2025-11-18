// components/forms/RecordNavigationButtons.tsx
import { FirstButton } from "./FirstButton";
import { PreviousButton } from "./PreviousButton";
import { NextButton } from "./NextButton";
import { LastButton } from "./LastButton";

interface RecordNavigationButtonsProps {
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  isFirstRecord: boolean;
  isLastRecord: boolean;
  currentIndex: number;
  totalRecords: number;
}

export const RecordNavigationButtons = ({
  onFirst,
  onPrevious,
  onNext,
  onLast,
  isFirstRecord,
  isLastRecord,
  currentIndex,
  totalRecords,
}: RecordNavigationButtonsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <FirstButton onClick={onFirst} disabled={isFirstRecord} />
        <PreviousButton onClick={onPrevious} disabled={isFirstRecord} />
      </div>
      
      {/* Record counter */}
      <div className="text-sm text-gray-600 min-w-20 text-center">
        {totalRecords > 0 ? `${currentIndex + 1} of ${totalRecords}` : 'No records'}
      </div>
      
      <div className="flex items-center gap-2">
        <NextButton onClick={onNext} disabled={isLastRecord} />
        <LastButton onClick={onLast} disabled={isLastRecord} />
      </div>
    </div>
  );
};