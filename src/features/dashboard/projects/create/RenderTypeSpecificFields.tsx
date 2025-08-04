import { DefaultValuesMapKeys } from "@/lib/defaultValuesMap";
import { UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "./validate";
import LPComponent from "./components/LPComponent";
import FlyerComponent from "./components/FlyerComponent";

interface RenderTypeSpecificFieldsProps {
  selectedType: DefaultValuesMapKeys;
  form: UseFormReturn<DynamicFormData>;
}

const RenderTypeSpecificFields = ({ selectedType, form }: RenderTypeSpecificFieldsProps) => {
  switch (selectedType) {
    case "動画編集":
      return <div>動画編集特有のフィールド</div>;
    case "Instagram投稿":
      return <div>Instagram投稿特有のフィールド</div>;
    case "台本作成":
      return <div>台本作成特有のフィールド</div>;
    case "LINE構築":
      return <div>LINE構築特有のフィールド</div>;
    case "チラシ作成":
      return <FlyerComponent form={form} />;
    case "LP修正依頼":
      return <LPComponent form={form} />;
    case "SEO記事作成":
      return <div>SEO記事作成特有のフィールド</div>;
    case "サムネイル作成":
      return <div>サムネイル作成特有のフィールド</div>;
    case "バナー作成":
      return <div>バナー作成特有のフィールド</div>;
    case "名刺作成":
      return <div>名刺作成特有のフィールド</div>;
    default:
      return <div>選択されたタイプに特有のフィールドはありません</div>;
  }
}

export default RenderTypeSpecificFields