import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-900 font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10 flex justify-center">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-900">
              Sakhi Kart <span className="text-pink-500">🌸</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Your Profile Overview
            </p>
          </div>

          <button className="mt-4 md:mt-0 bg-green-900 text-white px-5 py-2 rounded-xl text-sm hover:bg-green-800 transition">
            Edit Profile
          </button>
        </div>

        {/* PROFILE TOP */}
        <div className="flex flex-col items-center mt-8">

          <div className="w-28 h-28 rounded-full border-4 border-green-900 flex items-center justify-center overflow-hidden bg-gray-100 shadow">
            {profile?.profilePic ? (
              <img
                src={profile.profilePic}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-7xl text-green-900" />
            )}
          </div>

          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-green-900">
            {profile?.fullName || profile?.user?.username}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {user?.role === "vendor"
              ? "Community Leader 👩‍🌾"
              : "Sakhi Member 🌸"}
          </p>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

          <div className="p-4 rounded-xl border hover:shadow-md transition">
            <p className="text-xs text-gray-500">Username</p>
            <p className="font-semibold text-green-900">
              {profile?.user?.username}
            </p>
          </div>

          <div className="p-4 rounded-xl border hover:shadow-md transition">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-semibold text-green-900">
              {profile?.user?.email}
            </p>
          </div>

          <div className="p-4 rounded-xl border hover:shadow-md transition">
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-semibold text-green-900">
              {profile?.phone || "Not added"}
            </p>
          </div>

          <div className="p-4 rounded-xl border hover:shadow-md transition">
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-semibold text-green-900">
              {profile?.address || "Not added"}
            </p>
          </div>

          <div className="p-4 rounded-xl border md:col-span-2 hover:shadow-md transition">
            <p className="text-xs text-gray-500">About</p>
            <p className="font-semibold text-green-900">
              {profile?.bio || "Tell us about yourself..."}
            </p>
          </div>

          <div className="p-4 rounded-xl border md:col-span-2 hover:shadow-md transition">
            <p className="text-xs text-gray-500">Role</p>
            <p className="font-semibold text-green-900">
              {user?.role === "vendor"
                ? "Community Leader 👩‍🌾"
                : "Sakhi Member 🌸"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;