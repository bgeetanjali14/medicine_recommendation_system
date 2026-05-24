export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`
      bg-white 
      border-2 border-slate-100 
      rounded-2xl 
      shadow-sm 
      p-6 
      ${className}
    `}>
      {children}
    </div>
  )
}