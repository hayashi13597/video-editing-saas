import { z } from "zod";

// Schema for validating the forgot password form
const forgotPassword = z.object({
  email: z
    .email({
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "有効なメールアドレスを入力してください"
    })
    .min(1, "メールアドレスを入力してください")
});

// Type derived from the forgotPassword schema
type forgotPasswordType = z.infer<typeof forgotPassword>;

// Exporting the schema and type for use in the ForgotPasswordForm component
export { forgotPassword, type forgotPasswordType };
