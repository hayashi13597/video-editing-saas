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
  PURPOSE_OPTIONS
};
