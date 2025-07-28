"use client";

import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { FormType } from "@/types/form";
import { Path, useForm } from "react-hook-form";
import { useState } from "react";
import RequiredBadge from "./RequiredBadge";

interface FormPasswordProps<T extends FormType> {
  control: ReturnType<typeof useForm<T>>["control"];
  name: Path<T>;
  placeholder?: string;
  type?: string;
  label?: string;
  requiredBadge?: boolean;
  badgeText?: string;
}

const FormPassword = <T extends FormType>({
  control,
  name,
  placeholder = "············",
  label = "パスワード",
  requiredBadge,
  badgeText
}: FormPasswordProps<T>) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="body-text">
            {label}
            {requiredBadge ? (
              <RequiredBadge required={true} text={badgeText} />
            ) : requiredBadge === false ? (
              <RequiredBadge text={badgeText} />
            ) : null}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder}
                autoComplete="off"
                value={field.value?.toString() || ""}
                className="border-stroke placeholder:text-placeholder"
              />
            </FormControl>
            {isShowPassword ? (
              <EyeOff
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPassword;
