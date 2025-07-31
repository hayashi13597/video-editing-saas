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
import { ChevronRight } from "lucide-react";

interface FormFieldCustomProps<T extends FormType> {
  control: ReturnType<typeof useForm<T>>["control"];
  name: Path<T>;
  placeholder?: string;
  type?: string;
  label?: string;
  autoComplete?: string;
  requiredBadge?: boolean;
  badgeText?: string;
  selectOptions?: SelectOption[];
  disabled?: boolean;
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
  disabled
}: FormFieldCustomProps<T>) => {
  const [options, setOptions] = useState<SelectOption[]>(selectOptions || []);

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
                    className="border-stroke placeholder:text-placeholder disabled:bg-light-gray disabled:text-placeholder disabled:opacity-100"
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
                <FormLabel className="body-text">
                  {label}
                  {requiredBadge ? (
                    <RequiredBadge required={true} text={badgeText} />
                  ) : requiredBadge === false ? (
                    <RequiredBadge text={badgeText} />
                  ) : null}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="rounded-1.5 !text-size-primary h-[86px] placeholder:text-placeholder"
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...field}
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
                        className="rounded-6 body-text w-full [&_svg:not([class*='text-'])]:text-text [&_svg:not([class*='text-'])]:opacity-100 data-[placeholder]:text-placeholder disabled:bg-light-gray disabled:text-placeholder disabled:opacity-100 disabled:[&_svg:not([class*='text-'])]:opacity-0"
                      >
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectOptions.map(option => (
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
                    {selectOptions?.map((option, index) => (
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
                <div className="flex items-center gap-2 text-green-main small-text cursor-pointer">
                  View plan detail <ChevronRight className="w-4 h-4" />
                </div>
              </FormItem>
            );
          default:
            return <></>;
        }
      }}
    />
  );
};

export default FormFieldCustom;
