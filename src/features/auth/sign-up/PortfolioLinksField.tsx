import React, { useEffect } from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { profileSchemaType } from "./validate";
import RequiredBadge from "@/components/form/RequiredBadge";
import { cn } from "@/lib/utils";

interface PortfolioLinksFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<profileSchemaType | any>;
}

const PortfolioLinksField: React.FC<PortfolioLinksFieldProps> = ({
  control
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolioLinks"
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: "" });
    }
  }, [fields, append]);

  const handleAddLink = () => {
    if (fields.length < 5) {
      append({ url: "" });
    }
  };

  const handleRemoveLink = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <FormLabel className="body-text">
          ポートフォリオリンク
          <RequiredBadge text="任意" />
        </FormLabel>
        <span className="whitespace-nowrap text-secondary">（※最大5つ）</span>
      </div>

      <div className="space-y-1">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`portfolioLinks.${index}.url`}
              render={({ field: inputField }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...inputField}
                      placeholder="リンクを貼り付け"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveLink(index)}
                className="flex-shrink-0 h-10 w-10 p-0 border-none bg-red-bg text-red hover:bg-red-bg hover:text-red"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAddLink}
        className={cn(
          "button-text cursor-pointer flex items-center gap-1 text-green-main",
          fields.length >= 5 && "text-stroke cursor-default"
        )}
      >
        <Plus className="h-4 w-4" />
        ポートフォリオリンクを追加
      </button>
    </div>
  );
};

export default PortfolioLinksField;
