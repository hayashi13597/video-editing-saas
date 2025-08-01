import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DynamicFormData } from "./validate";
import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RequiredBadge from "@/components/form/RequiredBadge";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const ModificationDetails = ({ form }: { form: UseFormReturn<DynamicFormData> }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "modificationDetails"
  });
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
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2">
          <p className="body-text flex items-center gap-1">修正箇所（セクション名・位置）<RequiredBadge required={true} /></p>
          <p className="body-text flex items-center gap-1">現在の内容 <RequiredBadge required={true} /></p>
          <p className="body-text flex items-center gap-1">修正後の内容 <RequiredBadge required={true} /></p>
          <p className="body-text flex items-center gap-1">補足・意図 <RequiredBadge required={false} /></p>
          {fields.length > 1 && (
            <div className="w-10" />
          )}
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2">
                <FormField
                  control={form.control}
                  name={`modificationDetails.${index}.modificationLocation`}
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
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
                    <FormItem>
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
                    <FormItem>
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

                {fields.length > 1 && (
                  <div className="flex-center -mt-5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(index)}
                      className="flex-shrink-0 h-10 w-10 p-0 border-none bg-red-bg text-red hover:bg-red-bg hover:text-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )
          }
          )}
        </div>
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
}

export default ModificationDetails