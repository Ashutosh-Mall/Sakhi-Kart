import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/right.png";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelPage = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form,
        { withCredentials: true }
      );

      toast.success(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLogin(true);

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">

      <div className="w-full max-w-5xl flex bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-6 md:p-10">

          {/* LOGO */}
          <h1 className="text-2xl font-bold text-green-900">
            Sakhi Kart <span className="text-pink-500">🌸</span>
          </h1>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-green-900 mt-6">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={handelPage}
              className="text-green-900 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-green-900 font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-green-900 font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block w-1/2 relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>

          {/* OVERLAY TEXT */}
          <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center p-6">
            <p className="text-white text-center text-lg font-semibold leading-relaxed">
              Empowering women to grow, save, and lead with confidence 💚
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;