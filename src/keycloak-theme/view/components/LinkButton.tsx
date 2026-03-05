import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export function LinkButton({
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "text-sm text-[var(--kc-primary)] hover:underline focus:outline-none focus:underline",
        className
      )}
      style={{ color: "var(--kc-primary, #3b82f6)" }}
      {...props}
    >
      {children}
    </a>
  );
}
