import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth";
import { refreshAccessToken } from "../services/authService";
import { ApiError } from "../types/eureur";
// import { useAuth } from "../customhook/useAuth";
import { useNavigate } from "react-router";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate() ;
 
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authRefresh = await refreshAccessToken();

        // console.log(authRefresh);

        setAccessToken(authRefresh.token);
        setUser(authRefresh.user);

      } catch (error) {
        if (error instanceof ApiError && error.status === 422) {
          navigate("/login");
        }
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
        navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
