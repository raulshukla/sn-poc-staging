"use client";

import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar, type CalendarProps } from "../ui/calendar";
import { forwardRef, memo, useCallback, useState, useId } from "react";
import { format, isValid, parse } from "date-fns";
import { Label } from "../ui/label";
import { FORM_CONTROL_CLASSES } from "@/styles/form";
import { twMerge } from "tailwind-merge";
import { ErrorMessage } from "./error";

/* --------------------------------------------------------------------------------------
Types
-------------------------------------------------------------------------------------- */
type DatepickerProps = {
  id?: string;
  error?: string;
  label: string;
  placeholder?: string;
  labelClassName?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  calendar?: Pick<
    CalendarProps,
    "fromYear" | "toYear" | "fromDate" | "toDate" | "disabled"
  >;
};

/* --------------------------------------------------------------------------------------
Component
-------------------------------------------------------------------------------------- */
const Datepicker = memo(
  forwardRef<HTMLInputElement, DatepickerProps>(
    (
      { onChange, calendar, id, label, error, labelClassName = "", ...inputProps },
      forwardedRef,
    ) => {
      const generatedId = useId();
      const resolvedId = id ?? generatedId;
      const hasError = Boolean(error);
      // Hold the month in state to control the calendar when the input changes
      const [month, setMonth] = useState(new Date());

      // Hold the selected date in state
      const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

      // Hold the input value in state
      const [inputValue, setInputValue] = useState("");

      const handleDayPickerSelect = useCallback(
        (date: Date | undefined) => {
          if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
            onChange?.("");
          } else {
            const newValue = format(date, "yyyy-MM-dd");
            setSelectedDate(date);
            setMonth(date);
            setInputValue(newValue);
            onChange?.(newValue);
          }
        },
        [onChange],
      );

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e.target.value);
          setInputValue(e.target.value); // keep the input value in sync

          const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

          if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
          } else {
            setSelectedDate(undefined);
          }
        },
        [onChange],
      );

      return (
        <Popover>
          <div className="relative z-0">
            <div className={twMerge(FORM_CONTROL_CLASSES)}>
              <Label htmlFor={id} className={labelClassName}>
                {label}
              </Label>
              <div className="relative z-0">
                <input
                  className={twMerge(
                    `h-12 border-[#E4E3F2] placeholder:text-[#959595] w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none`,
                    hasError ? "border-red-500" : "",
                    inputValue == "" ? "text-[#959595]" : "",
                  )}
                  id={id}
                  value={inputValue}
                  onChange={handleInputChange}
                  type="date"
                  inputMode="none"
                  {...inputProps}
                />
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-2 h-8 w-8 grid place-items-center bottom-2 bg-white"
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
              </div>
              <PopoverContent className="w-auto p-0 mt-2" align="end">
                <Calendar
                  month={month}
                  onMonthChange={setMonth}
                  mode="single"
                  initialFocus
                  {...calendar}
                  selected={selectedDate}
                  onSelect={handleDayPickerSelect}
                  onSelectwithButton={handleDayPickerSelect}
                />
              </PopoverContent>
              {hasError && <ErrorMessage errorFor={resolvedId}>{error}</ErrorMessage>}
            </div>
          </div>
        </Popover>
      );
    },
  ),
);

Datepicker.displayName = "Datepicker";

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { Datepicker };
export type { DatepickerProps };
