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




export const formController=AsyncHandler(async (req, res)=> {
    
   const data = JSON.parse(req.body.data);

if (!data) {
  throw new ApiError(400, "Missing 'data' field in request body");
}

    const {
        botname,
        bottype,
        model,
        language,
        description,
        targetaudience,
        responsestyle,
        capabilities,
        restrictedtopics,
        jsoncontext,
        websiteurl,
    } = data

    const uploadedFilePath=req?.files?.file?.[0].path
if(!jsoncontext && !uploadedFilePath){
  throw new ApiError(404, "either provide website context in json or csv")
}
 //  const { userId:clerkId } = getAuth(req)
  const clerkId="user_2yRzzw626Vx3mbopwcEljskbsk"
  // Validation: Ensure all required fields are present
  if (
    !botname ||
    !bottype ||
    !model ||
    !description ||
    !targetaudience ||
    !responsestyle ||
    !capabilities ||
    !websiteurl 
  ) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const user=await User.findOne({clerkid:clerkId})
  if(!user){
    throw new ApiError(400,"user not found")
  }

  // Generate prompt using template
  const structuredPrompt = generatePromptForBot({
    bottype,
    websiteurl,
    description,
    responsestyle,
    targetaudience,
    restrictedtopics,
    capabilities
  });
  if(!structuredPrompt){
    throw new ApiError(401,"error while creating prompt")
  }

  // Process jsoncontext (JSON or JS object)
  let parsedContext;
  if(jsoncontext){
    try {
      parsedContext = typeof jsoncontext === "string"
      ? JSON.parse(jsoncontext)
      : jsoncontext;
    } catch (err) {
      throw new ApiError(400, "Invalid website context format");
    }
  }
  if(uploadedFilePath){
    try {
         parsedContext=await csvParser(uploadedFilePath)
           if(parsedContext){
                 await deleteFromTemp(uploadedFilePath)
                }
      } catch (error) {
        await deleteFromTemp(uploadedFilePath)
          throw new ApiError(401, "error while parsing csv")
      }
  }
  console.log(parsedContext)
  debugger

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
    botname,
    bottype,
    model,
    language,
    description,
    targetaudience,
    responsestyle,
    capabilities,
    restrictedtopics,
    websitecontext: enrichedContext, // includes embedding now
    websiteurl,
    prompt: structuredPrompt,
  });

  if(!newBot){
    throw new ApiError(401,"error while creating bot document")
  }
  const botWithoutEmbeddings = newBot.toObject();
botWithoutEmbeddings.websitecontext = botWithoutEmbeddings.websitecontext.map(
  ({ input, output }) => ({ input, output })
);
  
   return  res
      .status(201)
      .json(new ApiResponse(201, "Bot created successfully", botWithoutEmbeddings));

})