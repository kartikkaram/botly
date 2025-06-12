import dotenv from "dotenv"
dotenv.config({
  path:"src/.env"
})
import app from "./app.js"
import connectDB from "./db/dbConnection.js"


const PORT =process.env.PORT  || 8001


connectDB()
.then(() => {
  app.listen(PORT,() => {
    console.log(`server is listening at port : ${PORT}` )
  }
  )
}
)
.catch((err)=>{
console.log(`MongoDB connection error , ${err}`)
})