"use client";

import { forwardRef, memo, useId } from "react";
import { Label } from "../ui/label";
import { Textarea as TextareaField } from "../ui/textarea";
import { twMerge } from "tailwind-merge";
import { ErrorMessage } from "./error";
import { FORM_CONTROL_CLASSES } from "@/styles/form";

/* --------------------------------------------------------------------------------------
Textarea
-------------------------------------------------------------------------------------- */
type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string;
};

const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ id, label, error, className, ...TextareaProps }, forwardedRef) => {
      const generatedId = useId();
      const resolvedId = id ?? generatedId;
      const hasError = Boolean(error);

      return (
        <div className={FORM_CONTROL_CLASSES}>
          <Label htmlFor={resolvedId}>{label}</Label>
          <TextareaField
            id={resolvedId}
            ref={forwardedRef}
            {...TextareaProps}
            className={twMerge(
              `min-h-[120px] rounded-lg border-[#E4E3F2] placeholder:text-[#959595] resize-none`,
              className,
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

Textarea.displayName = "Textarea";

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { Textarea };
