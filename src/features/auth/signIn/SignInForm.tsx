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

const SignInForm = () => {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

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
          className="mt-3"
        />

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
