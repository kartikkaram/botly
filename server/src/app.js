import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Error_Handler } from './middlewares/Errors.middlewares.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkRouter } from './routes/clerk.routes.js';
import { Bot } from './models/bot.model.js';

const app = express();

export const fetchDomains=async () => {
  try {
    const domains = await Bot.find().select("websiteurl");
    customerDomains = domains.map((doc) => doc.websiteurl);
    console.log("Customer domains fetched:", customerDomains);
  } catch (error) {
    console.error("Error fetching customer domains:", error);
    process.exit(1); // Exit the process if initialization fails
  }
}


const botOptions = {
  origin: (origin, callback) => {
    if (!origin || customerDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use("/frontend-api",
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  }),
);
app.use("/bot-api",
  cors(botOptions),
);
app.use(clerkMiddleware())
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/v1/clerk",clerkRouter)

app.use(Error_Handler)
export default app

