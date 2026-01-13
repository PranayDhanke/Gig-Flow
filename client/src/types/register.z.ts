import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
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

export type registerForm = z.infer<typeof registerSchema>;
