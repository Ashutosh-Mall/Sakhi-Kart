import React from "react";
import {
  IoPeopleOutline,
  IoWalletOutline,
  IoChatbubblesOutline,
  IoLeafOutline,
} from "react-icons/io5";
import Card from "../components/Card";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const {t} = useLanguage()
  return (
    <div className="w-full min-h-screen bg-[#f7faf7] font-sans">

      {/* HERO SECTION */}
      <div className="relative text-center px-4 py-20 md:py-32 bg-gradient-to-b from-green-100 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight">
          {t.title}
        </h1>

        <p className="mt-6 text-green-800 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          A simple digital platform helping rural women build financial
          independence through community, learning, and smart tools.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-green-900 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-800 transition">
            Get Started
          </button>

          <button className="border-2 border-green-900 text-green-900 px-8 py-3 rounded-xl hover:bg-green-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* PROBLEM + SOLUTION */}
      <div className="px-6 md:px-24 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-900">
            The Problem
          </h2>

          <p className="mt-4 text-green-800 leading-relaxed">
            Millions of rural women contribute to the grassroots economy,
            yet they lack access to digital financial systems. Complex apps,
            language barriers, and lack of guidance make financial growth
            difficult.
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-green-900">
            Our Solution
          </h2>

          <p className="mt-4 text-green-800 leading-relaxed">
            Sakhi Kart provides a simple, voice-enabled platform where women
            can save money, learn financial concepts, and grow together in
            trusted community groups.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="px-4 md:px-20 py-14 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-green-900 mb-10">
          What You Can Do
        </h2>

        <div className="flex flex-wrap justify-center">
          <Card
            title="Community Groups"
            description="Join women-led groups and grow savings together."
            icon={<IoPeopleOutline className="text-3xl text-green-700" />}
          />

          <Card
            title="Easy Savings"
            description="Track your money easily without confusion."
            icon={<IoWalletOutline className="text-3xl text-green-700" />}
          />

          <Card
            title="Voice Assistant"
            description="Ask questions in Hindi and get simple answers."
            icon={<IoChatbubblesOutline className="text-3xl text-green-700" />}
          />

          <Card
            title="Income Growth"
            description="Learn ways to increase your income step-by-step."
            icon={<IoLeafOutline className="text-3xl text-green-700" />}
          />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="px-6 md:px-24 py-16 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-900">
              1. Join
            </h3>
            <p className="text-green-800 mt-2 text-sm">
              Create your account easily using phone number.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-900">
              2. Connect
            </h3>
            <p className="text-green-800 mt-2 text-sm">
              Join your local group and start saving together.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-900">
              3. Grow
            </h3>
            <p className="text-green-800 mt-2 text-sm">
              Learn, earn, and become financially independent.
            </p>
          </div>
        </div>
      </div>

      {/* IMPACT STATS */}
      <div className="px-6 md:px-20 py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-10">
          Our Vision
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl font-bold text-green-900">1M+</h3>
            <p className="text-green-800 mt-2">Women Empowered</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-green-900">500K+</h3>
            <p className="text-green-800 mt-2">Savings Groups</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-green-900">100%</h3>
            <p className="text-green-800 mt-2">Accessible & Simple</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-900 text-white text-center py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Journey Today
        </h2>

        <p className="mt-3 text-green-100 text-base">
          Join Sakhi Kart and take the first step towards financial freedom.
        </p>

        <button className="mt-6 bg-white text-green-900 px-8 py-3 rounded-xl font-semibold hover:bg-green-100 transition">
          Join Now
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-[#0f1115] text-gray-300 text-center py-6 text-sm">
        © {new Date().getFullYear()} Sakhi Kart. All rights reserved.
      </div>
    </div>
  );
};

export default Home;