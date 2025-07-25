import SignInForm from "@/features/auth/sign-in/SignInForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ログイン",
  description: "登録したアカウント情報とパスワードを入力してください。"
};

const SignInPage = () => {
  return (
    <main className="min-h-screen grid grid-cols-2">
      <div className="flex flex-col p-5">
        <div className="w-[100px] h-5 absolute">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="h-full flex-col-center gap-6">
          <div className="flex-col-center gap-3">
            <div className="medium-title">会社としてログイン</div>
            <p className="text-center">
              登録したアカウント情報とパスワードを <br />
              入力してください。
            </p>
          </div>

          <SignInForm />
        </div>
      </div>
      <div className="flex-center bg-bright-green">
        <Image
          src="/images/sign-in-image.png"
          alt="Sign In Image"
          width={590}
          height={615}
          className="w-auto h-auto object-cover"
        />
      </div>
    </main>
  );
};

export default SignInPage;
