"use client";

import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import {
  ATMOSPHERE_OPTIONS,
  PURPOSE_OPTIONS,
  SIZE_OPTIONS
} from "@/constants/selectOptions";

const FlyerComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const customSize = form.watch("size")?.includes("その他");
  const customAtmosphere = form.watch("atmosphere")?.includes("その他");
  const customPurpose = form.watch("purpose")?.includes("その他");

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="size"
          label="ご希望のチラシサイズ（選択 or 自由記入）"
          type="checkbox-group"
          checkboxGroupOptions={SIZE_OPTIONS}
          requiredBadge={true}
        />
        {customSize && (
          <FormFieldCustom
            control={form.control}
            name="customSize"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="sides"
          label="片面 or 両面デザイン"
          type="single-checkbox-group"
          checkboxGroupOptions={[
            { value: "片面", label: "片面" },
            { value: "両面", label: "両面" }
          ]}
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="printOption"
          label="印刷の有無 or 両面デザイン"
          type="single-checkbox-group"
          checkboxGroupOptions={[
            { value: "デザインのみ", label: "デザインのみ" },
            { value: "印刷まで希望", label: "印刷まで希望（送料別途）" }
          ]}
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 掲載したい情報（原稿となる内容）</h3>
        <FormFieldCustom
          control={form.control}
          name="catchCopy"
          label="キャッチコピー（なければこちらでご提案も可能）"
          placeholder="(例) 未定の場合はこちらでご提案も可能です。"
          type="textarea"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="serviceDescription"
          label="詳細なサービス・商品説明"
          placeholder="(例) 特徴・メリット・料金・利用方法など、できるだけ詳しくご記入ください。"
          type="textarea"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="contactInfo"
          label="店舗情報・連絡先・SNS・HPなど"
          placeholder="(例) 店舗名・住所・電話番号・Instagram・公式LINEなど"
          type="textarea"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="photoLogos"
          label="掲載したい写真やロゴなど"
          type="upload-text"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="qrCodes"
          label="掲載したいQRコード（LINE・予約ページなど）"
          type="upload-text"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. デザインイメージについて</h3>

        <FormFieldCustom
          control={form.control}
          name="atmosphere"
          label="ご希望の雰囲気（複数選択可） or 自由記入）"
          type="checkbox-group"
          checkboxGroupOptions={ATMOSPHERE_OPTIONS}
          requiredBadge={true}
        />
        {customAtmosphere && (
          <FormFieldCustom
            control={form.control}
            name="customAtmosphere"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="colorPreferences"
          label="使用したいメインカラー、避けたいカラー"
          placeholder="(例) ピンク系をメインに／黒は使いたくない など"
          type="textarea"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="referenceDesigns"
          label="参考にしたいデザインや過去のチラシ（あれば）"
          type="upload-text"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. 目的とターゲット</h3>

        <FormFieldCustom
          control={form.control}
          name="purpose"
          label="このチラシの目的は何ですか？"
          type="single-checkbox-group"
          checkboxGroupOptions={PURPOSE_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex flex-col items-start"
        />
        {customPurpose && (
          <FormFieldCustom
            control={form.control}
            name="customPurpose"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="targetAudience"
          label="想定ターゲット（性別・年齢・地域・悩みなど）"
          placeholder="(例) 30代女性／都内在住／小顔に悩む方／Instagramで情報収集する層 など"
          type="textarea"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期とスケジュール</h3>

        <FormFieldCustom
          control={form.control}
          name="deliverySchedule"
          label="希望納品日（初稿・最終納品の希望があれば記入）"
          placeholder="(例) 初稿は○月○日、最終納品は○月○日までに希望 など"
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
              value: "修正は2回まで無料（3回目以降は有料）",
              label: "修正は2回まで無料（3回目以降は有料）"
            },
            {
              value: "内容に関する確認後の「OK」以降の修正・返金はできかねます",
              label: "内容に関する確認後の「OK」以降の修正・返金はできかねます"
            },
            {
              value:
                "ご提供素材（写真・ロゴ等）は解像度や構成によりデザインに影響します",
              label:
                "ご提供素材（写真・ロゴ等）は解像度や構成によりデザインに影響します"
            },
            {
              value: "印刷希望の場合、印刷費と送料は別途発生いたします",
              label: "印刷希望の場合、印刷費と送料は別途発生いたします"
            },
            {
              value: "納期短縮・特急仕上げには追加料金が発生する場合があります",
              label: "納期短縮・特急仕上げには追加料金が発生する場合があります"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  );
};

export default FlyerComponent;
