import React from "react";

const Hero = ({ bgImage }) => {
  return (
    <div
      className="md:flex h-screen md:h-[900px] lg:h-[700px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex-2/3 flex items-center justify-center px-6 md:px-12 z-10 pt-[30px] md:pt-[5px]">
        <div className="text-center md:text-left max-w-xl md:pr-[10px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 leading-tight">
            Connect Farmers Directly
          </h1>
          <p className="mt-4 text-sm sm:text-md md:text-lg text-green-800">
            Empowering farmers to sell directly to buyers without middlemen.
            Fresh produce, better prices, and smarter agriculture.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-yellow-900 text-yellow-900 hover:bg-white hover:text-green-800 font-semibold rounded-xl transition">
              Explore
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1/3 flex items-center justify-center text-white relative z-10"></div>
    </div>
  );
};

export default Hero;