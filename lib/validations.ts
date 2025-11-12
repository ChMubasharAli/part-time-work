import { z } from "zod";

export const task3FormSchema = z.object({
  // Basic Tab Fields
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  status: z.string().min(1, "Status is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  gender: z.string().min(1, "Gender is required"),
  estimatedStartDate: z.string().min(1, "Estimated start date is required"),

  // End Date Tab Fields
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  estimatedEndDate: z.string().min(1, "Estimated end date is required"),
});

export type Task3FormData = z.infer<typeof task3FormSchema>;
