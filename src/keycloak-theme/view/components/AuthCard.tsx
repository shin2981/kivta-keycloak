import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-lg border border-theme-border-light bg-theme-surface p-8 ${className}`}
    >
      {children}
    </div>
  );
}
