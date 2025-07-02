
import { Dashboard } from "../models/dashboard.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { calculateDistanceMatrix, dbscan } from "../utils/vector-db.js";






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
       let {rating}=req.body
       rating=parseInt(rating)
       if(!rating || rating<0 || rating>5){
        throw new ApiError(400,"enter valid rating")
       }
      const ipaddress= req.ip || req.socket.remoteAddress
 const dashboardDoc=await Dashboard.findOne({apikey, ipaddress}) 

 if(!dashboardDoc){
    throw new ApiError(404, "dashboard document not found")
   }
   dashboardDoc.ratings.push(rating)

  await dashboardDoc.save()

return res
.status(200)
.json(new ApiResponse(200,"rating added sucessfully",{}))
})

export const refinedDashboard=async (req, res) => {
   
   const {apikey}=req.headers
const pipeline = [
  { $match: { apikey } },
  {
    $unwind: {
      path: "$responsetime",
      preserveNullAndEmptyArrays: true // Handle empty or missing responsetime arrays
    }
  },
  {
    $group: {
      _id: "$apikey",
      avgResponseTime: { $avg: "$responsetime.time" }, // Calculate average response time
      combinedRequestTimestamps: { $addToSet: "$requesttimestamps" }, // Gather unique requesttimestamps arrays
      allRatings: { $push: "$rating" } // Gather all ratings
    }
  },
  {
    $project: {
      _id: 0,
      avgResponseTime: 1,
      requesttimestamps: {
        $reduce: { // Flatten combined requesttimestamps arrays
          input: "$combinedRequestTimestamps",
          initialValue: [],
          in: { $concatArrays: ["$$value", "$$this"] }
        }
      },
      averageRating: {
        $avg: {
          $reduce: { // Calculate average rating
            input: "$allRatings",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] }
          }
        }
      },
      ratingBreakdown: {
        $arrayToObject: {
          $map: {
            input: [1, 2, 3, 4, 5], // Ratings from 1 to 5
            as: "rating",
            in: {
              k: { $toString: "$$rating" },
              v: {
                $size: {
                  $filter: {
                    input: {
                      $reduce: {
                        input: "$allRatings",
                        initialValue: [],
                        in: { $concatArrays: ["$$value", "$$this"] }
                      }
                    },
                    as: "item",
                    cond: { $eq: ["$$item", "$$rating"] }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $addFields: {
      totalRequests: { $size: "$requesttimestamps" } // Count total unique timestamps
    }
  }
];
   const data=await Dashboard.aggregate(pipeline)
   if(!data){
      throw new ApiError(404, "document not found")
   }

   return res
   .status(201)
   .json(new ApiResponse(201, "refined data ", data[0]))

}



export const mostFrequentlyAskedQuestions=AsyncHandler(async (req , res) => {
  
     const {apikey}=req.headers
     console.log(apikey)

    const chats = await Dashboard.aggregate([
  { $match: { apikey } }, // Match documents with the specific apikey
  { $unwind: "$chathistory" }, // Deconstruct chathistory arrays into individual objects
  { $match: { "chathistory.sender": "user" } }, // Filter only entries where sender is "user"
  {
    $group: {
      _id: null, // Combine all results into a single group
      combined: { $push: "$chathistory" }, // Collect filtered entries into a single array
    },
  },
  { $project: { _id: 0, combined: 1 } }, // Exclude _id from the final result
]);


const data =chats[0].combined
     const distanceMatrix = calculateDistanceMatrix(data);

     const clusters = dbscan(distanceMatrix);
     const clusterResults = clusters.map((cluster) => {
  const questions = cluster.map((idx) => data[idx].content);
  return {
    representative: questions[0], // First question as representative
    count: questions.length, // Number of questions in the cluster
  };
});
console.log(clusterResults)
// Sort clusters by size and get the top 10-20
const topClusters = clusterResults
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);


 return res
   .status(201)
   .json(new ApiResponse(201, "most frequently asked questions", topClusters))

})