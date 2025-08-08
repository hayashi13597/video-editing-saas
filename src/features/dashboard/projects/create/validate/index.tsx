import { z } from "zod";

const baseSchema = z.object({
  type: z.enum([
    "チラシ作成",
    "LP修正依頼",
    "動画編集",
    "名刺作成",
    "バナー作成",
    "Instagram投稿",
    "SEO記事作成",
    "サムネイル作成",
    "LINE構築",
    "台本作成"
  ]),
  title: z.string().min(1, "タイトルは必須です"),
  description: z.string().min(1, "概要説明は必須です"),
  consumePoints: z.number().optional(),
  deadline: z.string().min(1, "希望納期は必須です"),
  visibility: z.enum(["public", "private"])
});

const flyerSchema = baseSchema
  .extend({
    type: z.literal("チラシ作成"),

    // 1. 基本情報
    size: z.array(z.string()).min(1, "ご希望のチラシサイズは必須です"),
    customSize: z.string().optional(),
    sides: z.string().min(1, "片面 or 両面デザインは必須です"),
    printOption: z.string().min(1, "印刷の有無は必須です"),

    // 2. 掲載したい情報
    catchCopy: z.string().optional(),
    serviceDescription: z.string().optional(),
    contactInfo: z.string().optional(),
    photoLogos: z.array(z.string()).optional(),
    qrCodes: z.array(z.string()).optional(),

    // 3. デザインイメージ
    atmosphere: z.array(z.string()).min(1, "ご希望の雰囲気は必須です"),
    customAtmosphere: z.string().optional(),
    colorPreferences: z.string().optional(),
    referenceDesigns: z.array(z.string()).optional(),

    // 4. 目的とターゲット
    purpose: z.string().min(1, "チラシの目的は必須です"),
    customPurpose: z.string().optional(),
    targetAudience: z.string().optional(),

    // 5. 納期とスケジュール
    deliverySchedule: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は2回まで無料（3回目以降は有料）",
        "内容に関する確認後の「OK」以降の修正・返金はできかねます",
        "ご提供素材（写真・ロゴ等）は解像度や構成によりデザインに影響します",
        "印刷希望の場合、印刷費と送料は別途発生いたします",
        "納期短縮・特急仕上げには追加料金が発生する場合があります"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (Array.isArray(data.size) && data.size.includes("その他")) {
        return !!data.customSize && data.customSize.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムサイズを入力してください",
      path: ["customSize"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.atmosphere) &&
        data.atmosphere.includes("その他")
      ) {
        return !!data.customAtmosphere && data.customAtmosphere.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム雰囲気を入力してください",
      path: ["customAtmosphere"]
    }
  )
  .refine(
    data => {
      if (Array.isArray(data.purpose) && data.purpose.includes("その他")) {
        return !!data.customPurpose && data.customPurpose.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム目的を入力してください",
      path: ["customPurpose"]
    }
  );

const lpModificationSchema = baseSchema
  .extend({
    type: z.literal("LP修正依頼"),

    // 1. 修正対象のURL／ページ
    targetUrl: z.string().min(1, "修正対象のページは必須です"),

    // 2. 修正内容について
    modificationDetails: z
      .array(
        z.object({
          modificationLocation: z.string().min(1, "修正箇所は必須です"),
          currentContent: z.string().min(1, "現在の内容は必須です"),
          modifiedContent: z.string().min(1, "修正後の内容は必須です"),
          modificationNotes: z.string().optional()
        })
      )
      .optional(),

    // 3. 素材提供
    replacementImages: z.array(z.string()).optional(),
    replacementText: z.array(z.string()).optional(),

    // 4. 修正の目的と意図
    modificationPurpose: z
      .array(z.string())
      .min(1, "修正の目的を1つ以上選択してください"),
    customModificationPurpose: z.string().optional(),

    // 5. 納期について
    desiredDeadline: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正回数は原則2回まで無料。以降は1回ごとに別途お見積りいたします。",
        "デザイン構成が大きく変わる場合は「修正」ではなく「再制作扱い」となる可能性があります。",
        "修正内容が不明確な場合は着手できない可能性がございます（目的・意図の記載をお願いします）。",
        "画像や原稿など素材の不足がある場合、納期が延びる場合がございます。"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      // modificationPurposeが存在し、「その他」が含まれている場合はcustomModificationPurposeが必須
      if (
        Array.isArray(data.modificationPurpose) &&
        data.modificationPurpose.includes("その他")
      ) {
        return (
          !!data.customModificationPurpose &&
          data.customModificationPurpose.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム修正目的を入力してください",
      path: ["customModificationPurpose"]
    }
  );

const videoEditingSchema = baseSchema
  .extend({
    type: z.literal("動画編集"),

    // 1. 基本情報
    videoUsage: z
      .array(z.string())
      .min(1, "動画の用途を1つ以上選択してください"),
    customVideoUsage: z.string().optional(),

    videoDuration: z.string().min(1, "動画の長さは必須です"),

    aspectRatio: z.string().min(1, "希望する画面比率は必須です"),

    // 2. 素材提供について
    sourceVideoUploadMethod: z
      .string()
      .min(1, "素材動画のアップロード方法は必須です"),
    sourceVideoUrl: z.string().optional(),
    sourceVideoUploadUrl: z.string().optional(),

    additionalImages: z.array(z.string()).optional(),
    bgmRequirements: z.string().optional(),

    // 3. 編集内容の指示
    editingStyle: z
      .array(
        z.enum([
          "ポップ",
          "シネマティック",
          "ビジネス寄り",
          "テロップ多め",
          "インパクト重視",
          "かわいい・やさしい",
          "その他"
        ])
      )
      .optional(),
    customEditingStyle: z.string().optional(),

    subtitleStyle: z.string().optional(),

    cuttingInstructions: z.string().optional(),
    graphicsRequirements: z.string().optional(),
    ngItems: z.string().optional(),

    // 4. 参考・イメージ共有
    referenceVideos: z.string().optional(),
    additionalInstructions: z.string().optional(),

    // 5. 納期・スケジュール
    desiredDeadline: z.string().optional(),
    intermediateCheck: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則2回まで無料、以降は別途お見積りになります",
        "いただいた素材の状態（画質・音声）によっては仕上がりに影響が出る場合があります",
        "「おまかせ」部分の表現については一任されることを了承しています",
        "BGM・音源の著作権には十分ご注意ください（商用利用OKの素材をご提供ください）"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (
        Array.isArray(data.videoUsage) &&
        data.videoUsage.includes("その他")
      ) {
        return !!data.customVideoUsage && data.customVideoUsage.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム動画用途を入力してください",
      path: ["customVideoUsage"]
    }
  )
  .refine(
    data => {
      if (data.sourceVideoUploadMethod.includes("URL")) {
        return !!data.sourceVideoUrl && data.sourceVideoUrl.trim() !== "";
      }
      return true;
    },
    {
      error: "素材動画のURLは必須です",
      path: ["sourceVideoUrl"]
    }
  )
  .refine(
    data => {
      if (data.sourceVideoUploadMethod.includes("ファイルアップロード")) {
        return (
          !!data.sourceVideoUploadUrl && data.sourceVideoUploadUrl.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "動画ファイルのアップロードは必須です",
      path: ["sourceVideoUploadUrl"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.editingStyle) &&
        data.editingStyle.includes("その他")
      ) {
        return (
          !!data.customEditingStyle && data.customEditingStyle.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム動画用途を入力してください",
      path: ["customEditingStyle"]
    }
  );
const businessCardSchema = baseSchema
  .extend({
    type: z.literal("名刺作成"),

    // 1. 基本情報
    quantity: z.string().min(1, "名刺枚数は必須です"),
    printOption: z.string().min(1, "印刷の有無は必須です"),
    sides: z.string().min(1, "両面デザインの希望は必須です"),

    // 2. 表記内容
    fullName: z.string().min(1, "お名前は必須です"),
    nameReading: z.string().optional(),
    jobTitle: z.string().min(1, "役職名は必須です"),
    companyName: z.string().min(1, "会社名は必須です"),
    contactInfo: z.string().min(1, "電話番号・メールアドレスは必須です"),
    address: z.string().min(1, "※不要な場合は「なし」とご記入ください"),
    socialMediaUrls: z.string().optional(),

    // 3. デザインに関して
    designStyle: z.array(z.string()).optional(),
    customDesignStyle: z.string().optional(),
    colorPreferences: z.string().optional(),
    logoPhotos: z.array(z.string()).optional(),
    referenceImages: z.array(z.string()).optional(),

    // 4. その他のこだわりポイント
    paperQualitySize: z.string().optional(),
    additionalRequirements: z.string().optional(),

    // 5. スケジュール
    desiredSchedule: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則2回まで無料です（3回目以降は都度料金が発生します）",
        "印刷後の誤字脱字などの責任は負いかねますので、ご確認後のご承認が必要です",
        "ご提供素材（ロゴ・画像）の解像度やサイズにより、仕上がりに影響が出る可能性があります",
        "印刷費・送料は別途お見積りとなります（ご希望時のみ）"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (
        Array.isArray(data.designStyle) &&
        data.designStyle.includes("その他")
      ) {
        return !!data.customDesignStyle && data.customDesignStyle.trim() !== "";
      }
      return true;
    },
    {
      error:
        "「その他」を選択した場合はカスタムデザインスタイルを入力してください",
      path: ["customDesignStyle"]
    }
  );
const bannerSchema = baseSchema
  .extend({
    type: z.literal("バナー作成"),

    // 1. 基本情報
    bannerTypes: z
      .array(z.string())
      .min(1, "バナーの種類を1つ以上選択してください"),
    customBannerType: z.string().optional(),

    sizeSpecification: z.string().min(1, "サイズ指定は必須です"),
    quantity: z.string().min(1, "バナーの枚数は必須です"),

    // 2. 掲載する内容（テキスト・コピー）
    mainCatchCopy: z.string().optional(),
    subCopy: z.string().optional(),
    requiredInformation: z.string().optional(),

    // 3. ターゲット・訴求目的
    targetAudience: z.string().min(1, "想定ターゲットは必須です"),
    desiredEffect: z.array(z.string()).optional(),
    customDesiredEffect: z.string().optional(),

    // 4. デザインイメージ
    designAtmosphere: z.array(z.string()).optional(),
    customDesignAtmosphere: z.string().optional(),
    colorPreferences: z.string().optional(),
    logoPhotos: z.array(z.string()).optional(),
    referenceBannersMethod: z.string().optional(),
    referenceBannersUpload: z.array(z.string()).optional(),
    referenceBannerUrls: z.string().optional(),

    // 5. 納期・希望スケジュール
    desiredDeliveryDate: z.string().optional(),
    intermediateCheckTiming: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則2回まで無料です（以降は有料となります）",
        "デザイン構成変更や大幅な方向転換は「新規扱い」になる場合があります",
        "ご提供素材（画像・ロゴ等）の画質により仕上がり品質に影響が出る可能性があります",
        "広告効果の保証は含まれておりません（効果測定は別途相談）"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (
        Array.isArray(data.bannerTypes) &&
        data.bannerTypes.includes("その他")
      ) {
        return !!data.customBannerType && data.customBannerType.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムバナータイプを入力してください",
      path: ["customBannerType"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.desiredEffect) &&
        data.desiredEffect.includes("その他")
      ) {
        return (
          !!data.customDesiredEffect && data.customDesiredEffect.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムバナータイプを入力してください",
      path: ["customDesiredEffect"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.designAtmosphere) &&
        data.designAtmosphere.includes("その他")
      ) {
        return (
          !!data.customDesignAtmosphere &&
          data.customDesignAtmosphere.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムバナータイプを入力してください",
      path: ["customDesignAtmosphere"]
    }
  );
const instagramSchema = baseSchema
  .extend({
    type: z.literal("Instagram投稿"),

    // 1. 投稿の目的・タイプ
    postFormats: z
      .array(z.string())
      .min(1, "投稿形式を1つ以上選択してください"),
    customPostFormat: z.string().optional(),

    postPurposes: z
      .array(z.string())
      .min(1, "投稿の目的を1つ以上選択してください"),
    customPostPurpose: z.string().optional(),

    // 2. 投稿内容について
    headline: z.string().min(1, "タイトル・見出しは必須です"),
    bodyText: z.string().min(1, "投稿内容は必須です"),
    hashtags: z.string().optional(),
    tagInfo: z.string().optional(),

    // 3. デザイン・構成
    designStyles: z.array(z.string()).optional(),
    customDesignStyle: z.string().optional(),

    colorPreferences: z.string().optional(),
    assetsMethod: z.string().optional(),
    assetsUrls: z.array(z.string()).optional(),
    assetsUpload: z.array(z.string()).optional(),
    referencePosts: z.array(z.string()).optional(),

    // 4. リール動画に関する情報（任意）
    reelDuration: z.string().optional(),
    subtitles: z.string().optional(),
    musicPreference: z.string().optional(),

    // 5. 納期・スケジュール
    desiredDeadline: z.string().optional(),
    scheduleNotes: z.string().optional(),

    // 同意項目（全て必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則2回まで無料です（3回目以降は有料）",
        "ご提供素材の状態（画質・構図）により、仕上がりに差が出ることを了承します",
        "投稿内容（表現・情報）の事前チェック・承認後の修正には対応できない場合があります",
        "効果（再生数・フォロワー数）の保証はいたしかねます"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (
        Array.isArray(data.postFormats) &&
        data.postFormats.includes("その他")
      ) {
        return !!data.customPostFormat && data.customPostFormat.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customPostFormat"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.postPurposes) &&
        data.postPurposes.includes("その他")
      ) {
        return !!data.customPostPurpose && data.customPostPurpose.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customPostPurpose"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.designStyles) &&
        data.designStyles.includes("その他")
      ) {
        return !!data.customDesignStyle && data.customDesignStyle.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customDesignStyle"]
    }
  );
const seoArticleSchema = baseSchema
  .extend({
    type: z.literal("SEO記事作成"),

    // 1. 基本情報
    publicationTarget: z.string().min(1, "記事の掲載先は必須です"),
    wordCountDescription: z.string().min(1, "文字数の説明は必須です"),

    deliveryFormat: z.string().min(1, "納品形式は必須です"),

    // 2. SEO対策に関する情報
    mainKeyword: z.string().min(1, "メインキーワードは必須です"),
    subKeywords: z.string().optional(),

    searchIntents: z.array(z.string()).optional(),
    customSearchIntent: z.string().optional(),

    targetReader: z.string().optional(),

    // 3. 記事の構成・方向性
    desiredStructure: z.string().optional(),
    referenceArticlesMethod: z.string().optional(),
    referenceArticlesUpload: z.array(z.string()).optional(),
    referenceArticlesUrls: z.string().optional(),

    // 4. トーン・文体について
    tones: z.array(z.string()).optional(),
    customTone: z.string().optional(),

    sentenceStyle: z.string().optional(),

    callToAction: z.string().optional(),

    // 5. 納期とスケジュール
    desiredDeadline: z.string().optional(),
    firstDraftCheckDate: z.string().optional(),

    // 同意項目（全て必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則1回まで無料（2回目以降は内容により追加料金あり）",
        "SEO順位の保証はできかねます（構成・設計は対策に基づいて行います）",
        "検索意図が不明確な場合、意図とずれる可能性があるため記載をお願いします",
        "誤字脱字・事実確認は初稿時にご確認いただく形となります"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (
        Array.isArray(data.searchIntents) &&
        data.searchIntents.includes("その他")
      ) {
        return (
          !!data.customSearchIntent && data.customSearchIntent.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム検索意図を入力してください",
      path: ["customSearchIntent"]
    }
  )
  .refine(
    data => {
      if (Array.isArray(data.tones) && data.tones.includes("その他")) {
        return !!data.customTone && data.customTone.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム検索意図を入力してください",
      path: ["customTone"]
    }
  );
const thumbnailSchema = baseSchema
  .extend({
    type: z.literal("サムネイル作成"),

    // 1. 基本情報
    platforms: z.array(z.string()).min(1, "使用媒体を1つ以上選択してください"),
    customPlatform: z.string().optional(),

    videoTitle: z.string().min(1, "動画タイトルは必須です"),

    imageSizes: z
      .array(z.string())
      .min(1, "希望する画像サイズを1つ以上選択してください"),
    customSize: z.string().optional(),

    // 2. デザインに関して
    headlineText: z.string().optional(),

    designTones: z.array(z.string()).optional(),
    customDesignTone: z.string().optional(),

    colorPreferences: z.string().optional(),

    assets: z.array(z.string()).optional(),

    referenceThumbnailsMethod: z.string().optional(),
    referenceThumbnailsUpload: z.array(z.string()).optional(),
    referenceThumbnailsUrls: z.string().optional(),

    // 3. 修正と納期
    desiredDeadline: z.string().optional(),

    intermediateCheck: z.string().optional(),

    // 同意項目（全て必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "修正は原則2回まで無料（以降は追加料金発生の場合あり）",
        "著作権に関わる素材（芸能人写真・商標ロゴなど）の使用はお控えください",
        "完成品の効果（クリック率や再生数）を保証するものではありません",
        "「おまかせ」で依頼された場合のデザイン方向性は弊社に一任されます"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (Array.isArray(data.platforms) && data.platforms.includes("その他")) {
        return !!data.customPlatform && data.customPlatform.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムサイズを入力してください",
      path: ["customPlatform"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.imageSizes) &&
        data.imageSizes.includes("指定サイズ")
      ) {
        return !!data.customSize && data.customSize.trim() !== "";
      }
      return true;
    },
    {
      error: "「指定サイズ」を選択した場合はカスタムサイズを入力してください",
      path: ["customSize"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.designTones) &&
        data.designTones.includes("その他")
      ) {
        return !!data.customDesignTone && data.customDesignTone.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムサイズを入力してください",
      path: ["customDesignTone"]
    }
  );
const lineSetupSchema = baseSchema
  .extend({
    type: z.literal("LINE構築"),

    // 1. 基本情報
    lineType: z.string().min(1, "LINEの種類は必須です"),
    customLineType: z.string().optional(),

    objectives: z.array(z.string()).min(1, "目的を1つ以上選択してください"),
    customObjective: z.string().optional(),

    // 2. 対象サービス・業種情報
    serviceDescription: z.string().min(1, "サービスや商品内容は必須です"),
    targetAudience: z.string().min(1, "ターゲット属性は必須です"),
    expectedFlow: z.string().min(1, "導線／ゴールは必須です"),

    // 3. コンテンツ設計に関して
    stepMessagingPlan: z.string().optional(),
    richMenuItems: z.string().optional(),
    existingAssets: z.array(z.string()).optional(),
    externalLinks: z.string().optional(),

    // 4. デザイン関連（任意）
    designPreference: z
      .enum([
        "おまかせ（トンマナだけ伝える）",
        "カラー／雰囲気指定あり",
        "自社ロゴ・写真あり"
      ])
      .optional(),
    designDetails: z.string().optional(), // カラーや雰囲気など
    referenceAccounts: z.string().optional(),

    // 5. 納期・ご要望など
    desiredDeadline: z.string().optional(),
    otherRequests: z.string().optional(),

    // 同意項目（すべて必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "構築後の変更・修正は原則2回まで無料です（以降は都度お見積り）",
        "未提出の素材がある場合、納期に影響が出る可能性があります",
        "LINEの仕様変更によって挙動が変わる可能性があります（LINE側要因）",
        "LINE構築による成果（登録数／売上）の保証はいたしかねます"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (data.lineType.includes("その他")) {
        return !!data.customLineType && data.customLineType.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムサイズを入力してください",
      path: ["customLineType"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.objectives) &&
        data.objectives.includes("その他")
      ) {
        return !!data.customObjective && data.customObjective.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタムサイズを入力してください",
      path: ["customObjective"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.designPreference) &&
        data.designPreference.includes("カラー／雰囲気指定あり")
      ) {
        return !!data.designDetails && data.designDetails.trim() !== "";
      }
      return true;
    },
    {
      error:
        "「カラー／雰囲気指定あり」を選択した場合はデザイン詳細を入力してください",
      path: ["designDetails"]
    }
  );
const scriptSchema = baseSchema
  .extend({
    type: z.literal("台本作成"),

    // 1. 基本情報
    platforms: z.array(z.string()).min(1, "使用媒体を1つ以上選択してください"),
    customPlatform: z.string().optional(),

    videoDuration: z.string().min(1, "想定尺を1つ以上選択してください"),

    // 2. 動画の目的・ターゲット
    videoGoals: z.array(z.string()).min(1, "目的を1つ以上選択してください"),
    customVideoGoal: z.string().optional(),

    targetAudience: z.string().min(1, "想定ターゲットは必須です"),
    desiredImpression: z.string().min(1, "動画視聴者に与えたい印象は必須です"),

    // 3. 台本のスタイル・演出について
    scriptStyles: z
      .array(z.string())
      .min(1, "台本形式を1つ以上選択してください"),
    customScriptStyle: z.string().optional(),

    tonePreferences: z
      .array(z.string())
      .min(1, "トーン・雰囲気を1つ以上選択してください"),
    customTonePreference: z.string().optional(),

    // 4. 構成要素・盛り込みたい要点
    keyElements: z
      .array(z.string())
      .min(1, "盛り込みたい要素を1つ以上選択してください"),

    requiredKeywords: z.string().optional(),
    ngKeywords: z.string().optional(),

    // 5. 参考資料・過去投稿
    referencePostsMethod: z.string().optional(),
    referencePostsUpload: z.array(z.string()).optional(),
    referencePostsUrls: z.string().optional(),
    pastExamplesMethod: z.string().optional(),
    pastExamplesUpload: z.array(z.string()).optional(),
    pastExamplesUrls: z.string().optional(),

    // 6. 納期・その他希望
    desiredDeadline: z.string().optional(),
    otherRequests: z.string().optional(),

    // 同意項目（全て必須）
    agreements: z.array(z.string()).superRefine((val, ctx) => {
      const required = [
        "構成・表現の方向性が大きく変わる場合、再作成扱いとなる可能性があります",
        "修正は原則1回まで無料、それ以降は別途見積もりとなります",
        "台本の効果（再生数・成約率）は内容以外の要因にも影響されるため、保証はできません",
        "提供素材や方向性に不備がある場合は納期が遅れることがあります"
      ];
      const missing = required.filter(item => !val.includes(item));
      if (missing.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `すべて同意事項に同意してください`
        });
      }
    })
  })
  .refine(
    data => {
      if (Array.isArray(data.platforms) && data.platforms.includes("その他")) {
        return !!data.customPlatform && data.customPlatform.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customPlatform"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.videoGoals) &&
        data.videoGoals.includes("その他")
      ) {
        return !!data.customVideoGoal && data.customVideoGoal.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customVideoGoal"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.scriptStyles) &&
        data.scriptStyles.includes("その他　")
      ) {
        return !!data.customScriptStyle && data.customScriptStyle.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customScriptStyle"]
    }
  )
  .refine(
    data => {
      if (
        Array.isArray(data.tonePreferences) &&
        data.tonePreferences.includes("その他")
      ) {
        return (
          !!data.customTonePreference && data.customTonePreference.trim() !== ""
        );
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム投稿形式を入力してください",
      path: ["customTonePreference"]
    }
  );
export const dynamicFormSchema = z.discriminatedUnion("type", [
  flyerSchema,
  lpModificationSchema,
  videoEditingSchema,
  businessCardSchema,
  bannerSchema,
  instagramSchema,
  seoArticleSchema,
  thumbnailSchema,
  lineSetupSchema,
  scriptSchema
]);

export type DynamicFormData = z.infer<typeof dynamicFormSchema>;

// Helper type for getting type-specific data
export type FormDataByType<T extends DynamicFormData["type"]> = Extract<
  DynamicFormData,
  { type: T }
>;
