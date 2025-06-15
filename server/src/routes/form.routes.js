import { requireAuth } from '@clerk/express'
import express from 'express'
import {upload} from '../middlewares/multer.middlewares.js'
import { formController } from '../controllers/form.controller.js'
const formRouter=express.Router()

formRouter.post('/botForm',requireAuth(),express.json({ limit: '16kb' }),upload.fields([
{name:'file', maxCount:1 }
]),formController)

export {formRouter}