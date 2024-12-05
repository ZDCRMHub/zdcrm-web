import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  country: z.string().min(1, "Country is required"),
});

export type BranchFormData = z.infer<typeof branchSchema>;

