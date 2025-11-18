// components/forms/ReadOnlyFormActions.tsx
import { SubmitButton } from "./SubmitButton";
import { DiscardButton } from "./DiscardButton";

interface ReadOnlyFormActionsProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  onSubmitLabel?: string;
  onCancelLabel?: string;
}

export const ReadOnlyFormActions = ({
  onSubmit,
  onCancel,
  onSubmitLabel = "SUBMIT",
  onCancelLabel = "DISCARD",
}: ReadOnlyFormActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <SubmitButton disabled={true} label={onSubmitLabel} />
      <DiscardButton disabled={true} label={onCancelLabel} />
    </div>
  );
};
