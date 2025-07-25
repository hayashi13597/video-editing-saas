import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import {
  INDUSTRY_OPTIONS,
  SKILLS_OPTIONS,
  SOFTWARE_OPTIONS,
  SPECIALIZATION_OPTIONS
} from "@/constants/selectOptions";
import { profileSchemaType } from "./validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { KindType } from "@/types/form";
import ProfileImageUpload from "./ProfileImageUpload";
import PortfolioLinksField from "./PortfolioLinksField";

interface ProfileFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  form: ReturnType<typeof useForm<profileSchemaType>>;
  // eslint-disable-next-line
  onSubmit: (data: profileSchemaType) => void;
  kind: KindType;
  // eslint-disable-next-line
  handleFileSelect: (file: File | null) => void;
}

const ProfileForm = ({
  setStep,
  form,
  onSubmit,
  kind = "freelancer",
  handleFileSelect
}: ProfileFormProps) => {
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 w-full">
          {kind === "freelancer" ? (
            <>
              {/* Profile Image */}
              <ProfileImageUpload onFileSelect={handleFileSelect} />

              {/* Invoice */}
              <FormFieldCustom
                control={form.control}
                name="invoice"
                label="インボイス"
                placeholder="インボイス"
                type="text"
                requiredBadge={false}
                badgeText="任意"
              />

              {/* Self Introduction */}
              <FormFieldCustom
                control={form.control}
                name="selfIntroduction"
                label="自己紹介"
                placeholder="新卒で映像制作会社に入社後..."
                type="textarea"
                requiredBadge={false}
                badgeText="任意"
              />

              {/* Specialization */}
              <FormFieldCustom
                control={form.control}
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
                control={form.control}
                name="editingSoftware"
                label="使用ソフトウェア"
                placeholder="使用ソフトウェアを選択"
                type="multi-select"
                requiredBadge={false}
                selectOptions={SOFTWARE_OPTIONS}
                badgeText="任意"
              />

              {/* Portfolio link */}
              <PortfolioLinksField control={form.control} />

              {/* Skills */}
              <FormFieldCustom
                control={form.control}
                name="skills"
                label="スキル"
                placeholder="スキルを選択"
                type="multi-select"
                requiredBadge={false}
                selectOptions={SKILLS_OPTIONS}
                badgeText="任意"
              />
            </>
          ) : (
            <>
              {/* Plan */}
              <FormFieldCustom
                control={form.control}
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

              {/* bank info */}
              <div className="grid grid-cols-2 gap-5">
                <FormFieldCustom
                  control={form.control}
                  name="accountNumber"
                  label="口座番号"
                  placeholder="xxx"
                  type="text"
                  requiredBadge={true}
                />
                <FormFieldCustom
                  control={form.control}
                  name="accountName"
                  label="口座名義"
                  placeholder="xxx"
                  type="text"
                  requiredBadge={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <FormFieldCustom
                  control={form.control}
                  name="branchCode"
                  label="支店コード"
                  placeholder="xxx"
                  type="text"
                  requiredBadge={true}
                />
                <FormFieldCustom
                  control={form.control}
                  name="accountType"
                  label="口座種類"
                  placeholder="xxx"
                  type="select"
                  requiredBadge={true}
                  selectOptions={[
                    { value: "普通預金", label: "普通預金" },
                    { value: "定期預金", label: "定期預金" }
                  ]}
                />
              </div>

              {/* logo */}
              <ProfileImageUpload
                onFileSelect={handleFileSelect}
                label="会社ロゴ"
              />

              {/* Self Introduction */}
              <FormFieldCustom
                control={form.control}
                name="companyOverview"
                label="会社概要"
                placeholder="会社概要"
                type="textarea"
                requiredBadge={false}
                badgeText="任意"
              />

              {/* Specialization */}
              <FormFieldCustom
                control={form.control}
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
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => setStep(1)}
            className="button-submit w-fit bg-light-gray text-text hover:bg-light-gray/80"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Button>
          <Button
            type="submit"
            className="button-submit w-fit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
