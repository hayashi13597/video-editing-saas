import { DefaultValuesMapKeys } from "@/lib/defaultValuesMap";
import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "./validate";
import LPComponent from "./components/LPComponent";
import FlyerComponent from "./components/FlyerComponent";
import VideoComponent from "./components/VideoComponent";
import BusinessCardComponent from "./components/BusinessCardComponent";
import BannerComponent from "./components/BannerComponent";
import { InstagramComponent } from "./components/InstagramComponent";
import SEOArticleComponent from "./components/SEOArticleComponent";
import ThumbnailComponent from "./components/ThumbnailComponent";
import LineComponent from "./components/LineComponent";

interface RenderTypeSpecificFieldsProps {
  selectedType: DefaultValuesMapKeys;
  form: UseFormReturn<DynamicFormData>;
}

const RenderTypeSpecificFields = ({
  selectedType,
  form
}: RenderTypeSpecificFieldsProps) => {
  switch (selectedType) {
    case "動画編集":
      return <VideoComponent form={form} />;
    case "Instagram投稿":
      return <InstagramComponent form={form} />;
    case "台本作成":
      return <div>台本作成特有のフィールド</div>;
    case "LINE構築":
      return <LineComponent form={form} />;
    case "チラシ作成":
      return <FlyerComponent form={form} />;
    case "LP修正依頼":
      return <LPComponent form={form} />;
    case "SEO記事作成":
      return <SEOArticleComponent form={form} />;
    case "サムネイル作成":
      return <ThumbnailComponent form={form} />;
    case "バナー作成":
      return <BannerComponent form={form} />;
    case "名刺作成":
      return <BusinessCardComponent form={form} />;
    default:
      return <div>選択されたタイプに特有のフィールドはありません</div>;
  }
};

export default RenderTypeSpecificFields;
