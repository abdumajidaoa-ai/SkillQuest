import { ArrowUpRight } from 'lucide-react'

export default function FeatureCard({ icon: Icon, title, description, index }) {
  return <article className="feature-row"><span className={`feature-icon feature-icon--${index}`}><Icon size={18} /></span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight className="feature-arrow" size={17} /></article>
}