import { Bot } from "../models/bot.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError";
import { AsyncHandler } from "../utils/asyncHandler";
import { csvParser } from "../utils/csv-parser.js";




const formController=AsyncHandler(async (req, res)=> {
    
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
    prompt,
} = req.body;

const uploadedFilePath=req?.files?.file?.[0].path
const clerkId = req.auth?.userId;


  // Validation: Ensure all required fields are present
  if (
    !uploadedFilePath ||
    !botname ||
    !bottype ||
    !model ||
    !description ||
    !targetaudience ||
    !responsestyle ||
    !capabilities ||
    !websitecontext ||
    !websiteurl ||
    !prompt
  ) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const user=await User.findOne({clerkid:clerkId})
  if(!user){
    throw new ApiError(400,"user not found")
  }

  // Create new bot instance
  const newBot = await Bot.create({
    ownerid:user._id,
    botname,
    bottype,
    model,
    language,
    description,
    targetaudience,
    responsestyle,
    capabilities,
    restrictedtopics, // Optional field, defaults to []
    websitecontext,
    websiteurl,
    prompt,
  });

  if(!newBot){
    throw new ApiError(401,"error while creating bot document")
  }
  
  try {
      const parsedCsvData=await csvParser(uploadedFilePath)
    } catch (error) {
        throw new ApiError(401, "error while parsing csv")
    }
    res
      .status(201)
      .json(new ApiResponse(201, "Bot created successfully", newBot));

})