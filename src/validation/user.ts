import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  phone: z
    .string()
    .regex(
      /^\+?[\d\s\-()]{7,15}$/,
      "Phone number must be 7-15 digits (e.g., +91 98765 43210)"
    )
    .optional(),
  role: z.enum(["admin", "user", "vendor", "guest"]).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
