import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
    ipaddress: {
      type: String,
      required: true,
    },
    apikey: {
      type: String,
      required: true,
    },
  chathistory: [
    {
      sender: { type: String, enum: ['user', 'bot'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  reviews: {
    type: [String], 
    default: [], 
  },
  rating: {
    type: [Number], 
    default: [], 
  },
  requesttimestamps: {
    type: [Date], 
    default: [],
  },
},
{
    timestamps:true
});


export const Dashboard = mongoose.model("Dashboard", dashboardSchema);
