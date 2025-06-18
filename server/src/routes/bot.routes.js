
import express from 'express'
import { renewBotApiKey } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.post('/renewBotApiKey',express.json({ limit: '16kb' }) ,renewBotApiKey)

export {botRouter}