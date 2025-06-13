import express from 'express'
import { clerkWebhook } from '../controllers/clerk.controller.js'

const clerkRouter=express.Router()


clerkRouter.post('/clerkWebhook',express.raw({ type: 'application/json' }),clerkWebhook)

export {clerkRouter}