import { forgotPasswordType } from "@/features/auth/forgot-password/validate";
import { SignInSchemaType } from "@/features/auth/sign-in/validate";

type FormType = SignInSchemaType | forgotPasswordType | resetPasswordType;

type KindType = "client" | "freelancer";

type UserRole = "CLIENT" | "FREELANCER" | "ADMIN";

interface SelectOption {
  label: string;
  value: string;
}
