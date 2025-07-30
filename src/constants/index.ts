const phoneRegex = /^\+[1-9][0-9]{1,14}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-])[^\s].{7,255}[^\s]$/;

export { phoneRegex, passwordRegex };

export const dummyDashboardTableData = [
  {
    id: "1",
    status: { label: "募集中" },
    title: "企業紹介動画制作プロジェクト",
    applicant: "山田太郎",
    requestDate: "2025/11/01",
    deadline: "2025/12/15",
    points: "100,000pt",
    href: "/projects/1"
  },
  {
    id: "2",
    status: { label: "進行中" },
    title: "プロダクト紹介ビデオ",
    applicant: "佐藤花子",
    requestDate: "2025/10/20",
    deadline: "2025/11/30",
    points: "75,000pt",
    href: "/projects/2"
  },
  {
    id: "3",
    status: { label: "完了" },
    title: "ブランドロゴデザイン",
    applicant: "鈴木一郎",
    requestDate: "2025/09/15",
    deadline: "2025/10/10",
    points: "50,000pt",
    href: "/projects/3"
  },
  {
    id: "4",
    status: { label: "募集中" },
    title: "ウェブサイトリニューアル",
    applicant: "田中誠",
    requestDate: "2025/11/05",
    deadline: "2025/12/20",
    points: "120,000pt",
    href: "/projects/4"
  },
  {
    id: "5",
    status: { label: "進行中" },
    title: "マーケティング資料作成",
    applicant: "伊藤美咲",
    requestDate: "2025/10/25",
    deadline: "2025/11/15",
    points: "65,000pt",
    href: "/projects/5"
  },
  {
    id: "6",
    status: { label: "完了" },
    title: "SNSキャンペーン企画",
    applicant: "高橋健太",
    requestDate: "2025/09/30",
    deadline: "2025/10/30",
    points: "80,000pt",
    href: "/projects/6"
  },
  {
    id: "7",
    status: { label: "募集中" },
    title: "新製品ローンチイベント",
    applicant: "渡辺裕子",
    requestDate: "2025/11/10",
    deadline: "2025/12/25",
    points: "150,000pt",
    href: "/projects/7"
  },
  {
    id: "8",
    status: { label: "進行中" },
    title: "オンライン研修動画制作",
    applicant: "中村大輔",
    requestDate: "2025/10/15",
    deadline: "2025/11/20",
    points: "90,000pt",
    href: "/projects/8"
  },
  {
    id: "9",
    status: { label: "完了" },
    title: "顧客インタビュー撮影",
    applicant: "小林直子",
    requestDate: "2025/09/20",
    deadline: "2025/10/15",
    points: "70,000pt",
    href: "/projects/9"
  },
  {
    id: "10",
    status: { label: "進行中" },
    title: "年次報告書デザイン",
    applicant: "加藤洋平",
    requestDate: "2025/10/10",
    deadline: "2025/11/25",
    points: "85,000pt",
    href: "/projects/10"
  },
  {
    id: "11",
    status: { label: "募集中" },
    title: "アプリ紹介アニメーション",
    applicant: "吉田明日香",
    requestDate: "2025/11/15",
    deadline: "2025/12/30",
    points: "110,000pt",
    href: "/projects/11"
  }
];
