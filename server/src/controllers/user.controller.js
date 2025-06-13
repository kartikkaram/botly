import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";




export const getSelf=AsyncHandler(async (req, res) => {
  
     const clerkId = req.auth?.userId;
     if(!clerkId){
        throw new ApiError(400,"user has not signed in")
     }

    const self= await User.findOne({clerkid:clerkId})

    if(!self){
        throw new ApiError(400,"user not found")
    }

    return res
    .status(201)
    .json(new ApiResponse(201,"self",self))

}
)
