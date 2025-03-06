"use client";

import { FORM_CONTROL_CLASSES } from "@/styles/form";
import { Label } from "../ui/label";
import { SelectProps as PrimitiveSelectProps } from "@radix-ui/react-select";
import { memo, useId, useState, useEffect, useRef } from "react";
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ErrorMessage } from "./error";
import { twJoin } from "tailwind-merge";

/* --------------------------------------------------------------------------------------
Types
-------------------------------------------------------------------------------------- */
type ExtendedSelectOption = {
  type?: string;
  label: string;
  value?: string;
};

type ExtendedSelectProps = PrimitiveSelectProps & {
  className?: string;
  error?: string;
  id?: string;
  label: string;
  labelClassName?: string;
  options: ExtendedSelectOption[];
  placeholder?: string;
};

/* --------------------------------------------------------------------------------------
Component
-------------------------------------------------------------------------------------- */
const ExtendedSelect = memo(
  ({
    id,
    label,
    error,
    options,
    placeholder = "",
    className,
    labelClassName = "",
    ...selectProps
  }: ExtendedSelectProps) => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<ExtendedSelectOption[]>(options);
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const resolvedId = id ?? generatedId;
    const hasValue = Boolean(selectProps.value);
    const hasError = Boolean(error);

    useEffect(() => {
      if (inputRef.current) {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 25);
      }
    }, [filteredOptions])

    return (
      <div className={twJoin(FORM_CONTROL_CLASSES, className)}>
        <Label htmlFor={resolvedId} className={labelClassName}>
          {label}
        </Label>
        <SelectPrimitive {...selectProps}>
          <SelectTrigger
            id={resolvedId}
            className={twJoin(
              "w-full h-12 rounded-lg border-[#E4E3F2]",
              labelClassName.includes("sr-only") ? "!mt-0" : "",
              hasValue ? "" : "text-[#959595]",
              hasError ? "border-red-500" : ""
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="p-[10px]">
            <input
              placeholder="Find relationship"
              ref={inputRef}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setFilteredOptions(options.filter((item: ExtendedSelectOption) => {
                  if (item.type === "label" && e.target.value !== "") return false;
                  return item.label.toLowerCase().startsWith(e.target.value.toLowerCase())
                }))
              }}
              className="h-[40px] mb-4 focus-visible:outline-none"
            />
            {
              filteredOptions.length > 0 ?
                filteredOptions.map((item: ExtendedSelectOption) =>
                  item.type === "label" ? (
                    <p className="h-[28px] mt-2 uppercase text-gray-500 text-sm" key={`${resolvedId}_opt_${item.label}`}>{item.label}</p>
                  ) : (
                    <SelectItem className="h-[34px]" key={`${resolvedId}_opt_${item.value}`} value={item.value ? item.value : ""}>
                      {item.label}
                    </SelectItem>
                  )
                )
              : 
                <SelectItem className="h-[34px]" key={`${resolvedId}_opt_new`} value={searchText}>
                  <span className="text-[#58a6ff] text-sm">Add : </span>
                  {searchText}
                </SelectItem>
            }
          </SelectContent>
        </SelectPrimitive>
        {hasError && <ErrorMessage errorFor={resolvedId}>{error}</ErrorMessage>}
      </div>
    );
  }
);

ExtendedSelect.displayName = "ExtendedSelect";

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { ExtendedSelect };
export type { ExtendedSelectProps };
