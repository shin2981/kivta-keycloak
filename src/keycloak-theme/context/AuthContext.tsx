import { createContext, type ReactNode } from "react";

export interface AuthContextValue {
  state: Record<string, unknown>;
  actions: Record<string, (...args: unknown[]) => void>;
  meta: Record<string, unknown>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export { AuthContext };

export function AuthProvider({
  value,
  children,
}: {
  value: AuthContextValue;
  children: ReactNode;
}) {
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
