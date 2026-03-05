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
        "text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] hover:underline focus:outline-none focus:underline",
        className
      )}
      style={{ color: "var(--primary)" }}
      {...props}
    >
      {children}
    </a>
  );
}
