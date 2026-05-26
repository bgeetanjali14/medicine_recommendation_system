import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = "Search medicines, symptoms..." }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-slate-400 group-focus-within:text-teal-500 transition-colors">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-36 py-5 glass border-2 border-transparent rounded-2xl shadow-lg focus:shadow-xl focus:border-teal-300 focus:bg-white/80 outline-none transition-all text-base"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all"
        >
          Search
        </button>
      </div>
    </form>
  )
}