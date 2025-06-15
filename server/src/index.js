import dotenv from "dotenv"
dotenv.config({
  path:"src/.env"
})
import app from "./app.js"
import connectDB from "./db/dbConnection.js"
import { fetchDomains } from "./app.js"


const PORT =process.env.PORT  || 8001



const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    await fetchDomains();
    console.log("Customer domains fetched");
  
    app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);

    });
  } catch (error) {
    console.error("Server initialization error:", error);
    process.exit(1); 
  }
};

startServer();