import { genrateResponse } from "../config/openrouter.js";

export const replyToChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Get AI response
    const aiResponse = await genrateResponse(prompt);

    // 4. Send response
    return res.status(200).json({
      success: true,
      reply: aiResponse,
    });

  } catch (err) {
    console.error("Chat Error:", err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};