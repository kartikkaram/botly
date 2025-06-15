
import { GoogleGenAI } from "@google/genai";


export const getGeminiEmbedding = async (text) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: text,
         config: {
            taskType: "SEMANTIC_SIMILARITY",
        }
    });
    
  const embeddings = response.embeddings.map((embedding) => embedding.values);

return embeddings
  

};

