import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is Required")
    .email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be no more than 32 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(
      /[!@#$%^&*()_+=[\]{}|;':",.<>/?-]/,
      "Must contain at least one special character"
    ),
});

export type loginForm = z.infer<typeof loginSchema>;
