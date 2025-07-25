import { forgotPasswordType } from "@/features/auth/forgot-password/validate";
import { SignInSchemaType } from "@/features/auth/sign-in/validate";

type FormType = SignInSchemaType | forgotPasswordType | resetPasswordType;

type KindType = "client" | "freelancer";

interface SelectOption {
  label: string;
  value: string;
}
