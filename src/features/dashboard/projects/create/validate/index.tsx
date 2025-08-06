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
      if (
        Array.isArray(data.size) &&
        data.size.includes("その他")
      ) {
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
      if (
        Array.isArray(data.purpose) &&
        data.purpose.includes("その他")
      ) {
        return !!data.customPurpose && data.customPurpose.trim() !== "";
      }
      return true;
    },
    {
      error: "「その他」を選択した場合はカスタム目的を入力してください",
      path: ["customPurpose"]
    }
  );

const lpModificationSchema = baseSchema.extend({
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
    .array(
      z.string()
    )
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
        return !!data.customModificationPurpose && data.customModificationPurpose.trim() !== "";
      }
      return true;
    }, {
    error: "「その他」を選択した場合はカスタム修正目的を入力してください",
    path: ["customModificationPurpose"]
  }
  );

const videoEditingSchema = baseSchema.extend({
  type: z.literal("動画編集"),

  // 1. 基本情報
  videoUsage: z
    .array(
      z.enum([
        "TikTok",
        "Instagramリール",
        "YouTubeショート／本編",
        "PR用動画（企業／店舗）",
        "セミナー動画",
        "その他"
      ])
    )
    .min(1, "動画の用途を1つ以上選択してください"),
  customVideoUsage: z.string().optional(),

  videoDuration: z.enum([
    "15秒以内",
    "30秒以内",
    "1分以内",
    "3分以内",
    "指定なし"
  ]),

  aspectRatio: z.enum(["縦（9:16）", "横（16:9）", "正方形（1:1）"]),

  // 2. 素材提供について
  sourceVideoUrl: z
    .string()
    .min(1, "素材動画のURL又はアップロード情報は必須です"),
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
    .min(1, "編集の雰囲気を1つ以上選択してください"),
  customEditingStyle: z.string().optional(),

  subtitleStyle: z.enum(["セリフすべて表示", "要点のみ表示", "テロップ不要"]),

  cuttingInstructions: z.string().optional(),
  graphicsRequirements: z.string().optional(),
  ngItems: z.string().optional(),

  // 4. 参考・イメージ共有
  referenceVideos: z.string().optional(),
  additionalInstructions: z.string().optional(),

  // 5. 納期・スケジュール
  desiredDeadline: z.string().optional(),
  intermediateCheck: z.boolean().optional(),

  // 同意項目（すべて必須）
  agreeModificationLimit: z.literal(true, {
    message: "修正回数制限に同意してください"
  }),
  agreeMaterialQuality: z.literal(true, {
    message: "素材の状態による影響に同意してください"
  }),
  agreeCreativeControl: z.literal(true, {
    message: "「おまかせ」部分の一任に同意してください"
  }),
  agreeCopyright: z.literal(true, {
    message: "BGM・音源の著作権に関する注意事項に同意してください"
  })
});

const businessCardSchema = baseSchema.extend({
  type: z.literal("名刺作成"),

  // 1. 基本情報
  quantity: z.string().min(1, "名刺枚数は必須です"),
  printOption: z.enum(["デザインのみ希望", "印刷まで希望"]),
  sides: z.enum(["片面", "両面"]),

  // 2. 表記内容
  fullName: z.string().min(1, "お名前は必須です"),
  nameReading: z.string().optional(),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  contactInfo: z.string().min(1, "電話番号・メールアドレスは必須です"),
  address: z.string().optional(),
  socialMediaUrls: z.string().optional(),

  // 3. デザインに関して
  designStyle: z
    .array(
      z.enum([
        "シンプル",
        "高級感",
        "ナチュラル",
        "信頼感",
        "かわいい",
        "スタイリッシュ",
        "カラフル",
        "モノトーン",
        "その他"
      ])
    )
    .min(1, "デザインの雰囲気を1つ以上選択してください"),
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
  agreeModificationLimit: z.literal(true, {
    message: "修正回数制限に同意してください"
  }),
  agreeProofreadingResponsibility: z.literal(true, {
    message: "印刷後の誤字脱字責任に関する注意事項に同意してください"
  }),
  agreeMaterialQuality: z.literal(true, {
    message: "素材の解像度・サイズによる影響に同意してください"
  }),
  agreePrintingCost: z.literal(true, {
    message: "印刷費・送料別途に関する注意事項に同意してください"
  })
});

const bannerSchema = baseSchema.extend({
  type: z.literal("バナー作成"),

  // 1. 基本情報
  bannerTypes: z
    .array(
      z.enum([
        "Instagram広告用",
        "Facebook広告用",
        "Googleリスティング広告",
        "LINE広告",
        "その他"
      ])
    )
    .min(1, "バナーの種類を1つ以上選択してください"),
  customBannerType: z.string().optional(), // "その他"選択時の記入欄

  sizeSpecification: z.string().optional(), // サイズ(px)指定
  quantity: z.string().optional(), // 枚数

  // 2. 掲載する内容（テキスト・コピー）
  mainCatchCopy: z.string().optional(), // メインキャッチコピー
  subCopy: z.string().optional(), // サブコピー
  requiredInformation: z.string().optional(), // 表記必須の情報

  // 3. ターゲット・訴求目的
  targetAudience: z.string().min(1, "想定ターゲットは必須です"),
  desiredEffect: z
    .array(
      z.enum([
        "認知拡大",
        "資料請求",
        "LINE登録",
        "サービス申し込み",
        "記憶に残るインパクト重視",
        "その他"
      ])
    )
    .min(1, "狙いたい効果を1つ以上選択してください"),
  customDesiredEffect: z.string().optional(), // "その他"選択時の記入欄

  // 4. デザインイメージ
  designAtmosphere: z
    .array(
      z.enum([
        "高級感",
        "ポップ",
        "シンプル",
        "かわいい",
        "信頼感",
        "スタイリッシュ",
        "女性向け",
        "その他"
      ])
    )
    .min(1, "雰囲気を1つ以上選択してください"),
  customDesignAtmosphere: z.string().optional(), // "その他"選択時の記入欄
  colorPreferences: z.string().optional(), // 希望色味／NGカラー
  logoPhotos: z.array(z.string()).optional(), // ロゴ・写真素材のアップロード
  referenceBanners: z.array(z.string()).optional(), // 参考バナーのアップロード
  referenceBannerUrls: z.string().optional(), // 参考バナーのURL

  // 5. 納期・希望スケジュール
  desiredDeliveryDate: z.string().optional(), // 希望納品日
  intermediateCheckTiming: z.string().optional(), // 中間チェック希望タイミング

  // 同意項目（すべて必須）
  agreeModificationLimit: z.literal(true, {
    message: "修正回数制限に同意してください"
  }),
  agreeDesignChangePolicy: z.literal(true, {
    message: "デザイン構成変更に関する注意事項に同意してください"
  }),
  agreeMaterialQuality: z.literal(true, {
    message: "素材品質による影響に同意してください"
  }),
  agreeNoEffectGuarantee: z.literal(true, {
    message: "広告効果の保証に関する注意事項に同意してください"
  })
});

const instagramSchema = baseSchema.extend({
  type: z.literal("Instagram投稿"),

  // 1. 投稿の目的・タイプ
  postFormats: z
    .array(
      z.enum([
        "フィード画像（1枚）",
        "フィード画像（複数スライド）",
        "リール動画（15秒〜60秒）",
        "ストーリーズ",
        "その他"
      ])
    )
    .min(1, "投稿形式を1つ以上選択してください"),
  customPostFormat: z.string().optional(),

  postPurposes: z
    .array(
      z.enum([
        "認知拡大",
        "LINE登録促進",
        "サービス販売",
        "ブランディング",
        "役立ち情報の発信",
        "採用／求人",
        "来店促進",
        "その他"
      ])
    )
    .min(1, "投稿の目的を1つ以上選択してください"),
  customPostPurpose: z.string().optional(),

  // 2. 投稿内容について
  headline: z.string().optional(),
  bodyText: z.string().optional(),
  hashtags: z.string().optional(),
  tagInfo: z.string().optional(),

  // 3. デザイン・構成
  designStyles: z
    .array(
      z.enum([
        "シンプル",
        "高級感",
        "かわいい",
        "ポップ",
        "情報重視（インフォ系）",
        "スタイリッシュ",
        "女性向け",
        "その他"
      ])
    )
    .min(1, "雰囲気を1つ以上選択してください"),
  customDesignStyle: z.string().optional(),

  colorPreferences: z.string().optional(),
  assets: z.array(z.string()).optional(),
  referencePosts: z.array(z.string()).optional(),

  // 4. リール動画に関する情報（任意）
  reelDuration: z.enum(["〜15秒", "30秒", "60秒", "指定なし"]).optional(),
  subtitles: z
    .enum(["テロップ希望", "ナレーション希望", "両方不要"])
    .optional(),
  musicPreference: z.string().optional(),

  // 5. 納期・スケジュール
  desiredDeadline: z.string().optional(),
  scheduleNotes: z.string().optional(),

  // 同意項目（全て必須）
  agreeModificationLimit: z.literal(true, {
    message: "修正は原則2回まで無料に同意してください"
  }),
  agreeMaterialQuality: z.literal(true, {
    message: "素材の状態による仕上がり差に同意してください"
  }),
  agreeApprovalPolicy: z.literal(true, {
    message: "事前チェック後の修正対応制限に同意してください"
  }),
  agreeEffectDisclaimer: z.literal(true, {
    message: "効果保証不可に同意してください"
  })
});

const seoArticleSchema = baseSchema.extend({
  type: z.literal("SEO記事作成"),

  // 1. 基本情報
  publicationTarget: z.string().optional(), // 記事の掲載先（URLまたは媒体名）
  wordCountDescription: z.string().optional(), // 希望文字数（例：2,000文字前後）

  deliveryFormat: z
    .array(
      z.enum([
        "Wordファイル",
        "Googleドキュメント",
        "テキストファイル（.txt）",
        "CMSに直接入稿（WordPressなど）"
      ])
    )
    .min(1, "納品形式を1つ以上選択してください"),

  // 2. SEO対策に関する情報
  mainKeyword: z.string().min(1, "メインキーワードは必須です"),
  subKeywords: z.array(z.string()).optional(),

  searchIntents: z
    .array(
      z.enum([
        "情報提供",
        "比較・検討",
        "問題解決",
        "購入・申し込み誘導",
        "その他"
      ])
    )
    .min(1, "検索意図を1つ以上選択してください"),
  customSearchIntent: z.string().optional(),

  targetReader: z.string().optional(),

  // 3. 記事の構成・方向性
  desiredStructure: z.string().optional(),
  referenceArticles: z.array(z.string()).optional(),

  // 4. トーン・文体について
  tones: z
    .array(
      z.enum([
        "丁寧・信頼感重視",
        "砕けた口調で読みやすく",
        "専門的・論文調",
        "セールス寄り",
        "初心者向けに優しく",
        "その他"
      ])
    )
    .min(1, "記事のトーンを1つ以上選択してください"),
  customTone: z.string().optional(),

  sentenceStyle: z
    .enum(["です・ます調", "だ・である調", "指定なし"])
    .optional(),

  callToAction: z.string().optional(),

  // 5. 納期とスケジュール
  desiredDeadline: z.string().optional(),
  firstDraftCheckDate: z.string().optional(),

  // 同意項目（全て必須）
  agreeModificationLimit: z.literal(true, {
    message: "修正は原則1回まで無料に同意してください"
  }),
  agreeSeoDisclaimer: z.literal(true, {
    message: "SEO順位保証不可に同意してください"
  }),
  agreeSearchIntentClarification: z.literal(true, {
    message: "検索意図の明確化に同意してください"
  }),
  agreeInitialProofResponsibility: z.literal(true, {
    message: "初稿時の誤字脱字確認責任に同意してください"
  })
});

const thumbnailSchema = baseSchema.extend({
  type: z.literal("サムネイル作成"),

  // 1. 基本情報
  platforms: z
    .array(
      z.enum([
        "YouTube",
        "Instagramリール（カバー）",
        "TikTok",
        "LINE VOOM",
        "その他"
      ])
    )
    .min(1, "使用媒体を1つ以上選択してください"),
  customPlatform: z.string().optional(),

  videoTitle: z.string().optional(),

  imageSizes: z
    .array(
      z.enum([
        "横型（1280×720など）",
        "正方形（1080×1080）",
        "縦型（1080×1920）",
        "指定サイズ"
      ])
    )
    .min(1, "希望する画像サイズを1つ以上選択してください"),
  customSize: z.string().optional(),

  // 2. デザインに関して
  headlineText: z.string().optional(),

  designTones: z
    .array(
      z.enum([
        "信頼感・高級感",
        "ポップ・親しみやすい",
        "エモーショナル・感動系",
        "怖い・煽り系",
        "笑える・バズ狙い",
        "その他"
      ])
    )
    .min(1, "イメージ・トーンを1つ以上選択してください"),
  customDesignTone: z.string().optional(),

  colorPreferences: z.string().optional(),

  assets: z.array(z.string()).optional(),

  referenceThumbnails: z.array(z.string()).optional(),

  // 3. 修正と納期
  desiredDeadline: z.string().optional(),

  intermediateCheck: z
    .enum(["初稿提出時に確認したい", "完成品だけでOK"])
    .optional(),

  // 同意項目（全て必須）
  agreeModificationLimit: z.literal(true, {
    message: "修正は原則2回まで無料に同意してください"
  }),
  agreeCopyrightPolicy: z.literal(true, {
    message: "著作権に関わる素材の使用不可に同意してください"
  }),
  agreeEffectDisclaimer: z.literal(true, {
    message: "効果保証不可に同意してください"
  }),
  agreeCreativeDirection: z.literal(true, {
    message: "「おまかせ」の場合デザイン一任に同意してください"
  })
});

const lineSetupSchema = baseSchema.extend({
  type: z.literal("LINE構築"),

  // 1. 基本情報
  lineType: z.enum(["LINE公式アカウント（通常）", "LINEミニアプリ", "その他"]),
  customLineType: z.string().optional(),

  objectives: z
    .array(
      z.enum([
        "自動返信による問い合わせ対応",
        "LINEからの予約／購入導線",
        "ステップ配信による教育・販売",
        "リッチメニューを活用したサービス案内",
        "友だち登録キャンペーン／クーポン配布",
        "顧客管理・CRM強化",
        "その他"
      ])
    )
    .min(1, "目的を1つ以上選択してください"),
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
  agreeModificationLimit: z.literal(true, {
    message: "修正は原則2回まで無料に同意してください"
  }),
  agreeMaterialDelay: z.literal(true, {
    message: "未提出の素材による納期影響に同意してください"
  }),
  agreeLineSpecChanges: z.literal(true, {
    message: "LINE仕様変更による影響に同意してください"
  }),
  agreeEffectDisclaimer: z.literal(true, {
    message: "構築による成果保証不可に同意してください"
  })
});

const scriptSchema = baseSchema.extend({
  type: z.literal("台本作成"),

  // 1. 基本情報
  platforms: z
    .array(
      z.enum([
        "TikTok",
        "Instagramリール",
        "YouTubeショート／本編",
        "LINE VOOM",
        "その他"
      ])
    )
    .min(1, "使用媒体を1つ以上選択してください"),
  customPlatform: z.string().optional(),

  videoDuration: z
    .array(z.enum(["15秒以内", "30秒前後", "60秒以内", "3分以内", "指定なし"]))
    .min(1, "想定尺を1つ以上選択してください"),

  // 2. 動画の目的・ターゲット
  videoGoals: z
    .array(
      z.enum([
        "認知拡大",
        "サービス・商品購入",
        "LINE登録",
        "問い合わせ誘導",
        "信頼獲得",
        "エンタメ・共感",
        "ノウハウ提供",
        "その他"
      ])
    )
    .min(1, "目的を1つ以上選択してください"),
  customVideoGoal: z.string().optional(),

  targetAudience: z.string().min(1, "想定ターゲットは必須です"),
  desiredImpression: z.string().min(1, "動画視聴者に与えたい印象は必須です"),

  // 3. 台本のスタイル・演出について
  scriptStyles: z
    .array(
      z.enum([
        "会話形式（対話型）",
        "独白形式（ナレーション・解説）",
        "モノローグ＋字幕中心",
        "お客様の声（架空インタビュー）",
        "その他"
      ])
    )
    .min(1, "台本形式を1つ以上選択してください"),
  customScriptStyle: z.string().optional(),

  tonePreferences: z
    .array(
      z.enum([
        "砕けた・フレンドリー",
        "信頼感・誠実系",
        "ストーリー仕立て（感動／ビフォーアフター）",
        "ウケ狙い・ユーモラス",
        "セールス・クロージング重視",
        "その他"
      ])
    )
    .min(1, "トーン・雰囲気を1つ以上選択してください"),
  customTonePreference: z.string().optional(),

  // 4. 構成要素・盛り込みたい要点
  keyElements: z
    .array(
      z.enum([
        "問題提起 → 解決（フック重視）",
        "お客様の声・事例紹介",
        "商品／サービスの特徴・強み",
        "比較／他社との違い",
        "専門性・実績の提示",
        "CTA（LINE登録・資料請求・申し込みなど）"
      ])
    )
    .min(1, "盛り込みたい要素を1つ以上選択してください"),

  requiredKeywords: z.string().optional(),
  ngKeywords: z.string().optional(),

  // 5. 参考資料・過去投稿
  referencePosts: z.array(z.string()).optional(),
  pastExamples: z.array(z.string()).optional(),

  // 6. 納期・その他希望
  desiredDeadline: z.string().optional(),
  otherRequests: z.string().optional(),

  // 同意項目（全て必須）
  agreeDirectionChangePolicy: z.literal(true, {
    message: "構成・表現の方向性変更に関する注意事項に同意してください"
  }),
  agreeModificationLimit: z.literal(true, {
    message: "修正は原則1回まで無料に同意してください"
  }),
  agreeEffectDisclaimer: z.literal(true, {
    message: "効果保証不可に同意してください"
  }),
  agreeMaterialDelay: z.literal(true, {
    message: "素材不足や方向性不備による納期遅延に同意してください"
  })
});

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
