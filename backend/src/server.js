const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3010
const xssMiddleware = require('./middlewares/xss')

// Middleware to parse request body
app.use(express.json())

// Apply XSS middleware to all routes in the auth router
app.use(xssMiddleware)

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

const allowedOrigins = ['http://localhost:3000', 'https://superapp.acruxtek.net']

// Import and use the authRoutes directly
app.use(cors())
app.use(cors({ credentials: true, origin: allowedOrigins[1] }))
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const carRoutes = require('./routes/car')
const tokenRoutes = require('./routes/csrf')

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/superset_token', tokenRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
