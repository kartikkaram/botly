import express from 'express'
import { chatWithBot } from '../controllers/bot.controller.js'
import { responseTime } from '../middlewares/responsetime.js'


const botResponseRouter=express.Router()


botResponseRouter.post('/botResponse',express.json({ limit: '16kb' }), responseTime ,chatWithBot)

export {botResponseRouter}