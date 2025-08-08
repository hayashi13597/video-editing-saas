"use client";

import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import {
  DESIGN_PREFERENCE_OPTIONS,
  LINE_TYPE_OPTIONS,
  OBJECTIVES_OPTIONS
} from "@/constants/selectOptions";
import { useMemo } from "react";
import UploadFile from "./UploadFile";

const LineComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch([
    "lineType",
    "objectives",
    "designPreference"
  ]);

  const { customLineType, customObjective, designDetails } = useMemo(
    () => ({
      customLineType: watchedValues[0]?.includes("その他"),
      customObjective: watchedValues[1]?.includes("その他"),
      designDetails: watchedValues[2]?.includes("カラー／雰囲気指定あり")
    }),
    [watchedValues]
  );

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="lineType"
          label="サムネイルを使う媒体"
          type="single-checkbox-group"
          checkboxGroupOptions={LINE_TYPE_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex flex-col items-start"
        />
        {customLineType && (
          <FormFieldCustom
            control={form.control}
            name="customLineType"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="objectives"
          label="目的（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={OBJECTIVES_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex flex-col items-start"
        />
        {customObjective && (
          <FormFieldCustom
            control={form.control}
            name="customObjective"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 対象サービス・業種情報</h3>
        <FormFieldCustom
          control={form.control}
          name="serviceDescription"
          label="LINEで扱うサービスや商品内容"
          type="text"
          placeholder="(例) 美容整体の予約受付／サブスク商品の案内／無料セミナー集客 など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="targetAudience"
          label="ターゲット属性（年齢層・性別・悩みなど）"
          type="text"
          placeholder="(例) 20代女性／ダイエットに悩む主婦／都内在住の美容室オーナー など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="expectedFlow"
          label="想定の導線／ゴール（例：LP→LINE→予約／購入）"
          type="text"
          placeholder="(例) Instagram→LP→LINE登録→3日間の教育→購入 など"
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. コンテンツ設計に関して</h3>
        <FormFieldCustom
          control={form.control}
          name="stepMessagingPlan"
          label="ステップ配信を希望する場合、その内容や流れ"
          type="text"
          placeholder="(例) 1日目：問題提起／2日目：共感と実績紹介／3日目：サービス案内と申込み誘導"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="richMenuItems"
          label="リッチメニューに掲載したい項目（最大6つ）"
          type="text"
          placeholder="(例) サービス紹介／予約／メニュー一覧／Q&A／特典配布／SNSリンク"
          requiredBadge={false}
        />

        <UploadFile
          label="既にある原稿・画像・動画などがあれば添付ください"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="existingAssets"
          form={form}
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="externalLinks"
          label="使用したいLINE内リンクやLP、外部フォームURLなど"
          type="text"
          placeholder="(例) https://example.com/lp ／ GoogleフォームのURLなど"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. デザイン関連（任意）</h3>
        <FormFieldCustom
          control={form.control}
          name="designPreference"
          label="リッチメニューやアイコンのデザイン希望（あれば）"
          type="single-checkbox-group"
          checkboxGroupOptions={DESIGN_PREFERENCE_OPTIONS}
          requiredBadge={false}
          checkboxGroupClassName="flex flex-col items-start"
        />
        {designDetails && (
          <FormFieldCustom
            control={form.control}
            name="designDetails"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="referenceAccounts"
          label="参考アカウント（他社など）あれば教えてください"
          type="text"
          placeholder="(例) おまかせでOK／ピンクと白を基調にした可愛い雰囲気／自社ロゴあり など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期・ご要望など</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納期（◯月◯日までなど）"
          type="text"
          placeholder="(例) ○月○日までにステップ配信初稿／○月末までにリリース希望"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="otherRequests"
          label="その他ご希望や懸念点があればご記入ください"
          type="text"
          placeholder="(例) LPの完成がまだ／画像が一部不足している など"
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
                "構築後の変更・修正は原則2回まで無料です（以降は都度お見積り）",
              label:
                "構築後の変更・修正は原則2回まで無料です（以降は都度お見積り）"
            },
            {
              value: "未提出の素材がある場合、納期に影響が出る可能性があります",
              label: "未提出の素材がある場合、納期に影響が出る可能性があります"
            },
            {
              value:
                "LINEの仕様変更によって挙動が変わる可能性があります（LINE側要因）",
              label:
                "LINEの仕様変更によって挙動が変わる可能性があります（LINE側要因）"
            },
            {
              value: "LINE構築による成果（登録数／売上）の保証はいたしかねます",
              label: "LINE構築による成果（登録数／売上）の保証はいたしかねます"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  );
};

export default LineComponent;
