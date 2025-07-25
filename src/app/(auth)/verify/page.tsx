import AuthLayout from "@/components/auth/AuthLayout";
import FormVerifyEmail from "@/features/auth/verify";
import { Metadata } from "next";

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
      description={`あなたの携帯電話に認証コードを送信しました。下の欄に携帯電話からコードを入力してください。\n${email ? email : ""}`}
      descriptionClassName="text-center"
    >
      <FormVerifyEmail email={email} resetPassword={resetPassword} />
    </AuthLayout>
  );
}
