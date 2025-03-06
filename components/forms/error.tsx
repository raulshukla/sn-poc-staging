import { twMerge } from "tailwind-merge";

/* --------------------------------------------------------------------------------------
Types
-------------------------------------------------------------------------------------- */
type ErrorMessageProps = Omit<React.ComponentPropsWithoutRef<"p">, "id"> & {
  errorFor: string;
};

/* --------------------------------------------------------------------------------------
Component
-------------------------------------------------------------------------------------- */
const ErrorMessage = ({ errorFor, className, ...props }: ErrorMessageProps) => {
  return (
    <p
      {...props}
      id={`${errorFor}-error`}
      className={twMerge("text-sm text-red-500", className)}
    />
  );
};

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { ErrorMessage };
export type { ErrorMessageProps };
