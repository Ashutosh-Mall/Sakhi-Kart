import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import bgImage from "../assets/right.png";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/get`,
        { withCredentials: true }
      );
      setProfile(res.data.profile);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // AUTO-FILL
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // IMAGE PREVIEW
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  // UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("phone", form.phone);
      data.append("address", form.address);
      data.append("bio", form.bio);

      if (file) {
        data.append("profilePic", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/update`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // UPGRADE ROLE
  const handleUpgrade = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/profile/upgrade-vendor`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message);

      const updatedUser = { ...user, role: "vendor" };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upgrade failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl flex bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-6 md:p-10">

          <h1 className="text-2xl font-bold text-green-900">
            Sakhi Kart <span className="text-pink-500">🌸</span>
          </h1>

          <h2 className="text-3xl font-bold text-green-900 mt-6">
            Update Profile
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            Keep your details updated to grow better 💚
          </p>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center mt-6">
            <div className="w-24 h-24 rounded-full border-4 border-green-900 overflow-hidden flex items-center justify-center bg-gray-100">
              {preview || profile?.profilePic ? (
                <img
                  src={preview || profile?.profilePic}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-6xl text-green-900" />
              )}
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              id="fullName"
              value={form.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
            />

            <input
              id="phone"
              value={form.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
            />

            <input
              id="address"
              value={form.address}
              placeholder="Village / Address"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
            />

            <textarea
              id="bio"
              value={form.bio}
              placeholder="Tell something about yourself..."
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none text-sm"
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {/* ROLE UPGRADE */}
            {user?.role !== "vendor" ? (
              <button
                type="button"
                onClick={handleUpgrade}
                className="w-full border border-yellow-500 text-yellow-700 py-3 rounded-xl hover:bg-yellow-100 transition"
              >
                Become a Community Leader 👩‍🌾
              </button>
            ) : (
              <p className="text-green-700 text-center font-semibold">
                You are a Community Leader ✔
              </p>
            )}
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block w-1/2 relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>

          <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center p-6">
            <p className="text-white text-center text-lg font-semibold">
              Small steps today lead to big changes tomorrow 💚
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpdateProfile;