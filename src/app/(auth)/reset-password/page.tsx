import { routesApp } from "@/constants/routesApp";
import AuthLayout from "@/components/auth/AuthLayout";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import ResetPasswordForm from "@/features/auth/reset-password";

export const metadata: Metadata = {
  title: "パスワードをリセット",
  description: "パスワードをリセットするための手順をお送りします。"
};

export default async function ResetPassword({
  searchParams
}: {
  searchParams: Promise<{ email?: string; confirmationCode?: string }>;
}) {
  const params = await searchParams;
  const email = params?.email || "";
  const confirmationCode = params?.confirmationCode || "";

  return (
    <AuthLayout
      title="パスワードをリセット"
      description={`新しいパスワードは、以前に使用したパスワードとは\n異なるものでなければなりません。`}
      descriptionClassName="text-center"
      footer={
        <div className="w-full justify-center">
          <Link
            href={routesApp.signIn}
            className="flex-center gap-2 text-green-main"
          >
            <ChevronLeft className="text-accent" />
            ログイン画面
          </Link>
        </div>
      }
    >
      <ResetPasswordForm confirmationCode={confirmationCode} email={email} />
    </AuthLayout>
  );
}
