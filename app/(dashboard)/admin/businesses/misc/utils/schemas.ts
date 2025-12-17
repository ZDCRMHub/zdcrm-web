import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(1, "Phone number is required"),
});
export const businessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(1, "Phone number is required"),
});

export type BranchFormData = z.infer<typeof branchSchema>;
export type BusinessFormData = z.infer<typeof businessSchema>;
