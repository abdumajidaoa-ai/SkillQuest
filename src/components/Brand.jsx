import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand({ to = '/', compact = false }) {
  return (
    <Link className={`brand${compact ? ' brand--compact' : ''}`} to={to} aria-label="SkillQuest home">
      <span className="brand-mark"><Sparkles size={18} strokeWidth={2.5} /></span>
      <span>skill<span>quest</span></span>
    </Link>
  )
}