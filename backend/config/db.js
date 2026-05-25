const mongoose = require('mongoose')

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('✅ MongoDB Connected Successfully!')
    console.log(`📦 Database: ${mongoose.connection.name}`)
    
  } catch (error) {
    // Handle connection errors
    console.error('❌ MongoDB Connection Error:')
    console.error(error.message)
    
    // Exit process if unable to connect
    process.exit(1)
  }
}

// Export the function
module.exports = connectDB