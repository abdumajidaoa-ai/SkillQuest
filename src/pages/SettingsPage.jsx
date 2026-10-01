import { useState } from 'react'
import { Check, Moon, Save, Sun, UserRound } from 'lucide-react'
import StudentLayout from '../components/StudentLayout.jsx'
import { saveProfile } from '../utils/profile.js'
import useLanguage from '../utils/useLanguage.js'

export default function SettingsPage({ profile }) {
  const { language, setLanguage, t } = useLanguage()
  const [student, setStudent] = useState(profile)
  const [name, setName] = useState(profile.name || '')
  const [username, setUsername] = useState(profile.username || '')
  const [saved, setSaved] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  function updateTheme(value) {
    setTheme(value)
    document.documentElement.dataset.theme = value
    try {
      localStorage.setItem('skillquest.theme', value)
    } catch {}
    window.dispatchEvent(new Event('skillquest:theme-change'))
  }

  function submit(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    const next = { ...profile, name: trimmedName, username: username.trim(), avatar: trimmedName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
    saveProfile(next)
    setStudent(next)
    setSaved(true)
  }

  return <StudentLayout profile={student} active="settings">
    <header className="discovery-heading"><div><span className="panel-kicker">PERSONALIZE YOUR SPACE</span><h1>{t('settingsTitle')}</h1><p>{t('settingsSubtitle')}</p></div></header>
    <div className="settings-layout">
      <form className="settings-panel" onSubmit={submit}><span className="settings-panel__icon"><UserRound size={17} /></span><h2>{t('profileDetails')}</h2><p>{t('profileDetailsHelp')}</p><label className="field"><span>{t('name')}</span><input autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} required maxLength={60} /></label><label className="field"><span>{t('username')}</span><input autoComplete="username" value={username} onChange={(event) => { setUsername(event.target.value); setSaved(false) }} required maxLength={24} /></label><button className="button button--primary button--small" type="submit"><Save size={14} /> {t('saveProfile')}</button>{saved && <p className="settings-saved" role="status"><Check size={14} /> {t('saved')}</p>}</form>
      <section className="settings-panel"><span className="settings-panel__icon"><Sun size={17} /></span><h2>{t('appearance')}</h2><p>{t('appearanceHelp')}</p><div className="settings-theme-options"><button className={theme === 'dark' ? 'is-selected' : ''} type="button" aria-pressed={theme === 'dark'} onClick={() => updateTheme('dark')}><Moon size={16} /> {t('darkMode')} {theme === 'dark' && <Check size={15} />}</button><button className={theme === 'light' ? 'is-selected' : ''} type="button" aria-pressed={theme === 'light'} onClick={() => updateTheme('light')}><Sun size={16} /> {t('lightMode')} {theme === 'light' && <Check size={15} />}</button></div></section>
      <section className="settings-panel"><span className="settings-panel__icon"><span className="language-glyph">A文</span></span><h2>{t('language')}</h2><p>{t('languageHelp')}</p><label className="field"><span>{t('language')}</span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="en">English</option><option value="uz">O‘zbekcha</option><option value="ru">Русский</option></select></label></section>
    </div>
  </StudentLayout>
}