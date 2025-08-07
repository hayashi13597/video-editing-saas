const SPECIALIZATION_OPTIONS = [
  { value: "video_editing", label: "動画編集" },
  { value: "motion_graphics", label: "モーショングラフィックス" },
  { value: "color_grading", label: "カラーグレーディング" },
  { value: "sound_design", label: "サウンドデザイン" },
  { value: "vfx", label: "VFX" }
];

const SOFTWARE_OPTIONS = [
  { label: "Adobe Premiere Pro", value: "premiere" },
  { label: "Final Cut Pro", value: "finalcut" },
  { label: "DaVinci Resolve", value: "davinci" },
  { label: "After Effects", value: "aftereffects" },
  { label: "Adobe Audition", value: "audition" },
  { label: "Logic Pro", value: "logic" },
  { label: "Pro Tools", value: "protools" }
];

const SKILLS_OPTIONS = [
  { label: "動画編集", value: "video_editing" },
  { label: "カラーグレーディング", value: "color_grading" },
  { label: "モーショングラフィックス", value: "motion_graphics" },
  { label: "3Dアニメーション", value: "3d_animation" },
  { label: "サウンドデザイン", value: "sound_design" },
  { label: "VFXコンポジット", value: "vfx_compositing" },
  { label: "タイトルデザイン", value: "title_design" },
  { label: "グリーンスクリーン", value: "green_screen" }
];

const INDUSTRY_OPTIONS = [
  { value: "it", label: "IT" },
  { value: "finance", label: "金融" },
  { value: "healthcare", label: "医療" },
  { value: "education", label: "教育" },
  { value: "entertainment", label: "エンターテインメント" },
  { value: "retail", label: "小売" },
  { value: "manufacturing", label: "製造業" }
];

const TYPE_OPTIONS = [
  { label: "請求書", value: "請求書" },
  { label: "架電", value: "架電" },
  { label: "受電", value: "受電" },
  { label: "名刺作成", value: "名刺作成" },
  { label: "チラシ作成", value: "チラシ作成" },
  {
    label: "営業資料作成（DYMにヒアリング後追加）",
    value: "営業資料作成（DYMにヒアリング後追加）"
  },
  { label: "LP修正", value: "LP修正" },
  { label: "広告バナー", value: "広告バナー" },
  { label: "デザイン", value: "デザイン" },
  { label: "インスタグラム投稿作成", value: "インスタグラム投稿作成" },
  { label: "SEO記事", value: "SEO記事" },
  { label: "動画編集", value: "動画編集" },
  { label: "サムネイル制作", value: "サムネイル制作" }
];

// one month select options for deadline
const ONE_MONTH_OPTIONS = Array.from({ length: 31 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return {
    label: date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }),
    value: date.toISOString().split("T")[0]
  };
});

// Form create project
const PLATFORMS = [
  "TikTok",
  "Instagramリール",
  "YouTubeショート／本編",
  "LINE VOOM",
  "その他"
] as const;

const VIDEO_DURATION = [
  "15秒以内",
  "30秒前後",
  "60秒以内",
  "3分以内",
  "指定なし"
] as const;

const OBJECTIVES = [
  "認知拡大",
  "サービス・商品購入",
  "LINE登録",
  "問い合わせ誘導",
  "信頼獲得",
  "エンタメ・共感",
  "ノウハウ提供",
  "その他"
] as const;

const SCRIPT_FORMATS = [
  "会話形式（対話型）",
  "独白形式（ナレーション・解説）",
  "モノローグ＋字幕中心",
  "お客様の声（架空インタビュー）",
  "その他"
] as const;

const TONES = [
  "砕けた・フレンドリー",
  "信頼感・誠実系",
  "ストーリー仕立て（感動／ビフォーアフター）",
  "ウケ狙い・ユーモラス",
  "セールス・クロージング重視",
  "その他"
] as const;

const ELEMENTS = [
  "問題提起 → 解決（フック重視）",
  "お客様の声・事例紹介",
  "商品／サービスの特徴・強み",
  "比較／他社との違い",
  "専門性・実績の提示",
  "CTA（LINE登録・資料請求・申し込みなど）"
] as const;

const MODIFICATION_PURPOSE_OPTIONS = [
  {
    label: "コンバージョン率改善（CVR）",
    value: "コンバージョン率改善（CVR）"
  },
  {
    label: "情報の最新化（価格・期間など）",
    value: "情報の最新化（価格・期間など）"
  },
  { label: "デザインの印象を変えたい", value: "デザインの印象を変えたい" },
  { label: "スマホ対応強化／UI改善", value: "スマホ対応強化／UI改善" },
  { label: "その他（記入欄）", value: "その他" }
];

const SIZE_OPTIONS = [
  { label: "A4（一般的）", value: "A4" },
  { label: "A5", value: "A3" },
  { label: "B5", value: "B4" },
  { label: "その他（記入欄あり）", value: "その他" }
];

const ATMOSPHERE_OPTIONS = [
  { label: "高級感", value: "高級感" },
  { label: "ナチュラル", value: "ナチュラル" },
  { label: "ポップ", value: "ポップ" },
  { label: "シンプル", value: "シンプル" },
  { label: "女性向け", value: "女性向け" },
  { label: "子ども向け", value: "子ども向け" },
  { label: "信頼感", value: "信頼感" },
  { label: "その他（記入欄あり）", value: "その他" }
];

const PURPOSE_OPTIONS = [
  { label: "集客（新規）", value: "集客（新規）" },
  { label: "来店促進", value: "来店促進" },
  { label: "認知拡大", value: "認知拡大" },
  { label: "採用", value: "採用" },
  { label: "イベント告知", value: "イベント告知" },
  { label: "その他", value: "その他" }
];

const VIDEO_USAGE_OPTIONS = [
  { label: "TikTok", value: "TikTok" },
  { label: "Instagramリール", value: "Instagramリール" },
  { label: "YouTubeショート／本編", value: "YouTubeショート／本編" },
  { label: "PR用動画（企業／店舗）", value: "PR用動画（企業／店舗）" },
  { label: "セミナー動画", value: "セミナー動画" },
  { label: "その他", value: "その他" }
]

const VIDEO_DURATION_OPTIONS = [
  { label: "15秒以内", value: "15秒以内" },
  { label: "30秒以内", value: "30秒以内" },
  { label: "1分以内", value: "1分以内" },
  { label: "3分以内", value: "3分以内" },
  { label: "指定なし", value: "指定なし" }
]

const VIDEO_ASPECT_RATIO_OPTIONS = [
  { label: "縦（9:16）", value: "縦（9:16）" },
  { label: "横（16:9）", value: "横（16:9）" },
  { label: "正方形（1:1）", value: "正方形（1:1）" }
]

const EDITING_STYLE_OPTIONS = [
  { label: "ポップ", value: "ポップ" },
  { label: "シネマティック", value: "シネマティック" },
  { label: "ビジネス寄り", value: "ビジネス寄り" },
  { label: "テロップ多め", value: "テロップ多め" },
  { label: "インパクト重視", value: "インパクト重視" },
  { label: "かわいい・やさしい", value: "かわいい・やさしい" },
  { label: "その他（記入欄）", value: "その他" }
]

const SUBTITLE_STYLE_OPTIONS = [
  { label: "セリフすべて表示", value: "セリフすべて表示" },
  { label: "要点のみ表示", value: "要点のみ表示" },
  { label: "テロップ不要", value: "テロップ不要" }
]

const DESIGN_STYLE_OPTIONS = [
  { label: "シンプル", value: "シンプル" },
  { label: "高級感", value: "高級感" },
  { label: "ナチュラル", value: "ナチュラル" },
  { label: "信頼感", value: "信頼感" },
  { label: "かわいい", value: "かわいい" },
  { label: "スタイリッシュ", value: "スタイリッシュ" },
  { label: "カラフル", value: "カラフル" },
  { label: "モノトーン", value: "モノトーン" },
  { label: "その他（自由記入）", value: "その他" }
]

const BANNER_TYPE_OPTIONS = [
  { label: "Instagram広告用", value: "Instagram広告用" },
  { label: "Facebook広告用", value: "Facebook広告用" },
  { label: "Googleリスティング広告", value: "Googleリスティング広告" },
  { label: "LINE広告", value: "LINE広告" },
  { label: "その他（記入欄）", value: "その他" }
]

const DESIRE_EFFECT_OPTIONS = [
  { label: "認知拡大", value: "認知拡大" },
  { label: "資料請求", value: "資料請求" },
  { label: "LINE登録", value: "LINE登録" },
  { label: "サービス申し込み", value: "サービス申し込み" },
  { label: "記憶に残るインパクト重視", value: "記憶に残るインパクト重視" },
  { label: "その他（記入欄）", value: "その他" }
]

const DESIGN_ATMOSPHERE_OPTIONS = [
  { label: "高級感", value: "高級感" },
  { label: "ポップ", value: "ポップ" },
  { label: "シンプル", value: "シンプル" },
  { label: "かわいい", value: "かわいい" },
  { label: "信頼感", value: "信頼感" },
  { label: "スタイリッシュ", value: "スタイリッシュ" },
  { label: "女性向け", value: "女性向け" },
  { label: "その他（自由記入）", value: "その他" }
]

const POST_FORMATS_OPTIONS = [
  { label: "フィード画像（1枚）", value: "フィード画像（1枚）" },
  { label: "フィード画像（複数スライド）", value: "フィード画像（複数スライド）" },
  { label: "リール動画（15秒〜60秒）", value: "リール動画（15秒〜60秒）" },
  { label: "ストーリーズ", value: "ストーリーズ" },
  { label: "その他（記入欄）", value: "その他" }
]

const POST_PURPOSES_OPTIONS = [
  { label: "認知拡大", value: "認知拡大" },
  { label: "LINE登録促進", value: "LINE登録促進" },
  { label: "サービス販売", value: "サービス販売" },
  { label: "ブランディング", value: "ブランディング" },
  { label: "役立ち情報の発信", value: "役立ち情報の発信" },
  { label: "採用／求人", value: "採用／求人" },
  { label: "来店促進", value: "来店促進" },
  { label: "その他（記入欄）", value: "その他" }
]

const REEL_DURATION_OPTIONS = [
  { label: "〜15秒", value: "〜15秒" },
  { label: "30秒", value: "30秒" },
  { label: "60秒", value: "60秒" },
  { label: "指定なし", value: "指定なし" }
];

const SUBTITLES_OPTIONS = [
  { label: "テロップ希望", value: "テロップ希望" },
  { label: "ナレーション希望", value: "ナレーション希望" },
  { label: "両方不要", value: "両方不要" }
]

const DELIVERY_FORMAT_OPTIONS = [
  { label: "Wordファイル", value: "Wordファイル" },
  { label: "Googleドキュメント", value: "Googleドキュメント" },
  { label: "テキストファイル（.txt）", value: "テキストファイル（.txt）" },
  { label: "CMSに直接入稿（WordPressなど）", value: "CMSに直接入稿（WordPressなど）" }
]

const SEARCH_INTENT_OPTIONS = [
  { label: "情報提供", value: "情報提供" },
  { label: "比較・検討", value: "比較・検討" },
  { label: "問題解決", value: "問題解決" },
  { label: "購入・申し込み誘導", value: "購入・申し込み誘導" },
  { label: "その他（自由記入）", value: "その他" }
]

const TONES_OPTIONS = [
  { label: "丁寧・信頼感重視", value: "丁寧・信頼感重視" },
  { label: "砕けた口調で読みやすく", value: "砕けた口調で読みやすく" },
  { label: "専門的・論文調", value: "専門的・論文調" },
  { label: "セールス寄り", value: "セールス寄り" },
  { label: "初心者向けに優しく", value: "初心者向けに優しく" },
  { label: "その他（記入欄）", value: "その他" }
]

const SENTENCE_STYLE_OPTIONS = [
  { label: "「です・ます」調", value: "です・ます" },
  { label: "「だ・である」調", value: "だ・である" },
  { label: "指定なし", value: "指定なし" }
]

const PLATFORM_OPTIONS = [
  { label: "YouTube", value: "YouTube" },
  { label: "Instagramリール（カバー）", value: "Instagramリール（カバー）" },
  { label: "TikTok", value: "TikTok" },
  { label: "LINE VOOM", value: "LINE VOOM" },
  { label: "その他", value: "その他" }
]

const IMAGE_SIZES_OPTIONS = [
  { label: "横型（1280×720など）", value: "横型（1280×720など）" },
  { label: "正方形（1080×1080）", value: "正方形（1080×1080）" },
  { label: "縦型（1080×1920）", value: "縦型（1080×1920）" },
  { label: "指定サイズ", value: "指定サイズ" }
]

const DESIGN_TONES_OPTIONS = [
  { label: "信頼感・高級感", value: "信頼感・高級感" },
  { label: "ポップ・親しみやすい", value: "ポップ・親しみやすい" },
  { label: "エモーショナル・感動系", value: "エモーショナル・感動系" },
  { label: "怖い・煽り系", value: "怖い・煽り系" },
  { label: "笑える・バズ狙い", value: "笑える・バズ狙い" },
  { label: "その他", value: "その他" }
]

const LINE_TYPE_OPTIONS = [
  { label: "LINE公式アカウント（通常）", value: "LINE公式アカウント（通常）" },
  { label: "LINEミニアプリ", value: "LINEミニアプリ" },
  { label: "その他", value: "その他" }
]

const OBJECTIVES_OPTIONS = [
  { label: "自動返信による問い合わせ対応", value: "自動返信による問い合わせ対応" },
  { label: "LINEからの予約／購入導線", value: "LINEからの予約／購入導線" },
  { label: "ステップ配信による教育・販売", value: "ステップ配信による教育・販売" },
  { label: "リッチメニューを活用したサービス案内", value: "リッチメニューを活用したサービス案内" },
  { label: "友だち登録キャンペーン／クーポン配布", value: "友だち登録キャンペーン／クーポン配布" },
  { label: "顧客管理・CRM強化", value: "顧客管理・CRM強化" },
  { label: "その他", value: "その他" }
]

const DESIGN_PREFERENCE_OPTIONS = [
  { label: "おまかせ（トンマナだけ伝える）", value: "おまかせ" },
  { label: "自社ロゴ・写真あり（添付してください）", value: "自社ロゴ・写真あり" },
  { label: "カラー／雰囲気指定あり", value: "カラー／雰囲気指定あり" }
]

const SCRIPT_PLATFORM_OPTIONS = [
  { label: "TikTok", value: "TikTok" },
  { label: "Instagramリール", value: "Instagramリール" },
  { label: "YouTubeショート／本編", value: "YouTubeショート／本編" },
  { label: "LINE VOOM", value: "LINE VOOM" },
  { label: "その他", value: "その他" }
]

const VIDEO_GLOBAL_OPTIONS = [
  { label: "認知拡大", value: "認知拡大" },
  { label: "サービス・商品購入", value: "サービス・商品購入" },
  { label: "LINE登録", value: "LINE登録" },
  { label: "問い合わせ誘導", value: "問い合わせ誘導" },
  { label: "信頼獲得", value: "信頼獲得" },
  { label: "エンタメ・共感", value: "エンタメ・共感" },
  { label: "ノウハウ提供", value: "ノウハウ提供" },
  { label: "その他", value: "その他" }
]

const SCRIPT_STYLE_OPTIONS = [
  { label: "会話形式（対話型）", value: "会話形式（対話型）" },
  { label: "独白形式（ナレーション・解説）", value: "独白形式（ナレーション・解説）" },
  { label: "モノローグ＋字幕中心", value: "モノローグ＋字幕中心" },
  { label: "お客様の声（架空インタビュー）", value: "お客様の声（架空インタビュー）" },
  { label: "その他　", value: "その他　" }
]

const TONE_PREFERENCE_OPTIONS = [
  { label: "砕けた・フレンドリー", value: "砕けた・フレンドリー" },
  { label: "信頼感・誠実系", value: "信頼感・誠実系" },
  { label: "ストーリー仕立て（感動／ビフォーアフター）", value: "ストーリー仕立て（感動／ビフォーアフター）" },
  { label: "ウケ狙い・ユーモラス", value: "ウケ狙い・ユーモラス" },
  { label: "セールス・クロージング重視", value: "セールス・クロージング重視" },
  { label: "その他", value: "その他" }
]

const KEY_ELEMENTS_OPTIONS = [
  { label: "問題提起 → 解決（フック重視）", value: "問題提起 → 解決（フック重視）" },
  { label: "お客様の声・事例紹介", value: "お客様の声・事例紹介" },
  { label: "商品／サービスの特徴・強み", value: "商品／サービスの特徴・強み" },
  { label: "比較／他社との違い", value: "比較／他社との違い" },
  { label: "専門性・実績の提示", value: "専門性・実績の提示" },
  { label: "CTA（LINE登録・資料請求・申し込みなど）", value: "CTA（LINE登録・資料請求・申し込みなど）" }
]

export {
  SPECIALIZATION_OPTIONS,
  SOFTWARE_OPTIONS,
  SKILLS_OPTIONS,
  INDUSTRY_OPTIONS,
  TYPE_OPTIONS,
  PLATFORMS,
  VIDEO_DURATION,
  OBJECTIVES,
  SCRIPT_FORMATS,
  TONES,
  ELEMENTS,
  ONE_MONTH_OPTIONS,
  MODIFICATION_PURPOSE_OPTIONS,
  SIZE_OPTIONS,
  ATMOSPHERE_OPTIONS,
  PURPOSE_OPTIONS,
  VIDEO_USAGE_OPTIONS,
  VIDEO_DURATION_OPTIONS,
  VIDEO_ASPECT_RATIO_OPTIONS,
  EDITING_STYLE_OPTIONS,
  SUBTITLE_STYLE_OPTIONS,
  DESIGN_STYLE_OPTIONS,
  BANNER_TYPE_OPTIONS,
  DESIRE_EFFECT_OPTIONS,
  DESIGN_ATMOSPHERE_OPTIONS,
  POST_FORMATS_OPTIONS,
  POST_PURPOSES_OPTIONS,
  REEL_DURATION_OPTIONS,
  SUBTITLES_OPTIONS,
  DELIVERY_FORMAT_OPTIONS,
  SEARCH_INTENT_OPTIONS,
  TONES_OPTIONS,
  SENTENCE_STYLE_OPTIONS,
  PLATFORM_OPTIONS,
  IMAGE_SIZES_OPTIONS,
  DESIGN_TONES_OPTIONS,
  LINE_TYPE_OPTIONS,
  OBJECTIVES_OPTIONS,
  SCRIPT_PLATFORM_OPTIONS,
  DESIGN_PREFERENCE_OPTIONS,
  VIDEO_GLOBAL_OPTIONS,
  SCRIPT_STYLE_OPTIONS,
  TONE_PREFERENCE_OPTIONS,
  KEY_ELEMENTS_OPTIONS
};
