"use client";

import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "../validate";
import { useMemo } from "react";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { KEY_ELEMENTS_OPTIONS, SCRIPT_PLATFORM_OPTIONS, SCRIPT_STYLE_OPTIONS, TONE_PREFERENCE_OPTIONS, VIDEO_DURATION, VIDEO_DURATION_OPTIONS, VIDEO_GLOBAL_OPTIONS } from "@/constants/selectOptions";
import UploadFile from "./UploadFile";

const ScriptComponent = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const watchedValues = form.watch(['platforms', "videoGoals", "scriptStyles", "tonePreferences", "referencePostsMethod", "pastExamplesMethod"]);

  const { customPlatform, customVideoGoal, customScriptStyle, customTonePreference, referencePostsUpload, referencePostsUrls, pastExamplesUpload, pastExamplesUrls } = useMemo(() => ({
    customPlatform: watchedValues[0]?.includes('その他'),
    customVideoGoal: watchedValues[1]?.includes('その他'),
    customScriptStyle: watchedValues[2]?.includes('その他　'),
    customTonePreference: watchedValues[3]?.includes('その他'),
    referencePostsUpload: watchedValues[4] === 'ファイルアップロード',
    referencePostsUrls: watchedValues[4] === 'URL',
    pastExamplesUpload: watchedValues[5] === 'ファイルアップロード_Example',
    pastExamplesUrls: watchedValues[5] === 'URL_Example'
  }), [watchedValues])

  return (
    <>
      <div className="space-y-3">
        <h3 className="small-title">1. 基本情報</h3>
        <FormFieldCustom
          control={form.control}
          name="platforms"
          label="使用媒体（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={SCRIPT_PLATFORM_OPTIONS}
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
          name="videoDuration"
          label="想定動画の尺（完成後）"
          type="single-checkbox-group"
          checkboxGroupOptions={VIDEO_DURATION_OPTIONS}
          requiredBadge={true}
          checkboxGroupClassName="flex flex-col items-start"
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">2. 動画の目的・ターゲット</h3>
        <FormFieldCustom
          control={form.control}
          name="videoGoals"
          label="使用媒体（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={VIDEO_GLOBAL_OPTIONS}
          requiredBadge={true}
        />
        {customVideoGoal && (
          <FormFieldCustom
            control={form.control}
            name="customVideoGoal"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="targetAudience"
          label="想定ターゲット（年齢・性別・悩み・属性など）"
          type="text"
          placeholder="(例) 30代女性、産後ダイエットに悩む主婦、地方の整体院オーナー など"
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="desiredImpression"
          label="動画を見た人にどう感じてほしいか？（感情）"
          type="text"
          placeholder="(例)「自分に当てはまる！」「この人に任せたい」「今すぐ申し込みたい」"
          requiredBadge={true}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">3. 台本のスタイル・演出について</h3>
        <FormFieldCustom
          control={form.control}
          name="scriptStyles"
          label="台本の形式（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={SCRIPT_STYLE_OPTIONS}
          requiredBadge={true}
        />
        {customScriptStyle && (
          <FormFieldCustom
            control={form.control}
            name="customScriptStyle"
            type="text"
          />
        )}

        <FormFieldCustom
          control={form.control}
          name="tonePreferences"
          label="トーンや雰囲気の希望（複数可）"
          type="checkbox-group"
          checkboxGroupOptions={TONE_PREFERENCE_OPTIONS}
          requiredBadge={true}
        />
        {customTonePreference && (
          <FormFieldCustom
            control={form.control}
            name="customTonePreference"
            type="text"
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="small-title">4. 構成要素・盛り込みたい要点</h3>
        <FormFieldCustom
          control={form.control}
          name="keyElements"
          label="盛り込みたい要素（複数選択可）"
          type="checkbox-group"
          checkboxGroupOptions={KEY_ELEMENTS_OPTIONS}
          requiredBadge={true}
        />

        <FormFieldCustom
          control={form.control}
          name="requiredKeywords"
          label="絶対に入れてほしいキーワードや表現（あれば）"
          type="text"
          placeholder="(例)「自分に当てはまる！」「この人に任せたい」「今すぐ申し込みたい」"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="ngKeywords"
          label="避けてほしい表現・NGワードがあれば記入してください"
          type="text"
          placeholder="(例)「無料」「簡単」「すぐに」など"
          requiredBadge={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="small-title">5. 参考資料・過去投稿</h3>
        <FormFieldCustom
          control={form.control}
          name="referencePostsMethod"
          label="参考バナー（他社含む）があればURLや添付で共有ください or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL', label: 'URL' },
            { value: 'ファイルアップロード', label: 'ファイルアップロード' }
          ]}
          requiredBadge={true}
        />
        {
          referencePostsUrls && (
            <FormFieldCustom
              control={form.control}
              name="referencePostsUrls"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          referencePostsUpload && (
            <UploadFile
              label="参考になる投稿（URLまたは添付）"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [], "image/*": [], "text/*": [], "application/pdf": [] }}
              name="referencePostsUpload"
              form={form}
            />
          )
        }

        <FormFieldCustom
          control={form.control}
          name="pastExamplesMethod"
          label="自社やご自身の過去の投稿で「このテイストが良かった」ものがあれば教えてください or ギガファイル便などのURL）"
          type='single-checkbox-group'
          checkboxGroupOptions={[
            { value: 'URL_Example', label: 'URL' },
            { value: 'ファイルアップロード_Example', label: 'ファイルアップロード' }
          ]}
          requiredBadge={true}
        />
        {
          pastExamplesUrls && (
            <FormFieldCustom
              control={form.control}
              name="pastExamplesUrls"
              type="text"
              placeholder='(例) ギガファイル便のURL／Googleドライブ'
            />
          )
        }
        {
          pastExamplesUpload && (
            <UploadFile
              label="動画ファイルをアップロード"
              multiple={false}
              maxFiles={1}
              acceptedFileTypes={{ "video/*": [], "image/*": [], "text/*": [], "application/pdf": [] }}
              name="pastExamplesUpload"
              form={form}
            />
          )
        }
      </div>

      <div className="space-y-3">
        <h3 className="small-title">6. 納期・その他希望</h3>
        <FormFieldCustom
          control={form.control}
          name="desiredDeadline"
          label="納品希望日"
          type="text"
          placeholder="(例) 2024年1月15日までに"
          requiredBadge={false}
        />

        <FormFieldCustom
          control={form.control}
          name="otherRequests"
          label="その他ご希望や補足"
          type="text"
          placeholder="(例) 話し口調指定、特定のセリフなど"
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
                "構成・表現の方向性が大きく変わる場合、再作成扱いとなる可能性があります",
              label:
                "構成・表現の方向性が大きく変わる場合、再作成扱いとなる可能性があります"
            },
            {
              value:
                "修正は原則1回まで無料、それ以降は別途見積もりとなります",
              label:
                "修正は原則1回まで無料、それ以降は別途見積もりとなります"
            },
            {
              value:
                "台本の効果（再生数・成約率）は内容以外の要因にも影響されるため、保証はできません",
              label:
                "台本の効果（再生数・成約率）は内容以外の要因にも影響されるため、保証はできません"
            },
            {
              value:
                "提供素材や方向性に不備がある場合は納期が遅れることがあります",
              label:
                "提供素材や方向性に不備がある場合は納期が遅れることがあります"
            }
          ]}
          requiredBadge={true}
        />
      </div>
    </>
  )
}

export default ScriptComponent