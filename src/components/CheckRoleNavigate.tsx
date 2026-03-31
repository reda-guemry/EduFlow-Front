import { Navigate } from "react-router-dom";
import { useAuth } from "../customhook/useAuth";



function CheckRoleNavigate() {

    const { user } = useAuth();


    if(!user){
        return <Navigate to="/login" replace />;
    }

    if (user?.role === "teacher") {
        return <Navigate to="/teacher/dashboard" replace />;
    }else if (user?.role === "student") {
        return <Navigate to="/student/dashboard" replace />;
    } 

    return null; // or a default component if needed

}


export default CheckRoleNavigate;