import { passwordRegex } from "@/constants";
import { z } from "zod";

// Schema for validating the reset password form
const resetPassword = z
  .object({
    password: z
      .string()
      .regex(
        passwordRegex,
        "パスワードは8文字以上で、大文字・小文字・数字・特殊文字を含む必要があります"
      ),
    confirmPassword: z
      .string()
      .regex(
        passwordRegex,
        "確認用パスワードは8文字以上で、大文字・小文字・数字・特殊文字を含む必要があります"
      )
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"]
  });

// Type derived from the resetPassword schema
type resetPasswordType = z.infer<typeof resetPassword>;

// Exporting the schema and type for use in the ResetPasswordForm component
export { resetPassword, type resetPasswordType };
