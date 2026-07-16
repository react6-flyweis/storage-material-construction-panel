import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

export const loginSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("email"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    rePassword: z.string().optional(),
  }),

  z.object({
    mode: z.literal("mobile"),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    password: passwordSchema,
    rePassword: z.string().optional(),
  }),
]);

export type LoginFormValues = z.infer<typeof loginSchema>;
