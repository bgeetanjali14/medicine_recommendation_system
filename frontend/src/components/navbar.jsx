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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Hospital Style */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800">MediReco</span>
              <p className="text-xs text-slate-500 -mt-1">Hospital Grade</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Features
            </Link>
            <Link to="/#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="text-slate-600 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
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
          <div className="md:hidden border-t bg-white">
            <div className="px-2 py-3 space-y-1">
              <Link to="/" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                Home
              </Link>
              <Link to="/#features" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                Features
              </Link>
              <Link to="/#about" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                About
              </Link>
              <Link to="/login" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-blue-600 font-medium">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}