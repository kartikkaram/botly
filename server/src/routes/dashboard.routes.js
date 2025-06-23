import express from 'express'
import { addRatings, getDashboard, mostFrequentlyAskedQuestions, refinedDashboard } from '../controllers/dashboard.controller.js'

const dashboardRouter=express.Router()


dashboardRouter.post('/getDashboard',express.json({ limit: '16kb' }) ,getDashboard)
dashboardRouter.post('/addRatings',express.json({ limit: '16kb' }) ,addRatings)
dashboardRouter.post('/getRefinedDashboard',express.json({ limit: '16kb' }) ,refinedDashboard)
dashboardRouter.post('/getMFAQs',express.json({ limit: '16kb' }) ,mostFrequentlyAskedQuestions)

export {dashboardRouter}