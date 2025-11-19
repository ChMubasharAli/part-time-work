// components/forms/FormActions.tsx

import { DiscardButton } from "./DiscardButton";
import { SubmitButton } from "./SubmitButton";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
  navigating: boolean;
  readOnly: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormActions = ({
  onSubmit,
  onCancel,
  submitting,
  navigating,
  readOnly,
  submitLabel = "SUBMIT",
  cancelLabel = "DISCARD",
}: FormActionsProps) => (
  <div className="flex items-center gap-2">
    <SubmitButton
      onClick={onSubmit}
      disabled={readOnly || submitting || navigating}
      label={submitting ? "SAVING..." : submitLabel}
    />
    <DiscardButton
      onClick={onCancel}
      disabled={readOnly || submitting || navigating}
      label={cancelLabel}
    />
  </div>
);
