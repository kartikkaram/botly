import { Bot } from "../models/bot.model.js";
import { getGeminiEmbedding } from "../utils/embeddings.js";
import { cosineSimilarity } from "../utils/vector-db.js";
import { sendToGemini, sendToLLM } from "../utils/send-to-llm.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const chatWithBot = async (req, res) => {
  const { apiKey } = req.headers;
  const { userMessage } = req.body;

  if (!apiKey || !userMessage) {
    throw new ApiError(400, "Missing API Key or message." );
  }

  const bot = await Bot.findOne({ _id: apiKey });
  if (!bot) {
    throw new ApiError( 404,"Bot not found." );
  }

  const userEmbedding = await getGeminiEmbedding(userMessage);

  // Search through embedded contexts
  const scoredContexts = bot.websitecontext
    .filter(ctx => ctx.embedding)
    .map(ctx => ({
      ...ctx,
      score: cosineSimilarity(userEmbedding, ctx.embedding)
    }));

  // Sort by similarity and pick top 3
  const topK = scoredContexts.sort((a, b) => b.score - a.score).slice(0, 3);
  const contextText = topK.map(c => `Q: ${c.input}\nA: ${c.output}`).join("\n");

  const prompt = `${bot.prompt}\n\nUse the following context to answer:\n${contextText}\n\nUser: ${userMessage}\nBot:`;

  const reply = await sendToLLM(prompt, bot.model); // or switch to Grok/DeepSeek based on bot.model

  return res
  .status(201)
  .json(new ApiResponse(201,"bot response",reply))
};
