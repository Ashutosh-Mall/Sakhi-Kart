import {useState, useRef} from "react";
import {motion} from "framer-motion";
import axios from "axios";

export default function VoiceAssistant() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true; // ✅ important
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      try {
        const transcript = event.results[0][0].transcript;
        setText(transcript);

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/voice`, {
          message: transcript,
        });

        setResponse(res.data.reply);
        speak(res.data.reply);

        recognition.stop(); // ✅ stop after response
      } catch (error) {
        console.error("Frontend Error:", error);
        setResponse("Error getting response from server");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);

      if (event.error === "no-speech") {
        console.log("No speech detected, restarting...");
        recognition.start(); // ✅ auto retry
      } else {
        setListening(false);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const speak = (text) => {
    if (!text) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-900 p-6">
      <motion.h1 className="text-4xl font-bold mb-8 text-green-900">
        Sakhi AI Voice Assistant
      </motion.h1>

      <motion.button
        onClick={startListening}
        whileTap={{scale: 0.9}}
        animate={{scale: listening ? 1.2 : 1}}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
          listening ? "bg-red-500 text-white" : "bg-green-700 text-white"
        }`}
      >
        {listening ? "🎙️" : "🎧"}
      </motion.button>

      <p className="mt-4 text-green-800">
        {listening ? "Listening..." : "Click to start speaking"}
      </p>

      <div className="mt-8 w-full max-w-xl bg-white rounded-2xl p-4 shadow-md border border-green-200">
        <p className="text-sm text-green-600">You</p>
        <p className="text-green-900">{text || "..."}</p>
      </div>

      <div className="mt-4 w-full max-w-xl bg-white rounded-2xl p-4 shadow-md border border-green-200">
        <p className="text-sm text-green-600">Assistant</p>
        <p className="text-green-900">{response || "Waiting..."}</p>
      </div>
    </div>
  );
}
