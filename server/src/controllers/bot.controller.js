import { Bot } from "../models/bot.model.js";
import { cosineSimilarity } from "../utils/vector-db.js";
import { sendToLLM } from "../utils/send-to-llm.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getEmbedding, initializeEmbedder } from "../utils/embeddings.js";
import { updateDashboard } from "../utils/dashboard.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

export const chatWithBot = async (req, res) => {
  const { apikey } = req.headers;
  const { userMessage } = req.body;
  const ipaddress= req.socket.remoteAddress
  if (!apikey || !userMessage) {
    throw new ApiError(400, "Missing API Key or message." );
  }

  const bot = await Bot.findOne({ apikey }).lean();
  if (!bot) {
    throw new ApiError( 404,"Bot not found." );
  }
await initializeEmbedder();
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
  const contextText = topK.map(c => `Q: ${c.input}\nA: ${c.output}`).join("\n");
             if(!contextText){
        throw new ApiError( 404,"context text was not created." );
  }
  console.log(contextText)
  const prompt = `${bot.prompt}\n\nUse the following context to answer:\n${contextText}\n\nUser: ${userMessage}\n
{
  "instructions": "You are an AI assistant designed to provide responses **strictly within the defined scope and context** provided. If a query falls outside the context, do not attempt to generate an answer. Instead, respond politely with: 'I'm sorry, I cannot assist with that. Please consult other resources or contact support for more information.' Ensure that all responses stay relevant and do not speculate or provide information beyond the defined parameters."
}


  Bot:`;
  if(!prompt){
        throw new ApiError( 404,"topK were not created." );
  }
  const reply = await sendToLLM(prompt,  bot.model); // or switch to Grok/DeepSeek based on bot.model
if(!reply){
  throw new ApiError(401,"no response from the bot")
}
await updateDashboard({ipaddress,apikey:bot.apikey,userMessage,reply})
  return res
  .status(201)
  .json(new ApiResponse(201,"bot response",reply))
};



export const renewBotApiKey=AsyncHandler(async (req,res) => {
  const apiKey=apiKeyGenerator()


})