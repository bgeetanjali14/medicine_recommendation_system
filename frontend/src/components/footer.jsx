import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <span className="text-xl font-bold text-slate-800">MediReco</span>
            </Link>
            <p className="text-slate-500 mb-4">
              Your trusted medicine recommendation system. Hospital-grade quality.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-500 hover:text-blue-600">Home</Link></li>
              <li><Link to="/#features" className="text-slate-500 hover:text-blue-600">Features</Link></li>
              <li><Link to="/#about" className="text-slate-500 hover:text-blue-600">About</Link></li>
              <li><Link to="/login" className="text-slate-500 hover:text-blue-600">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-500">
              <li>📧 support@medireco.com</li>
              <li>📞 +1 234 567 8900</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500">
          <p>© 2026 MediReco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}