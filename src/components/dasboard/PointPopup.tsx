import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import Image from "next/image";

interface PointPopupProps {
  points: number;
}

const PointPopup = ({ points }: PointPopupProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative w-6 h-6 cursor-pointer">
          <Image
            src="/icons/point.svg"
            alt="point"
            fill
            sizes="(max-width: 768px) 20px, 30px"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="border-none shadow-sm w-fit">
        <div className="flex flex-col gap-1">
          <p className="body-text">総ポイント: {points}</p>
          <p className="body-text text-green-main">使用済みポイント: 800pt</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PointPopup;
