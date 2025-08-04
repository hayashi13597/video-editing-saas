"use client";

import { useForm } from "react-hook-form";
import { DynamicFormData, dynamicFormSchema } from "./validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValuesMap, DefaultValuesMapKeys } from "@/lib/defaultValuesMap";
import { Form } from "@/components/ui/form";
import FormFieldCustom from "@/components/form/FormFieldCustom";
import { ONE_MONTH_OPTIONS } from "@/constants/selectOptions";
import RenderTypeSpecificFields from "./RenderTypeSpecificFields";
import { Button } from "@/components/ui/button";

const formType = "チラシ作成" as DefaultValuesMapKeys;

const CreateProjectForm = () => {
  const form = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: defaultValuesMap[formType],
  });

  const selectedType = form.watch("type");

  const onSubmit = (data: DynamicFormData) => {
    console.log("Form submitted with data:", data);
  }

  return (
    <Form {...form}>
      <form className="bg-white rounded-6 p-6 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FormFieldCustom
            control={form.control}
            name="type"
            label="案件の種類"
            type="select"
            selectOptions={Object.keys(defaultValuesMap) as DefaultValuesMapKeys[]}
            autoComplete="type"
            requiredBadge={true}
            selectClassName="w-1/2"
          />

          <FormFieldCustom
            control={form.control}
            name="title"
            label="タイトル（案件名）"
            type="text"
            autoComplete="title"
            requiredBadge={true}
            placeholder="企業紹介動画"
          />

          <FormFieldCustom
            control={form.control}
            name="description"
            label="概要説明"
            type="textarea"
            autoComplete="description"
            requiredBadge={true}
            placeholder="概要の説明を入力"
            note="（※最大2000文字）"
          />

          <FormFieldCustom
            control={form.control}
            name="consumePoints"
            label="消費ポイント"
            type="text"
            autoComplete="consumePoints"
            requiredBadge={true}
            placeholder="100pt"
            disabled={true}
            inputClassName="w-1/2"
          />

          <FormFieldCustom
            control={form.control}
            name="deadline"
            label="希望納期"
            type="select"
            requiredBadge={true}
            placeholder="希望納期を選択"
            selectOptions={ONE_MONTH_OPTIONS}
            selectClassName="w-1/2"
          />

          <FormFieldCustom
            control={form.control}
            name="visibility"
            label="公開／非公開"
            type="radio"
            selectOptions={[
              { label: "公開", value: "public" },
              { label: "非公開", value: "private" }
            ]}
            requiredBadge={true}
            radioPlan={false}
          />
        </div>

        <div className="space-y-5">
          <h2 className="medium-title text-green-main">{selectedType}フォーム（クラウド発注用）</h2>

          <div className="space-y-3">
            <RenderTypeSpecificFields selectedType={selectedType} form={form} />
          </div>

          <div className="flex justify-end mt-10">
            <Button type="submit" className="button-submit w-fit">
              登録中
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateProjectForm