import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../customhook/useAuth";




function ProtectedRoute() {
    const { accessToken, authLoading } = useAuth();
    

    if (authLoading) {
        return <div>Loading...</div>;
    }
    
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute;

