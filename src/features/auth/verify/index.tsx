"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import SubmitButton from "@/components/auth/SubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { routesApp } from "@/constants/routesApp";
import { useState } from "react";
import { verifySchema, verifySchemaType } from "./validate";
import NotificationModal from "@/components/modal/NotificationModal";
import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import { getErrorMessage } from "@/lib/utils";

interface FormVerifyEmailProps {
  email: string;
  resetPassword?: boolean;
}

const FormVerifyEmail = ({
  email,
  resetPassword = false
}: FormVerifyEmailProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<verifySchemaType>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: ""
    }
  });

  const onSubmit = async (data: verifySchemaType) => {
    if (!resetPassword) {
      try {
        await getAuthentication().confirmSignUp({
          email,
          confirmationCode: data.code
        });
        toast.success("アカウントが確認されました。ログインしてください。");
        router.push(routesApp.signIn);
      } catch (error) {
        const errorMessage = getErrorMessage(
          error as ApiError,
          "アカウントの確認に失敗しました。もう一度お試しください。"
        );
        toast.error(errorMessage);
      }
    } else {
      router.push(
        `${routesApp.resetPassword}?email=${encodeURIComponent(email)}&confirmationCode=${data.code}`
      );
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("メールアドレスが見つかりません。");
      return;
    }

    try {
      await getAuthentication().resendConfirmation({ email });
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error as ApiError,
        "確認コードの再送信に失敗しました。"
      );
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="body-text text-gray">
                  6桁のセキュリティコードを入力
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={0}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={1}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={2}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={3}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={4}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot
                        className="w-full h-full aspect-square border-stroke"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            text="アカウントを確認する"
          />
          <div className="flex-center gap-1">
            <p className="body-text text-primary">メールが届きませんか？</p>
            <button
              className="body-text cursor-pointer text-green-main hover:underline hover:underline-offset-2"
              onClick={handleResendCode}
              disabled={form.formState.isSubmitting}
              type="button"
            >
              再送する
            </button>
          </div>
          {isModalOpen && (
            <NotificationModal
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
              actionLabel="閉じる"
              description="確認コードを再送信しました。メールを確認してください。"
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormVerifyEmail;
