import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HistorySectionProps {
  className?: string;
}

const HistorySection = ({ className }: HistorySectionProps) => {
  return (
    <section className={cn("space-y-6 bg-white rounded-6 p-6", className)}>
      <div className="flex items-center gap-5">
        <h2 className="small-title">フィードバック履歴</h2>
        <Badge className="bg-light-green text-green-main button-text px-3 py-2.5 font-semibold">
          FB回数：3回
        </Badge>
      </div>

      <div className="space-y-3">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3"
          defaultValue="history-3"
        >
          <AccordionItem value="history-1" className="border-none">
            <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">
              第1回フィードバック（10）
            </AccordionTrigger>
            <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="history-2" className="border-none">
            <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">
              第2回フィードバック（6）
            </AccordionTrigger>
            <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="history-3" className="border-none">
            <AccordionTrigger className="bg-light-gray hover:no-underline px-2.5 py-1.5 body-text-bold [&_svg]:text-text">
              第3回フィードバック（6）
            </AccordionTrigger>
            <AccordionContent className="border rounded-6 border-stroke p-3 mt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
                  <p className="intro-text">
                    テキストテキストテキストテキストテキストテキスト
                  </p>
                </div>
                <div className="flex items-center gap-10 text-balance ">
                  <p className="intro-text text-gray">20:20:20:frame1000</p>
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
  );
};

export default HistorySection;
