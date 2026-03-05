import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({ children, className = "" }: AuthLayoutProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${className}`}
      style={{ background: "var(--bg-body)" }}
    >
      {children}
    </div>
  );
}
