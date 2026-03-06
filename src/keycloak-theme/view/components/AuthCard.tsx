import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-lg bg-[var(--bg-white)] border border-[var(--border-light)] p-8 ${className}`}
      style={{
        background: "var(--bg-white)",
        borderColor: "var(--border-light)",
      }}
    >
      {children}
    </div>
  );
}
