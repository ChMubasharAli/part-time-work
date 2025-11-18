import { SubmitButton } from "./SubmitButton";
import { DiscardButton } from "./DiscardButton";

interface FromActionProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  submitButtonLabel?: string;
  discardButtonLabel?: string;
}

export const FormActions = ({
  isLoading,
  onCancel,
  onSubmit,
  discardButtonLabel = "DISCARD",
  submitButtonLabel = "SUBMIT",
}: FromActionProps) => {
  return (
    <div className="flex space-x-2 pt-20 justify-center">
      <SubmitButton
        onClick={onSubmit}
        disabled={isLoading}
        label={submitButtonLabel}
      />
      <DiscardButton
        onClick={onCancel}
        disabled={isLoading}
        label={discardButtonLabel}
      />
    </div>
  );
};
