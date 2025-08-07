"use client";

import { UseFormReturn } from 'react-hook-form'
import { DynamicFormData } from '../validate'
import FormFieldCustom from '@/components/form/FormFieldCustom';
import { DESIGN_STYLE_OPTIONS, POST_FORMATS_OPTIONS, POST_PURPOSES_OPTIONS, REEL_DURATION_OPTIONS, SUBTITLES_OPTIONS } from '@/constants/selectOptions';
import { useMemo } from 'react';
import UploadFile from './UploadFile';

export const InstagramComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['postFormats', 'postPurposes', "designStyles", "assetsMethod"]);

  const { customPostFormat, customPostPurpose, customDesignStyle, assetsUrls, assetsUpload } = useMemo(() => ({
    customPostFormat: watchedValues[0]?.includes('その他'),
    customPostPurpose: watchedValues[1]?.includes('その他'),
    customDesignStyle: watchedValues[2]?.includes('その他'),
    assetsUrls: watchedValues[3] === 'URL',
    assetsUpload: watchedValues[3] === 'ファイルアップロード'
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 投稿の目的・タイプを教えてください</h3>
        <FormFieldCustom
          control={form.control}
          name="postFormats"
          label="投稿形式（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={POST_FORMATS_OPTIONS}
          requiredBadge={true}
        />
        {customPostFormat && (
          <FormFieldCustom
            control={form.control}
            name="customPostFormat"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="postPurposes"
          label="投稿形式（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={POST_PURPOSES_OPTIONS}
          requiredBadge={true}
        />
        {customPostPurpose && (
          <FormFieldCustom
            control={form.control}
            name="customPostPurpose"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 投稿内容について</h3>
        <FormFieldCustom
          control={form.control}
          name="headline"
          label="タイトル・見出し（ユーザーの目を引く文言）"
          type="text"
          placeholder="(例)「30代女性に人気の肌改善術」「来週から使える時短レシピ」など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="bodyText"
          label="本文（箇条書きやストーリー形式など）"
          type="text"
          placeholder="(例)「30代女性に人気の肌改善術」なら「肌荒れの原因」「おすすめのスキンケア商品」「実際の体験談」など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="hashtags"
          label="ハッシュタグ（希望があれば）"
          type="text"
          placeholder="(例) #小顔ケア #美容整体 #時短メニュー など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="tagInfo"
          label="アカウントタグや位置情報などの希望があれば"
          type="text"
          placeholder="(例) @official_account／銀座／表参道エリア など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. デザイン・構成に関して</h3>
        <FormFieldCustom
          control={form.control}
          name="designStyles"
          label="投稿形式（複数選択可）"
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
          label="色味の希望／避けたい色味があれば"
          type="text"
          placeholder="(例) 白×ネイビーで落ち着いた雰囲気／赤は避けたい など"
          requiredBadge={false}
        />

        <UploadFile
          label="ロゴ／使用写真などの素材があればアップロード"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          name="assets"
          form={form}
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="assetsMethod"
          label="参考バナー（他社含む）があればURLや添付で共有ください or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL', label: 'URL' },
            { value: 'ファイルアップロード', label: 'ファイルアップロード' }
          ]}
          requiredBadge={false}
        />
        {
          assetsUrls && (
            <FormFieldCustom
              control={form.control}
              name="assetsUrls"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          assetsUpload && (
            <UploadFile
              label="動画ファイルをアップロード"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [] }}
              name="assetsUpload"
              form={form}
            />
          )
        }
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. リール動画の場合（該当者のみ）</h3>
        <FormFieldCustom
          control={form.control}
          name="reelDuration"
          label="動画時間の希望 or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={REEL_DURATION_OPTIONS}
          requiredBadge={false}
          checkboxGroupClassName='flex flex-col items-start'
        />

        <FormFieldCustom
          control={form.control}
          name="subtitles"
          label="テロップやナレーションの有無"
          type='single-checkbox-group'
          checkboxGroupOptions={SUBTITLES_OPTIONS}
          requiredBadge={false}
          checkboxGroupClassName='flex flex-col items-start'
        />

        <FormFieldCustom
          control={form.control}
          name="musicPreference"
          label="使用音源の希望（曲名や雰囲気など）"
          type="text"
          placeholder="(例)「爽やかなポップな曲」「ヒップホップ系」など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期について</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納期（◯月◯日まで など）"
          type="text"
          placeholder="(例)「◯月◯日まで」「来週の金曜日まで」など"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="scheduleNotes"
          label="スケジュールに関するご希望"
          type="text"
          placeholder="(例)「週末に確認したい」「平日の昼間に連絡希望」など"
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
                "修正は原則2回まで無料です（3回目以降は有料）",
              label:
                "修正は原則2回まで無料です（3回目以降は有料）"
            },
            {
              value:
                "ご提供素材の状態（画質・構図）により、仕上がりに差が出ることを了承します",
              label:
                "ご提供素材の状態（画質・構図）により、仕上がりに差が出ることを了承します"
            },
            {
              value:
                "投稿内容（表現・情報）の事前チェック・承認後の修正には対応できない場合があります",
              label:
                "投稿内容（表現・情報）の事前チェック・承認後の修正には対応できない場合があります"
            },
            {
              value:
                "効果（再生数・フォロワー数）の保証はいたしかねます",
              label:
                "効果（再生数・フォロワー数）の保証はいたしかねます"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}
