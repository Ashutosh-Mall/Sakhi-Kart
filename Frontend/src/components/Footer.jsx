import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold">
          Kishan Connect
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
            <FaFacebookF className="text-3xl md:text-4xl" />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
            <FaInstagram className="text-3xl md:text-4xl" />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
            <FaTwitter className="text-3xl md:text-4xl" />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
            <FaLinkedinIn className="text-3xl md:text-4xl" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-6 text-sm text-green-200">
        &copy; {new Date().getFullYear()} Kishan Connect. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;