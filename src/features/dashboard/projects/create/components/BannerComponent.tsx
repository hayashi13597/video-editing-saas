"use client";

import FormFieldCustom from "@/components/form/FormFieldCustom";
import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import { BANNER_TYPE_OPTIONS, DESIGN_ATMOSPHERE_OPTIONS, DESIRE_EFFECT_OPTIONS } from "@/constants/selectOptions";
import { useMemo } from "react";
import UploadFile from "./UploadFile";

const BannerComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['bannerTypes', 'desiredEffect', 'designAtmosphere', 'referenceBannersMethod']);

  const { customBannerType, customDesiredEffect, customDesignAtmosphere, referenceBannersUpload, referenceBannerUrls } = useMemo(() => ({
    customBannerType: watchedValues[0]?.includes('その他'),
    customDesiredEffect: watchedValues[1]?.includes('その他'),
    customDesignAtmosphere: watchedValues[2]?.includes('その他'),
    referenceBannerUrls: watchedValues[3] === 'URL',
    referenceBannersUpload: watchedValues[3] === 'ファイルアップロード'
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="bannerTypes"
          label="作成するバナーの種類（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={BANNER_TYPE_OPTIONS}
          requiredBadge={true}
        />
        {customBannerType && (
          <FormFieldCustom
            control={form.control}
            name="customBannerType"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="sizeSpecification"
          label="サイズ（px）指定がある場合"
          type="text"
          placeholder="(例) 1080×1080px／1200×628px など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="quantity"
          label="枚数（例：同じ構成でサイズ違い3種など）"
          type="text"
          placeholder="(例) 同じ構成でサイズ違い3種／訴求別で2枚ずつなど"
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 掲載する内容（テキスト・コピー）</h3>
        <FormFieldCustom
          control={form.control}
          name="mainCatchCopy"
          label="メインキャッチコピー（目を引く文言）"
          type="text"
          placeholder="(例)「今だけ限定！」「初回無料体験」など、目を引く文言"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="subCopy"
          label="サブコピー（補足的な説明や訴求）"
          type="text"
          placeholder="(例)「たった3分で完了」「ご登録は簡単LINEで」など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="requiredInformation"
          label="表記必須の情報（価格・キャンペーン・注意事項など）"
          type="text"
          placeholder="(例) 価格、キャンペーン情報、注意事項など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. ターゲット・訴求目的</h3>
        <FormFieldCustom
          control={form.control}
          name="targetAudience"
          label="想定ターゲット（年齢・性別・悩み・行動など）"
          type="text"
          placeholder="(例) 20代女性／ダイエットに悩む方／子育て中でスマホで情報収集している層 など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="desiredEffect"
          label="バナーで狙いたい効果"
          type="checkbox-group"
          checkboxGroupOptions={DESIRE_EFFECT_OPTIONS}
          requiredBadge={false}
        />
        {customDesiredEffect && (
          <FormFieldCustom
            control={form.control}
            name="customDesiredEffect"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. デザインイメージ</h3>
        <FormFieldCustom
          control={form.control}
          name="designAtmosphere"
          label="ご希望の雰囲気（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={DESIGN_ATMOSPHERE_OPTIONS}
          requiredBadge={false}
        />
        {customDesignAtmosphere && (
          <FormFieldCustom
            control={form.control}
            name="customDesignAtmosphere"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="colorPreferences"
          label="ご希望の色味／NGカラー"
          type="text"
          placeholder="(例) 白とゴールド基調で／黒は避けたい など"
          requiredBadge={false}
        />

        <UploadFile
          label="ロゴ／使用写真などの素材があればアップロード"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="logoPhotos"
          form={form}
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="referenceBannersMethod"
          label="参考バナー（他社含む）があればURLや添付で共有ください or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL', label: 'URL' },
            { value: 'ファイルアップロード', label: 'ファイルアップロード' }
          ]}
          requiredBadge={true}
        />
        {
          referenceBannerUrls && (
            <FormFieldCustom
              control={form.control}
              name="referenceBannerUrls"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          referenceBannersUpload && (
            <UploadFile
              label="動画ファイルをアップロード"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [] }}
              name="referenceBannersUpload"
              form={form}
            />
          )
        }
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期について</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeliveryDate"
          label="希望納品日"
          type="text"
          placeholder="(例) 初稿：○月○日まで／最終納品：○月○日希望 など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="intermediateCheckTiming"
          label="中間チェック希望タイミング（任意）"
          type="text"
          placeholder="(例) 初稿チェックのみ／色味だけ確認したい など"
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
                "修正は原則2回まで無料です（以降は有料となります）",
              label:
                "修正は原則2回まで無料です（以降は有料となります）"
            },
            {
              value:
                "デザイン構成変更や大幅な方向転換は「新規扱い」になる場合があります",
              label:
                "デザイン構成変更や大幅な方向転換は「新規扱い」になる場合があります"
            },
            {
              value:
                "ご提供素材（画像・ロゴ等）の画質により仕上がり品質に影響が出る可能性があります",
              label:
                "ご提供素材（画像・ロゴ等）の画質により仕上がり品質に影響が出る可能性があります"
            },
            {
              value:
                "広告効果の保証は含まれておりません（効果測定は別途相談）",
              label:
                "広告効果の保証は含まれておりません（効果測定は別途相談）"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}

export default BannerComponent