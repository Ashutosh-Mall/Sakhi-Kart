import React, { useState } from "react";
import { FaRobot } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Send message to backend
  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };

    // UI me pehle hi show karo
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bot/chat`,
        { prompt: userMsg.text },
        { withCredentials: true }
      );

      const botMsg = {
        role: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-green-900 text-white text-2xl p-4 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <FaRobot />
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[320px] h-[420px] bg-white rounded-xl shadow-2xl z-50 flex flex-col">
          
          {/* Header */}
          <div className="bg-green-900 text-white p-3 flex justify-between items-center rounded-t-xl">
            <h2 className="font-semibold">Sakhi Kart</h2>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {chat.length === 0 && (
              <p className="text-sm text-gray-600">
                Hello 👋 Ask me anything about farming!
              </p>
            )}

            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-green-900 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-500">Typing...</p>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 py-1 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-green-900 text-white px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;