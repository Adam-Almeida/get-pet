require('dotenv').config()
const express = require('express')
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')


const port = 5000

const app = express()

// Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Config json response
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.get('/ping', (req, res) => {
    res.json({ pong: true })
})

app.listen(port, () => console.log(`Server is runnig on port ${port}`))