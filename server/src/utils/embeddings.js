import axios from "axios";

export const getGeminiEmbedding = async (text) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedText',
    {
      text,
    },
    {
      params: { key: API_KEY },
    }
  );

  return response.data.embedding.values; // returns array of floats
};
