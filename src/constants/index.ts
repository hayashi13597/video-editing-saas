import { ColumnConfig, TableRowData } from "@/features/dashboard/Table";

const phoneRegex = /^\+[1-9][0-9]{1,14}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-])[^\s].{7,255}[^\s]$/;

export { phoneRegex, passwordRegex };

export const filterOptions = [
  { label: "すべて", value: "" },
  { label: "募集中", value: "OPEN" },
  { label: "編集中", value: "ASSIGNED" },
  { label: "進行中", value: "REVIEW" },
  { label: "完了", value: "COMPLETED" }
];

export const dummyDashboardTableData: TableRowData[] = [
  {
    id: "1",
    status: "OPEN",
    title: "企業紹介動画制作プロジェクト",
    applicant: "山田太郎",
    requestDate: "2025/11/01",
    deadline: "2025/12/15",
    points: 100000,
    href: "/projects/1"
  },
  {
    id: "2",
    status: "REVIEW",
    title: "プロダクト紹介ビデオ",
    applicant: "佐藤花子",
    requestDate: "2025/10/20",
    deadline: "2025/11/30",
    points: 75000,
    href: "/projects/2"
  },
  {
    id: "3",
    status: "COMPLETED",
    title: "ブランドロゴデザイン",
    applicant: "鈴木一郎",
    requestDate: "2025/09/15",
    deadline: "2025/10/10",
    points: 50000,
    href: "/projects/3"
  },
  {
    id: "4",
    status: "OPEN",
    title: "ウェブサイトリニューアル",
    applicant: "田中誠",
    requestDate: "2025/11/05",
    deadline: "2025/12/20",
    points: 120000,
    href: "/projects/4"
  },
  {
    id: "5",
    status: "REVIEW",
    title: "マーケティング資料作成",
    applicant: "伊藤美咲",
    requestDate: "2025/10/25",
    deadline: "2025/11/15",
    points: 65000,
    href: "/projects/5"
  },
  {
    id: "6",
    status: "COMPLETED",
    title: "SNSキャンペーン企画",
    applicant: "高橋健太",
    requestDate: "2025/09/30",
    deadline: "2025/10/30",
    points: 80000,
    href: "/projects/6"
  },
  {
    id: "7",
    status: "OPEN",
    title: "新製品ローンチイベント",
    applicant: "渡辺裕子",
    requestDate: "2025/11/10",
    deadline: "2025/12/25",
    points: 150000,
    href: "/projects/7"
  },
  {
    id: "8",
    status: "REVIEW",
    title: "オンライン研修動画制作",
    applicant: "中村大輔",
    requestDate: "2025/10/15",
    deadline: "2025/11/20",
    points: 90000,
    href: "/projects/8"
  },
  {
    id: "9",
    status: "COMPLETED",
    title: "顧客インタビュー撮影",
    applicant: "小林直子",
    requestDate: "2025/09/20",
    deadline: "2025/10/15",
    points: 70000,
    href: "/projects/9"
  },
  {
    id: "10",
    status: "REVIEW",
    title: "年次報告書デザイン",
    applicant: "加藤洋平",
    requestDate: "2025/10/10",
    deadline: "2025/11/25",
    points: 85000,
    href: "/projects/10"
  },
  {
    id: "11",
    status: "OPEN",
    title: "アプリ紹介アニメーション",
    applicant: "吉田明日香",
    requestDate: "2025/11/15",
    deadline: "2025/12/30",
    points: 110000,
    href: "/projects/11"
  }
];

export const dummyListPageData: TableRowData[] = [
  {
    id: "1",
    image: "/images/placeholder.png",
    title: "企業紹介動画",
    freelancer: "山田太郎",
    startDate: "2025/11/1",
    endDate: "2025/12/15",
    points: 100000,
    rating: 3.5,
    status: "COMPLETED"
  },
  {
    id: "2",
    image: "/images/placeholder.png",
    title: "ウェブサイト制作",
    freelancer: "佐藤花子",
    startDate: "2025/10/15",
    endDate: "2025/11/30",
    points: 150000,
    rating: 4.2,
    status: "REVIEW"
  },
  {
    id: "3",
    image: "/images/placeholder.png",
    title: "ロゴデザイン",
    freelancer: "田中一郎",
    startDate: "2025/12/1",
    endDate: "2025/12/20",
    points: 50000,
    rating: 4.8,
    status: "ASSIGNED"
  },
  {
    id: "4",
    image: "/images/placeholder.png",
    title: "SNSマーケティング",
    freelancer: "鈴木美咲",
    startDate: "2025/11/10",
    endDate: "2026/1/10",
    points: 200000,
    rating: 3.9,
    status: "REVIEW"
  },
  {
    id: "5",
    image: "/images/placeholder.png",
    title: "モバイルアプリ開発",
    freelancer: "高橋健太",
    startDate: "2025/9/1",
    endDate: "2025/12/31",
    points: 300000,
    rating: 4.5,
    status: "COMPLETED"
  },
  {
    id: "6",
    image: "/images/placeholder.png",
    title: "SEOコンサルティング",
    freelancer: "中村彩",
    startDate: "2025/10/1",
    endDate: "2025/11/15",
    points: 120000,
    rating: 4.0,
    status: "ASSIGNED"
  },
  {
    id: "7",
    image: "/images/placeholder.png",
    title: "プロダクト写真撮影",
    freelancer: "小林悠斗",
    startDate: "2025/11/20",
    endDate: "2025/12/5",
    points: 80000,
    rating: 3.7,
    status: "REVIEW"
  },
  {
    id: "8",
    image: "/images/placeholder.png",
    title: "コンテンツライティング",
    freelancer: "松本玲奈",
    startDate: "2025/10/20",
    endDate: "2025/11/25",
    points: 60000,
    rating: 4.3,
    status: "COMPLETED"
  },
  {
    id: "9",
    image: "/images/placeholder.png",
    title: "UI/UXデザイン",
    freelancer: "藤田翔",
    startDate: "2025/11/5",
    endDate: "2025/12/10",
    points: 180000,
    rating: 4.1,
    status: "ASSIGNED"
  },
  {
    id: "10",
    image: "/images/placeholder.png",
    title: "動画編集",
    freelancer: "岡本真由",
    startDate: "2025/12/1",
    endDate: "2025/12/15",
    points: 90000,
    rating: 3.8,
    status: "REVIEW"
  },
  {
    id: "11",
    image: "/images/placeholder.png",
    title: "翻訳サービス",
    freelancer: "石川陽菜",
    startDate: "2025/10/10",
    endDate: "2025/11/10",
    points: 70000,
    rating: 4.6,
    status: "COMPLETED"
  },
  {
    id: "12",
    image: "/images/placeholder.png",
    title: "グラフィックデザイン",
    freelancer: "木村健",
    startDate: "2025/11/15",
    endDate: "2025/12/1",
    points: 110000,
    rating: 4.4,
    status: "ASSIGNED"
  },
  {
    id: "13",
    image: "/images/placeholder.png",
    title: "データ分析",
    freelancer: "林優香",
    startDate: "2025/10/25",
    endDate: "2025/12/5",
    points: 250000,
    rating: 4.7,
    status: "REVIEW"
  },
  {
    id: "14",
    image: "/images/placeholder.png",
    title: "広告キャンペーン",
    freelancer: "山本直樹",
    startDate: "2025/11/1",
    endDate: "2025/12/31",
    points: 220000,
    rating: 3.6,
    status: "ASSIGNED"
  },
  {
    id: "15",
    image: "/images/placeholder.png",
    title: "イラスト制作",
    freelancer: "佐々木葵",
    startDate: "2025/12/5",
    endDate: "2025/12/20",
    points: 85000,
    rating: 4.9,
    status: "COMPLETED"
  }
];

export const columnsListPageData: ColumnConfig[] = [
  { key: "image", label: "" },
  { key: "title", label: "案件名" },
  { key: "freelancer", label: "フリーランス名" },
  { key: "startDate", label: "依頼日" },
  { key: "endDate", label: "納期" },
  { key: "points", label: "ポイント" },
  { key: "rating", label: "レベル" },
  { key: "status", label: "ステータス" },
  { key: "action", label: "　" }
];
