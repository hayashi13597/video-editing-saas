"use client";

import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import {
  DELIVERY_FORMAT_OPTIONS,
  SEARCH_INTENT_OPTIONS,
  SENTENCE_STYLE_OPTIONS,
  TONES_OPTIONS
} from "@/constants/selectOptions";
import { useMemo } from "react";
import UploadFile from "./UploadFile";

const SEOArticleComponent = ({
  form
}: {
  form: UseFormReturn<DynamicFormData>;
}) => {
  const watchedValues = form.watch([
    "searchIntents",
    "referenceArticlesMethod",
    "tones"
  ]);

  const {
    customSearchIntent,
    referenceArticlesUrls,
    referenceArticlesUpload,
    customTone
  } = useMemo(
    () => ({
      customSearchIntent: watchedValues[0]?.includes("その他"),
      referenceArticlesUrls: watchedValues[1] === "URL",
      referenceArticlesUpload: watchedValues[1] === "ファイルアップロード",
      customTone: watchedValues[2]?.includes("その他")
    }),
    [watchedValues]
  );

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="publicationTarget"
          label="記事の掲載先（URLまたは媒体名）"
          type="text"
          placeholder="(例) 自社ブログ、note、WordPressサイト、特定のURL など）"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="wordCountDescription"
          label="ご希望の文字数"
          type="text"
          placeholder="(例) 2,000文字前後／3,000〜5,000字など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="deliveryFormat"
          label="記事の納品形式"
          type="single-checkbox-group"
          checkboxGroupOptions={DELIVERY_FORMAT_OPTIONS}
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. SEO対策に関する情報</h3>
        <FormFieldCustom
          control={form.control}
          name="mainKeyword"
          label="メインキーワード"
          type="text"
          placeholder="(例)「ダイエット」「育児」「プログラミング」など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="subKeywords"
          label="サブキーワード／関連キーワード"
          type="text"
          placeholder="(例) 副業、初心者、稼ぎ方／美容室 集客 コツ など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="searchIntents"
          label="対策したい検索意図（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={SEARCH_INTENT_OPTIONS}
          requiredBadge={false}
        />

        {customSearchIntent && (
          <FormFieldCustom
            control={form.control}
            name="customSearchIntent"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="targetReader"
          label="検索で狙いたいターゲット読者（性別・年齢・悩み・目的など）"
          type="text"
          placeholder="(例) 情報提供、比較・検討、問題解決、購入・申し込み誘導 など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. 記事の構成・方向性</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredStructure"
          label="ご希望の構成や記事の流れ（箇条書きでOK）"
          type="text"
          placeholder="(例) 見出しを3〜4つに分けたい、FAQ形式にしたい、ストーリー形式など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="referenceArticlesMethod"
          label="参考にしたい記事や競合サイト（URLや名前）"
          type="single-checkbox-group"
          checkboxGroupOptions={[
            { value: "URL", label: "URL" },
            { value: "ファイルアップロード", label: "ファイルアップロード" }
          ]}
          requiredBadge={false}
        />
        {referenceArticlesUrls && (
          <FormFieldCustom
            control={form.control}
            name="referenceArticlesUrls"
            type="text"
          />
        )}
        {referenceArticlesUpload && (
          <UploadFile
            label="動画ファイルをアップロード"
            multiple={false}
            maxFiles={1}
            acceptedFileTypes={{ "image/*": [] }}
            name="referenceArticlesUpload"
            form={form}
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. トーン・文体について</h3>
        <FormFieldCustom
          control={form.control}
          name="tones"
          label="対策したい検索意図（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={TONES_OPTIONS}
          requiredBadge={false}
        />
        {customTone && (
          <FormFieldCustom
            control={form.control}
            name="customTone"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="sentenceStyle"
          label="文末の語尾トーン"
          type="single-checkbox-group"
          checkboxGroupOptions={SENTENCE_STYLE_OPTIONS}
          requiredBadge={false}
          checkboxGroupClassName="flex flex-col items-start"
        />

        <FormFieldCustom
          control={form.control}
          name="callToAction"
          label="記事内で誘導したい導線（例：LINE登録／サービスLP／商品ページなど）"
          type="text"
          placeholder="(例) LINE登録ページ、サービスLP、商品購入ページなど"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期とスケジュール</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納品日"
          type="text"
          placeholder="(例) ○月○日までに初稿／最終納品は○月○日希望 など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="firstDraftCheckDate"
          label="初稿チェックの希望日"
          type="text"
          placeholder="(例) ○月○日までに初稿を確認したい"
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
                "修正は原則1回まで無料（2回目以降は内容により追加料金あり）",
              label:
                "修正は原則1回まで無料（2回目以降は内容により追加料金あり）"
            },
            {
              value:
                "SEO順位の保証はできかねます（構成・設計は対策に基づいて行います）",
              label:
                "SEO順位の保証はできかねます（構成・設計は対策に基づいて行います）"
            },
            {
              value:
                "検索意図が不明確な場合、意図とずれる可能性があるため記載をお願いします",
              label:
                "検索意図が不明確な場合、意図とずれる可能性があるため記載をお願いします"
            },
            {
              value: "誤字脱字・事実確認は初稿時にご確認いただく形となります",
              label: "誤字脱字・事実確認は初稿時にご確認いただく形となります"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  );
};

export default SEOArticleComponent;
