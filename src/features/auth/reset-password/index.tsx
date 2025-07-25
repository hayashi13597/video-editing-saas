"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/auth/SubmitButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routesApp } from "@/constants/routesApp";
import { resetPassword, resetPasswordType } from "./validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import { getErrorMessage } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface ResetPasswordFormProps {
  email: string;
  confirmationCode: string;
}

const ResetPasswordForm = ({
  email,
  confirmationCode
}: ResetPasswordFormProps) => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: resetPasswordType) => {
    const { password } = data;
    if (error) setError("");
    try {
      await getAuthentication().confirmForgotPassword({
        confirmationCode,
        email,
        newPassword: password
      });
      toast.success(
        "パスワードが正常にリセットされました。ログインしてください。"
      );
      router.push(routesApp.signIn);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error as ApiError,
        "パスワードのリセットに失敗しました。もう一度お試しください。"
      );
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormFieldCustom
              control={form.control}
              name="password"
              type="password"
              label="新規パスワード"
              placeholder="············"
            />
            <FormFieldCustom
              control={form.control}
              name="confirmPassword"
              type="password"
              label="パスワードを確認"
              placeholder="············"
            />
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              text="新しいパスワードを設定する"
            />
          </div>
        </form>
      </Form>
      {error && (
        <Link
          href={`${routesApp.verify}?resetPassword=true&email=${encodeURIComponent(email)}`}
          className="flex justify-center body-text text-green-main"
        >
          認証画面へ戻る
        </Link>
      )}
    </div>
  );
};

export default ResetPasswordForm;
