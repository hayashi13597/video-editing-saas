import { Path, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { FormType, SelectOption } from "@/types/form";
import FormPassword from "./FormPassword";
import { Checkbox } from "../ui/checkbox";
import RequiredBadge from "./RequiredBadge";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { MultiSelect } from "../ui/multi-select";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { ChevronRight, Plus, X } from "lucide-react";
import { DefaultValuesMapKeys } from "@/lib/defaultValuesMap";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface FormFieldCustomProps<T extends FormType> {
  control: ReturnType<typeof useForm<T>>["control"];
  name: Path<T>;
  placeholder?: string;
  type?: "text" | "email" | "password" | "checkbox" | "textarea" | "select" | "multi-select" | "radio" | "date" | "upload-text" | "checkbox-group";
  label?: string;
  autoComplete?: string;
  requiredBadge?: boolean;
  badgeText?: string;
  selectOptions?: SelectOption[] | DefaultValuesMapKeys[];
  disabled?: boolean;
  inputClassName?: string;
  selectClassName?: string;
  multiSelectClassName?: string;
  note?: string;
  radioPlan?: boolean;
  checkboxGroupOptions?: SelectOption[];
}

const FormFieldCustom = <T extends FormType>({
  control,
  name,
  placeholder,
  type,
  label,
  autoComplete,
  requiredBadge,
  badgeText,
  selectOptions,
  disabled,
  inputClassName,
  selectClassName,
  multiSelectClassName,
  note,
  radioPlan = true,
  checkboxGroupOptions
}: FormFieldCustomProps<T>) => {
  const normalizedOptions: SelectOption[] = Array.isArray(selectOptions)
    ? selectOptions.map(option =>
      typeof option === "string"
        ? { label: option, value: option }
        : option
    )
    : [];

  const [options, setOptions] = useState<SelectOption[]>(normalizedOptions);

  const handleAddNewOption = (newOption: SelectOption) => {
    setOptions(prev => [...prev, newOption]);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        switch (type) {
          case "text":
          case "email":
            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="body-text">
                  {label}
                  {requiredBadge ? (
                    <RequiredBadge required={true} text={badgeText} />
                  ) : requiredBadge === false ? (
                    <RequiredBadge text={badgeText} />
                  ) : null}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={field.value?.toString() || ""}
                    className={cn("border-stroke placeholder:text-placeholder disabled:bg-light-gray disabled:text-placeholder disabled:opacity-100", inputClassName)}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          case "password":
            return (
              <FormPassword
                control={control}
                name={name}
                requiredBadge={requiredBadge}
                badgeText={badgeText}
                disabled={disabled}
              />
            );
          case "checkbox":
            return (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    {...field}
                    className="text-white border-text size-[18px] data-[state=checked]:bg-green-main data-[state=checked]:border-green-main"
                    checked={field.value ? true : false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="body-text">{label}</FormLabel>
              </FormItem>
            );
          case "textarea":
            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className={cn("body-text", note ? "flex justify-between" : "")}>
                  <span className="flex items-center gap-1">
                    {label}
                    {requiredBadge ? (
                      <RequiredBadge required={true} text={badgeText} />
                    ) : requiredBadge === false ? (
                      <RequiredBadge text={badgeText} />
                    ) : null}
                  </span>
                  {note && <span className="small-text">{note}</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-1.5 !text-size-primary h-[86px] placeholder:text-placeholder"
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={field.value?.toString() || ""}
                  />
                </FormControl>
              </FormItem>
            );
          case "select":
            if (!selectOptions) return <></>;
            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="body-text">
                  {label}
                  {requiredBadge ? (
                    <RequiredBadge required={true} text={badgeText} />
                  ) : requiredBadge === false ? (
                    <RequiredBadge text={badgeText} />
                  ) : null}
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString() || ""}
                  >
                    <FormControl>
                      <SelectTrigger
                        {...field}
                        disabled={disabled}
                        className={cn("rounded-6 body-text w-full [&_svg:not([class*='text-'])]:text-text [&_svg:not([class*='text-'])]:opacity-100 data-[placeholder]:text-placeholder disabled:bg-light-gray disabled:text-placeholder disabled:opacity-100 disabled:[&_svg:not([class*='text-'])]:opacity-0", selectClassName)}
                      >
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {normalizedOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="focus:text-white [&_svg:not([class*='text-'])]:text-text"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          case "multi-select":
            if (!selectOptions) return <></>;
            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="body-text">
                  {label}
                  {requiredBadge ? (
                    <RequiredBadge required={true} text={badgeText} />
                  ) : requiredBadge === false ? (
                    <RequiredBadge text={badgeText} />
                  ) : null}
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={options}
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder={placeholder}
                    onAddNew={handleAddNewOption}
                    allowAddNew={true}
                    className={multiSelectClassName}
                  />
                </FormControl>
                <FormMessage />
                <span className="small-text text-gray">※複数選択できます</span>
              </FormItem>
            );
          case "radio":
            return (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="body-text">
                  {label}
                  {requiredBadge ? (
                    <RequiredBadge required={true} text={badgeText} />
                  ) : requiredBadge === false ? (
                    <RequiredBadge text={badgeText} />
                  ) : null}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    className="flex items-center gap-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {normalizedOptions?.map((option, index) => (
                      <div
                        key={option + String(index)}
                        className="w-fit min-h-9 flex-center gap-2 bg-bright-green rounded-6 border border-green-main px-4"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option + "r" + String(index)}
                          className="border-green-main"
                        />
                        <Label
                          htmlFor={option + "r" + String(index)}
                          className="body-text text-text"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
                {radioPlan && <div className="flex items-center gap-2 text-green-main small-text cursor-pointer">
                  View plan detail <ChevronRight className="w-4 h-4" />
                </div>}
              </FormItem>
            );
          case "upload-text":
            const handleFileSelect = () => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.multiple = true;
              fileInput.accept = 'image/*';

              fileInput.onchange = (event) => {
                const target = event.target as HTMLInputElement;
                if (target.files) {
                  const newFiles = Array.from(target.files);
                  const currentFiles = Array.isArray(field.value) ? field.value : [];
                  const updatedFiles = [...currentFiles, ...newFiles.map(file => file.name)];
                  field.onChange(updatedFiles);
                }
              };

              fileInput.click();
            };

            const handleRemoveFile = (indexToRemove: number) => {
              const currentFiles = Array.isArray(field.value) ? field.value : [];
              const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
              field.onChange(updatedFiles);
            };

            const fileNames = Array.isArray(field.value) ? field.value : [];

            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="body-text">
                  差し替え画像／バナー／アイコンなど
                  <RequiredBadge required={false} />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 relative">
                    <Input
                      {...field}
                      type="text"
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value?.toString() || ""}
                      className="hidden"
                      disabled
                    />
                    <div className="w-full flex items-center flex-wrap gap-2 px-3 py-1.5 border border-stroke rounded-6 min-h-10">
                      {fileNames.length > 0 ? (
                        fileNames.map((fileName: string, index: number) => (
                          <Badge
                            key={index}
                            className='rounded-full body-text text-text bg-light-gray flex items-center gap-2.5 px-3'
                          >
                            {fileName}
                            <button type="button">
                              <X
                                className='w-3 h-3 cursor-pointer hover:text-red-500'
                                onClick={() => handleRemoveFile(index)}
                              />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        null
                      )}
                    </div>
                    <button
                      type="button"
                      className='button-submit flex-center w-fit gap-2.5'
                      onClick={handleFileSelect}
                    >
                      <Plus />
                      <span className="whitespace-nowrap">ファイルを選択</span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          case "checkbox-group":
            if (!checkboxGroupOptions) return <></>;
            return (
              <FormItem className="space-y-3">
                <FormLabel className="body-text">{label}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {
                      checkboxGroupOptions?.map((option, index) => (
                        <div key={option.value + String(index)} className="flex items-center gap-2">
                          <Checkbox
                            id={option.value + "c" + String(index)}
                            value={option.value}
                            checked={field.value?.includes(option.value) || false}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, option.value]);
                              }
                              else {
                                field.onChange(currentValues.filter(value => value !== option.value));
                              }
                            }}
                            className="data-[state=checked]:bg-green-main data-[state=checked]:border-green-main"
                          />
                          <Label
                            htmlFor={option.value + "c" + String(index)}
                            className="body-text font-normal"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))
                    }
                  </div>
                </FormControl>
              </FormItem>
            )
          default:
            return <></>;
        }
      }}
    />
  );
};

export default FormFieldCustom;
