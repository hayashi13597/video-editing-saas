import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "../ui/button";
import { CheckCheck, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const NotificationPopup = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative w-6 h-6 cursor-pointer">
          <Image
            src="/icons/notification.svg"
            alt="notification"
            fill
            sizes="(max-width: 768px) 20px, 30px"
          />
          <div className="w-3 h-3 bg-red border-2 border-white rounded-full absolute top-0 right-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="border-none shadow-sm w-[32vw]">
        <div className="w-full flex-between">
          <div className="small-title">通知</div>
          <Button
            variant="link"
            className="flex items-center gap-1 hover:no-underline cursor-pointer"
          >
            <CheckCheck />
            すべて既読にする
          </Button>
        </div>

        <Tabs defaultValue="new-notification">
          <TabsList>
            <TabsTrigger
              className="text-text body-text-bold px-2 py-1.5 rounded-full data-[state=active]:bg-green-main data-[state=active]:text-white"
              value="new-notification"
            >
              新しい通知
            </TabsTrigger>
            <TabsTrigger
              className="text-text body-text-bold px-2 py-1.5 rounded-full data-[state=active]:bg-green-main data-[state=active]:text-white"
              value="read-notification"
            >
              確認済
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-notification">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="intro-text-bold mb-1">今日</div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="py-3 flex-between gap-4 border-b border-stroke"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-main" />
                        <p className="text-gray small-text">2025/05/05 23:23</p>
                      </div>
                      <p className="body-text-bold">
                        テキストテキストテキストテキストテキストテキストテキストテキスト
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <div className="intro-text-bold mb-1">その前</div>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "py-3 flex-between gap-4 border-b border-stroke",
                      index === 1 && "border-b-0"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-main" />
                        <p className="text-gray small-text">2025/05/05 23:23</p>
                      </div>
                      <p className="body-text-bold">
                        テキストテキストテキストテキストテキストテキストテキストテキスト
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="read-notification">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="intro-text-bold mb-1">今日</div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="py-3 flex-between gap-4 border-b border-stroke"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray small-text">2025/05/05 23:23</p>
                      </div>
                      <p className="body-text-bold">
                        テキストテキストテキストテキストテキストテキストテキストテキスト
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <div className="intro-text-bold mb-1">その前</div>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "py-3 flex-between gap-4 border-b border-stroke",
                      index === 1 && "border-b-0"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray small-text">2025/05/05 23:23</p>
                      </div>
                      <p className="body-text-bold">
                        テキストテキストテキストテキストテキストテキストテキストテキスト
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button className="button-submit mt-5">過去の通知を見る</Button>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopup;
