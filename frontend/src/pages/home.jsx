import { useState } from 'react'
import Hero from '../components/Hero'
import SymptomForm from '../components/SymptomForm'
import MedicineCard from '../components/MedicineCard'
import SearchBar from '../components/SearchBar'

// Expanded medicine database
const allMedicines = [
  // For Fever
  { id: 1, name: 'Paracetamol 500mg', category: 'fever', description: 'Effective pain reliever and fever reducer', dosage: '1 tablet every 4-6 hours', sideEffects: ['Nausea', 'Skin rash'], price: 5.99, rating: 4.7 },
  { id: 2, name: 'Aspirin 300mg', category: 'fever', description: 'Anti-inflammatory for fever and pain', dosage: '1-2 tablets every 4 hours', sideEffects: ['Stomach irritation'], price: 7.49, rating: 4.5 },
  { id: 3, name: 'Ibuprofen 400mg', category: 'fever', description: 'Powerful anti-inflammatory for fever', dosage: '1 tablet every 6-8 hours', sideEffects: ['Stomach upset'], price: 8.99, rating: 4.6 },
  
  // For Cold
  { id: 4, name: 'Cetirizine 10mg', category: 'cold', description: 'Antihistamine for cold and allergies', dosage: '1 tablet once daily', sideEffects: ['Drowsiness', 'Dry mouth'], price: 6.49, rating: 4.8 },
  { id: 5, name: 'Phenylephrine', category: 'cold', description: 'Nasal decongestant for blocked nose', dosage: '1 tablet every 4 hours', sideEffects: ['Headache', 'Nervousness'], price: 4.99, rating: 4.3 },
  { id: 6, name: 'Multivitamin C', category: 'cold', description: 'Boosts immunity for cold recovery', dosage: '1 tablet daily', sideEffects: ['None'], price: 9.99, rating: 4.6 },
  
  // For Headache
  { id: 7, name: 'Saridon', category: 'headache', description: 'Fast relief for headache and migraine', dosage: '1-2 tablets', sideEffects: ['Nausea'], price: 8.49, rating: 4.7 },
  { id: 8, name: 'Cafeine + Paracetamol', category: 'headache', description: 'For tension headaches', dosage: '1 tablet', sideEffects: ['Insomnia'], price: 6.99, rating: 4.4 },
  
  // For Cough
  { id: 9, name: 'Benadryl Syrup', category: 'cough', description: 'Cough suppressant for dry cough', dosage: '2 tsp 3 times daily', sideEffects: ['Drowsiness'], price: 7.99, rating: 4.5 },
  { id: 10, name: 'Ambroxol Syrup', category: 'cough', description: 'Mucolytic for wet cough', dosage: '1 tsp 3 times', sideEffects: ['Nausea'], price: 8.99, rating: 4.6 },
  
  // For Stomach
  { id: 11, name: 'ORS Powder', category: 'stomach', description: 'Oral rehydration salts', dosage: '1 packet in 1L water', sideEffects: ['Nausea'], price: 2.99, rating: 4.9 },
  { id: 12, name: 'Antacid Gel', category: 'stomach', description: 'For acidity and heartburn', dosage: '2 tsp after meals', sideEffects: ['Constipation'], price: 5.49, rating: 4.4 },
  { id: 13, name: 'Domperidone', category: 'stomach', description: 'For nausea and vomiting', dosage: '1 tablet before meals', sideEffects: ['Headache'], price: 6.99, rating: 4.5 },
  
  // For Body Aches
  { id: 14, name: 'Volini Spray', category: 'aches', description: 'Pain relief gel for muscle aches', dosage: 'Apply externally', sideEffects: ['Skin irritation'], price: 89.99, rating: 4.7 },
  { id: 15, name: 'Diclofenac Gel', category: 'aches', description: 'Anti-inflammatory gel', dosage: 'Apply 3-4 times', sideEffects: ['Rash'], price: 75.99, rating: 4.6 },
]

export default function Home() {
  const [recommendations, setRecommendations] = useState(null)
  const [searchResults, setSearchResults] = useState(null)

  const handleSymptomSubmit = (data) => {
    const { symptoms, severity } = data
    const symptomLower = symptoms.toLowerCase()
    
    // Find matching category
    let matches = []
    
    if (symptomLower.includes('fever') || symptomLower.includes('high temperature')) {
      matches = allMedicines.filter(m => m.category === 'fever')
    } else if (symptomLower.includes('cold') || symptomLower.includes('runny nose') || symptomLower.includes('sneezing')) {
      matches = allMedicines.filter(m => m.category === 'cold')
    } else if (symptomLower.includes('headache') || symptomLower.includes('head pain')) {
      matches = allMedicines.filter(m => m.category === 'headache')
    } else if (symptomLower.includes('cough')) {
      matches = allMedicines.filter(m => m.category === 'cough')
    } else if (symptomLower.includes('stomach') || symptomLower.includes('nausea') || symptomLower.includes('vomit')) {
      matches = allMedicines.filter(m => m.category === 'stomach')
    } else if (symptomLower.includes('ache') || symptomLower.includes('pain') || symptomLower.includes('body pain')) {
      matches = allMedicines.filter(m => m.category === 'aches')
    } else {
      // Default: show all
      matches = allMedicines
    }
    
    setRecommendations(matches)
    setSearchResults(null)
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(null)
      return
    }
    const q = query.toLowerCase()
    const results = allMedicines.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.description.toLowerCase().includes(q)
    )
    setSearchResults(results)
    setRecommendations(null)
    
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Decide what to show
  const displayMedicines = searchResults || recommendations

  return (
    <div className="pb-20">
      <Hero />
      
      {/* Search Section */}
      <section className="py-10 -mt-10 px-4 relative z-10">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Symptom Form */}
      <SymptomForm onSubmit={handleSymptomSubmit} />

      {/* Results Section */}
      {displayMedicines && (
        <section id="results" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full">
                {searchResults ? `Found ${searchResults.length} results` : `${recommendations?.length} Recommended`}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayMedicines.map((medicine) => (
                <MedicineCard key={medicine.id} {...medicine} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-transparent to-teal-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-teal-600">MediReco</span>?
            </h2>
            <p className="text-gray-600 text-lg">AI-powered medicine recommendations at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/40 backdrop-blur-sm border border-white/30 rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-6xl mb-4 group-hover:animate-bounce">🤖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Smart algorithms analyze your symptoms for accurate recommendations</p>
            </div>

            <div className="group bg-white/40 backdrop-blur-sm border border-white/30 rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-6xl mb-4 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Results</h3>
              <p className="text-gray-600">Get instant medicine suggestions within seconds</p>
            </div>

            <div className="group bg-white/40 backdrop-blur-sm border border-white/30 rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-6xl mb-4 group-hover:animate-bounce" style={{ animationDelay: '0.4s' }}>🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Safe & Reliable</h3>
              <p className="text-gray-600">Verified medicine information from trusted pharmacists</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/40 backdrop-blur-sm border border-white/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About <span className="text-teal-600">MediReco</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              MediReco is your personal medicine recommendation assistant. 
              We combine advanced AI technology with pharmaceutical expertise 
              to provide you with accurate, safe, and personalized medicine recommendations.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-teal-600">500+</p>
                <p className="text-gray-500">Medicines</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">50K+</p>
                <p className="text-gray-500">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">99%</p>
                <p className="text-gray-500">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}