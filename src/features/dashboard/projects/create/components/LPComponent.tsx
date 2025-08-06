import FormFieldCustom from "@/components/form/FormFieldCustom";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import ModificationDetails from "../ModificationDetails";
import { MODIFICATION_PURPOSE_OPTIONS } from "@/constants/selectOptions";
import UploadFile from "./UploadFile";

const LPComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const customModificationPurpose = form
    .watch("modificationPurpose")
    ?.includes("その他");

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 修正対象のURL／ページ</h3>
        <FormFieldCustom
          control={form.control}
          name="targetUrl"
          label="修正対象のページ"
          type="text"
          autoComplete="targetUrl"
          requiredBadge={true}
          placeholder="修正したいLPのURL（またはページのファイル名）"
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 修正内容について</h3>
        <ModificationDetails form={form} />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. 素材提供（ある場合のみ）</h3>
        <UploadFile
          label="差し替え画像／バナー／アイコンなど"
          requiredBadge={false}
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="replacementImages"
          form={form}
        />

        <UploadFile
          label="差し替えたいテキストやキャッチコピー（テキストファイル可）"
          requiredBadge={false}
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="replacementText"
          form={form}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. 修正の目的と意図</h3>
        <FormFieldCustom
          control={form.control}
          name="modificationPurpose"
          label="なぜこの修正を行いたいのか？（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={MODIFICATION_PURPOSE_OPTIONS}
          requiredBadge={true}
        />
        {customModificationPurpose && (
          <FormFieldCustom
            control={form.control}
            name="customModificationPurpose"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期について</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納期（可能な範囲で調整いたします）"
          type="text"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">同意項目（チェック必須）</h3>
        <FormFieldCustom
          control={form.control}
          name="agreements"
          label="以下の事項に同意してください"
          type="checkbox-group"
          checkboxGroupOptions={[
            {
              value:
                "修正回数は原則2回まで無料。以降は1回ごとに別途お見積りいたします。",
              label:
                "修正回数は原則2回まで無料。以降は1回ごとに別途お見積りいたします。"
            },
            {
              value:
                "デザイン構成が大きく変わる場合は「修正」ではなく「再制作扱い」となる可能性があります。",
              label:
                "デザイン構成が大きく変わる場合は「修正」ではなく「再制作扱い」となる可能性があります。"
            },
            {
              value:
                "修正内容が不明確な場合は着手できない可能性がございます（目的・意図の記載をお願いします）。",
              label:
                "修正内容が不明確な場合は着手できない可能性がございます（目的・意図の記載をお願いします）。"
            },
            {
              value:
                "画像や原稿など素材の不足がある場合、納期が延びる場合がございます。",
              label:
                "画像や原稿など素材の不足がある場合、納期が延びる場合がございます。"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  );
};

export default LPComponent;
