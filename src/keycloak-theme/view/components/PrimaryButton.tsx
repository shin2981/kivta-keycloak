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
        "w-full min-h-[56px] rounded-[10px] bg-black px-4 py-3 text-[17px] font-semibold text-white transition hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-theme-surface disabled:opacity-50",
        className
      )}
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
