import React, { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { DynamicFormData } from '../validate'
import FormFieldCustom from '@/components/form/FormFieldCustom'
import { EDITING_STYLE_OPTIONS, SUBTITLE_STYLE_OPTIONS, VIDEO_ASPECT_RATIO_OPTIONS, VIDEO_DURATION_OPTIONS, VIDEO_USAGE_OPTIONS } from '@/constants/selectOptions'
import UploadFile from './UploadFile'

const VideoComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['videoUsage', 'sourceVideoUploadMethod', 'editingStyle'])

  const { customVideoUsage, sourceVideoUrl, sourceVideoUploadUrl, editingStyle } = useMemo(() => ({
    customVideoUsage: watchedValues[0]?.includes('その他'),
    sourceVideoUrl: watchedValues[1] === "URL",
    sourceVideoUploadUrl: watchedValues[1] === "ファイルアップロード",
    editingStyle: watchedValues[2]?.includes('その他')
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="videoUsage"
          label="編集する動画の用途（複数選択可）or 自由記入）"
          type="checkbox-group"
          checkboxGroupOptions={VIDEO_USAGE_OPTIONS}
          requiredBadge={true}
        />
        {customVideoUsage && (
          <FormFieldCustom
            control={form.control}
            name="customVideoUsage"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="videoDuration"
          label="動画の長さ（編集後の尺）"
          type="single-checkbox-group"
          checkboxGroupOptions={VIDEO_DURATION_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex-col items-start"
        />

        <FormFieldCustom
          control={form.control}
          name="aspectRatio"
          label="希望する画面比率"
          type="single-checkbox-group"
          checkboxGroupOptions={VIDEO_ASPECT_RATIO_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex-col items-start"
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 素材提供について</h3>

        <FormFieldCustom
          control={form.control}
          name="sourceVideoUploadMethod"
          label="素材動画（アップロード or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL', label: 'URL' },
            { value: 'ファイルアップロード', label: 'ファイルアップロード' }
          ]}
          requiredBadge={true}
        />
        {
          sourceVideoUrl && (
            <FormFieldCustom
              control={form.control}
              name="sourceVideoUrl"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          sourceVideoUploadUrl && (
            <UploadFile
              label="動画ファイルをアップロード"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [] }}
              name="sourceVideoUploadUrl"
              form={form}
            />
          )
        }

        <UploadFile
          label="使用したい画像／ロゴなど"
          name="additionalImages"
          multiple={false}
          maxFiles={1}
          acceptedFileTypes={{ "image/*": [] }}
          form={form}
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="bgmRequirements"
          label="使用したいBGM・SE（希望の曲やイメージ）"
          type="textarea"
          placeholder='(例) 明るめ／落ち着いた／盛り上がる感じ／具体的な曲名 など'
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. デザインイメージについて</h3>
        <FormFieldCustom
          control={form.control}
          name="editingStyle"
          label="編集スタイル（複数選択可）or 自由記入"
          type="checkbox-group"
          checkboxGroupOptions={EDITING_STYLE_OPTIONS}
          requiredBadge={false}
        />
        {editingStyle && (
          <FormFieldCustom
            control={form.control}
            name="customEditingStyle"
            type="text"
            placeholder='(例) カジュアルな感じ／ビジネス向けの落ち着いた雰囲気 など'
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="subtitleStyle"
          label="字幕のスタイル"
          type="single-checkbox-group"
          checkboxGroupOptions={SUBTITLE_STYLE_OPTIONS}
          requiredBadge={false}
          checkboxGroupClassName="flex-col items-start"
        />

        <FormFieldCustom
          control={form.control}
          name="cuttingInstructions"
          label="カットの指示（間引き・不要部分カット等）"
          type="textarea"
          placeholder='(例) 間の空白をカット／言い間違い部分を削除 など'
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="graphicsRequirements"
          label="図解／イラスト／アニメーションの挿入希望（あれば）"
          type="textarea"
          placeholder='(例) 図解・イラスト・アニメーションなど'
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="ngItems"
          label="NG事項・避けてほしい表現（言葉、効果など）"
          type="textarea"
          placeholder='(例) 特定の言葉／色／効果音／フォントの指定 など'
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. 参考・イメージ共有</h3>
        <FormFieldCustom
          control={form.control}
          name="referenceVideos"
          label="参考動画（SNSリンクやURL、YouTube等）"
          type="text"
          placeholder='(例) Instagram・TikTok・YouTubeなどのリンク'
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="additionalInstructions"
          label="その他指示"
          type="text"
          placeholder='(例)「この感じに仕上げたい」「この雰囲気はNG」など'
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 納期・スケジュール</h3>

        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="希望納期（◯月◯日まで）"
          type="text"
          placeholder='(例) ○月○日までに初稿／○月○日までに完成など'
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="intermediateCheck"
          label="中間チェックの希望"
          type="single-checkbox-group"
          checkboxGroupOptions={[
            { value: 'あり', label: 'あり' },
            { value: 'なし', label: 'なし' }
          ]}
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
              value: "修正は原則2回まで無料、以降は別途お見積りになります",
              label: "修正は原則2回まで無料、以降は別途お見積りになります"
            },
            {
              value: "いただいた素材の状態（画質・音声）によっては仕上がりに影響が出る場合があります",
              label: "いただいた素材の状態（画質・音声）によっては仕上がりに影響が出る場合があります"
            },
            {
              value:
                "「おまかせ」部分の表現については一任されることを了承しています",
              label:
                "「おまかせ」部分の表現については一任されることを了承しています"
            },
            {
              value: "BGM・音源の著作権には十分ご注意ください（商用利用OKの素材をご提供ください）",
              label: "BGM・音源の著作権には十分ご注意ください（商用利用OKの素材をご提供ください）"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}

export default VideoComponent