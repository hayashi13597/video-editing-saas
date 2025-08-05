import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomVideo from "@/features/dashboard/CustomVideo";
import HistorySection from "@/features/dashboard/feedback/HistorySection";

interface FeedbackPageProps {
  params: Promise<{ id: string }>;
}

const FeedbackPage = async ({ params }: FeedbackPageProps) => {
  const { id } = await params;

  return (
    <main className="space-y-5">
      {/* title + company name + video */}
      <section className="space-y-3 bg-white rounded-6 p-6">
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
          <CustomVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
      </section>

      {/* feedback section */}
      <section className="space-y-3 bg-white rounded-6 p-6">
        <div className="flex-between">
          <h2 className="small-title">フィードバック</h2>
          <Button className="button-submit w-fit">
            フリーランスに提出する
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">
                イントロの音楽が大きすぎます。音量を下げてください。
              </p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">
                イントロの音楽が大きすぎます。音量を下げてください。
              </p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">
                イントロの音楽が大きすぎます。音量を下げてください。
              </p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">
                イントロの音楽が大きすぎます。音量を下げてください。
              </p>
            </div>
          </div>

          <div className="flex-between gap-3">
            <Input type="text" placeholder="フィードバックの詳細を入力" />
            <Button className="button-submit w-fit">送信</Button>
          </div>
        </div>
      </section>

      {/* feedback history */}
      <HistorySection />
    </main>
  );
};

export default FeedbackPage;
