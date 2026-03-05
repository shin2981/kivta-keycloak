import type { ReactNode } from "react";

interface AuthHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AuthHeader({ children, className = "" }: AuthHeaderProps) {
  return (
    <header className={`mb-6 text-center ${className}`}>
      <h1 className="text-xl font-semibold text-[var(--text-main)]">{children}</h1>
    </header>
  );
}
