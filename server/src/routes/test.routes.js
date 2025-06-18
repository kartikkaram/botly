
import express from 'express'
import {upload} from '../middlewares/multer.middlewares.js'
import { testController } from '../controllers/test.controller.js'

const testRouter=express.Router()

testRouter.post('/botTest',express.json({ limit: '16kb' }),upload.fields([
{name:'file', maxCount:1 }
]),testController)

export {testRouter}