"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SingleSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}

const SingleSelect = ({
  options,
  placeholder,
  value,
  onValueChange,
  label,
  className,
}: SingleSelectProps) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
        <label>{label}</label>
      )}

      <Select.Root value={value} onValueChange={onValueChange}>
        {/* The Button that triggers the dropdown */}
        <Select.Trigger className="flex items-center justify-between gap-2 px-4 py-2 text-sm border border-outline rounded-xl text-white outline-none hover:bg-surface-container-high transition-all focus:ring-2 focus:ring-primary w-full">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Select.Icon>
        </Select.Trigger>

        {/* Portal ensures the menu isn't cut off by parent containers */}
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={5}
            className="z-100 min-w-(--radix-select-trigger-width) overflow-hidden bg-surface border border-outline rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md max-h-80"
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#0f172a] cursor-default text-white border-b border-border">
              <ChevronUp className="w-4 h-4" />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-1">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="relative flex items-center w-full px-8 py-2 text-sm text-on-surface rounded-lg outline-none cursor-default select-none data-highlighted:bg-primary data-highlighted:text-on-primary data-disabled:opacity-40 transition-colors"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#0f172a] cursor-default text-white border-t border-border">
              <ChevronDown className="w-4 h-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SingleSelect;
