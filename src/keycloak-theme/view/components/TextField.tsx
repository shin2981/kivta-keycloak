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
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 focus:border-[var(--kc-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--kc-primary)]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            inputClassName
          )}
          style={{
            borderColor: error ? undefined : "var(--kc-border, #334155)",
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
