import { useAuth } from "../customhook/useAuth";
import { logout } from "../services/authService";

function Navbar() {
  const { setAccessToken, setUser, navigate, user } = useAuth();

  const handleLogout = () => {
    logout(setAccessToken, setUser, navigate);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600">TeacherSpace</h1>
        </div>

        <div className="flex items-center gap-6 text-gray-700 font-medium">
          {user && (
            <span className="text-lg font-semibold">
              Welcome, {user.first_name} {user.last_name}
            </span>
          )}

          <button
            className="hover:text-blue-600 transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          {user?.role === "student" && (
            <button
              className="hover:text-blue-600 transition"
              onClick={() => navigate("/student/favorites")}
            >
              Favorites
            </button>
          )}

          {(user && (
            <>
              <button
                className="hover:text-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button>
                <a onClick={() => navigate('/profile')} className="hover:text-blue-600 transition">
                  Profile
                </a>
              </button>
            </>
          )) || (
            <>
              <button
                className="hover:text-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="hover:text-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
