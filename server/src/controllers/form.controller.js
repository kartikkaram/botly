import { Bot } from "../models/bot.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { csvParser } from "../utils/csv-parser.js";
import { generatePromptForBot } from "../utils/promptGenerator.js";
import { getGeminiEmbedding } from "../utils/geminiembeddings.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getEmbedding, initializeEmbedder } from "../utils/embeddings.js";
import { apiKeyGenerator } from "../utils/apikeyGenerator.js";




export const formController=AsyncHandler(async (req, res)=> {
    
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
        websitecontext,
        websiteurl,
    } = req.body;

    const uploadedFilePath=req?.files?.file?.[0].path
   const { userId:clerkId } = getAuth(req)
  // const clerkId="user_2yRzzw626Vx3mbopwcEljvnG8ma"
  // Validation: Ensure all required fields are present
  if (
    !botname ||
    !bottype ||
    !model ||
    !description ||
    !targetaudience ||
    !responsestyle ||
    !capabilities ||
    !websitecontext ||
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

  // Process websitecontext (JSON or JS object)
  let parsedContext;
  try {
    parsedContext = typeof websitecontext === "string"
      ? JSON.parse(websitecontext)
      : websitecontext;
  } catch (err) {
    throw new ApiError(400, "Invalid website context format");
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
  
  // try {
  //     const parsedCsvData=await csvParser(uploadedFilePath)
  //   } catch (error) {
  //       throw new ApiError(401, "error while parsing csv")
  //   }
    res
      .status(201)
      .json(new ApiResponse(201, "Bot created successfully", newBot));

})