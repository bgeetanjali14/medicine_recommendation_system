import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import SymptomForm from '../components/SymptomForm'
import MedicineCard from '../components/MedicineCard'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [recommendations, setRecommendations] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch recommendations from backend API
  const handleSymptomSubmit = async (data) => {
    const { symptoms, severity } = data
    setLoading(true)
    
    try {
      const response = await fetch('http://https://medireco-backend.onrender.com/api/medicines/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: symptoms.split(','), severity })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setRecommendations(result.data)
        setSearchResults(null)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to connect to backend!')
    }
    
    setLoading(false)
    
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Search medicines
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(null)
      return
    }
    
    try {
      const response = await fetch('http://https://medireco-backend.onrender.com/api/medicines/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSearchResults(result.data)
        setRecommendations(null)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const displayMedicines = searchResults || recommendations

  return (
    <div className="pb-20">
      <Hero />
      
      <section className="py-10 -mt-10 px-4 relative z-10">
        <SearchBar onSearch={handleSearch} />
      </section>

      <SymptomForm onSubmit={handleSymptomSubmit} />

      {loading && (
        <div className="text-center py-8">
          <div className="text-4xl animate-spin">⏳</div>
          <p className="text-slate-600 mt-2">Loading recommendations...</p>
        </div>
      )}

      {displayMedicines && !loading && (
        <section id="results" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full">
                {searchResults ? `Found ${searchResults.length} results` : `${recommendations?.length} Recommended`}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayMedicines.map((medicine) => (
                <MedicineCard key={medicine._id} {...medicine} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="features" className="py-20 px-4 bg-gradient-to-b from-transparent to-teal-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose <span className="text-teal-600">MediReco</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/40 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-bold">AI-Powered</h3>
              <p className="text-gray-600">Smart recommendations</p>
            </div>
            <div className="bg-white/40 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold">Fast Results</h3>
              <p className="text-gray-600">Instant suggestions</p>
            </div>
            <div className="bg-white/40 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold">Safe & Reliable</h3>
              <p className="text-gray-600">Verified info</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/40 p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About <span className="text-teal-600">MediReco</span></h2>
            <p className="text-gray-600 text-lg">
              Your personal medicine recommendation assistant powered by AI and backed by pharmaceutical experts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}