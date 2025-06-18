import express from 'express'
import { addRatings, getDashboard } from '../controllers/dashboard.controller.js'

const dashboardRouter=express.Router()


dashboardRouter.get('/getDashboard',express.json({ limit: '16kb' }) ,getDashboard)
dashboardRouter.post('/addRatings',express.json({ limit: '16kb' }) ,addRatings)

export {dashboardRouter}