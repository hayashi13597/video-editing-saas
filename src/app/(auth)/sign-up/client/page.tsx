import SignUpForm from "@/features/auth/signUp/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント登録",
  description: "新しいクライアントアカウントを作成する"
};

const SignUpClientForm = () => {
  return <SignUpForm />;
};

export default SignUpClientForm;
