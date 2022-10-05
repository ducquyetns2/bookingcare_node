import express from 'express'
import config from './config/config.js'
import webRoute from './app/routes/webRoute.js'

const app = express()
const PORT = 8080
// Config 
config(app)
// Routes
webRoute(app)
// Listening at port:8080
app.listen(PORT, () => console.log('Server is running'))