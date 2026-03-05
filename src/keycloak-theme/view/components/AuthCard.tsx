import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-[0.8rem] bg-[var(--bg-white)] shadow-lg border border-[var(--border)] p-8 ${className}`}
      style={{
        background: "var(--bg-white)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}
