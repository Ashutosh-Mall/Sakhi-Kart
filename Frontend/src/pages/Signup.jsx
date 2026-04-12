import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/right.png";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = ({ setIsLogin }) => {
  const [step, setStep] = useState("1");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handelPage = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // STEP 1 → SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/send-otp`,
        form,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setStep("2");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { email: form.email, otp },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLogin(true);

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">

      <div className="w-full max-w-5xl flex bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 p-6 md:p-10">

          {/* LOGO */}
          <h1 className="text-2xl font-bold text-green-900">
            Sakhi Kart <span className="text-pink-500">🌸</span>
          </h1>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-green-900 mt-6">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={handelPage}
              className="text-green-900 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mt-6 text-sm">
            <div className={`px-3 py-1 rounded-full ${step === "1" ? "bg-green-900 text-white" : "bg-gray-200"}`}>
              1
            </div>
            <span className="text-gray-500">→</span>
            <div className={`px-3 py-1 rounded-full ${step === "2" ? "bg-green-900 text-white" : "bg-gray-200"}`}>
              2
            </div>
          </div>

          {/* STEP 1 */}
          {step === "1" && (
            <form onSubmit={handleSendOtp} className="mt-6 space-y-4">

              <div>
                <label className="text-green-900 text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-green-900 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-green-900 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create password"
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Send OTP
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === "2" && (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">

              <div>
                <label className="text-green-900 text-sm font-medium">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Verify & Continue
              </button>
            </form>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block w-1/2 relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>

          <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center p-6">
            <p className="text-white text-center text-lg font-semibold leading-relaxed">
              Together we grow stronger 💚
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;