import { useFieldArray, UseFormReturn, useFormState } from "react-hook-form";
import { DynamicFormData } from "./validate";
import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import RequiredBadge from "@/components/form/RequiredBadge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ModificationDetails = ({
  form
}: {
  form: UseFormReturn<DynamicFormData>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "modificationDetails"
  });
  const { errors } = useFormState();

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (fields.length === 0 && !isInitializedRef.current) {
      isInitializedRef.current = true;
    }
  }, [fields, append]);

  const handleAddLink = () => {
    append({
      modificationLocation: "",
      currentContent: "",
      modifiedContent: "",
      modificationNotes: ""
    });
  };

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-3">
        {fields.map((field, index) => {
          return (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={`modificationDetails.${index}.modificationLocation`}
              key={field.id}
            >
              <AccordionItem
                value={`modificationDetails.${index}.modificationLocation`}
                className="border-none"
              >
                <AccordionTrigger
                  className={cn(
                    "body-text-bold bg-light-gray hover:no-underline px-2.5 py-1.5 [&_svg]:text-text items-center gap-3",
                    {
                      "[&_svg]:order-2 justify-start grid grid-cols-[auto_auto_1fr]":
                        fields.length > 1,
                      "border border-red rounded-6 bg-red text-white [&_svg]:text-white":
                        Array.isArray(errors.modificationDetails) &&
                        !!errors.modificationDetails[index]
                    }
                  )}
                >
                  <span>{index + 1}．修正内容</span>
                  {fields.length > 1 && (
                    <div className="w-full flex order-3 justify-end">
                      <Badge
                        className="px-1.5 flex-center"
                        variant="destructive"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash2
                          size={16}
                          className="w-4 h-4 stroke-white order-1"
                        />
                        <span className="order-2">削除</span>
                      </Badge>
                    </div>
                  )}
                </AccordionTrigger>
                <AccordionContent className="p-0 mt-1">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 border border-stroke rounded-6 grid grid-cols-1 gap-3">
                      <FormField
                        control={form.control}
                        name={`modificationDetails.${index}.modificationLocation`}
                        render={({ field }) => (
                          <FormItem className="body-text flex flex-col items-start gap-1">
                            <FormLabel>
                              修正箇所（セクション名・位置）
                              <RequiredBadge required={true} />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="修正箇所"
                                className="h-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`modificationDetails.${index}.currentContent`}
                        render={({ field }) => (
                          <FormItem className="body-text flex flex-col items-start gap-1">
                            <FormLabel>
                              現在の内容
                              <RequiredBadge required={true} />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="現在の内容"
                                className="h-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`modificationDetails.${index}.modifiedContent`}
                        render={({ field }) => (
                          <FormItem className="body-text flex flex-col items-start gap-1">
                            <FormLabel>
                              修正後の内容
                              <RequiredBadge required={true} />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="修正後の内容"
                                className="h-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`modificationDetails.${index}.modificationNotes`}
                        render={({ field }) => (
                          <FormItem className="body-text flex flex-col items-start gap-1">
                            <FormLabel>
                              補足・意図
                              <RequiredBadge required={false} />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="備考"
                                className="h-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleAddLink}
        className="button-text cursor-pointer flex items-center gap-1 text-green-main"
      >
        <Plus className="h-4 w-4" />
        修正内容を追加
      </button>
    </div>
  );
};

export default ModificationDetails;
