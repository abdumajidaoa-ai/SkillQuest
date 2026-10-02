import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-main"><Brand compact /><span className="footer-tagline">Learn. Quest. Level Up.</span><nav><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#students">For students</a><Link to="/login">Log in</Link></nav><span className="footer-copy">© 2026 SkillQuest</span></div></footer>
}