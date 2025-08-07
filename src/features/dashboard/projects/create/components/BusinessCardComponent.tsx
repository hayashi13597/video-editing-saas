"use client";

import { UseFormReturn } from "react-hook-form"
import { DynamicFormData } from "../validate"
import FormFieldCustom from "@/components/form/FormFieldCustom"
import { DESIGN_STYLE_OPTIONS } from "@/constants/selectOptions"
import { useMemo } from "react"
import UploadFile from "./UploadFile";

const BusinessCardComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['designStyle'])

  const { customDesignStyle } = useMemo(() => ({
    customDesignStyle: watchedValues[0]?.includes('その他')
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="quantity"
          label="ご希望の名刺枚数"
          type="text"
          placeholder="(例) 100枚／200枚／500枚 など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="printOption"
          label="印刷の有無"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            {
              value: "デザインのみ希望",
              label: "デザインのみ希望"
            },
            {
              value: "印刷まで希望（送料別途）",
              label: "印刷まで希望（送料別途）"
            }
          ]}
          checkboxGroupClassName="flex flex-col items-start"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="sides"
          label="両面デザインの希望"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            {
              value: "片面",
              label: "片面"
            },
            {
              value: "両面",
              label: "両面"
            }
          ]}
          checkboxGroupClassName="flex flex-col items-start"
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 表記内容（そのまま記載されます）</h3>
        <FormFieldCustom
          control={form.control}
          name="fullName"
          label="お名前（漢字・ふりがな）"
          type="text"
          placeholder="(例) 倉原 諒也（くらはら りょうや）"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="jobTitle"
          label="肩書き・役職名"
          type="text"
          placeholder="(例) 取締役／代表／コンサルタント など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="companyName"
          label="会社名／屋号"
          type="text"
          placeholder="(例) 株式会社友竹ホールディングス／TOMOTAKE DESIGN"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="contactInfo"
          label="電話番号／メールアドレス"
          type="text"
          placeholder="(例) 080-1234-5678／email@example.jp"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="address"
          label="住所（必要な場合のみ）"
          type="text"
          placeholder="(例) 東京都渋谷区恵比寿南1-1-1 など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="socialMediaUrls"
          label="SNS・QRコード・WEBサイト等 掲載希望があればURLをご記載ください"
          type="text"
          placeholder="(例) https://x.com/example"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. デザインに関して</h3>
        <FormFieldCustom
          control={form.control}
          name="designStyle"
          label="ご希望の雰囲気やテイスト（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={DESIGN_STYLE_OPTIONS}
          requiredBadge={false}
        />
        {customDesignStyle && (
          <FormFieldCustom
            control={form.control}
            name="customDesignStyle"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="colorPreferences"
          label="ご希望のカラーや避けたい色があればご記入ください"
          type="textarea"
          requiredBadge={false}
          placeholder="(例) ネイビー系で統一／ピンクは避けたい など"
        />

        <UploadFile
          label="ロゴや写真など掲載希望の素材があれば添付ください"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="logoPhotos"
          form={form}
          requiredBadge={false}
        />

        <UploadFile
          label="参考イメージや過去の名刺（あれば添付ください）"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="referenceImages"
          form={form}
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. その他のこだわりポイント（任意）</h3>
        <FormFieldCustom
          control={form.control}
          name="paperQualitySize"
          label="紙質やサイズ（一般的な91mm×55mm以外をご希望の場合）"
          type="text"
          requiredBadge={false}
          placeholder="(例) マット紙がいい／小さめサイズ希望（85mm×49mm） など"
        />

        <FormFieldCustom
          control={form.control}
          name="additionalRequirements"
          label="その他ご希望・補足事項"
          type="textarea"
          requiredBadge={false}
          placeholder="(例) 肩書きは目立たせたい／QRコードは裏面に配置希望 など"
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期について</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredSchedule"
          label="希望納期"
          type="text"
          requiredBadge={false}
          placeholder="(例) ◯月◯日までに初稿確認、◯日までに納品など"
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
                "修正は原則2回まで無料です（3回目以降は都度料金が発生します）",
              label:
                "修正は原則2回まで無料です（3回目以降は都度料金が発生します）"
            },
            {
              value:
                "印刷後の誤字脱字などの責任は負いかねますので、ご確認後のご承認が必要です",
              label:
                "印刷後の誤字脱字などの責任は負いかねますので、ご確認後のご承認が必要です"
            },
            {
              value:
                "ご提供素材（ロゴ・画像）の解像度やサイズにより、仕上がりに影響が出る可能性があります",
              label:
                "ご提供素材（ロゴ・画像）の解像度やサイズにより、仕上がりに影響が出る可能性があります"
            },
            {
              value:
                "印刷費・送料は別途お見積りとなります（ご希望時のみ）",
              label:
                "印刷費・送料は別途お見積りとなります（ご希望時のみ）"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}

export default BusinessCardComponent