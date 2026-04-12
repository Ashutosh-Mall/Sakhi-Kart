export const genrateResponse = async (prompt) => {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free", // ✅ free model
      messages: [
        {
          role: "system",
          content:
            "You are a smart Kisan Assistant. Help farmers. Reply in simple Hinglish in 2-3 short sentences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 300, 
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error("OpenRouter Error: " + err);
  }

  const data = await res.json();

  // ✅ Extract only useful reply
  return data.choices[0].message.content;
};