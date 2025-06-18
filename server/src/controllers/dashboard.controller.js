import { Dashboard } from "../models/dashboard.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";





export const getDashboard=AsyncHandler(async (req, res) => {
   const { apikey } = req.headers;
   const dashboardDocs=await Dashboard.findOne({apikey}) 

   if(!dashboardDocs){
    throw new ApiError(404, "dashboard document not found")
   }

   return res
   .status(200)
   .json(new ApiResponse(200,"dashboard document fetched", dashboardDocs))

})

export const addRatings=AsyncHandler(async (req, res) => {
       const { apikey } = req.headers;
       const {rating}=req.body
       if(!rating || rating<0 || rating>5 ||   typeof rating !== "number"){
        throw new ApiError(400,"enter valid rating")
       }
    const ipaddress= req.socket.remoteAddress
 const dashboardDoc=await Dashboard.findOne({apikey, ipaddress}) 

 if(!dashboardDoc){
    throw new ApiError(404, "dashboard document not found")
   }
   dashboardDoc.rating.push(rating)

  await dashboardDoc.save()

return res
.status(200)
.json(new ApiResponse(200,"rating added sucessfully",{}))
})