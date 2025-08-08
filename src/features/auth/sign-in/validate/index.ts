import { passwordRegex } from "@/constants/validation";
import { z } from "zod";

// signIn form validation schema using Zod
const signInSchema = z.object({
  email: z.email({
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "有効なメールアドレスを入力してください"
  }),
  password: z
    .string()
    .regex(
      passwordRegex,
      "パスワードは8文字以上で、大文字・小文字・数字・特殊文字を含む必要があります"
    ),
  rememberMe: z.boolean().default(false).optional()
});

// TypeScript type for the signIn schema
type SignInSchemaType = z.infer<typeof signInSchema>;

// Exporting the signIn schema and its type
export { signInSchema, type SignInSchemaType };
