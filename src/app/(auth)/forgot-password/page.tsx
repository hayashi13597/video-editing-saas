import { routesApp } from "@/constants/routesApp";
import AuthLayout from "@/components/auth/AuthLayout";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import ForgotPasswordForm from "@/features/auth/forgot-password";

export const metadata: Metadata = {
  title: "パスワードをリセット",
  description: "パスワードをリセットするための手順をお送りします。"
};

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="パスワードをお忘れの方"
      description={`登録メールアドレスに認証コードを送信します。\n登録メールアドレスを入力し、【送信する】を押して\nください。`}
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
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
