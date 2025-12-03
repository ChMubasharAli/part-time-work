import { z } from "zod";

// File object schema
const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string(),
});

export const task8FormSchema = z.object({
  // BASIC TAB
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  status: z.string().min(1, "Status is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  gender: z.string().min(1, "Gender is required"),
  estimatedStartDate: z.string().min(1, "Start date is required"),

  // END DATE TAB
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  estimatedEndDate: z.string().min(1, "End date is required"),

  // ADDITIONAL TAB
  subscriptionType: z.string().min(1, "Subscription type is required"),
  communicationPref: z.string().min(1, "Communication preference is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  profilePicture: z.any().optional(),
  supportingDocuments: z.array(z.any()).optional(),
  namedFiles: z.array(
    z.object({
      id: z.string(),
      file: z.any(),
      documentType: z.string().min(1, "Document type is required"),
      customName: z.string().min(1, "Custom name is required")
    })
  ).optional(),
});

export type Task8FormData = z.infer<typeof task8FormSchema>;