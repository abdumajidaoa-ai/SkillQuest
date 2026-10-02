import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import LanguageSelector from '../components/LanguageSelector.jsx'
import useLanguage from '../utils/useLanguage.js'
import { saveProfile } from '../utils/profile.js'

const emptyForm = { name: '', username: '', email: '', password: '', confirmPassword: '', agreed: false }

function validate(values, t) {
  const errors = {}
  if (!values.name.trim()) errors.name = t('errorName')
  if (!values.username.trim()) errors.username = t('errorUsername')
  if (!values.email.trim()) errors.email = t('errorEmail')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t('errorEmailInvalid')
  if (values.password.length < 8) errors.password = t('errorPassword')
  else if (!/[A-Z]/.test(values.password)) errors.password = t('errorPasswordUpper')
  else if (!/\d/.test(values.password)) errors.password = t('errorPasswordNumber')
  if (!values.confirmPassword) errors.confirmPassword = t('errorConfirm')
  else if (values.password !== values.confirmPassword) errors.confirmPassword = t('errorPasswordMatch')
  if (!values.agreed) errors.agreed = t('errorAgreement')
  return errors
}

export default function RegisterPage() {
  const { t } = useLanguage()
  const [values, setValues] = useState(emptyForm)
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [notice, setNotice] = useState('')
  const navigate = useNavigate()
  const errors = useMemo(() => validate(values, t), [values, t])
  const validPasswordChecks = [values.password.length >= 8, /\d/.test(values.password), /[A-Z]/.test(values.password)]
  const strength = validPasswordChecks.filter(Boolean).length
  const canSubmit = Object.keys(errors).length === 0

  function update(event) {
    const { name, value, checked, type } = event.target
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    setTouched((previous) => ({ ...previous, [name]: true }))
  }

  function submit(event) {
    event.preventDefault()
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])))
    if (!canSubmit) return
    saveProfile({ name: values.name.trim(), username: values.username.trim(), avatar: values.name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(), email: values.email.trim(), grade: '', subjects: [], interests: [], goals: [], goal: '', onboardingComplete: false })
    navigate('/onboarding')
  }

  function fieldError(name) {
    return touched[name] && errors[name] ? <span className="field-error" role="alert">{errors[name]}</span> : null
  }

  return (
    <main className="auth-page">
      <aside className="auth-aside auth-aside--register">
        <div className="auth-aside__top"><Brand /><Link className="auth-back" to="/"><ArrowLeft size={15} /> Back to home</Link></div>
        <div className="auth-art"><div className="auth-ring auth-ring--one" /><div className="auth-ring auth-ring--two" /><div className="auth-art__spark auth-art__spark--one">✦</div><div className="auth-art__spark auth-art__spark--two">✧</div><div className="auth-art__core"><div className="auth-crystal"><Sparkles size={35} /></div><span>YOUR STORY<br />STARTS HERE</span></div><div className="auth-mini-card auth-mini-card--xp"><span>✦</span><div><b>+120 XP</b><small>First steps</small></div></div><div className="auth-mini-card auth-mini-card--level"><span className="mini-trophy">♛</span><div><b>Level 01</b><small>New adventure</small></div></div></div>
        <div className="auth-aside__bottom"><span className="aside-kicker">ONE QUEST AT A TIME</span><h2>Curiosity looks<br />good on you.</h2><p>Build skills, find your thing, and see how far you can go.</p><div className="aside-dots"><i className="is-active" /><i /><i /></div></div>
      </aside>
      <section className="auth-main">
        <div className="auth-locale"><LanguageSelector /></div>
        <div className="auth-main__mobile"><Brand /><LanguageSelector /><Link className="login-link" to="/login">{t('signIn')}</Link></div>
        <div className="auth-form-wrap">
          <div className="form-heading"><span className="section-kicker">YOUR ADVENTURE BEGINS</span><h1>{t('registerTitle')}</h1><p>{t('registerSubtitle')}</p></div>
          <button className="google-button" type="button" onClick={() => setNotice('Google sign-in is coming soon. Create an account with your email for now.')}><span className="google-g">G</span> Continue with Google <span className="coming-soon">SOON</span></button>
          {notice && <div className="form-notice" role="status">{notice}</div>}
          <div className="form-divider"><span />or with email<span /></div>
          <form className="register-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <label className="field"><span>{t('registerName')}</span><input name="name" autoComplete="name" placeholder="e.g. Jordan Lee" value={values.name} onChange={update} onBlur={() => setTouched((previous) => ({ ...previous, name: true }))} aria-invalid={Boolean(touched.name && errors.name)} />{fieldError('name')}</label>
              <label className="field"><span>{t('registerUsername')}</span><input name="username" autoComplete="username" placeholder="Choose a username" value={values.username} onChange={update} onBlur={() => setTouched((previous) => ({ ...previous, username: true }))} aria-invalid={Boolean(touched.username && errors.username)} />{fieldError('username')}</label>
            </div>
            <label className="field"><span>{t('registerEmail')}</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={update} onBlur={() => setTouched((previous) => ({ ...previous, email: true }))} aria-invalid={Boolean(touched.email && errors.email)} />{fieldError('email')}</label>
            <div className="form-row">
              <label className="field"><span>{t('registerPassword')}</span><span className="input-with-action"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" placeholder="Create a password" value={values.password} onChange={update} onBlur={() => setTouched((previous) => ({ ...previous, password: true }))} aria-invalid={Boolean(touched.password && errors.password)} /><button type="button" className="input-action" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span>{fieldError('password')}</label>
              <label className="field"><span>{t('registerConfirm')}</span><span className="input-with-action"><input type={showConfirm ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" placeholder="Repeat password" value={values.confirmPassword} onChange={update} onBlur={() => setTouched((previous) => ({ ...previous, confirmPassword: true }))} aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)} /><button type="button" className="input-action" aria-label={showConfirm ? 'Hide password confirmation' : 'Show password confirmation'} onClick={() => setShowConfirm((visible) => !visible)}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button></span>{fieldError('confirmPassword')}</label>
            </div>
            <div className="password-meter" aria-label={`Password strength: ${strength} of 3 requirements met`}><div className="password-bars">{[1, 2, 3].map((bar) => <i className={strength >= bar ? `is-on strength-${strength}` : ''} key={bar} />)}</div><span>{strength === 0 ? 'Add a strong password' : strength === 3 ? 'Strong password' : 'Password strength'}</span></div>
            <div className="password-rules"><span className={validPasswordChecks[0] ? 'rule-met' : ''}><Check size={12} /> 8+ characters</span><span className={validPasswordChecks[1] ? 'rule-met' : ''}><Check size={12} /> One number</span><span className={validPasswordChecks[2] ? 'rule-met' : ''}><Check size={12} /> One uppercase</span></div>
            <label className="terms-check"><input type="checkbox" name="agreed" checked={values.agreed} onChange={update} /><span className="check-box"><Check size={12} /></span><span>{t('registerTerms')}</span></label>{fieldError('agreed')}
            <button className="button button--primary submit-button" type="submit" disabled={!canSubmit}>{t('registerCreate')} <ArrowRight size={17} /></button>
            <p className="auth-switch">{t('alreadyAccount')} <Link to="/login">{t('signIn')}</Link></p>
            <p className="privacy-note"><LockKeyhole size={12} /> Your information stays private and secure.</p>
          </form>
        </div>
        <footer className="auth-footer"><ShieldCheck size={13} /> A safe space to learn, grow and be yourself.</footer>
      </section>
    </main>
  )
}