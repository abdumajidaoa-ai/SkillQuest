import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import LanguageSelector from '../components/LanguageSelector.jsx'
import useLanguage from '../utils/useLanguage.js'

export default function PublicLayout({ children }) {
  const { t } = useLanguage()
  return (
    <div className="public-layout">
      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#students">For students</a>
          </nav>
          <div className="site-header__actions">
            <LanguageSelector />
            <Link className="login-link" to="/login">{t('signIn')}</Link>
            <Link className="button button--primary button--small" to="/register">{t('getStarted')} <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}