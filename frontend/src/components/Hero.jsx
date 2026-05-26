import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 via-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-up">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-slate-600 font-medium">Trusted by 50,000+ Patients</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Your Personal
          <span className="block gradient-text">Medicine Advisor</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Describe your symptoms and get instant, accurate medicine recommendations 
          from our AI-powered system. Hospital-grade quality at your fingertips.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link 
            to="/#symptoms"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white font-semibold rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/40 hover:scale-105 transition-all"
          >
            Get Recommendations
          </Link>
          <Link 
            to="/#about"
            className="px-8 py-4 glass text-slate-700 font-semibold rounded-2xl hover:bg-white/80 hover:scale-105 transition-all"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-slate-200/50 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">500+</p>
            <p className="text-sm text-slate-500">Medicines</p>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50K+</p>
            <p className="text-sm text-slate-500">Verified Users</p>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">99%</p>
            <p className="text-sm text-slate-500">Accuracy</p>
          </div>
        </div>
      </div>
    </section>
  )
}