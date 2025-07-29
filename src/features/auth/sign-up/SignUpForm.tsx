"use client";

import { useForm } from "react-hook-form";
import {
  getSignUpSchema,
  profileSchema,
  profileSchemaType,
  signUpSchemaType
} from "./validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { KindType } from "@/types/form";
import ProgressSteps from "@/components/auth/ProgressSteps";
import { useState } from "react";
import AccountForm from "./AccountForm";
import ProfileForm from "./ProfileForm";
import { toast } from "sonner";
import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import NotificationModal from "@/components/modal/NotificationModal";
import { routesApp } from "@/constants/routesApp";
import { getErrorMessage } from "@/lib/utils";
import { uploadFileToS3 } from "@/lib/upload";

const SignUpForm = () => {
  const [step, setStep] = useState<number>(1);
  const pathname = usePathname();
  const kind = pathname.split("/")[2] as KindType;
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const accountForm = useForm<signUpSchemaType>({
    resolver: zodResolver(getSignUpSchema(kind)),
    defaultValues: {
      role: kind,
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  const profileForm = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: kind,
      avatarUrl: "",
      selfIntroduction: "",
      specialization: "",
      editingSoftware: [],
      portfolioLinks: [],
      skills: [],
      companyOverview: "",
      industry: "",
      plan: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      branchCode: "",
      accountType: "普通預金"
    }
  });

  const handleAccountSubmit = () => {
    setStep(2);
  };

  const handleProfileSubmit = async (data: profileSchemaType) => {
    try {
      let avatarUrl = "";
      if (file) {
        const { fileUrl } = await uploadFileToS3({
          file,
          entityType: "user",
          purpose: "avatar"
        });
        avatarUrl = fileUrl;
      }
      const accountData = accountForm.getValues();
      const fullData = {
        ...accountData,
        ...data,
        classification: kind === "client" ? "client" : "freelance",
        avatarUrl: avatarUrl || "",
        phoneNumber: accountData.phone || ""
      };
      // eslint-disable-next-line
      await getAuthentication().signUp(fullData as any);
      setIsModalOpen(true);
      toast.success("プロフィールが更新されました");
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError, "サインアップに失敗しました");
      toast.error(errorMessage);
    }
  };

  return (
    <main className="w-full max-w-[72.5%] space-y-5">
      <h1 className="big-title">{kind === "client" ? "会社" : "フリーランス"}として登録</h1>
      <ProgressSteps currentStep={step} />

      {step === 1 ? (
        <AccountForm
          onSubmit={handleAccountSubmit}
          kind={kind}
          form={accountForm}
        />
      ) : (
        <ProfileForm
          onSubmit={handleProfileSubmit}
          kind={kind}
          form={profileForm}
          setStep={setStep}
          handleFileSelect={handleFileSelect}
        />
      )}
      {/* Verification modal - only for sign-up flow */}
      {isModalOpen && (
        <NotificationModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onAction={() =>
            router.push(
              `${routesApp.verify}?email=${accountForm.getValues("email")}`
            )
          }
          actionLabel="認証画面へ移動"
        />
      )}
    </main>
  );
};

export default SignUpForm;
