// ========== TASK-9 CONSTANTS ==========
export type Task9Mode = "create" | "read";

export const TASK9_MODES = {
  CREATE: "create" as Task9Mode,
  READ: "read" as Task9Mode,
};

// Gender Options
export const GENDER_OPTIONS = ["Male", "Female", "Other"];

// Marital Status Options
export const MARITAL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
];

// Blood Group Options
export const BLOOD_GROUP_OPTIONS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

// Visit Type Options
export const VISIT_TYPE_OPTIONS = ["OPD", "Emergency", "Follow-up"];

// Chronic Diseases Options
export const CHRONIC_DISEASES = [
  "Diabetes",
  "Hypertension (High BP)",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "Cancer",
  "Chronic Kidney Disease",
  "COPD",
  "HIV/AIDS",
  "None",
];

// Past Surgeries Options
export const PAST_SURGERIES = [
  "Appendectomy",
  "Cataract Surgery",
  "C-section",
  "Gallbladder Removal",
  "Heart Bypass",
  "Hysterectomy",
  "Joint Replacement",
  "None",
];

// Current Conditions Options
export const CURRENT_CONDITIONS = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Nausea",
  "Pain",
  "Allergy",
  "Infection",
  "None",
];
