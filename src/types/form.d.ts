import { forgotPasswordType } from "@/features/auth/forgot-password/validate";
import { SignInSchemaType } from "@/features/auth/sign-in/validate";

type FormType = SignInSchemaType | forgotPasswordType | resetPasswordType;

type KindType = "client" | "freelancer";

type UserRole = "CLIENT" | "FREELANCER" | "ADMIN";

interface UserInterface {
  id: string;
  email: string;
  name?: string;
  image?: string;
  accessToken?: string;
  role: "CLIENT" | "ADMIN" | "FREELANCER";
  cognitoId?: string;
}

interface SelectOption {
  label: string;
  value: string;
}

type StatusType = "OPEN" | "REVIEW" | "ASSIGNED" | "COMPLETED";

type uploadFileField = "replacementImages" | "replacementText" | "sourceVideoUrl" | "sourceVideoUploadUrl" | "additionalImages" | "logoPhotos" | "referenceImages";