"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { routesApp } from "@/constants/routesApp";
import SubmitButton from "@/components/auth/SubmitButton";
import NotificationModal from "@/components/modal/NotificationModal";
import { forgotPassword, forgotPasswordType } from "./validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

const ForgotPasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPassword),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (data: forgotPasswordType) => {
    const { email } = data;
    try {
      await getAuthentication().forgotPassword({ email });
      setIsOpen(true);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error as ApiError,
        "メール送信に失敗しました"
      );
      toast.error(errorMessage);
      setIsOpen(false);
    }
  };

  const handleAction = () => {
    const email = form.getValues("email");
    router.push(
      `${routesApp.verify}?resetPassword=true&email=${encodeURIComponent(email)}`
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormFieldCustom
              control={form.control}
              name="email"
              type="email"
              label="メールアドレス"
              placeholder="xxx@gmail.com"
            />
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              text="パスワードリセット"
            />
          </div>
        </form>
      </Form>
      {isOpen && (
        <NotificationModal
          isOpen={isOpen}
          title="メール送信完了"
          description={`ご入力いただいた ${form.getValues("email")} 宛にメールを送信しました。受信箱をご確認の上、記載された手順に従ってパスワードをリセットしてください。`}
          onAction={handleAction}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
