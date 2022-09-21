require('dotenv').config()
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 5000

const app = express()

// Config json response
app.use(express.json)

// Solve Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// Public folder for images
app.use(express.static('public'))

// Routes
const userRoutes = require('./routes/User')

app.use('/users', userRoutes)

app.listen(port, () => console.log(`Server is runnig on port ${port}`) )