import { Bot } from "../models/bot.model.js";
import { getGeminiEmbedding } from "../utils/embeddings.js";
import { cosineSimilarity } from "../utils/vector-db.js";
import { sendToGemini } from "../utils/send-to-llm.js";

export const chatWithBot = async (req, res) => {
  const { apiKey } = req.headers;
  const { userMessage } = req.body;

  if (!apiKey || !userMessage) {
    return res.status(400).json({ error: "Missing API Key or message." });
  }

  const bot = await Bot.findOne({ _id: apiKey });
  if (!bot) {
    return res.status(404).json({ error: "Bot not found." });
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

  const reply = await sendToGemini(prompt, bot.model); // or switch to Grok/DeepSeek based on bot.model

  res.status(200).json({ reply });
};
