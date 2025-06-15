import express from 'express'
import { chatWithBot } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.post('/botResponse',express.json({ limit: '16kb' }) ,chatWithBot)

export {botRouter}