import fs from "fs";
import path from "path";
import uploadOnCloudinary from "../config/uploadToCloudinary.js";

export const generatePremiumProductImage = async ({ imageUrl }) => {
  try {
    if (!imageUrl) {
      return {
        prompt: "",
        imageUrl: null,
      };
    }

    // 🧠 STEP 1: Vision AI (Image Analysis)
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // ✅ Vision model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
Analyze this product image carefully and generate a premium ecommerce image prompt.

STRICT RULES:
- DO NOT change the product
- Preserve exact product type, shape, and color
- Do NOT hallucinate anything new
- Only improve presentation

Style:
- clean white background
- studio lighting
- ultra realistic
- product centered
- high detail

Return ONLY prompt text.
                `,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        temperature: 0.4,
        max_tokens: 120,
      }),
    });

    if (!aiRes.ok) throw new Error("AI request failed");

    const aiData = await aiRes.json();
    const prompt =
      aiData?.choices?.[0]?.message?.content?.trim() ||
      "Premium product photo, white background, studio lighting";

    console.log("🧠 Prompt:", prompt);

    // 🎨 STEP 2: Generate Image
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}`;

    console.log("🎨 Generated URL:", generatedImageUrl);

    // 📥 STEP 3: Download Image
    const imageRes = await fetch(generatedImageUrl);
    if (!imageRes.ok) throw new Error("Image generation failed");

    const buffer = await imageRes.arrayBuffer();

    // 📁 Temp folder (same as multer)
    const uploadDir = "temp/upload";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `generated-${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, Buffer.from(buffer));

    // ☁️ STEP 4: Upload to Cloudinary
    const cloudinaryRes = await uploadOnCloudinary(filePath);

    // 🧹 STEP 5: Delete local file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (!cloudinaryRes) {
      throw new Error("Cloudinary upload failed");
    }

    console.log("☁️ Final URL:", cloudinaryRes.secure_url);

    return {
      prompt,
      imageUrl: cloudinaryRes.secure_url,
    };
  } catch (err) {
    console.error("❌ Premium Image Error:", err.message);

    return {
      prompt: "",
      imageUrl: null,
    };
  }
};