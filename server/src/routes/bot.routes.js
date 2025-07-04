
import express from 'express'
import { getBot, renewBotApiKey, updateBot } from '../controllers/bot.controller.js'
import { requireAuth } from '@clerk/express'


const botRouter=express.Router()


botRouter.post('/revoke',express.json({ limit: '16kb' }) ,renewBotApiKey)
botRouter.post('/updateBot',express.json({ limit: '16kb' }) ,updateBot)
botRouter.get('/getBot',requireAuth() ,getBot)

export {botRouter}