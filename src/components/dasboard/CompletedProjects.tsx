import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import ImageFallback from "./ImageFallback";
import { UserInterface } from "@/types/form";

interface CompletedProjectsCardProps {
  user: UserInterface;
}

const CardProject = ({ user }: CompletedProjectsCardProps) => {
  return (<div className="p-3 rounded-6 bg-white space-y-4">
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="space-y-1.5">
          <div className="intro-text">コーポレートLP制作</div>
          <div className="space-x-1">
            <span className="small-text">2025/07/01</span>
            <Badge className="rounded-full px-4">完了</Badge>
          </div>
        </div>
        <div className="flex-center">
          <Star size={16} fill="#FFC300" className="text-star" />
          <Star size={16} fill="#FFC300" className="text-star" />
          <Star size={16} fill="#FFC300" className="text-star" />
          <Star size={16} fill="#FFC300" className="text-star" />
          <Star size={16} fill="#FFC300" className="text-star" />
        </div>
      </div>
    </div>

    <div className="py-1 px-2 5 rounded-6 bg-bg-main flex-between">
      <div className="flex items-center space-x-3">
        <ImageFallback src={user?.image} name={user?.name} />
        <div className="flex flex-col">
          <span className="body-text">{user?.name}</span>
          <span className="small-text text-gray">UI/UX Design</span>
        </div>
      </div>
      <div className="medium-title-no-bold">
        ￥60,000
      </div>
    </div>
  </div>)
}

const CompletedProjectsCard = ({ user }: CompletedProjectsCardProps) => {
  return (
    <div className="space-y-6">
      <h3 className="h3-title">完了済みプロジェクト</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardProject user={user} />
        <CardProject user={user} />
      </div>
    </div>
  );
};

export default CompletedProjectsCard;
