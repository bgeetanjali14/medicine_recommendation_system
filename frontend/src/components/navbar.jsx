import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">MediReco</span>
              <p className="text-xs text-slate-400 -mt-1 hidden sm:block">Smart Healthcare</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors rounded-full hover:bg-teal-50">
              Home
            </Link>
            <Link to="/#features" className="px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors rounded-full hover:bg-teal-50">
              Features
            </Link>
            <Link to="/#about" className="px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors rounded-full hover:bg-teal-50">
              About
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="ml-4 px-5 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t">
            <div className="px-2 py-3 space-y-1">
              <Link to="/" className="block px-4 py-2 text-slate-600 hover:bg-teal-50 rounded-lg">
                Home
              </Link>
              <Link to="/#features" className="block px-4 py-2 text-slate-600 hover:bg-teal-50 rounded-lg">
                Features
              </Link>
              <Link to="/#about" className="block px-4 py-2 text-slate-600 hover:bg-teal-50 rounded-lg">
                About
              </Link>
              <Link to="/login" className="block px-4 py-2 text-slate-600 hover:bg-teal-50 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-teal-600 font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}