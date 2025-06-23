import { Dashboard } from "../models/dashboard.model.js";
import { Bot } from "../models/bot.model.js";

export const responseTime = async (req, res, next) => {
    const initialTime = process.hrtime(); // Start time in high resolution
    const {apikey}=req.headers
    const ipaddress=req.ip
    // Add a listener for the 'finish' event on the response
    res.on('finish', async() => {
         try {
        const [seconds, nanoseconds] = process.hrtime(initialTime);
        const elapsedTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
        const bot=await Bot.findOne({apikey})
        const timeAndModel={
            model:bot.model,
            time:elapsedTime
        }
        await Dashboard.findOneAndUpdate(
            { apikey, ipaddress },
            { $push: { responsetime: timeAndModel } },
            { upsert: true }
        );

        console.log(`Request to ${req.method} ${req.originalUrl} took ${elapsedTime} ms`);
    } catch (err) {
        console.error("Error updating Dashboard:", err);
    }
    });

    next(); // Call the next middleware
};


