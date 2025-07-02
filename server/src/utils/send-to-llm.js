import axios from "axios";
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
import { ApiError } from "./apiError.js";
dotenv.config({path:"src/.env"});
import { Mistral } from '@mistralai/mistralai';

// Replace these with your actual API keys
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;


// === ROUTER FUNCTION ===
export const sendToLLM = async (prompt, model) => {
  switch (model.toLowerCase()) {
    case "gemini":
      return await sendToGemini(prompt);
    case "deepseek":
      return await sendToOpenRouter(prompt,"deepseek/deepseek-r1:free");
    // case "mistral":
    //   return await sendToOpenRouter(prompt,"mistralai/mistral-nemo:free"); 
    case "mistral":
      return await sendToMistral(prompt); 
    default:
      throw new Error(`Unsupported model: ${model}`);
  }
};

const sendToGemini = async (prompt) => {

  try {

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text  || "Gemini failed to respond.";

  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new ApiError(404, "no response recieved from gemini")
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
   
    throw new ApiError(400, `Error reaching ${model} via OpenRouter.`)
  }
};

const sendToMistral = async (prompt)=>{


  try{

      
    const client = new Mistral({apiKey: MISTRAL_API_KEY});

    const chatResponse = await client.chat.complete({
      model: 'open-mixtral-8x7b',
      messages: [{role: 'user', content: prompt }],
    });

    return chatResponse.choices[0].message.content;

  }catch(error){
    console.error("Mistral error:", error?.response?.data || error.message);
    throw new ApiError(404, "no response recieved from gemini")
  }



}


export { sendToGemini, sendToOpenRouter };

