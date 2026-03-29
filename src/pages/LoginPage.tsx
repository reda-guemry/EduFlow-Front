import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginData } from "../types/auth";
import { login } from "../services/authService";

function LoginPage() {
    const [ password , setPassword ] = useState<string>('') ;
    const [email , setEmail] = useState<string>('') ; 
    
    async function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const loginData: LoginData = { email, password };

        // console.log('Login data : ', loginData);
        
        try {
            const result = await login(loginData) ;  
            console.log(result);
            
        }catch(error) {
            console.error(error)
        }
    }
  
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className=" p-1.5 font-bold">
          Dont have account{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
