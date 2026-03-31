import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardTeacher from "./pages/DashboardTeacher";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/" element={<LoginPage />}></Route>

          <Route >


            <Route
              path="/student/dashboard"
              element={<DashboardStudent />}
            ></Route>

            <Route
              path="/teacher/dashboard"
              element={<DashboardTeacher />}
            ></Route>


          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
