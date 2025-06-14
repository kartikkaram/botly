import { requireAuth } from '@clerk/express'
import express from 'express'
import {upload} from '../middlewares/multer.middlewares.js'
const formRouter=express.Router()

formRouter.post('/botForm',requireAuth(),upload.fields([
{name:'file', maxCount:1 }
]),formController)

export {formRouter}