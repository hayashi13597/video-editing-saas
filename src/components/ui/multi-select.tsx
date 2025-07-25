"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  // eslint-disable-next-line
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  allowAddNew?: boolean;
  // eslint-disable-next-line
  onAddNew?: (newOption: Option) => void;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "選択...",
  className,
  allowAddNew = false,
  onAddNew
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter(i => i !== item));
  };

  const handleSelect = (currentValue: string) => {
    if (selected.includes(currentValue)) {
      handleUnselect(currentValue);
    } else {
      onChange([...selected, currentValue]);
    }
  };

  const handleAddNew = () => {
    if (inputValue.trim() && onAddNew) {
      const newOption: Option = {
        label: inputValue.trim(),
        value: inputValue.trim().toLowerCase().replace(/\s+/g, "_")
      };
      onAddNew(newOption);
      onChange([...selected, newOption.value]);
      setInputValue("");
    }
  };

  return (
    <div className={className}>
      {/* Popover selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-stroke hover:bg-white"
          >
            {placeholder && selected.length === 0 ? (
              <span className="text-placeholder">{placeholder}</span>
            ) : (
              <span className="flex flex-wrap gap-1">
                {selected.map(item => {
                  const selectedOption = options.find(
                    option => option.value === item
                  );
                  return (
                    <Badge
                      key={item}
                      className="cursor-pointer py-1"
                      onClick={e => {
                        e.stopPropagation();
                        handleUnselect(item);
                      }}
                    >
                      {selectedOption?.label || item}
                      <X className="h-3 w-3" />
                    </Badge>
                  );
                })}
              </span>
            )}
            <ChevronDown className="h-4 w-4 text-text" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="検索..." className="h-9" />
            <CommandList className="relative h-64">
              <CommandEmpty>検索結果が見つかりませんでした</CommandEmpty>
              <CommandGroup className="max-h-52 overflow-auto">
                {options.map((option, index) => (
                  <CommandItem
                    key={option.value + index}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer data-[selected=true]:text-white"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100 text-text"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              {allowAddNew && (
                <div className="absolute bottom-1 left-1 right-1 h-9 flex-between gap-2">
                  <Input
                    type="text"
                    className="w-full h-full body-text bg-white"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Button
                    className="button-submit w-fit"
                    onClick={handleAddNew}
                    disabled={!inputValue.trim()}
                  >
                    追加
                  </Button>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
