import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-green-50 pt-[70px] px-4">

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center py-10">

        <h1 className="text-4xl font-bold text-green-900 mb-4">
          About Sakhi Kart 🌿
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          Sakhi Kart is a smart marketplace built to empower farmers, rural women,
          and small sellers by giving them digital tools to sell their products
          directly to buyers without middlemen.
        </p>

      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 py-10">

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-900 mb-2">
            🌾 For Farmers
          </h2>
          <p className="text-gray-600 text-sm">
            Easily list crops, vegetables, and products with AI-powered image
            enhancement and smart pricing support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-900 mb-2">
            👩‍🌾 For Rural Sellers
          </h2>
          <p className="text-gray-600 text-sm">
            A simple mobile-friendly platform to sell handmade and local
            products without technical knowledge.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-900 mb-2">
            🤖 AI Powered
          </h2>
          <p className="text-gray-600 text-sm">
            Smart AI helps generate product images, descriptions, and chatbot
            support for easy selling.
          </p>
        </div>

      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center my-10">

        <h2 className="text-2xl font-bold text-green-900 mb-3">
          Our Mission 🚀
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Our mission is to digitize rural India and make farming and small
          business selling simple, smart, and profitable. We believe technology
          should empower every hand that grows and creates.
        </p>

      </div>

    </div>
  );
};

export default About;