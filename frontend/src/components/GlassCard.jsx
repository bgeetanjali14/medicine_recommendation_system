export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`
      glass 
      rounded-2xl 
      shadow-xl 
      p-6 
      hover:shadow-2xl 
      transition-all 
      duration-300
      ${className}
    `}>
      {children}
    </div>
  )
}