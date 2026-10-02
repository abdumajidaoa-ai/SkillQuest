import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return <section className="final-cta"><div className="cta-mark"><Sparkles size={20} /></div><span className="section-kicker">YOUR NEXT LEVEL IS WAITING</span><h2>Ready to start your quest?</h2><p>Pick your first challenge. The rest follows.</p><Link className="button button--primary button--hero" to="/register">Create your free account <ArrowRight size={17} /></Link><span className="cta-footnote">FREE TO START <i /> MADE FOR GRADES 1–11</span></section>
}