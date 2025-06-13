import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Error_Handler } from './middlewares/Errors.middlewares.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkRouter } from './routes/clerk.routes.js';

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  }),
);
app.use(clerkMiddleware())
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/v1/clerk",clerkRouter)

app.use(Error_Handler)
export default app

/* import 'dotenv/config'
import express from 'express'
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

const app = express()
const PORT = 3000

// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})*/