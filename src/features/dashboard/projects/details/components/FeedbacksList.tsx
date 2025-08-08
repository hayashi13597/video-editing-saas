import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FeedbacksList = () => {
  return (
    <div className="space y-3">
      <h3 className="small-title">フィードバック一覧</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-1"
        defaultValue="task-1"
      >
        <AccordionItem value="task-1" className="border-none">
          <AccordionTrigger className="bg-light-gray hover:no-underline px-6 py-2.5 body-text-bold [&_svg]:text-text items-center">
            <div className="flex flex-col">
              <span className="intro-text">6点修正お願いします</span>
              <span className="text-gray">6/6</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-2.5">
            <div className="space-y-2.5">
              <div className="flex items-center gap-6 text-balance px-2.5">
                <Checkbox id="content-1" />
                <Label
                  htmlFor="content-1"
                  className="flex flex-col items-start"
                >
                  <span>1. 商品紹介ページのテロップのズレ</span>
                  <span className="small-text text-gray">1:33</span>
                </Label>
              </div>
              <div className="flex items-center gap-6 text-balance px-2.5">
                <Checkbox id="content-2" />
                <Label
                  htmlFor="content-2"
                  className="flex flex-col items-start"
                >
                  <span>2. 背景に会社のロゴを載せる</span>
                  <span className="small-text text-gray">2:30</span>
                </Label>
              </div>
              <div className="flex items-center gap-6 text-balance px-2.5">
                <Checkbox id="content-3" />
                <Label
                  htmlFor="content-3"
                  className="flex flex-col items-start"
                >
                  <span>3. テロップとBGM 修正のお願い</span>
                  <span className="small-text text-gray">2:59</span>
                </Label>
              </div>
              <div className="flex items-center gap-6 text-balance px-2.5">
                <Checkbox id="content-4" />
                <Label
                  htmlFor="content-4"
                  className="flex flex-col items-start"
                >
                  <span>4. 全体的な色を薄い青色にしたい</span>
                  <span className="small-text text-gray">3:10</span>
                </Label>
              </div>
              <div className="flex items-center gap-6 text-balance px-2.5">
                <Checkbox id="content-5" />
                <Label
                  htmlFor="content-5"
                  className="flex flex-col items-start"
                >
                  <span>5. ui/uxをUI/UXに変更</span>
                  <span className="small-text text-gray">3:40</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedbacksList;
