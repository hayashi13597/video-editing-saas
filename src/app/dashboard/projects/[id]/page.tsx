import { Badge } from "@/components/ui/badge";
import CustomVideo from "@/features/dashboard/CustomVideo";
import HistorySection from "@/features/dashboard/feedback/HistorySection";
import ProgressSection from "@/features/dashboard/projects/details/ProgressSection";

interface ProjectDetailsProps {
  params: Promise<{ id: string }>;
}

const ProjectDetails = async ({ params }: ProjectDetailsProps) => {
  const { id } = await params;

  return (
    <main className="grid grid-cols-[1fr_32%] items-start gap-6">
      <div className="p-6 bg-white rounded-6 shadow-md space-y-10 h-fit">
        <section className="space-y-3">
          <div className="flex-between">
            <div className="space-y-1">
              <h1 className="medium-title">企業紹介のリール動画 {id}</h1>
              <p className="body-text text-gray">株式会社ABC</p>
            </div>
            <Badge className="bg-light-green text-green-main py-1 px-3 body-text">
              Tiktok
            </Badge>
          </div>
          <div className="bg-light-gray">
            <CustomVideo
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              className="max-w-full"
              videoClassName="aspect-video"
            />
          </div>
        </section>

        {/* feedback */}
        <HistorySection className="p-0" />

        {/* AI overview */}
        <section>
          <h3 className="small-title">AIのご提案</h3>
          <p>
            BGMの選定は動画の雰囲気を大きく左右する重要な要素です。より効果的な修正依頼のために、以下のポイントも考慮してみてください。
            1. ポップなBGM選定のヒント
            「ポップ」と一口に言っても幅広いため、具体的にどんな「ポップさ」を求めているかを明確にすると、動画制作者もイメージしやすくなります。
            ターゲット層に響くポップさ:
            若年層向けなら最新のトレンドを取り入れた音源、ビジネス層向けなら軽快で耳障りの良いインストゥルメンタルなど、ターゲットに合わせた「ポップ」を検討しましょう。
            動画の内容との一貫性:
            ポップなBGMであっても、動画のテーマや伝えたいメッセージと乖離しすぎないように注意が必要です。例えば、商品の特徴を説明するパートでは、BGMが主張しすぎず、説明を邪魔しないものが良いでしょう。
            著作権フリー音源の活用:
            企業の動画の場合、著作権の問題は非常に重要です。商用利用可能な著作権フリー音源サイト（例：DOVA-SYNDROME,
            H/MIX
            GALLERYなど）から候補を選ぶと、スムーズに進められます。制作者もこれらのサイトを利用している可能性が高いです。
          </p>
        </section>
      </div>

      <ProgressSection />
    </main>
  );
};

export default ProjectDetails;
