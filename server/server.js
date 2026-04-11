require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const contactRoutes = require('./routes/contact')
const downloadRoutes = require('./routes/download')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/download', downloadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Connect to MongoDB and start server
const start = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI)
      console.log('✅ MongoDB connected')
    } else {
      console.log('⚠️  No MONGO_URI set, running without DB')
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Server failed to start:', err)
    process.exit(1)
  }
}

start()
