"use client";

import FormFieldCustom from "@/components/form/FormFieldCustom";
import { Form } from "@/components/ui/form";
import { getProfiles } from "@/orvalApi/endpoints/profiles/profiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";
import { ProfileDto } from "@/orvalApi/model";
import UpdateImage from "./UpdateImage";
import {
  INDUSTRY_OPTIONS,
  SKILLS_OPTIONS,
  SOFTWARE_OPTIONS,
  SPECIALIZATION_OPTIONS
} from "@/constants/selectOptions";
import { Button } from "@/components/ui/button";
import UpdateProfileSkeleton from "@/components/common/UpdateProfileSkeleton";
import PortfolioLinksField from "@/features/auth/sign-up/PortfolioLinksField";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { updateProfileSchema, updateProfileSchemaType } from "./validate";

const UpdateProfileForm = () => {
  const [kind, setKind] = useState<"client" | "freelancer">("client");
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { data: session, update } = useSession();

  const setAvatarUrlHandler = (url: string) => {
    setAvatarUrl(url);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfiles().getMyProfile();
        const userKind = user.user.role === "CLIENT" ? "client" : "freelancer";
        setKind(userKind);
        setProfile(user);
        setLoading(false);

        profileForm.reset({
          role: userKind,
          name:
            userKind === "client"
              ? user?.companyName || ""
              : user?.user.name || "",
          contactPerson: user?.user.name || "",
          phone: user?.user.phoneNumber || "",
          password: "Lm123123@",
          confirmPassword: "Lm123123@",
          avatarUrl: user?.user.avatarUrl || "",
          selfIntroduction: user?.bio || "",
          specialization: user?.specializations?.[0] || "",
          editingSoftware: user?.tools || [],
          portfolioLinks: Array.isArray(user?.portfolioUrl)
            ? user.portfolioUrl.map((url: string | { url: string }) =>
                typeof url === "string" ? { url } : url
              )
            : [{ url: "" }],
          skills: user?.skills || [],
          companyOverview: user?.bio || "",
          industry: user?.industry || "",
          plan: userKind === "client" ? user?.plan || "" : undefined,
          invoice: (user?.invoice as string) || "",
          bankName: user?.bankName || "",
          accountNumber: user?.accountNumber || "",
          accountName: user?.accountName || "",
          branchCode: user?.branchCode || "",
          accountType:
            (user?.accountType as "普通預金" | "定期預金") || undefined
        });
      } catch (error) {
        const errorMessage = getErrorMessage(
          error as ApiError,
          "プロフィールの取得中にエラーが発生しました"
        );
        toast.error(errorMessage);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const profileForm = useForm<updateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema)
  });

  const onSubmit = async (data: updateProfileSchemaType) => {
    const updatedData = {
      ...data,
      avatarUrl: avatarUrl,
      name: kind === "freelancer" ? data.name || "" : data.contactPerson || "",
      companyName: kind === "client" ? data.name || "" : undefined,
      phoneNumber: data.phone || "",
      bio: kind === "freelancer" ? data.selfIntroduction : data.companyOverview,
      industry: kind === "client" ? data.industry : undefined,
      specializations:
        kind === "freelancer" && data.specialization
          ? [data.specialization]
          : undefined,
      tools: kind === "freelancer" ? data.editingSoftware : undefined,
      portfolioUrl:
        kind === "freelancer" && data.portfolioLinks
          ? (data.portfolioLinks
              .map(link => link.url)
              .filter(url => url && url.trim() !== "") as string[])
          : undefined,
      skills: kind === "freelancer" ? data.skills : undefined,
      plan: kind === "client" ? data.plan : undefined
    };
    try {
      const updatedProfile = await getProfiles().updateMyProfile(updatedData);
      await update({
        ...session,
        user: {
          ...session?.user,
          image: updatedProfile.user.avatarUrl || ""
        }
      });
      setAvatarUrl(updatedProfile.user.avatarUrl || "");
      toast.success("プロフィールが更新されました");
    } catch (error) {
      const errorMessage = getErrorMessage(
        error as ApiError,
        "プロフィールの更新中にエラーが発生しました"
      );
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <UpdateProfileSkeleton />;
  }

  return (
    <>
      <div className="space-y-5 flex-col-center">
        <UpdateImage
          src={profile?.user.avatarUrl as string}
          name={profile?.user.name as string}
          role={profile?.user.role as "CLIENT" | "FREELANCER" | "ADMIN"}
          setAvatarUrlHandler={setAvatarUrlHandler}
        />
        <div className="space-y-1 flex-col-center">
          <h3 className="medium-title">
            {kind === "client" ? profile?.companyName : profile?.user.name}
          </h3>
          <p className="body-text text-gray">{profile?.user.email}</p>
        </div>
      </div>
      <Form {...profileForm}>
        <form
          className="space-y-10"
          onSubmit={profileForm.handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            {/* Hidden role field */}
            <input type="hidden" {...profileForm.register("role")} />

            {/* Name */}
            <div className="grid grid-cols-2 gap-6">
              {kind === "freelancer" && (
                <FormFieldCustom
                  control={profileForm.control}
                  name="name"
                  label="氏名"
                  placeholder="xxx"
                  type="text"
                  requiredBadge={true}
                />
              )}
              {/* Contact Person */}
              {kind === "client" && (
                <FormFieldCustom
                  control={profileForm.control}
                  name="contactPerson"
                  label="担当者名"
                  placeholder="xxx"
                  type="text"
                  requiredBadge={true}
                />
              )}
              {/* Phone number */}
              <FormFieldCustom
                control={profileForm.control}
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
                control={profileForm.control}
                name="password"
                label="パスワード"
                placeholder="············"
                type="password"
                autoComplete="new-password"
                requiredBadge={true}
              />

              {/* Confirm Password */}
              <FormFieldCustom
                control={profileForm.control}
                name="confirmPassword"
                label="確認用パスワード"
                placeholder="············"
                type="password"
                requiredBadge={true}
              />
            </div>

            {kind === "client" && (
              <>
                {/* Plan */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="plan"
                  label="プラン"
                  placeholder="プランを選択"
                  type="radio"
                  requiredBadge={true}
                  selectOptions={[
                    { value: "定額プラン", label: "定額プラン" },
                    { value: "使い切りプラン", label: "使い切りプラン" }
                  ]}
                  badgeText="必須"
                />

                {/* bank name */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="bankName"
                  label="金融機関名"
                  placeholder="金融機関名"
                  type="text"
                  requiredBadge={true}
                  disabled={true}
                />

                {/* bank info */}
                <div className="grid grid-cols-2 gap-5">
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountNumber"
                    label="口座番号"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountName"
                    label="口座名義"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <FormFieldCustom
                    control={profileForm.control}
                    name="branchCode"
                    label="支店コード"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountType"
                    label="口座種類"
                    placeholder="xxx"
                    type="select"
                    requiredBadge={true}
                    selectOptions={[
                      { value: "普通預金", label: "普通預金" },
                      { value: "定期預金", label: "定期預金" }
                    ]}
                    disabled={true}
                  />
                </div>

                {/* Self Introduction */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="companyOverview"
                  label="会社概要"
                  placeholder="会社概要"
                  type="textarea"
                  requiredBadge={false}
                  badgeText="任意"
                />

                {/* Specialization */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="industry"
                  label="業種"
                  placeholder="業種を選択"
                  type="select"
                  requiredBadge={false}
                  selectOptions={INDUSTRY_OPTIONS}
                  badgeText="任意"
                />
              </>
            )}

            {kind === "freelancer" && (
              <>
                {/* Skills */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="skills"
                  label="スキル"
                  placeholder="スキルを選択"
                  type="multi-select"
                  requiredBadge={false}
                  selectOptions={SKILLS_OPTIONS}
                  badgeText="任意"
                />

                {/* Invoice */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="invoice"
                  label="インボイス"
                  placeholder="インボイス"
                  type="text"
                  requiredBadge={false}
                  badgeText="任意"
                />

                {/* bank name */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="bankName"
                  label="金融機関名"
                  placeholder="金融機関名"
                  type="text"
                  requiredBadge={true}
                  disabled={true}
                />

                {/* bank info */}
                <div className="grid grid-cols-2 gap-5">
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountNumber"
                    label="口座番号"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountName"
                    label="口座名義"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <FormFieldCustom
                    control={profileForm.control}
                    name="branchCode"
                    label="支店コード"
                    placeholder="xxx"
                    type="text"
                    requiredBadge={true}
                    disabled={true}
                  />
                  <FormFieldCustom
                    control={profileForm.control}
                    name="accountType"
                    label="口座種類"
                    placeholder="xxx"
                    type="select"
                    requiredBadge={true}
                    selectOptions={[
                      { value: "普通預金", label: "普通預金" },
                      { value: "定期預金", label: "定期預金" }
                    ]}
                    disabled={true}
                  />
                </div>

                {/* Self Introduction */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="selfIntroduction"
                  label="自己紹介"
                  placeholder="新卒で映像制作会社に入社後..."
                  type="textarea"
                  requiredBadge={false}
                  badgeText="任意"
                />

                {/* Specialization */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="specialization"
                  label="専門分野"
                  placeholder="業種を選択"
                  type="select"
                  requiredBadge={false}
                  selectOptions={SPECIALIZATION_OPTIONS}
                  badgeText="任意"
                />

                {/* Editing Software */}
                <FormFieldCustom
                  control={profileForm.control}
                  name="editingSoftware"
                  label="使用ソフトウェア"
                  placeholder="使用ソフトウェアを選択"
                  type="multi-select"
                  requiredBadge={false}
                  selectOptions={SOFTWARE_OPTIONS}
                  badgeText="任意"
                />

                {/* Portfolio link */}
                <PortfolioLinksField control={profileForm.control} />
              </>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="button-submit w-fit"
              disabled={profileForm.formState.isSubmitting}
            >
              {profileForm.formState.isSubmitting ? "更新中..." : "更新"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateProfileForm;
