import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegisterData, UserRole } from "../types/auth";
import { register } from "../services/authService";
import { ApiError } from "../types/eureur";
import { useAuth } from "../customhook/useAuth";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<UserRole>("student");

  const {setAccessToken , setUser , navigate } = useAuth() ;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const registerData: RegisterData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role,
      password_confirmation: confirmPassword,
    };

    // console.log( registerData) ;

    try {
      const result = await register(registerData);

      setAccessToken(result.data.token) ;
      setUser(result.data.user) ;

      if(result.data.user.role === 'student') {
        navigate('/student/dashboard') ;
      }else if(result.data.user.role === 'teacher') {
        navigate('/teacher/dashboard') ;
      }else {
        navigate('/') ;
      }

    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof ApiError) {
          console.log("Message:", error.message);
          console.log("Validation errors:", error.data);
        }
      } else {
        console.error("Unexpected error : ", error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              onChange={(event) => setFirstName(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              onChange={(event) => setLastName(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Confirm your password"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(event) => setRole(event.target.value as UserRole)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="p-1.5 font-bold">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
