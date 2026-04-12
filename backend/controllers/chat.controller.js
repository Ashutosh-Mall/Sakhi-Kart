import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const chatWithAI = async (req, res) => {
  const {message} = req.body;

  // ✅ validation
  if (!message || message.trim() === "") {
    return res.status(400).json({error: "Message is required"});
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct", // ✅ safer model
      messages: [
        {
          role: "system",
          content: `
You are Sakhi Kart AI Assistant.

You help rural users, farmers, and small sellers using simple Hindi + English (Hinglish).

Your responsibilities:
- Help users buy and sell products on Sakhi Kart
- Guide farmers about crops, farming tools, and prices
- Help in uploading products and using the app
- Explain everything in simple, friendly language
- Keep answers short, clear, and voice-friendly

Style rules:
- Speak naturally like a helpful friend
- Use simple Hinglish (not heavy English)
- Avoid long paragraphs
- Be polite, supportive, and practical

If user asks about products:
- Suggest marketplace usage
- Encourage listing or buying from Sakhi Kart

You are not a general chatbot — you are a Sakhi Kart marketplace assistant.
`
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = completion.choices?.[0]?.message?.content || "No response";

    res.json({reply});
  } catch (error) {
    console.error("OpenRouter Error:", error.message);

    res.status(500).json({
      error: "Failed to get AI response",
    });
  }
};
