
import express from 'express'
import { renewBotApiKey, updateBot } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.post('/revoke',express.json({ limit: '16kb' }) ,renewBotApiKey)
botRouter.post('/updateBot',express.json({ limit: '16kb' }) ,updateBot)

export {botRouter}