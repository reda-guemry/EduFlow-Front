import { useContext } from "react";
import type { AuthContextType } from "../types/auth";
import { AuthContext } from "../context/context";




export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
