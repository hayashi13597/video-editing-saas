import SignUpForm from "@/features/auth/sign-up/SignUpForm";
import { notFound } from "next/navigation";

interface SignUpFormPageProps {
  params: Promise<{
    role: string;
  }>;
}

const SignUpFormPage = async ({ params }: SignUpFormPageProps) => {
  const { role } = await params;

  if (!["client", "freelancer"].includes(role)) {
    notFound();
  }

  return <SignUpForm />;
};

export default SignUpFormPage;

// generateMetadata
export const generateMetadata = async ({ params }: SignUpFormPageProps) => {
  const { role } = await params;

  return {
    title: `${role === "freelancer" ? "フリーランサー" : "クライアント"}登録`,
    description: `新しい${role === "freelancer" ? "フリーランサー" : "クライアント"}アカウントを作成する`
  };
};
