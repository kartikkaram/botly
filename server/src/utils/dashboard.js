import { Dashboard } from "../models/dashboard.model.js"
import { ApiError } from "./apiError.js"



export const updateDashboard = async ({ ipaddress, apikey, userMessage, reply, userEmbedding }) => {
    try {
        // Perform an atomic update or create a new document if none exists
        await Dashboard.findOneAndUpdate(
            { ipaddress, apikey },
            {
                $push: {
                    requesttimestamps: Date.now(),
                    chathistory: [
                        { sender: "user", content: userMessage, embedding:userEmbedding },
                        { sender: "bot", content: reply }
                    ]
                }
            },
            { upsert: true, new: true } // Create a new document if not found and return updated doc
        );
    } catch (error) {
        console.error("Error while updating/creating dashboard document:", error.message);
        throw new ApiError(500, "Failed to update or create dashboard document");
    }
};
