"use client";

import { FORM_CONTROL_CLASSES } from "@/styles/form";
import { Label } from "../ui/label";
import { SelectProps as PrimitiveSelectProps } from "@radix-ui/react-select";
import { memo, useId } from "react";
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
type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = PrimitiveSelectProps & {
  className?: string;
  error?: string;
  id?: string;
  label: string;
  labelClassName?: string;
  options: SelectOption[];
  placeholder?: string;
};

/* --------------------------------------------------------------------------------------
Component
-------------------------------------------------------------------------------------- */
const Select = memo(
  ({
    id,
    label,
    error,
    options,
    placeholder = "",
    className,
    labelClassName = "",
    ...selectProps
  }: SelectProps) => {
    const generatedId = useId();
    const resolvedId = id ?? generatedId;
    const hasValue = Boolean(selectProps.value);
    const hasError = Boolean(error);

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
          <SelectContent>
            {options.map(({ value, label }) => (
              <SelectItem key={`${resolvedId}_opt_${value}`} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPrimitive>
        {hasError && <ErrorMessage errorFor={resolvedId}>{error}</ErrorMessage>}
      </div>
    );
  }
);

Select.displayName = "Select";

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { Select };
export type { SelectProps };
