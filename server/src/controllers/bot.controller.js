import { Bot } from "../models/bot.model.js";
import { getEmbedding } from "../utils/embeddings.js";
import { cosineSimilarity } from "../utils/vector-db.js";
import { sendToLLM } from "../utils/send-to-llm.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const chatWithBot = async (req, res) => {
  const { apikey:apiKey } = req.headers;
  const { userMessage } = req.body;
  if (!apiKey || !userMessage) {
    throw new ApiError(400, "Missing API Key or message." );
  }

  const bot = await Bot.findOne({ _id: apiKey }).lean();
  if (!bot) {
    throw new ApiError( 404,"Bot not found." );
  }

  const userEmbedding = await getEmbedding(userMessage);
  if(!userEmbedding){
      throw new ApiError( 404,"embeddings were not generated." );
  }

  // Search through embedded contexts
  const scoredContexts = bot.websitecontext
    .filter(ctx => ctx.embedding)
    .map(ctx => ({
      ...ctx,
      score: cosineSimilarity(userEmbedding, ctx.embedding)
    }));

  // Sort by similarity and pick top 3
  const topK = scoredContexts.sort((a, b) => b.score - a.score).slice(0, 3);
  if(!topK){
        throw new ApiError( 404,"topK were not created." );
  }

  debugger

  console.log("topK context: ", topK);

  const contextText = topK.map(c => `Q: ${c.input}\nA: ${c.output}`).join("\n");
             if(!contextText){
        throw new ApiError( 404,"context text was not created." );
  }
  const prompt = `${bot.prompt}\n\nUse the following context to answer:\n${contextText}\n\nUser: ${userMessage}\n

  avoid replying to messages that are out of bot's capabilities or not matching to its target audience
  
  Bot:`;
  if(!prompt){
        throw new ApiError( 404,"topK were not created." );
  }
  console.log(prompt)
  const reply = await sendToLLM(prompt,  bot.model); // or switch to Grok/DeepSeek based on bot.model
if(!reply){
  throw new ApiError(401,"no response from the bot")
}
  return res
  .status(201)
  .json(new ApiResponse(201,"bot response",reply))
};
