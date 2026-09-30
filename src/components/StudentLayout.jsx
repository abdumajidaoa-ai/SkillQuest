import { BarChart3, Flame, Gamepad2, LogOut, Target, Trophy, Zap } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Brand from './Brand.jsx'
import { clearProfile, gradeTrack } from '../utils/profile.js'

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: Gamepad2, end: true },
  { to: '/quest', label: 'Quests', icon: Target },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
]

export default function StudentLayout({ profile, active, children }) {
  const navigate = useNavigate()
  const firstName = profile.name?.trim().split(' ')[0] || profile.username || 'Learner'

  function signOut() {
    clearProfile()
    navigate('/')
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Brand />
        <div className="dashboard-track-label"><span className="track-live" /> {gradeTrack(profile.grade)} TRACK</div>
        <nav className="dashboard-nav" aria-label="Student navigation">
          <span className="nav-section-label">YOUR SPACE</span>
          {navigation.map(({ to, label, icon: Icon, end }) => <NavLink to={to} end={end} className={({ isActive }) => isActive || active === label.toLowerCase() ? 'is-active' : ''} key={to}><Icon size={17} /> {label}{label === 'Quests' && <span className="nav-count">{profile.subjects?.length || 0}</span>}</NavLink>)}
          <span className="nav-section-label nav-section-label--spaced">YOUR JOURNEY</span>
          <a href="/progress#achievements"><Trophy size={17} /> Achievements</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip"><span><Flame size={15} /></span><b>Keep your streak alive</b><p>One small quest a day adds up.</p><Link to="/progress">See your progress <Zap size={13} /></Link></div>
          <Link className="sidebar-settings" to="/onboarding">Edit learning path</Link>
          <button className="sidebar-signout" type="button" onClick={signOut}><LogOut size={15} /> Sign out</button>
        </div>
      </aside>
      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb"><span>MY SPACE</span><b>{active}</b></div>
          <div className="topbar-actions"><div className="topbar-profile"><div className="profile-initial">{firstName[0]?.toUpperCase() || 'Q'}</div><span><b>{profile.username}</b><small>{profile.grade} · {gradeTrack(profile.grade)}</small></span></div></div>
        </header>
        <div className="dashboard-content">{children}</div>
      </section>
      <nav className="mobile-student-nav" aria-label="Mobile student navigation">
        {navigation.map(({ to, label, icon: Icon, end }) => <NavLink to={to} end={end} className={({ isActive }) => isActive || active === label.toLowerCase() ? 'is-active' : ''} key={to}><Icon size={18} /><span>{label}</span></NavLink>)}
      </nav>
    </main>
  )
}