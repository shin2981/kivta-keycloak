import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className = "", inputClassName = "", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? `password-${label.replace(/\s/g, "-").toLowerCase()}`;
    return (
      <div className={cn("mb-4", className)}>
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-[var(--text-main)]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-white)] px-3 py-2 pr-10 text-[var(--text-main)] placeholder-[var(--text-sub)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]",
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
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-sub)] hover:text-[var(--text-main)]"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-[var(--negative)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);
PasswordField.displayName = "PasswordField";
