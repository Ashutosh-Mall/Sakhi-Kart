import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }

    toast.success("Message sent successfully 🚀");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 pt-[70px]">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* 🟢 LEFT SIDE */}
        <div className="bg-green-900 text-white p-6 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-3">
            Contact Sakhi Kart 🌿
          </h1>

          <p className="text-sm text-green-100 mb-4">
            We’re here to help farmers and sellers grow together.
            Reach out anytime for support, feedback, or queries.
          </p>

          <div className="space-y-2 text-sm">
            <p>📍 India</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@sakhikart.com</p>
          </div>

        </div>

        {/* 🟡 RIGHT SIDE FORM */}
        <div className="p-6">

          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Send Message ✉️
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-900"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-900"
            />

            <textarea
              name="message"
              placeholder="Your Message..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-900"
            />

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Send Message 🚀
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Contact;