import axios from "axios";

// Replace these with your actual API keys
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// === ROUTER FUNCTION ===
export const sendToLLM = async (prompt, model) => {
  switch (model.toLowerCase()) {
    case "gemini":
      return await sendToGemini(prompt);
    case "deepseek":
      return await sendToOpenRouter(prompt,model);
    case "grok":
      return await sendToOpenRouter(prompt,model);
    default:
      throw new Error(`Unsupported model: ${model}`);
  }
};

const sendToGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini failed to respond.";
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    return "Error reaching Gemini API.";
  }
};

const sendToOpenRouter = async (prompt, model) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: model, // "deepseek-chat" or "grok-1"
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || `${model} gave no response.`;
  } catch (error) {
    console.error(`${model} (OpenRouter) error:`, error?.response?.data || error.message);
    return `Error reaching ${model} via OpenRouter.`;
  }
};
export { sendToGemini, sendToOpenRouter };

