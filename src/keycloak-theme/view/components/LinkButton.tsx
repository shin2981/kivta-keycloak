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
        "text-[15px] font-medium text-theme-accent hover:text-theme-accent-dark hover:underline focus:outline-none focus:underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
