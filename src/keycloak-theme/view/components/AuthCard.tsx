import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-xl bg-[var(--kc-surface,#1e293b)] shadow-lg border border-[var(--kc-border,#334155)] p-8 ${className}`}
      style={{
        background: "var(--kc-surface, #1e293b)",
        borderColor: "var(--kc-border, #334155)",
      }}
    >
      {children}
    </div>
  );
}
