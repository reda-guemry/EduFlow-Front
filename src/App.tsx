import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardTeacher from "./pages/DashboardTeacher";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckRoleNavigate from "./components/CheckRoleNavigate";
import Favorite from "./pages/Favorite";


function App() {

  // const { user } = useAuth();

  

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <Routes>

          {/* <Route navigate={user ? true : false} > */}
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/" element={<LoginPage />} ></Route>
          {/* </Route> */}

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<CheckRoleNavigate />}></Route>

            <Route path="/student/dashboard" element={<DashboardStudent />}></Route>
            <Route path="/teacher/dashboard" element={<DashboardTeacher />}></Route>
            <Route path="/student/favorites" element={<Favorite />}></Route>

          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
