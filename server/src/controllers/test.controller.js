
import { ApiError } from "../utils/apiError.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { csvParser } from "../utils/csv-parser.js";
import { deleteFromTemp } from "../utils/deleteFromTemp.js";





export const testController=AsyncHandler(async (req, res)=> {
    
    const uploadedFilePath=req?.files?.file?.[0].path
let parsedCsvData
  try {
       parsedCsvData=await csvParser(uploadedFilePath)
       if(parsedCsvData){
        await deleteFromTemp(uploadedFilePath)
       }
    } catch (error) {
          await deleteFromTemp(uploadedFilePath)
        throw new ApiError(401, "error while parsing csv")
    }
    console.log(parsedCsvData)
    res
      .status(201)
      .json(new ApiResponse(201, "Bot created successfully", parsedCsvData));

})