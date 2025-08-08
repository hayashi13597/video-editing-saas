import { z } from "zod";

// Schema for validating the reset password form
const resetPassword = z
  .object({
    password: z.string(),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"]
  });

// Type derived from the resetPassword schema
type resetPasswordType = z.infer<typeof resetPassword>;

// Exporting the schema and type for use in the ResetPasswordForm component
export { resetPassword, type resetPasswordType };
