import { passwordRegex, phoneRegex } from "@/constants";
import z from "zod";

// update profile
const updateProfileSchema = z
  .object({
    role: z.enum(["client", "freelancer"]),
    avatarUrl: z.string().optional(),
    name: z.string().optional(),
    contactPerson: z.string().optional(),
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
      ),
    plan: z.string().optional(),
    bankName: z.string().nonempty("金融機関名は必須です"),
    accountNumber: z.string().nonempty("口座番号は必須です"),
    accountName: z.string().nonempty("口座名義は必須です"),
    branchCode: z.string().nonempty("支店コードは必須です"),
    accountType: z.enum(["普通預金", "定期預金"]).optional(),
    companyOverview: z.string().optional(),
    industry: z.string().optional(),
    invoice: z.string().optional(),
    selfIntroduction: z.string().optional(),
    specialization: z.string().optional(),
    editingSoftware: z.array(z.string()),
    portfolioLinks: z
      .array(
        z.object({
          url: z.string().optional()
        })
      )
      .max(5, "ポートフォリオリンクは最大5つまでです")
      .optional(),
    skills: z.array(z.string())
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
  )
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

type updateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export { updateProfileSchema, type updateProfileSchemaType };
