import { createContext, use, useState, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAccessToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

