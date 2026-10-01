import { Award, BarChart3, Bell, Compass, Flame, Home, LifeBuoy, LogOut, Menu, Moon, Newspaper, Search, Settings, Sun, Target, UserRound, Users, X, Zap } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Brand from './Brand.jsx'
import { clearProfile, gradeTrack } from '../utils/profile.js'
import { getNotifications, updateNotifications } from '../utils/notifications.js'
import useLanguage from '../utils/useLanguage.js'

const navigationGroups = [
  { titleKey: 'mySpace', items: [
    { to: '/dashboard', labelKey: 'home', active: 'dashboard', icon: Home, end: true },
    { to: '/quests', labelKey: 'quests', active: 'quests', icon: Target },
    { to: '/progress', labelKey: 'progress', active: 'progress', icon: BarChart3 },
  ] },
  { titleKey: 'discover', items: [
    { to: '/explore', labelKey: 'explore', active: 'explore', icon: Compass },
    { to: '/news', labelKey: 'news', active: 'news', icon: Newspaper },
    { to: '/leaderboard', labelKey: 'leaderboard', active: 'leaderboard', icon: Users },
  ] },
  { titleKey: 'myJourney', items: [
    { to: '/achievements', labelKey: 'achievements', active: 'achievements', icon: Award },
    { to: '/onboarding', labelKey: 'learningPath', active: 'learningpath', icon: Target },
  ] },
]

const mobileNavigation = [
  { to: '/dashboard', labelKey: 'home', active: 'dashboard', icon: Home, end: true },
  { to: '/quests', labelKey: 'quests', active: 'quests', icon: Target },
  { to: '/explore', labelKey: 'explore', active: 'explore', icon: Compass },
  { to: '/news', labelKey: 'news', active: 'news', icon: Newspaper },
  { to: '/profile', labelKey: 'profile', active: 'profile', icon: UserRound },
]

function getSavedTheme() {
  try {
    return localStorage.getItem('skillquest.theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export default function StudentLayout({ profile, active, children }) {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [theme, setTheme] = useState(getSavedTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(getNotifications)
  const firstName = profile.name?.trim().split(' ')[0] || profile.username || 'Learner'
  const avatar = profile.avatar || profile.name?.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || firstName[0]?.toUpperCase() || 'Q'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('skillquest.theme', theme)
    } catch {}
    function syncTheme() {
      setTheme(getSavedTheme())
    }
    window.addEventListener('skillquest:theme-change', syncTheme)
    return () => window.removeEventListener('skillquest:theme-change', syncTheme)
  }, [theme])

  useEffect(() => {
    function syncNotifications() {
      setNotifications(getNotifications())
    }
    window.addEventListener('skillquest:notification-change', syncNotifications)
    return () => window.removeEventListener('skillquest:notification-change', syncNotifications)
  }, [])

  function signOut() {
    clearProfile()
    navigate('/')
  }

  return (
    <main className={`dashboard-page${menuOpen ? ' is-mobile-menu-open' : ''}`}>
      <aside className={`dashboard-sidebar${menuOpen ? ' is-open' : ''}`}>
        <div className="sidebar-brand-row"><Brand /><div className="dashboard-track-label"><span className="track-live" /> {gradeTrack(profile.grade)} TRACK</div><button className="sidebar-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
        <nav className="dashboard-nav" aria-label="Student navigation">
          {navigationGroups.map((group) => <div className="dashboard-nav-group" key={group.titleKey}><span className="nav-section-label">{t(group.titleKey)}</span>{group.items.map(({ to, labelKey, active: activeKey, icon: Icon, end }) => <NavLink to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive || active === activeKey ? 'is-active' : ''} key={to}><Icon size={17} /> {t(labelKey)}{activeKey === 'quests' && <span className="nav-count">{profile.subjects?.length || 0}</span>}</NavLink>)}</div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip"><span><Flame size={15} /></span><b>Keep your streak alive</b><p>One small quest a day adds up.</p><Link to="/progress">See your progress <Zap size={13} /></Link></div>
          <Link className={`sidebar-utility${active === 'settings' ? ' is-active' : ''}`} to="/settings"><Settings size={15} /> {t('settings')}</Link>
          <Link className={`sidebar-utility${active === 'help' ? ' is-active' : ''}`} to="/help"><LifeBuoy size={15} /> {t('help')}</Link>
          <button className="sidebar-signout" type="button" onClick={signOut}><LogOut size={15} /> {t('signOut')}</button>
        </div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb"><span>SKILLQUEST</span><b>{active === 'dashboard' ? t('home') : active === 'quests' ? t('quests') : t(active) || active}</b></div>
          <nav className="platform-top-nav" aria-label="Main navigation">{[
            { to: '/dashboard', labelKey: 'home', end: true }, { to: '/explore', labelKey: 'explore' }, { to: '/quests', labelKey: 'quests' }, { to: '/news', labelKey: 'news' }, { to: '/leaderboard', labelKey: 'leaderboard' },
          ].map(({ to, labelKey, end }) => <NavLink to={to} end={end} key={to}>{t(labelKey)}</NavLink>)}</nav>
          <div className="topbar-actions"><Link className="topbar-icon-button" to="/search" aria-label={t('search')} title={t('search')}><Search size={17} /></Link><div className="notification-anchor"><button className="topbar-icon-button notification-trigger" type="button" onClick={() => { const nextOpen = !notificationsOpen; setNotificationsOpen(nextOpen); if (nextOpen) { const read = notifications.map((item) => ({ ...item, read: true })); setNotifications(read); updateNotifications(read) } }} aria-label={`${t('notifications')}${notifications.some((item) => !item.read) ? ', unread notifications' : ''}`} aria-expanded={notificationsOpen} title={t('notifications')}><Bell size={17} />{notifications.some((item) => !item.read) && <i className="notification-unread-dot" />}</button>{notificationsOpen && <section className="notification-popover" aria-label={t('notifications')}><div className="notification-popover__header"><b>{t('notifications')}</b>{notifications.length > 0 && <button type="button" onClick={() => { setNotifications([]); updateNotifications([]) }}>{t('clearNotifications')}</button>}</div>{notifications.length ? <div className="notification-list">{notifications.map((item) => <article className={`notification-item${item.read ? '' : ' is-unread'}`} key={item.id}><span className={`notification-item__icon notification-item__icon--${item.type}`}><Bell size={14} /></span><span><b>{item.title}</b><small>{item.message}</small><time dateTime={item.createdAt}>{new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(item.createdAt))}</time></span></article>)}</div> : <div className="notification-empty"><Bell size={18} /><p>{t('emptyNotifications')}</p></div>}</section>}</div><button className="topbar-icon-button" type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><Link className="topbar-profile" to="/profile" aria-label={`${profile.username || firstName} profile`}><div className="profile-initial" role="img" aria-label={`${firstName}'s avatar`}>{avatar}</div><span><b>{profile.username}</b><small>{profile.grade} · {gradeTrack(profile.grade)}</small></span></Link></div>
        </header>
        <div className="dashboard-content">{children}</div>
      </section>
      <nav className="mobile-student-nav" aria-label="Mobile student navigation">
        {mobileNavigation.map(({ to, labelKey, active: activeKey, icon: Icon, end }) => <NavLink to={to} end={end} className={({ isActive }) => isActive || active === activeKey ? 'is-active' : ''} key={to}><Icon size={18} /><span>{t(labelKey)}</span></NavLink>)}
      </nav>
    </main>
  )
}