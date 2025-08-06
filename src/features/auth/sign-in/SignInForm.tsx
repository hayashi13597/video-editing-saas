"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "./validate";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { routesApp } from "@/constants/routesApp";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/auth/SubmitButton";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const SignInForm = () => {
  // Password validation functions
  const validateLength = (password: string) => password.length >= 8 && password.length <= 20;
  const validateComplexity = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password);
  const validateSpecialChars = (password: string) => /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]/.test(password);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Watch password field for real-time validation
  const watchedPassword = form.watch("password");

  const onSubmit = async (data: SignInSchemaType) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    if (res?.ok) {
      toast.success("ログインに成功しました。");
    }
    if (!res?.error) redirect(routesApp.dashboard);
    if (res?.error)
      toast.error(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
  };

  return (
    <Form {...form}>
      <form
        className="max-w-[55.4%] w-full space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormFieldCustom
            control={form.control}
            name="email"
            placeholder="メールアドレスを入力"
            type="text"
            label="メールアドレス"
            autoComplete="email"
          />

          <FormFieldCustom
            control={form.control}
            name="password"
            placeholder="パスワードを入力"
            type="password"
            label="パスワード"
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex-center ${!watchedPassword
                  ? "border-gray-300 bg-white"
                  : validateLength(watchedPassword)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-red-500 bg-red-500 text-white"
                }`}>
                {!watchedPassword ? null : validateLength(watchedPassword) ? (
                  <Check size={8} />
                ) : (
                  <X size={8} />
                )}
              </div>
              <p className="small-text">8文字以上20文字以内で入力してください。</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex-center ${!watchedPassword
                  ? "border-gray-300 bg-white"
                  : validateComplexity(watchedPassword)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-red-500 bg-red-500 text-white"
                }`}>
                {!watchedPassword ? null : validateComplexity(watchedPassword) ? (
                  <Check size={8} />
                ) : (
                  <X size={8} />
                )}
              </div>
              <p className="small-text">半角の大文字・小文字の英字および数字を含めてください。</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex-center ${!watchedPassword
                  ? "border-gray-300 bg-white"
                  : validateSpecialChars(watchedPassword)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-red-500 bg-red-500 text-white"
                }`}>
                {!watchedPassword ? null : validateSpecialChars(watchedPassword) ? (
                  <Check size={8} />
                ) : (
                  <X size={8} />
                )}
              </div>
              <p className="small-text">
                次の記号も任意で使用可能です。!&quot;#$%&apos;()*+,-./:;&lt;=&gt;?@[]^_&#96;{'{}'}|~
              </p>
            </div>
          </div>

          <div className="flex-between">
            <FormFieldCustom
              control={form.control}
              name="rememberMe"
              type="checkbox"
              label="ユーザー名を保存"
            />
            <Link
              className="body-text text-green-main"
              href={routesApp.forgotPassword}
            >
              パスワードをお忘れですか?
            </Link>
          </div>

          <SubmitButton
            text="ログイン"
            isSubmitting={form.formState.isSubmitting}
          />
        </div>

        <p className="body-text w-full flex-between mt-1">
          アカウントをお持ちですか?
          <Link className="text-green-main" href={routesApp.signUpFreelancer}>
            今すぐアカウント作成
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
