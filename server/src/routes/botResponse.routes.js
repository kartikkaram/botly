import express from 'express'
import { chatWithBot } from '../controllers/bot.controller.js'


const botResponseRouter=express.Router()


botResponseRouter.post('/botResponse',express.json({ limit: '16kb' }) ,chatWithBot)

export {botResponseRouter}