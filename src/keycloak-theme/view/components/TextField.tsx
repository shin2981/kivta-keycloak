import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import {
  authErrorTextClass,
  authFieldShell,
  authFloatingLabelClass,
  authInputInner,
} from "./authFieldStyles";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, error, className = "", inputClassName = "", id, placeholder: _ignored, ...props },
    ref,
  ) => {
    const inputId = id ?? `input-${label.replace(/\s/g, "-").toLowerCase()}`;
    return (
      <div className={cn("mb-4", className)}>
        <div
          className={cn(authFieldShell, error && "ring-2 ring-theme-negative")}
        >
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            className={cn(authInputInner, inputClassName)}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <label htmlFor={inputId} className={authFloatingLabelClass}>
            {label}
          </label>
        </div>
        {error && (
          <p id={`${inputId}-error`} className={authErrorTextClass}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";
