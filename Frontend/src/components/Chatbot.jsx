import React, { useState, useRef } from "react";
import { FaRobot, FaMicrophone } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);

  // 💬 Send Text Message
  const handleSend = async (text) => {
    const msg = text || message;
    if (!msg.trim()) return;

    const userMsg = { role: "user", text: msg };

    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bot/chat`,
        { prompt: msg },
        { withCredentials: true }
      );

      const botMsg = {
        role: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch {
      toast.error("Chat failed");
    } finally {
      setLoading(false);
    }
  };

  // 🎙️ Voice Input
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      handleSend(voiceText); // auto send
    };

    recognition.onerror = () => {
      toast.error("Voice recognition error");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-green-900 text-white text-2xl p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaRobot />
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[320px] h-[420px] bg-white rounded-xl shadow-2xl flex flex-col z-50">

          {/* Header */}
          <div className="bg-green-900 text-white p-3 flex justify-between items-center rounded-t-xl">
            <h2 className="font-semibold">Sakhi Kart AI</h2>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {chat.length === 0 && (
              <p className="text-sm text-gray-600">
                👋 Ask me anything by typing or speaking
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

          {/* Input + Voice */}
          <div className="p-2 border-t flex gap-2 items-center">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 py-1 outline-none"
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
            />

            {/* 🎙️ Voice Button */}
            <button
              onClick={startVoice}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              <FaMicrophone />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
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