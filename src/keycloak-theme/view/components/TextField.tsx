import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className = "", inputClassName = "", id, ...props }, ref) => {
    const inputId = id ?? `input-${label.replace(/\s/g, "-").toLowerCase()}`;
    return (
      <div className={cn("mb-4", className)}>
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-theme-text"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-theme-surface px-3 py-2 text-theme-text placeholder-theme-text-sub focus:outline-none focus:ring-1",
            error
              ? "border-theme-negative focus:border-theme-negative focus:ring-theme-negative"
              : "border-theme-gray40 focus:border-theme-primary focus:ring-theme-primary",
            inputClassName
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-theme-negative">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
