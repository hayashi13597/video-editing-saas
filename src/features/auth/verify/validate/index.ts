import { z } from "zod";

// Schema for validating the verification code form
const verifySchema = z.object({
  code: z
    .string()
    .min(6, "認証コードは6桁で入力してください")
    .regex(/^\d+$/, "認証コードは数字のみで入力してください")
});

// Type derived from the verifySchema
type verifySchemaType = z.infer<typeof verifySchema>;

// Exporting the schema and type for use in the VerifyForm component
export { verifySchema, type verifySchemaType };
