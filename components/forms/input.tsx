"use client";

import { forwardRef, memo, useId } from "react";
import { Label } from "../ui/label";
import { Input as InputField } from "../ui/input";
import { twMerge } from "tailwind-merge";
import { ErrorMessage } from "./error";
import { FORM_CONTROL_CLASSES } from "@/styles/form";

/* --------------------------------------------------------------------------------------
Input
-------------------------------------------------------------------------------------- */
type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  labelClassName?: string;
  error?: string;
};

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      { id, label, error, className, labelClassName = "", ...inputProps },
      forwardedRef
    ) => {
      const generatedId = useId();
      const resolvedId = id ?? generatedId;
      const hasError = Boolean(error);

      return (
        <div className={twMerge(FORM_CONTROL_CLASSES)}>
          <Label htmlFor={resolvedId} className={labelClassName}>
            {label}
          </Label>
          <InputField
            id={resolvedId}
            ref={forwardedRef}
            {...inputProps}
            className={twMerge(
              `h-12 rounded-lg border-[#E4E3F2] placeholder:text-[#959595]`,
              className,
              labelClassName.includes("sr-only") ? "!mt-0" : "",
              hasError ? "border-red-500" : ""
            )}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
          {hasError && <ErrorMessage errorFor={resolvedId}>{error}</ErrorMessage>}
        </div>
      );
    }
  )
);

Input.displayName = "Input";

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { Input };
