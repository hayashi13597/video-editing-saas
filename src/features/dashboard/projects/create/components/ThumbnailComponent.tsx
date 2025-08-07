"use client";

import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { DESIGN_TONES_OPTIONS, IMAGE_SIZES_OPTIONS, PLATFORM_OPTIONS } from "@/constants/selectOptions";
import { useMemo } from "react";
import UploadFile from "./UploadFile";

const ThumbnailComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['platforms', "imageSizes", "designTones", "referenceThumbnailsMethod"]);

  const { customPlatform, customSize, customDesignTone, referenceThumbnailsUpload, referenceThumbnailsUrls } = useMemo(() => ({
    customPlatform: watchedValues[0]?.includes('その他'),
    customSize: watchedValues[1]?.includes('指定サイズ'),
    customDesignTone: watchedValues[2]?.includes('その他'),
    referenceThumbnailsUpload: watchedValues[3] === 'ファイルアップロード',
    referenceThumbnailsUrls: watchedValues[3] === 'URL'
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="platforms"
          label="サムネイルを使う媒体（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={PLATFORM_OPTIONS}
          requiredBadge={true}
        />
        {customPlatform && (
          <FormFieldCustom
            control={form.control}
            name="customPlatform"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="videoTitle"
          label="動画タイトル（仮でもOK）"
          type="text"
          placeholder="(例) 【2023年版】最新の動画マーケティング戦略"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="imageSizes"
          label="サムネイルを使う媒体（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={IMAGE_SIZES_OPTIONS}
          requiredBadge={true}
        />
        {customSize && (
          <FormFieldCustom
            control={form.control}
            name="customSize"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. デザインに関して</h3>
        <FormFieldCustom
          control={form.control}
          name="headlineText"
          label="伝えたいメッセージ・見出し文字（なるべく短く）"
          type="text"
          placeholder="(例)「◯万人が驚いた！」「知らなきゃ損」「3つの裏ワザ」"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="designTones"
          label="表現したいイメージやトーン（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={DESIGN_TONES_OPTIONS}
          requiredBadge={false}
        />
        {customDesignTone && (
          <FormFieldCustom
            control={form.control}
            name="customDesignTone"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="colorPreferences"
          label="使用したいカラー／避けたいカラー"
          type="text"
          placeholder="(例) 赤系統を使いたい／青系統は避けたい"
          requiredBadge={false}
        />

        <UploadFile
          label="使ってほしい顔写真／ロゴ／背景などの素材"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="assets"
          form={form}
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="referenceThumbnailsMethod"
          label="参考バナー（他社含む）があればURLや添付で共有ください or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL', label: 'URL' },
            { value: 'ファイルアップロード', label: 'ファイルアップロード' }
          ]}
          requiredBadge={false}
        />
        {
          referenceThumbnailsUrls && (
            <FormFieldCustom
              control={form.control}
              name="referenceThumbnailsUrls"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          referenceThumbnailsUpload && (
            <UploadFile
              label="動画ファイルをアップロード"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [] }}
              name="referenceThumbnailsUpload"
              form={form}
            />
          )
        }
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. 修正と納期</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納期（◯月◯日まで など）"
          type="text"
          placeholder="(例) 2023年10月31日まで"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="intermediateCheck"
          label="中間チェックの希望（任意）"
          type="text"
          placeholder="(例) 完成品だけでOK／初稿時に確認したい"
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
                "修正は原則2回まで無料（以降は追加料金発生の場合あり）",
              label:
                "修正は原則2回まで無料（以降は追加料金発生の場合あり）"
            },
            {
              value:
                "著作権に関わる素材（芸能人写真・商標ロゴなど）の使用はお控えください",
              label:
                "著作権に関わる素材（芸能人写真・商標ロゴなど）の使用はお控えください"
            },
            {
              value:
                "完成品の効果（クリック率や再生数）を保証するものではありません",
              label:
                "完成品の効果（クリック率や再生数）を保証するものではありません"
            },
            {
              value:
                "「おまかせ」で依頼された場合のデザイン方向性は弊社に一任されます",
              label:
                "「おまかせ」で依頼された場合のデザイン方向性は弊社に一任されます"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}

export default ThumbnailComponent