import express from 'express'
import config from './config/config.js'
import webRoute from './app/routes/webRoute.js'
import association from './app/modal/association.js'

const app = express()
const PORT = 8080
// Config 
config(app)
// Association between models
association()
// Routes
webRoute(app)
// Listening at port:8080
app.listen(PORT, () => console.log('Server is running'))