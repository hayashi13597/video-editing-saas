import { forgotPasswordType } from "@/features/auth/forgotPassword/validate";
import { SignInSchemaType } from "@/features/auth/signIn/validate";

type FormType = SignInSchemaType | forgotPasswordType | resetPasswordType;

type KindType = "client" | "freelancer";

interface SelectOption {
  label: string;
  value: string;
}
