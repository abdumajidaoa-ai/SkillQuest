import { Sparkles } from 'lucide-react'

export default function TestimonialCard({ quote, label = 'LEARNING PRINCIPLE' }) {
  return <article className="testimonial-card"><span className="testimonial-card__mark"><Sparkles size={17} /></span><div><span className="section-kicker">{label}</span><blockquote>{quote}</blockquote><span className="testimonial-card__source">The SkillQuest approach</span></div></article>
}