import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[@$!%*?&#]/, "Must contain at least one special character");

export const signupSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("email"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    rePassword: z.string(),
  }).superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        path: ["rePassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  }),

  z.object({
    mode: z.literal("mobile"),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    password: passwordSchema,
    rePassword: z.string(),
  }).superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        path: ["rePassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  }),
]);

export type SignupFormValues = z.infer<typeof signupSchema>;
