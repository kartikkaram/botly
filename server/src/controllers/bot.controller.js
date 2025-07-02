import { Bot } from "../models/bot.model.js";
import { cosineSimilarity } from "../utils/vector-db.js";
import { sendToLLM } from "../utils/send-to-llm.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getEmbedding, initializeEmbedder } from "../utils/embeddings.js";
import { updateDashboard } from "../utils/dashboard.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { Dashboard } from "../models/dashboard.model.js";
import { apiKeyGenerator } from "../utils/apikeyGenerator.js";
import { csvParser } from "../utils/csv-parser.js";
import { deleteFromTemp } from "../utils/deleteFromTemp.js";
import { User } from "../models/user.models.js";

export const chatWithBot = AsyncHandler(async (req, res) => {
  const { apikey } = req.headers;
  const { userMessage } = req.body;
  const ipaddress= req.ip || req.socket.remoteAddress 
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
  if(topK.length==0){
        throw new ApiError( 404,"no relevant context was found" );
  }


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
  const reply = await sendToLLM(prompt,  bot.model); 
if(!reply){
  throw new ApiError(401,"no response from the bot")
}
await updateDashboard({ipaddress,apikey:bot.apikey,userMessage,reply,userEmbedding})
  return res
  .status(201)
  .json(new ApiResponse(201,"bot response",reply))
})



export const renewBotApiKey=AsyncHandler(async (req,res) => {
  const {oldApiKey}=req.body;
  if(!oldApiKey){
    throw new ApiError(400,"please provide old apikey")
  }

  const existingBot = await Bot.findOne({
    apikey: oldApiKey
});


  if(!existingBot){
      throw new ApiError(404,"bot not found")
  }
  const apiKey=apiKeyGenerator()
  existingBot.apikey=apiKey
  await existingBot.save()

try {
await Dashboard.updateMany({ apikey: oldApiKey }, { apikey: apiKey });
} catch (error) {
  throw new ApiError(401, "error while updating dashboardDocs")
}

return res
.status(200)
.json(new ApiResponse(200,"apikey renewed", apiKey))

})



export const updateBot = AsyncHandler(async (req, res) => {
  const { apikey } = req.headers;
  const updateData = req.body;

  if (!apikey) {
    throw new ApiError(400,"API key is required");
  }

  const updatedBot = await Bot.findOneAndUpdate(
    { apikey },
    { $set: updateData },
    { new: true } // Return the updated document
  );

  if (!updatedBot) {
    throw new ApiError(404,"Bot not found with the provided API key");
  }

 return res
 .status(200)
 .json(new ApiResponse(200,"Bot updated successfully", updatedBot));
});

export const addContext=AsyncHandler(async (req, res) => {
  const {apikey}=req.headers
  if (!apikey) {
    throw new ApiError(400,"API key is required");
  }
  data=req.body.data
  if (!data) {
  throw new ApiError(400, "Missing 'data' field in request body");
}
const{jsonContext}=data

if(!jsonContext || jsonContext==""){
  throw new ApiError(404, " provide website context in json ")
}

const bot=await Bot.findOne({apikey})
  if(!bot){
    throw new ApiError(400,"bot not found")
  }
  let parsedContext;
    if(jsonContext){
      try {
        parsedContext = typeof jsonContext === "string"
        ? JSON.parse(jsonContext)
        : jsonContext;
      } catch (err) {
        throw new ApiError(400, "Invalid website context format");
      }
    }
    // Generate embeddings for each context item and enrich it
    await initializeEmbedder();
    const enrichedContext = await Promise.all(
      parsedContext.map(async (entry) => {
        const embedding = await getEmbedding(entry.input);
        return {
          input: entry.input,
          output: entry.output,
          embedding,
        };
      })
    );
    if(!enrichedContext){
      throw new ApiError(400, "error while creating embeddings")
    }
  
    bot.websitecontext.push(enrichedContext)

    await bot.save()

    return res
    .status(200)
    .json(new ApiResponse(200,"faqs updated",{}))
})

export const getBot=AsyncHandler(async (req, res)=> {
  
  const { userId:clerkId } = getAuth(req)
  
       if(!clerkId){
          throw new ApiError(400,"user has not signed in")
       }
  
      const self= await User.findOne({clerkid:clerkId})
  
      if(!self){
          throw new ApiError(400,"user not found")
      }

      const bot =await Bot.find({ownerid:self._id}).lean()

     if(bot.length==0){
    throw new ApiError(400,"bot not found")
  }
const bots=bot.map((bot) => {
  return {...bot, websitecontext:bot.websitecontext.map((context) => {
    return {input:context.input,output:context.output}
  }
  
  )}
}
)

  return res
  .status(200)
  .json(new ApiResponse(200,"user bots", bots))
})
