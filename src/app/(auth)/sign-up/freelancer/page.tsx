import SignUpForm from "@/features/auth/signUp/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "フリーランサー登録",
  description: "新しいフリーランサーアカウントを作成する"
};

const SignUpFreelancerForm = () => {
  return <SignUpForm />;
};

export default SignUpFreelancerForm;
