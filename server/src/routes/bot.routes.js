import express from 'express'
import { chatWithBot } from '../controllers/bot.controller.js'


const botRouter=express.Router()


botRouter.post('/botResponse', chatWithBot)

export {botRouter}