
import express from 'express'
import { addContext, getBot, renewBotApiKey, updateBot } from '../controllers/bot.controller.js'
import { requireAuth } from '@clerk/express'


const botRouter=express.Router()


botRouter.post('/revoke',express.json({ limit: '16kb' }) ,renewBotApiKey)
botRouter.post('/updateBot',express.json({ limit: '16kb' }) ,updateBot)
botRouter.post('/addContext',express.json({ limit: '16kb' }) ,addContext)
botRouter.get('/getBot',requireAuth() ,getBot)

export {botRouter}