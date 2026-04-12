import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Explore from "./pages/Explore";
import MarketPlace from "./pages/MarketPlace";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import Chatbot from "./components/Chatbot";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  // check login from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  return (
    <div className="overflow-auto scrollbar-hide">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Chatbot/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/updateProfile" element={<UpdateProfile />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signup" element={<Signup setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
      </Routes>
    </div>
  );
};

export default App;