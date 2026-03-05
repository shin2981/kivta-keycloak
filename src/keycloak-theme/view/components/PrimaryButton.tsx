import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "w-full rounded-lg bg-[var(--kc-primary)] px-4 py-2.5 font-medium text-[var(--kc-primary-foreground)] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--kc-primary)] focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50",
        className
      )}
      style={{
        background: "var(--kc-primary, #3b82f6)",
        color: "var(--kc-primary-foreground, #fff)",
      }}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
