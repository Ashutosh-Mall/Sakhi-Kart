import React, {useState} from "react";
import {Link} from "react-router-dom";
import { toast } from "react-hot-toast";
import {IoMdSearch} from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserLarge} from "react-icons/fa6";
import {FaCartShopping} from "react-icons/fa6";
import {MdDashboard} from "react-icons/md";
import {FaHeart} from "react-icons/fa6";
import {IoMdSettings} from "react-icons/io";
import {IoLogOut} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
const Navbar = ({isLogin, setIsLogin}) => {
  const navigate = useNavigate();
  const {lang, setLang} = useLanguage()
  // const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const loginUser = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogOut = async (e) => {
    try {
      const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/logout`,{},
      {withCredentials: true},
    );
    toast.success(res.data.message);
    localStorage.removeItem("user");
    setIsLogin(false);
    navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const handleUpdateProfile = (e) =>{
    navigate("/updateProfile");
  }

  const handleProfile = (e) =>{
    navigate("/profile");
  }

  return (
    <>
      <div className="w-full h-[60px] p-3 z-20 fixed top-0 left-0 backdrop-blur-md bg-green-900 border-b border-white/20">
        <div className="flex justify-between md:px-12 items-center">
          <div>
            <h1 className=" text-xl md:text-2xl font-bold text-white">
              Sakhi K<span className="text-yellow-500">a</span>rt
            </h1>
          </div>
          <div>
            <ul className="hidden md:flex gap-15">
              <li>
                <Link
                  to={"/"}
                  className="font-semibold text-white hover:border-b-2 text-md"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="font-semibold text-white hover:border-b-2 text-md"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="font-semibold text-white hover:border-b-2 text-md"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/marketplace"}
                  className="font-semibold text-white hover:border-b-2 text-md"
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  to={"/voice"}
                  className="font-semibold text-white hover:border-b-2 text-md"
                >
                  Voice Assistant
                </Link>
              </li>
            </ul>
          </div>
          <div className=" flex justify-between items-center gap-5">
            <form onSubmit={handleSubmit}>
              <div className="hidden md:flex border-2 border-white rounded-lg p-1 px-2 items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none text-white"
                />
                <button type="submit">
                  <IoMdSearch className="text-xl text-white" />
                </button>
              </div>
            </form>
            {!isLogin ? (
              <div className="hidden md:block">
                <button
                  onClick={loginUser}
                  className="text-md px-4 py-1 bg-white text-green-900 rounded-lg hover:bg-green-200 transition-all duration-300 shadow-md"
                >
                  LogIn
                </button>
              </div>
            ) : (
              <div className=" relative hidden md:block">
                <button onClick={handleMenu}>
                  <FaUserCircle className="text-3xl text-white cursor-pointer" />
                </button>
                {menuOpen && (
                  <>
                    <div className="absolute w-[250px] bg-white/90 right-0 top-15 rounded-lg p-5 shadow-2xl backdrop-blur-md">
                      <div className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold cursor-pointer" onClick={handleProfile}>
                          <FaUserLarge className="text-xl text-green-900 my-1" />{" "}
                          Profile
                        </div>
                      </div>
                      <div className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold">
                          <FaCartShopping className="text-xl text-green-900  my-1" />{" "}
                          My Orders
                        </div>
                      </div>
                      <div className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold">
                          <MdDashboard className="text-xl text-green-900  my-1" />{" "}
                          Dashboard
                        </div>
                      </div>
                      <div className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold">
                          <FaHeart className="text-xl text-green-900  my-1" />{" "}
                          Wishlist
                        </div>
                      </div>
                      <div className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold cursor-pointer" onClick={handleUpdateProfile}>
                          <IoMdSettings className="text-xl text-green-900  my-1" />{" "}
                          Settings
                        </div>
                      </div>
                      <div
                        className="p-2 w-full h-[50px] bg-white my-3 transition-transform duration-300 hover:scale-105">
                        <div className="flex p-2 gap-3 itmes-center text-green-900 text-lg font-semibold cursor-pointer" onClick={handleLogOut}>
                          <IoLogOut className="text-xl text-green-900  my-1" />{" "}
                          Logout
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            <div>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <GiHamburgerMenu className=" md:hidden text-2xl text-white mt-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] backdrop-blur-md bg-green-900/30 z-30 transform transition-transform duration-300 rounded items-center ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="">
          <div>
            <h1 className=" text-xl md:text-2xl font-bold text-white m-4 mb-12">
              Sakhi K<span className="text-yellow-500">a</span>rt
            </h1>
          </div>
          <ul className="flex flex-col gap-6 w-[50%] justify-center itmes-center mx-auto">
            <li
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-center"
            >
              <Link to="/" className="text-green-900 font-bold">
                Home
              </Link>
            </li>
            <li
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-center"
            >
              <Link to="/contact" className="text-green-900 font-bold">
                Contact
              </Link>
            </li>
            <li
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-center"
            >
              <Link to="/about" className="text-green-900 font-bold">
                About
              </Link>
            </li>
            <li
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-center"
            >
              <Link to="/marketplace" className="text-green-900 font-bold">
                Market
              </Link>
            </li>
            <div>
              <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-black px-2 py-1 rounded"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="mr">Marathi</option>
      </select>
          </div>
          </ul>
          <div className="w-[80%] mx-auto my-5">
            <form onSubmit={handleSubmit}>
              <div className="flex border-2 border-green-900 rounded-lg p-1 items-center justify-center px-2 gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none text-green-900"
                />
                <button
                  type="submit"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <IoMdSearch className="text-xl text-green-900" />
                </button>
              </div>
            </form>
          </div>
          {!isLogin ? (
            <div className="w-[30%] mx-auto ">
              <button
                onClick={loginUser}
                className="text-md px-4 py-1 bg-green-900 text-white rounded-lg transition-all duration-300 shadow-md"
              >
                LogIn
              </button>
            </div>
          ) : (
            <div className=" w-[15%] mx-auto ">
              <button onClick={loginUser}>
                <FaUserCircle className="text-3xl text-green-900" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
