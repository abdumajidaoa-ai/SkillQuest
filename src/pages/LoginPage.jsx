import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import LanguageSelector from '../components/LanguageSelector.jsx'
import useLanguage from '../utils/useLanguage.js'
import { getProfile, saveProfile } from '../utils/profile.js'

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    const profile = getProfile()

    if (!profile || profile.email?.toLowerCase() !== email.trim().toLowerCase() || profile.password !== password) {
      setNotice('We could not find that account. Check your email and password or create a new SkillQuest account.')
      return
    }

    saveProfile({ ...profile, email: profile.email || email.trim() })
    navigate(profile.onboardingComplete ? '/dashboard' : '/onboarding')
  }

  return (
    <main className="auth-page auth-page--login">
      <aside className="auth-aside auth-aside--login"><div className="auth-aside__top"><Brand /><Link className="auth-back" to="/"><ArrowLeft size={15} /> Back to home</Link></div><div className="login-art"><div className="login-art__grid" /><div className="login-art__sun"><Sparkles size={40} /></div><span className="login-orbit login-orbit--one" /><span className="login-orbit login-orbit--two" /><div className="login-quote"><span>KEEP GOING,</span><h2>Your next level<br />is closer than<br /><i>you think.</i></h2><p>Every expert was once a beginner.</p></div></div><div className="auth-aside__bottom"><span className="aside-kicker">LEARN. QUEST. LEVEL UP.</span><p>Pick up right where your curiosity left off.</p></div></aside>
      <section className="auth-main"><div className="auth-locale"><LanguageSelector /></div><div className="auth-main__mobile"><Brand /><LanguageSelector /><Link className="login-link" to="/register">{t('registerCreate')}</Link></div><div className="login-form-wrap"><div className="form-heading"><span className="section-kicker">WELCOME BACK</span><h1>Good to see you again.</h1><p>Sign in to continue your journey.</p></div><button className="google-button" type="button" onClick={() => setNotice('Google sign-in is coming soon.')}><span className="google-g">G</span> Continue with Google <span className="coming-soon">SOON</span></button><div className="form-divider"><span />or with email<span /></div><form className="login-form" onSubmit={submit}><label className="field"><span>Email address</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="field"><span>Password</span><span className="input-with-action"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" className="input-action" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label><div className="login-options"><label><input type="checkbox" /> <span>Remember me</span></label><button type="button" onClick={() => setNotice('Password recovery will be available when account services are connected.')}>Forgot password?</button></div><button className="button button--primary submit-button" type="submit">{t('signIn')} <ArrowRight size={17} /></button>{notice && <div className="form-notice" role="status">{notice}</div>}<p className="auth-switch">{t('alreadyAccount')} <Link to="/register">{t('registerCreate')}</Link></p><p className="privacy-note"><LockKeyhole size={12} /> Your information stays private and secure.</p></form></div><footer className="auth-footer"><span>© 2026 SkillQuest</span><span>Learn. Quest. Level Up.</span></footer></section>
    </main>
  )
}