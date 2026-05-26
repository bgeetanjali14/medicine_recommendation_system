// Import required packages
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Import routes
const medicineRoutes = require('./routes/medicines')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

// Create Express app
const app = express()

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// API Routes
app.use('/api/medicines', medicineRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'MediReco API is running!',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🏥 MediReco Backend Server              ║
║                                           ║
║   Server running on port ${PORT}             ║
║   Health check: http://localhost:${PORT}/api/health    ║
║   API Base: http://localhost:${PORT}/api             ║
║                                           ║
╚═══════════════════════════════════════════╝
  `)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err)
})