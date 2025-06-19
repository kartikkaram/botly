
import express from 'express'
import { renewBotApiKey } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.post('/revoke',express.json({ limit: '16kb' }) ,renewBotApiKey)

export {botRouter}