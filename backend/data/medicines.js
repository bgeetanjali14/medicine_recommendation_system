const mongoose = require('mongoose')
const Medicine = require('../models/Medicine')
require('dotenv').config()

// Sample medicines database
const medicines = [
  // Fever medicines
  {
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'fever',
    description: 'Effective pain reliever and fever reducer. Safe for most adults and children.',
    dosage: '1 tablet every 4-6 hours. Maximum 4 tablets in 24 hours.',
    sideEffects: ['Nausea', 'Stomach pain', 'Skin rash'],
    price: 5.99,
    rating: 4.7,
    manufacturer: 'PharmaCorp',
    symptoms: ['fever', 'high temperature', 'headache', 'body pain']
  },
  {
    name: 'Aspirin 300mg',
    genericName: 'Acetylsalicylic Acid',
    category: 'fever',
    description: 'Anti-inflammatory and analgesic for pain and fever relief.',
    dosage: '1-2 tablets every 4 hours with food.',
    sideEffects: ['Stomach irritation', 'Bleeding risk', 'Dizziness'],
    price: 7.49,
    rating: 4.5,
    manufacturer: 'MediPharm',
    symptoms: ['fever', 'mild pain', 'inflammation']
  },
  {
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    category: 'fever',
    description: 'Powerful anti-inflammatory for severe pain and inflammation.',
    dosage: '1 tablet every 6-8 hours with food.',
    sideEffects: ['Stomach upset', 'Heartburn', 'Headache'],
    price: 8.99,
    rating: 4.6,
    manufacturer: 'BioMedics',
    symptoms: ['fever', 'severe headache', 'body ache', 'inflammation']
  },
  {
    name: 'Calpol 500mg',
    genericName: 'Paracetamol',
    category: 'fever',
    description: 'Fast-acting fever and pain reliever for children.',
    dosage: '1 tablet every 4-6 hours.',
    sideEffects: ['Rare allergic reactions'],
    price: 6.49,
    rating: 4.8,
    manufacturer: 'Calpol Ltd',
    symptoms: ['fever', 'child fever', 'mild pain']
  },

  // Cold medicines
  {
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Hydrochloride',
    category: 'cold',
    description: 'Antihistamine for allergic reactions and cold symptoms.',
    dosage: '1 tablet once daily at bedtime.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
    price: 6.49,
    rating: 4.8,
    manufacturer: 'AllergyRelief',
    symptoms: ['cold', 'allergies', 'sneezing', 'runny nose', 'itchy eyes']
  },
  {
    name: 'Phenylephrine 10mg',
    genericName: 'Phenylephrine',
    category: 'cold',
    description: 'Nasal decongestant for blocked nose.',
    dosage: '1 tablet every 4 hours. Maximum 6 tablets daily.',
    sideEffects: ['Headache', 'Nervousness', 'Increased blood pressure'],
    price: 4.99,
    rating: 4.3,
    manufacturer: 'ColdCare',
    symptoms: ['blocked nose', 'nasal congestion', 'cold']
  },
  {
    name: 'Multivitamin C',
    genericName: 'Ascorbic Acid',
    category: 'cold',
    description: 'Boosts immunity and helps recover from cold faster.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Upset stomach (rare)'],
    price: 9.99,
    rating: 4.6,
    manufacturer: 'VitaHealth',
    symptoms: ['cold prevention', 'low immunity', 'fatigue']
  },
  {
    name: 'Loratadine 10mg',
    genericName: 'Loratadine',
    category: 'allergy',
    description: 'Non-drowsy antihistamine for allergies.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Headache', 'Dry mouth'],
    price: 7.99,
    rating: 4.7,
    manufacturer: 'AllergyRelief',
    symptoms: ['allergies', 'sneezing', 'itchy rash']
  },

  // Headache medicines
  {
    name: 'Saridon',
    genericName: 'Paracetamol + Caffeine',
    category: 'headache',
    description: 'Fast relief for headache and migraine.',
    dosage: '1-2 tablets every 4-6 hours.',
    sideEffects: ['Nausea', 'Insomnia'],
    price: 8.49,
    rating: 4.7,
    manufacturer: 'Bayer',
    symptoms: ['headache', 'migraine', 'tension headache']
  },
  {
    name: 'Cafeine 65mg + Paracetamol 500mg',
    genericName: 'Paracetamol + Caffeine',
    category: 'headache',
    description: 'Combined pain reliever for tension headaches.',
    dosage: '1 tablet every 4 hours.',
    sideEffects: ['Insomnia', 'Nervousness'],
    price: 6.99,
    rating: 4.4,
    manufacturer: 'MediPharm',
    symptoms: ['headache', 'tension headache']
  },
  {
    name: 'Sumatriptan 50mg',
    genericName: 'Sumatriptan',
    category: 'headache',
    description: 'Prescription migraine treatment.',
    dosage: '1 tablet at migraine onset. Repeat after 2 hours if needed.',
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea'],
    price: 15.99,
    rating: 4.6,
    manufacturer: 'MigraCare',
    symptoms: ['migraine', 'severe headache']
  },

  // Cough medicines
  {
    name: 'Benadryl Cough Syrup',
    genericName: 'Diphenhydramine',
    category: 'cough',
    description: 'Cough suppressant for dry cough.',
    dosage: '2 teaspoons 3 times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth'],
    price: 7.99,
    rating: 4.5,
    manufacturer: 'Pfizer',
    symptoms: ['dry cough', 'coughing']
  },
  {
    name: 'Ambroxol 30mg Syrup',
    genericName: 'Ambroxol Hydrochloride',
    category: 'cough',
    description: 'Mucolytic for wet cough - helps clear mucus.',
    dosage: '1 teaspoon 3 times daily.',
    sideEffects: ['Nausea', 'Taste disturbance'],
    price: 8.99,
    rating: 4.6,
    manufacturer: 'CoughCure',
    symptoms: ['wet cough', 'chest congestion', 'mucus']
  },
  {
    name: 'Honey & Glycerine Syrup',
    genericName: 'Natural',
    category: 'cough',
    description: 'Natural cough remedy for sore throat and cough.',
    dosage: '1 tablespoon as needed.',
    sideEffects: ['None'],
    price: 5.99,
    rating: 4.4,
    manufacturer: 'NaturalCare',
    symptoms: ['sore throat', 'dry cough', ' throat irritation']
  },

  // Stomach medicines
  {
    name: 'ORS Powder',
    genericName: 'Oral Rehydration Salts',
    category: 'stomach',
    description: 'Oral rehydration salts for dehydration due to diarrhea.',
    dosage: '1 packet in 1 liter of water. Drink within 24 hours.',
    sideEffects: ['Nausea', 'Vomiting (if too concentrated)'],
    price: 2.99,
    rating: 4.9,
    manufacturer: 'WHO',
    symptoms: ['diarrhea', 'dehydration', 'vomiting']
  },
  {
    name: 'Antacid Gel',
    genericName: 'Aluminum Hydroxide',
    category: 'stomach',
    description: 'For acidity, heartburn, and indigestion.',
    dosage: '2 teaspoons after meals and at bedtime.',
    sideEffects: ['Constipation', 'Dark stools'],
    price: 5.49,
    rating: 4.4,
    manufacturer: 'GutHealth',
    symptoms: ['acidity', 'heartburn', 'indigestion', 'stomach pain']
  },
  {
    name: 'Domperidone 10mg',
    genericName: 'Domperidone',
    category: 'stomach',
    description: 'For nausea, vomiting, and bloating.',
    dosage: '1 tablet before meals, 3 times daily.',
    sideEffects: ['Headache', 'Abdominal cramps'],
    price: 6.99,
    rating: 4.5,
    manufacturer: 'GutHealth',
    symptoms: ['nausea', 'vomiting', 'bloating', 'loss of appetite']
  },
  {
    name: 'Loperamide 2mg',
    genericName: 'Loperamide',
    category: 'stomach',
    description: 'Anti-diarrheal medication.',
    dosage: '2 capsules after first episode, then 1 after each episode.',
    sideEffects: ['Constipation', 'Dizziness'],
    price: 4.99,
    rating: 4.6,
    manufacturer: 'Diacare',
    symptoms: ['diarrhea', 'loose stools']
  },
  {
    name: 'Meclizine 25mg',
    genericName: 'Meclizine Hydrochloride',
    category: 'stomach',
    description: 'For motion sickness and dizziness.',
    dosage: '1 tablet 1 hour before travel.',
    sideEffects: ['Drowsiness', 'Dry mouth'],
    price: 7.49,
    rating: 4.5,
    manufacturer: 'MotionCure',
    symptoms: ['dizziness', 'motion sickness', 'vertigo']
  },

  // Body aches medicines
  {
    name: 'Volini Spray',
    genericName: 'Diclofenac Diethylamine',
    category: 'aches',
    description: 'Pain relief spray for muscle and joint pain.',
    dosage: 'Apply 2-3 sprays on affected area, 3-4 times daily.',
    sideEffects: ['Skin irritation', 'Rash (rare)'],
    price: 89.99,
    rating: 4.7,
    manufacturer: 'Cipla',
    symptoms: ['muscle pain', 'joint pain', 'back pain', 'sprain']
  },
  {
    name: 'Diclofenac Gel 1%',
    genericName: 'Diclofenac Sodium',
    category: 'aches',
    description: 'Anti-inflammatory gel for localized pain.',
    dosage: 'Apply thin layer 3-4 times daily.',
    sideEffects: ['Skin rash', ' redness'],
    price: 75.99,
    rating: 4.6,
    manufacturer: 'BioMedics',
    symptoms: ['arthritis', 'joint pain', 'muscle strain']
  },
  {
    name: 'Pain Relief Oil',
    genericName: 'Various Herbal',
    category: 'aches',
    description: 'Ayurvedic pain relief oil for external use.',
    dosage: 'Massage onto affected area twice daily.',
    sideEffects: ['Skin irritation (rare)'],
    price: 120.00,
    rating: 4.3,
    manufacturer: 'AyushCare',
    symptoms: ['body ache', 'muscle stiffness', 'joint pain']
  }
]

// Function to seed the database
const seedMedicines = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('📦 Connected to MongoDB')

    // Delete existing medicines
    await Medicine.deleteMany({})
    console.log('🗑️ Cleared existing medicines')

    // Insert new medicines
    await Medicine.insertMany(medicines)
    console.log(`✅ Inserted ${medicines.length} medicines`)

    console.log('🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:')
    console.error(error)
    process.exit(1)
  }
}

// Run if this file is executed directly
seedMedicines()