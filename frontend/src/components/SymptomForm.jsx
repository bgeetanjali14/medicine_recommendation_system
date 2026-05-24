import { useState } from 'react'
import GlassCard from './GlassCard'

export default function SymptomForm({ onSubmit }) {
  const [symptoms, setSymptoms] = useState('')
  const [severity, setSeverity] = useState('mild')

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Cold', 'Stomach Pain',
    'Fatigue', 'Body Aches', 'Nausea', 'Sore Throat', 'Runny Nose'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ symptoms, severity })
  }

  const addSymptom = (symptom) => {
    setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom)
  }

  return (
    <section id="symptoms" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Describe Your Symptoms
            </h2>
            <p className="text-gray-600">
              Select or type your symptoms to get personalized medicine recommendations
            </p>
          </div>

          {/* Common Symptoms Tags */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-3">Common Symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => addSymptom(symptom)}
                  className="px-4 py-2 bg-white/50 hover:bg-teal-100 text-gray-700 rounded-full text-sm transition-colors border border-white/50"
                >
                  + {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Symptoms Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., I have a headache and fever since morning..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none transition-all"
                required
              />
            </div>

            {/* Severity

            {/* Severity Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['mild', 'moderate', 'severe'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSeverity(level)}
                    className={`
                      py-3 px-4 rounded-xl text-center capitalize transition-all
                      ${severity === level 
                        ? 'bg-teal-500 text-white shadow-lg' 
                        : 'bg-white/50 text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🔍</span>
              <span>Get Recommendations</span>
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  )
}