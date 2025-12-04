import { z } from "zod";

// ========== TASK-9 VALIDATIONS ==========
export const task9PersonalSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z
    .string()
    .regex(/^\d+$/, "Age must be a number")
    .min(1, "Age is required"),
  cnic: z.string().min(1, "CNIC/ID is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
});

export const task9ContactSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export const task9MedicalSchema = z.object({
  chronicDiseases: z.array(z.string()).optional(),
  pastSurgeries: z.array(z.string()).optional(),
  currentConditions: z.array(z.string()).optional(),
});

export const task9VisitSchema = z.object({
  visitType: z.string().min(1, "Visit type is required"),
  reason: z.string().min(1, "Reason for visit is required"),
  assignedDoctor: z.string().min(1, "Assigned doctor is required"),
});

// Combined form schema
export const task9FormSchema = task9PersonalSchema
  .merge(task9ContactSchema)
  .merge(task9MedicalSchema)
  .merge(task9VisitSchema);

export type Task9PersonalData = z.infer<typeof task9PersonalSchema>;
export type Task9ContactData = z.infer<typeof task9ContactSchema>;
export type Task9MedicalData = z.infer<typeof task9MedicalSchema>;
export type Task9VisitData = z.infer<typeof task9VisitSchema>;
export type Task9FormData = z.infer<typeof task9FormSchema>;
