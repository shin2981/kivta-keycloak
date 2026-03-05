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
          className="mb-1.5 block text-sm font-medium text-[var(--text-main)]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-white)] px-3 py-2 text-[var(--text-main)] placeholder-[var(--text-sub)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]",
            error && "border-[var(--negative)] focus:border-[var(--negative)] focus:ring-[var(--negative)]",
            inputClassName
          )}
          style={{
            borderColor: error ? "var(--negative)" : undefined,
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-[var(--negative)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
