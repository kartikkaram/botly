import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Error_Handler } from './middlewares/Errors.middlewares.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkRouter } from './routes/clerk.routes.js';
import { Bot } from './models/bot.model.js';
import { formRouter } from './routes/form.routes.js';
import { botResponseRouter } from './routes/botResponse.routes.js';
import { testRouter } from './routes/test.routes.js';
import { dashboardRouter } from './routes/dashboard.routes.js';
import { botRouter } from './routes/bot.routes.js';

const app = express();
let validDomains = new Set()

export const fetchDomains=async () => {
  try {
    const domains = await Bot.find().select("websiteurl");
   validDomains = new Set(domains.map((doc) => doc.websiteurl))
    console.log("Customer domains fetched:", [...validDomains,"http://localhost:5173"]);
  } catch (error) {
    console.error("Error fetching customer domains:", error);
    process.exit(1); // Exit the process if initialization fails
  }
}


const botCorsOptions = {
  origin: async (origin, callback) => {
    try {
      if (!origin) return callback(null, true);
      
      // Check cache first
      if (validDomains.has(origin)) {
        return callback(null, true);
      }
      
      // If not in cache, check database directly
      const bot = await Bot.findOne({ websiteurl: origin });
      if (bot) {
        // Add to cache for next time
        validDomains.add(origin);
        return callback(null, true);
      }
      
      // Not found anywhere
      callback(new Error("Not allowed by CORS"), false);
      
    } catch (error) {
      callback(error, false);
    }
  },
  credentials: true,
};

// setInterval(async () => {
//   try {
//     fetchDomains()
//   } catch (error) {
//     console.error("Error refreshing customer domains:", error);
//   }
// }, 5 * 60 * 1000); // Every 5 minutes

app.use("/frontend-api",
  cors({
    origin: "http://localhost:5173/",
    credentials: true,              
  }),
);
app.use("/bot-api",
  cors(botCorsOptions),
);
app.use(clerkMiddleware())
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/v1/clerk",clerkRouter)
app.use("/frontend-api",formRouter)
app.use("/frontend-api",testRouter)
app.use("/frontend-api",dashboardRouter)
app.use("/frontend-api",botRouter)
app.use("/bot-api",botResponseRouter)

app.use(Error_Handler)
export default app

