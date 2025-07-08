import { requireAuth } from '@clerk/express'
import express from 'express'
import {upload} from '../middlewares/multer.middlewares.js'
import { formController } from '../controllers/form.controller.js'
const formRouter=express.Router()


formRouter.post('/botForm',express.json({ limit: '16kb' }),requireAuth(),formController)

export {formRouter}
