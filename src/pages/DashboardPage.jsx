import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Award, BarChart3, Bell, BookOpen, BriefcaseBusiness, Check, ChevronRight, CircleHelp, Code2, Flame, Gamepad2, LockKeyhole, LogOut, Search, Settings2, Sparkles, Star, Target, Trophy, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import { clearProfile, gradeTrack, saveProfile } from '../utils/profile.js'

const quickStats = [
  { icon: Flame, label: 'Day streak', value: '7 days', tone: 'orange' },
  { icon: Target, label: 'Quests done', value: '12', tone: 'violet' },
  { icon: Star, label: 'Skills growing', value: '6', tone: 'cyan' },
]

export default function DashboardPage({ profile }) {
  const navigate = useNavigate()
  const [questDone, setQuestDone] = useState(Boolean(profile.questDone))
  const firstName = profile.name?.trim().split(' ')[0] || profile.username
  const xp = Number(profile.xp || 2480) + (questDone && !profile.questDone ? 120 : 0)

  function completeQuest() {
    if (questDone) return
    const updatedProfile = { ...profile, questDone: true, xp: Number(profile.xp || 2480) + 120, questsCompleted: Number(profile.questsCompleted || 12) + 1 }
    saveProfile(updatedProfile)
    setQuestDone(true)
  }

  function logout() {
    clearProfile()
    navigate('/')
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar"><Brand /><div className="dashboard-track-label"><span className="track-live" /> {gradeTrack(profile.grade)} TRACK</div><nav className="dashboard-nav" aria-label="Student navigation"><span className="nav-section-label">YOUR SPACE</span><a className="is-active" href="#dashboard"><Gamepad2 size={17} /> Dashboard</a><a href="#quests"><Target size={17} /> Quests <span className="nav-count">3</span></a><a href="#skills"><Zap size={17} /> My skills</a><a href="#portfolio"><BriefcaseBusiness size={17} /> Portfolio</a><span className="nav-section-label nav-section-label--spaced">YOUR JOURNEY</span><a href="#progress"><BarChart3 size={17} /> Progress</a><a href="#achievements"><Trophy size={17} /> Achievements</a></nav><div className="sidebar-bottom"><div className="sidebar-tip"><span><Sparkles size={15} /></span><b>Keep your streak alive</b><p>One small quest a day adds up.</p><Link to="/onboarding">Your interests <ArrowRight size={13} /></Link></div><button className="sidebar-settings" type="button" onClick={() => navigate('/onboarding')}><Settings2 size={16} /> Profile settings</button><button className="sidebar-signout" type="button" onClick={logout}><LogOut size={15} /> Sign out</button></div></aside>
      <section className="dashboard-main" id="dashboard">
        <header className="dashboard-topbar"><div className="dashboard-breadcrumb"><span>MY SPACE</span><ChevronRight size={13} /><b>Dashboard</b></div><div className="topbar-actions"><button type="button" aria-label="Search" className="topbar-icon"><Search size={17} /></button><button type="button" aria-label="Notifications" className="topbar-icon notification-button"><Bell size={17} /><i /></button><span className="topbar-divider" /><div className="topbar-profile"><div className="profile-initial">{firstName?.[0]?.toUpperCase() || 'Q'}</div><span><b>{profile.username}</b><small>{profile.grade} · {gradeTrack(profile.grade)}</small></span><ChevronRight size={14} /></div></div></header>
        <div className="dashboard-content">
          <div className="dashboard-welcome"><div><span className="dashboard-date">MONDAY, OCTOBER 12 <i /> YOUR LEARNING SPACE</span><h1>Hey, {firstName} <span>✦</span></h1><p>One more quest today gets you closer to your next level.</p></div><div className="dashboard-welcome__actions"><div className="coin-wallet"><span>✦</span><b>{profile.coins || 240}</b><small>COINS</small></div><button className="help-button" type="button" aria-label="Help"><CircleHelp size={18} /></button></div></div>
          <div className="dashboard-level"><div className="level-badge"><span><Zap size={20} fill="currentColor" /></span><small>LVL</small><b>08</b></div><div className="level-copy"><div className="level-copy__top"><div><span>{gradeTrack(profile.grade).toUpperCase()} <i /> LEVEL 08</span><h2>Your next level is in sight.</h2></div><div className="level-xp"><b>{xp.toLocaleString()}</b><span> / 3,000 XP</span></div></div><div className="dashboard-xp-track"><i style={{ width: `${Math.min(100, xp / 30)}%` }} /></div><div className="level-copy__bottom"><span>520 XP to Level 09</span><span className="next-level"><span>✦</span> LEVEL 09</span></div></div><div className="level-decoration">✦</div></div>
          <div className="stats-row">{quickStats.map(({ icon: Icon, label, value, tone }) => <article className="stat-item" key={label}><span className={`stat-icon stat-icon--${tone}`}><Icon size={16} /></span><span className="stat-label">{label}</span><b>{label === 'Quests done' ? profile.questsCompleted || value : value}</b></article>)}</div>
          <div className="dashboard-grid">
            <section className="daily-quest-panel" id="quests"><div className="panel-heading"><div><span className="panel-kicker"><span className="quest-live-dot" /> YOUR DAILY QUEST</span><h2>Make today count.</h2></div><button className="icon-button" type="button" aria-label="Quest options"><ArrowUpRight size={16} /></button></div><div className="daily-quest-content"><div className="daily-quest-visual"><div className="daily-orbit daily-orbit--one" /><div className="daily-orbit daily-orbit--two" /><div className="daily-code-icon"><Code2 size={28} /></div><span className="quest-float quest-float--one">&lt;/&gt;</span><span className="quest-float quest-float--two">✦</span></div><div className="quest-detail"><span className="quest-category">TECHNOLOGY <i /> 12 MIN</span><h3>Code your first loop</h3><p>Bring your ideas to life. Learn how loops make your code work smarter.</p><div className="quest-meta"><span><Star size={13} fill="currentColor" /> Beginner friendly</span><span><span className="reward-coin">✦</span> +120 XP</span></div><div className="quest-steps"><span><Check size={12} /> Explore loops</span><i /><span className={questDone ? 'is-complete' : ''}>{questDone ? <Check size={12} /> : '02'} Try a challenge</span><i /><span>03 Make it yours</span></div><button className={`button ${questDone ? 'button--success' : 'button--primary'} quest-start-button`} type="button" onClick={completeQuest}>{questDone ? <><Check size={16} /> Quest completed</> : <>Start this quest <ArrowRight size={16} /></>}</button></div></div><div className="quest-panel-footer"><span><LockKeyhole size={12} /> Your progress saves automatically</span><Link to="/onboarding">Explore more quests <ArrowUpRight size={13} /></Link></div></section>
            <section className="dashboard-side-stack"><article className="streak-panel"><div className="streak-panel__head"><span className="streak-flame"><Flame size={17} fill="currentColor" /></span><div><span>YOUR STREAK</span><b>7 <small>days</small></b></div><span className="streak-best">PERSONAL BEST <b>9</b></span></div><div className="week-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div className={index < 5 ? 'is-done' : index === 5 ? 'is-today' : ''} key={`${day}-${index}`}><span>{day}</span><i>{index < 5 ? <Check size={11} /> : index === 5 ? <Flame size={12} /> : ''}</i></div>)}</div><p>Two more quests to beat your best.</p></article>
              <article className="achievement-panel" id="achievements"><div className="achievement-head"><span className="achievement-icon"><Award size={18} /></span><div><span>RECENT ACHIEVEMENT</span><b>Curious mind</b></div><ArrowUpRight size={15} /></div><p>You explored 3 new topics this week. Keep following those questions.</p><div className="achievement-progress"><span><i /></span><b>3 / 5</b></div></article></section>
          </div>
          <section className="interests-strip" id="skills"><div><span className="panel-kicker">YOUR CURIOSITY MAP</span><h2>Things you’re into</h2></div><div className="interest-chips">{(profile.interests || []).slice(0, 4).map((interest) => <span key={interest}>{interest}</span>)}{profile.interests?.length > 4 && <span>+{profile.interests.length - 4}</span>}</div><button className="interest-edit" type="button" onClick={() => navigate('/onboarding')} aria-label="Edit your interests"><ArrowUpRight size={16} /></button></section>
          <footer className="dashboard-footer"><span><BookOpen size={13} /> Keep going, keep growing.</span><span>SKILLQUEST <i /> <Link to="/onboarding">Your learning path</Link></span></footer>
        </div>
      </section>
    </main>
  )
}