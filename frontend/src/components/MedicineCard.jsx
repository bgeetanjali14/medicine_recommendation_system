export default function MedicineCard({ name, description, dosage, sideEffects, price, rating }) {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <span className="text-2xl">💊</span>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-bold text-yellow-700">{rating}</span>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-slate-800 mb-2">{name}</h3>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-4">{description}</p>

      {/* Dosage - Medical Box */}
      <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
        <p className="text-sm">
          <span className="font-semibold text-blue-700">💉 Dosage: </span>
          <span className="text-blue-600">{dosage}</span>
        </p>
      </div>

      {/* Side Effects */}
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-2">⚠️ Side Effects:</p>
        <div className="flex flex-wrap gap-1">
          {sideEffects.map((effect, index) => (
            <span key={index} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg border border-red-100">
              {effect}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <div>
          <span className="text-2xl font-bold text-blue-600">${price}</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all">
          View Details
        </button>
      </div>
    </div>
  )
}