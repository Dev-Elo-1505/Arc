import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    )
    .refine(
      (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      "Password must contain at least one special character"
    ),
});

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

type SignupSchema = z.infer<typeof signupSchema>;
type LoginSchema = z.infer<typeof loginSchema>;

export { signupSchema, loginSchema };
export type { SignupSchema, LoginSchema };