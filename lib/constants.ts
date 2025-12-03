export type Task8FormMode = "create" | "edit" | "readonly";

export const TASK8_FORM_MODES = {
  CREATE: "create" as Task8FormMode,
  EDIT: "edit" as Task8FormMode,
  READONLY: "readonly" as Task8FormMode,
};

// Document types for dropdown
export const DOCUMENT_TYPES = [
  "Passport",
  "ID Card",
  "Driver License",
  "Degree Certificate",
  "Experience Certificate",
  "Other",
];

// Subscription options
export const SUBSCRIPTION_OPTIONS = [
  { id: "basic", label: "Basic", description: "Free plan" },
  { id: "premium", label: "Premium", description: "$9.99/month" },
  { id: "enterprise", label: "Enterprise", description: "Custom pricing" },
];

// Communication options
export const COMMUNICATION_OPTIONS = [
  { id: "email", label: "Email", description: "Receive via email" },
  { id: "sms", label: "SMS", description: "Receive via SMS" },
  { id: "both", label: "Both", description: "Email and SMS" },
  { id: "none", label: "None", description: "No updates" },
];
