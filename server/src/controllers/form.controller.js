import { Bot } from "../models/bot.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { csvParser } from "../utils/csv-parser.js";
import { generatePromptForBot } from "../utils/promptGenerator.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getEmbedding, initializeEmbedder } from "../utils/embeddings.js";
import { apiKeyGenerator } from "../utils/apikeyGenerator.js";
import { deleteFromTemp } from "../utils/deleteFromTemp.js";
import { getAuth } from "@clerk/express";




export const formController=AsyncHandler(async (req, res)=> {
  
  const { userId:clerkId } = getAuth(req)
  let data
  data=req.body
if (!data) {
  throw new ApiError(400, "Missing 'data' field in request body");
}


const {
  botName,
  botType,
  model,
  language,
  description,
  targetAudience,
  responseStyle,
  capabilities,
  restrictedTopics,
  jsonContext,
  manualContext,
  csvContext,
  websiteUrl,
} = data

if((!jsonContext || jsonContext=='' ) &&  (!csvContext || csvContext=='')  && !manualContext){
  throw new ApiError(404, "either provide website context in json or csv")
}
if (
  !botName ||
  !botType ||
  !model ||
  !description ||
  !targetAudience ||
  !responseStyle ||
  !capabilities ||
  !websiteUrl 
) {
  throw new ApiError(400, "All required fields must be provided.");
}

const user=await User.findOne({clerkid:clerkId})
if(!user){
  throw new ApiError(400,"user not found")
}

// Generate prompt using template
const structuredPrompt = generatePromptForBot({
  bottype:botType,
  websiteurl:websiteUrl,
  description,
  responsestyle:responseStyle,
  targetaudience:targetAudience,
  restrictedtopics:restrictedTopics,
  capabilities
});
if(!structuredPrompt){
  throw new ApiError(401,"error while creating prompt")
}



// Process jsoncontext (JSON or JS object)
let parsedContext 
if(manualContext && manualContext.length>0){
  parsedContext=manualContext
}else if(jsonContext && jsonContext !=''){
  parsedContext=jsonContext
}else{
  parsedContext=csvContext
}
try {
      parsedContext = typeof parsedContext === "string"
      ? JSON.parse(parsedContext)
      : parsedContext;
    } catch (err) {
      throw new ApiError(400, "Invalid website context format");
    }
    if (parsedContext.length === 0) {
      console.log(parsedContext)
      throw new ApiError(400, "Context must contain at least one entry");
    }
    

 if (!Array.isArray(parsedContext) || parsedContext.some(e => !e.input || !e.output)) {
  throw new ApiError(400, "Each context item must contain 'input' and 'output'");
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
  const apiKey=apiKeyGenerator()

  // Save to DB
  const newBot = await Bot.create({
    ownerid: user._id,
    apikey:apiKey,
    botname:botName,
    bottype:botType,
    model,
    language,
    description,
    targetaudience:targetAudience,
    responsestyle:responseStyle,
    capabilities,
    restrictedtopics:restrictedTopics,
    websitecontext: enrichedContext, // includes embedding now
    websiteurl:websiteUrl,
    prompt: structuredPrompt,
  });

  if(!newBot){
    throw new ApiError(401,"error while creating bot document")
  }
  console.log("done")
   return  res
      .status(201)
      .json(new ApiResponse(201, "Bot created successfully", newBot.apikey));

})