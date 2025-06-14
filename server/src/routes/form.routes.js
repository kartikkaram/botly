import { requireAuth } from '@clerk/express'
import express from 'express'
import {upload} from '../middlewares/multer.middlewares.js'
const formRouter=express.router()

formRouter.post('/bot-form',requireAuth(),upload.fields([
{name:'file', maxCount:1 }
]),formController)