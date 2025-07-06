import express from 'express'
import { chatWithBot } from '../controllers/bot.controller.js'
import { responseTime } from '../middlewares/responsetime.js'
import { botKeyLimiter } from '../middlewares/ratelimiters/botkeyratelimiter.middleware.js'
import { ipAndBotKeyLimiter } from '../middlewares/ratelimiters/ipratelimiter.middleware.js'


const botResponseRouter=express.Router()


botResponseRouter.post('/botResponse',botKeyLimiter,ipAndBotKeyLimiter,express.json({ limit: '16kb' }), responseTime ,chatWithBot)

export {botResponseRouter}