import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../customhook/useAuth";

function ProtectedRoute() {
  const { accessToken, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  ) {
    console.log("Already authenticated, redirecting to dashboard...");
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
