import { Dashboard } from "../models/dashboard.model.js"
import { ApiError } from "./apiError.js"



export const updateDashboard=async ({ipaddress,apikey,userMessage,reply}) => {
    
    try {
     const existingDoc=   await Dashboard.findOne({ipaddress, apikey})
     if(existingDoc){
        existingDoc.requesttimestamps.push(Date.now())
            existingDoc.chathistory.push({ sender: "user", content: userMessage },
          { sender: "bot", content: reply })
            existingDoc.chathistory = existingDoc.chathistory;
       await existingDoc.save()
     }else{

         await Dashboard.create({
            ipaddress, 
            apikey,
            chathistory:[{sender:"user", content:userMessage},{sender:"bot", content: reply}],
            requesttimestamps:[Date.now()] 
         })
     }

    } catch (error) {
        console.log("something went wrong while updating/creating dashboard doc",error.message)
        throw new ApiError(400,"something went wrong while updating/creating dashboard doc", )
    }

}