export const generateProductDetailsFromImage = async ({ imageUrl }) => {
  try {
    if (!imageUrl) {
      return {
        title: "",
        description: "",
      };
    }

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
Analyze this product image and generate ecommerce content.

STRICT RULES:
- DO NOT change the product
- DO NOT guess brand names
- DO NOT hallucinate features
- Only describe what is clearly visible

Return JSON ONLY:
{
  "title": "short product title",
  "description": "2-3 line description"
}
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
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!aiRes.ok) throw new Error("AI request failed");

    const aiData = await aiRes.json();
    let content = aiData?.choices?.[0]?.message?.content;

    console.log("🧠 Raw AI Response:", content);

    let parsed;

try {
  // 🧹 Remove ```json and ``` wrappers 
  const cleanContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  parsed = JSON.parse(cleanContent);

  console.log("✅ Parsed:", parsed);

} catch (err) {
  console.log("⚠️ JSON parse failed:", err.message);

  parsed = {
    title: "Premium Product",
    description: "High-quality product with clean design and modern look.",
  };
}

    return {
      title: parsed.title || "Premium Product",
      description:
        parsed.description ||
        "High-quality product with clean design and modern look.",
    };
  } catch (err) {
    console.error("❌ Product Details Error:", err.message);

    return {
      title: "",
      description: "",
    };
  }
};