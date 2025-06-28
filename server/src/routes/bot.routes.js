
import express from 'express'
import { getBot, renewBotApiKey, updateBot } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.get('/revoke',express.json({ limit: '16kb' }) ,renewBotApiKey)
botRouter.post('/updateBot',express.json({ limit: '16kb' }) ,updateBot)
botRouter.get('/getBot',express.json({ limit: '16kb' }) ,getBot)

export {botRouter}