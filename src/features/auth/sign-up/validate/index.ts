import { passwordRegex, phoneRegex } from "@/constants/validation";
import { z } from "zod";

// Base schema for common fields
const baseSignUpSchema = z.object({
  role: z.enum(["client", "freelancer"]),
  name: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "有効な電話番号を入力してください（+から始まる国際形式）"
    ),
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
});

// Client schema with specific validations
const clientSignUpSchema = baseSignUpSchema
  .refine(data => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"]
  })
  .refine(
    data => {
      // Company name validation for clients
      return !(!data.name || data.name.trim() === "");
    },
    {
      message: "会社名は必須です",
      path: ["name"]
    }
  )
  .refine(
    data => {
      // Contact person validation for clients
      return !(!data.contactPerson || data.contactPerson.trim() === "");
    },
    {
      message: "担当者名は必須です",
      path: ["contactPerson"]
    }
  );

// Freelancer schema with specific validations
const freelancerSignUpSchema = baseSignUpSchema
  .refine(data => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"]
  })
  .refine(
    data => {
      // Name validation for freelancers
      return !(!data.name || data.name.trim() === "");
    },
    {
      message: "氏名は必須です",
      path: ["name"]
    }
  );

// Combined schema that uses conditional validation
const signUpSchema = z
  .object({
    role: z.enum(["client", "freelancer"]),
    name: z.string().optional(),
    contactPerson: z.string().optional(),
    email: z.string().email("有効なメールアドレスを入力してください"),
    phone: z
      .string()
      .regex(
        phoneRegex,
        "有効な電話番号を入力してください（+から始まる国際形式）"
      ),
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
  })
  .refine(
    data => {
      // Name validation: required for all roles
      return !(!data.name || data.name.trim() === "");
    },
    {
      message: "氏名は必須です",
      path: ["name"]
    }
  )
  .refine(
    data => {
      // Contact person validation: required only for clients
      if (data.role === "client") {
        return !(!data.contactPerson || data.contactPerson.trim() === "");
      }
      return true;
    },
    {
      message: "担当者名は必須です",
      path: ["contactPerson"]
    }
  );

// Function to get the appropriate schema based on role
export const getSignUpSchema = (role: "client" | "freelancer") => {
  return role === "client" ? clientSignUpSchema : freelancerSignUpSchema;
};

// TypeScript type for the sign-up schema
type signUpSchemaType = z.infer<typeof signUpSchema>;

// Profile form validation schema using Zod
const profileSchema = z
  .object({
    role: z.enum(["client", "freelancer"]),
    avatarUrl: z.string().optional(),
    selfIntroduction: z.string().optional(),
    specialization: z.string().optional(),
    editingSoftware: z.array(z.string()),
    invoice: z.string().optional(),
    portfolioLinks: z
      .array(
        z.object({
          url: z.string().optional()
        })
      )
      .max(5, "ポートフォリオリンクは最大5つまでです")
      .optional(),
    skills: z.array(z.string()),
    companyOverview: z.string().optional(),
    industry: z.string().optional(),
    // required only for clients
    plan: z.string().optional(),
    bankName: z.string().nonempty("金融機関名は必須です"),
    accountNumber: z.string().nonempty("口座番号は必須です"),
    accountName: z.string().nonempty("口座名義は必須です"),
    branchCode: z.string().nonempty("支店コードは必須です"),
    accountType: z.enum(["普通預金", "定期預金"]).optional()
  })
  .refine(
    data => {
      if (data.role === "client") {
        return data.plan && data.plan.trim() !== "";
      }
      return true;
    },
    {
      message: "プランは必須です",
      path: ["plan"]
    }
  );

// TypeScript type for the profile schema
type profileSchemaType = z.infer<typeof profileSchema>;

// Exporting the schemas and their types
export {
  signUpSchema,
  type signUpSchemaType,
  profileSchema,
  type profileSchemaType
};
