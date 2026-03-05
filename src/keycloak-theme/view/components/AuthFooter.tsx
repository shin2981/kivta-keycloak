import type { ReactNode } from "react";

interface AuthFooterProps {
  children: ReactNode;
  className?: string;
}

export function AuthFooter({ children, className = "" }: AuthFooterProps) {
  return (
    <footer className={`mt-6 text-center text-sm text-[var(--text-sub)] ${className}`}>
      {children}
    </footer>
  );
}
