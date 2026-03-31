import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth";
import { refreshAccessToken } from "../services/authService";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authRefresh = await refreshAccessToken();

        setAccessToken(authRefresh.token);
        setUser(authRefresh.user);

      } catch (error) {
        console.error("Error refreshing access token:", error);
      } finally {
        setAuthLoading(false);
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        setAccessToken,
        setUser,
        authLoading,
        setAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
