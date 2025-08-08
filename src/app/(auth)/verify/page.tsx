import AuthLayout from "@/components/auth/AuthLayout";
import { routesApp } from "@/constants/routesApp";
import FormVerifyEmail from "@/features/auth/verify";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2段階認証",
  description: "携帯電話に認証コードを送信しました。コードを入力してください。"
};

export const dynamic = "force-dynamic";

export default async function Verify({
  searchParams
}: {
  searchParams: Promise<{ email?: string; resetPassword?: string }>;
}) {
  const params = await searchParams;
  const email = params?.email || "";
  const resetPassword = params?.resetPassword === "true";

  return (
    <AuthLayout
      title="2段階認証"
      description={`${email ? email : ""}に認証コードを送信しました。\n6桁の認証コードを入力してください。`}
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
      <FormVerifyEmail email={email} resetPassword={resetPassword} />
    </AuthLayout>
  );
}
