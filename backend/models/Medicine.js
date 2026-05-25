const mongoose = require('mongoose')

// Define Medicine Schema
const medicineSchema = new mongoose.Schema({
  // Medicine name
  name: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },

  // Generic name (active ingredient)
  genericName: {
    type: String,
    trim: true,
    default: ''
  },

  // Medicine category (for grouping)
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['fever', 'cold', 'headache', 'cough', 'stomach', 'aches', 'allergy', 'other']
  },

  // Medicine description
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  // Dosage instructions
  dosage: {
    type: String,
    required: [true, 'Dosage is required']
  },

  // Possible side effects
  sideEffects: [{
    type: String
  }],

  // Price
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },

  // Rating (out of 5)
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },

  // In stock
  inStock: {
    type: Boolean,
    default: true
  },

  // Manufacturer
  manufacturer: {
    type: String,
    trim: true
  },

  // Symptoms this medicine treats
  symptoms: [{
    type: String
  }]

}, {
  // Add timestamps
  timestamps: true
})

// Create Medicine Model
const Medicine = mongoose.model('Medicine', medicineSchema)

// Export it
module.exports = Medicine