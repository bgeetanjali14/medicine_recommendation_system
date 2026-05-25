const express = require('express')
const router = express.Router()
const Medicine = require('../models/Medicine')

// @route   GET /api/medicines
// @desc    Get all medicines
// @access  Public
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ rating: -1 })
    
    res.json({
      success: true,
      count: medicines.length,
      data: medicines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

// @route   GET /api/medicines/:id
// @desc    Get single medicine by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)
    
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      })
    }
    
    res.json({
      success: true,
      data: medicine
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

// @route   GET /api/medicines/symptoms/:symptom
// @desc    Get medicines by symptom
// @access  Public
router.get('/symptoms/:symptom', async (req, res) => {
  try {
    const { symptom } = req.params
    
    const medicines = await Medicine.find({
      symptoms: { $regex: symptom, $options: 'i' }
    }).sort({ rating: -1 })
    
    res.json({
      success: true,
      count: medicines.length,
      symptom: symptom,
      data: medicines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

// @route   GET /api/medicines/category/:category
// @desc    Get medicines by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params
    
    const medicines = await Medicine.find({ 
      category: category.toLowerCase() 
    }).sort({ rating: -1 })
    
    res.json({
      success: true,
      count: medicines.length,
      category: category,
      data: medicines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

// @route   POST /api/medicines/recommend
// @desc    Get medicine recommendations based on symptoms
// @access  Public
router.post('/recommend', async (req, res) => {
  try {
    const { symptoms, severity } = req.body
    
    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptoms'
      })
    }
    
    const query = {
      $or: symptoms.map(symptom => ({
        symptoms: { $regex: symptom, $options: 'i' }
      }))
    }
    
    let medicines = await Medicine.find(query).sort({ rating: -1 })
    
    if (severity === 'severe') {
      medicines = medicines.filter(m => m.price > 10)
    } else if (severity === 'mild') {
      medicines = medicines.filter(m => m.price < 10)
    }
    
    const uniqueMedicines = [...new Map(medicines.map(m => [m._id.toString(), m])).values()]
    
    res.json({
      success: true,
      count: uniqueMedicines.length,
      data: uniqueMedicines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

// @route   POST /api/medicines/search
// @desc    Search medicines
// @access  Public
router.post('/search', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice } = req.body
    
    const searchQuery = {}
    
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { genericName: { $regex: query, $options: 'i' } }
      ]
    }
    
    if (category) {
      searchQuery.category = category.toLowerCase()
    }
    
    if (minPrice || maxPrice) {
      searchQuery.price = {}
      if (minPrice) searchQuery.price.$gte = minPrice
      if (maxPrice) searchQuery.price.$lte = maxPrice
    }
    
    const medicines = await Medicine.find(searchQuery).sort({ rating: -1 })
    
    res.json({
      success: true,
      count: medicines.length,
      data: medicines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
})

module.exports = router