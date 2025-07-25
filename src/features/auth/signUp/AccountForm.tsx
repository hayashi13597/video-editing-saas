import { Form } from "@/components/ui/form";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Link from "next/link";
import { routesApp } from "@/constants/routesApp";
import { cn } from "@/lib/utils";
import { signUpSchemaType } from "./validate";
import { KindType } from "@/types/form";
import FormFieldCustom from "@/components/form/FormFieldCustom";

interface AccountFormProps {
  form: ReturnType<typeof useForm<signUpSchemaType>>;
  onSubmit: () => void;
  kind?: KindType;
  isProfileUpdate?: boolean;
}

const AccountForm = ({
  form,
  onSubmit,
  kind = "freelancer",
  isProfileUpdate = false
}: AccountFormProps) => {
  useEffect(() => {
    form.setValue("role", kind);
  }, [kind, form]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Hidden role field */}
          <input type="hidden" {...form.register("role")} />

          {/* Name */}
          <div
            className={`grid ${kind === "client" ? "grid-cols-2" : "grid-cols-1"} gap-6`}
          >
            <FormFieldCustom
              control={form.control}
              name="name"
              label={kind === "client" ? "会社名" : "氏名"}
              placeholder="xxx"
              type="text"
              requiredBadge={true}
            />
            {/* Contact Person */}
            {kind === "client" && (
              <FormFieldCustom
                control={form.control}
                name="contactPerson"
                label="担当者名"
                placeholder="xxx"
                type="text"
                requiredBadge={true}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Email */}
            <FormFieldCustom
              control={form.control}
              name="email"
              label="メールアドレス"
              placeholder="xxx@gmail.com"
              type="text"
              requiredBadge={true}
            />

            {/* Phone number */}
            <FormFieldCustom
              control={form.control}
              name="phone"
              label="電話番号"
              placeholder="+81312345678"
              type="text"
              autoComplete="tel"
              requiredBadge={true}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Password */}
            <FormFieldCustom
              control={form.control}
              name="password"
              label="パスワード"
              placeholder="············"
              type="password"
              autoComplete="new-password"
              requiredBadge={true}
            />

            {/* Confirm Password */}
            <FormFieldCustom
              control={form.control}
              name="confirmPassword"
              label="確認用パスワード"
              placeholder="············"
              type="password"
              requiredBadge={true}
            />
          </div>
        </div>

        <div
          className={cn("flex-between", isProfileUpdate ? "justify-end" : "")}
        >
          {kind === "client" ? (
            <Link
              href={routesApp.signUpFreelancer}
              className={cn(
                "text-size-primary text-accent hover:underline",
                isProfileUpdate ? "cursor-not-allowed hidden" : ""
              )}
            >
              フリーランスの登録はこちら
            </Link>
          ) : (
            <Link
              href={routesApp.signUpClient}
              className={cn(
                "text-size-primary text-accent hover:underline",
                isProfileUpdate ? "cursor-not-allowed hidden" : ""
              )}
            >
              企業様の登録はこちら
            </Link>
          )}
          <Button className="button-submit w-fit">
            <span>Next</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
