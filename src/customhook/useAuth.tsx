import { useContext } from "react";
import type { AuthContextType } from "../types/auth";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate() ;
  // console.log('useAuth context: ', context); // Debugging line

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { setAccessToken, setUser , ...rest } = context;

  const handleAuthError = () => {
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  return {
    ...rest,
    setAccessToken,
    setUser,
    handleAuthError,
  };
  
};
