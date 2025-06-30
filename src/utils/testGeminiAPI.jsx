import { OPENAI_API_KEY } from "./Constants";

const testGeminiAPI = async () => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${OPENAI_API_KEY
      
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Say hello!",
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  console.log("🌟 Full Gemini Response:", data);
};

export default testGeminiAPI;