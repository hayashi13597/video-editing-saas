import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomVideo from "@/features/dashboard/CustomVideo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FeedbackPage = async ({
  params,
}: {
  params: { id: string };
}) => {
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
          <Badge className="bg-light-green text-green-main py-1 px-3 body-text">Tiktok</Badge>
        </div>
        <div className="bg-light-gray">
          <CustomVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
      </section>

      {/* feedback section */}
      <section className="space-y-3 bg-white rounded-6 p-6">
        <div className="flex-between">
          <h2 className="small-title">フィードバック</h2>
          <Button className="button-submit w-fit">フリーランスに提出する</Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">イントロの音楽が大きすぎます。音量を下げてください。</p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">イントロの音楽が大きすぎます。音量を下げてください。</p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">イントロの音楽が大きすぎます。音量を下げてください。</p>
            </div>
            <div className="p-3 flex flex-col odd:bg-white even:bg-bg-main">
              <p className="small-text text-placeholder">20:23:20:frame1003</p>
              <p className="body-text">イントロの音楽が大きすぎます。音量を下げてください。</p>
            </div>
          </div>

          <div className="flex-between gap-3">
            <Input type="text" placeholder="フィードバックの詳細を入力" />
            <Button className="button-submit w-fit">送信</Button>
          </div>
        </div>
      </section>

      {/* feedback history */}
      <section className="space-y-6 bg-white rounded-6 p-6">
        <div className="flex items-center gap-5">
          <h2 className="small-title">フィードバック履歴</h2>
          <Badge className="bg-light-green text-green-main button-text px-3 py-2.5 font-semibold">FB回数：3回</Badge>
        </div>

        <div className="space-y-3">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
            defaultValue="history-3"
          >
            <AccordionItem value="history-1" className="border-none">
              <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">第1回フィードバック（10）</AccordionTrigger>
              <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="history-2" className="border-none">
              <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">第2回フィードバック（6）</AccordionTrigger>
              <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="history-3" className="border-none">
              <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">第3回フィードバック（6）</AccordionTrigger>
              <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                  <div className="flex items-center gap-10 text-balance ">
                    <p className="intro-text text-gray">
                      20:20:20:frame1000
                    </p>
                    <p className="intro-text">
                      テキストテキストテキストテキストテキストテキスト
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default FeedbackPage;
