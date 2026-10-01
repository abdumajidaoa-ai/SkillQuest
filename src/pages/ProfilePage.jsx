import { ArrowRight, Award, Flame, Medal, Sparkles, Star, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getAchievements, getLevel, getStreak, getWeeklyActivity } from '../utils/learning.js'
import useLanguage from '../utils/useLanguage.js'

export default function ProfilePage({ profile }) {
  const { t } = useLanguage()
  const xp = Number(profile.xp || 0)
  const level = getLevel(xp)
  const streak = getStreak(profile)
  const activity = getWeeklyActivity(profile)
  const achievements = getAchievements(profile).filter((achievement) => achievement.unlocked)
  const learningMinutes = Number(profile.learningMinutes || 0)
  const initials = profile.avatar || profile.name?.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || profile.username?.slice(0, 2).toUpperCase() || 'SQ'

  return <StudentLayout profile={profile} active="profile">
    <header className="discovery-heading"><div><span className="panel-kicker"><Sparkles size={13} /> YOUR LEARNING ID</span><h1>{t('profile')}</h1><p>{t('profileSubtitle')}</p></div></header>
    <section className="profile-hero"><div className="profile-avatar-large" role="img" aria-label={`${profile.username || 'Learner'} avatar`}>{initials}</div><div className="profile-identity"><span>LEVEL {level.level} · {level.title.toUpperCase()}</span><h2>{profile.username || profile.name || 'Learner'}</h2><p>{profile.grade || 'Student'}{profile.track ? ` · ${profile.track} track` : ''}</p></div><Link className="button button--quiet button--small" to="/settings">Edit profile <ArrowRight size={14} /></Link></section>
    <section className="profile-xp-panel"><div className="profile-xp-heading"><span><Zap size={15} /> LEVEL {level.level} PROGRESS</span><b>{xp.toLocaleString()} <small>/ {level.next.toLocaleString()} XP</small></b></div><div className="profile-xp-track"><i style={{ width: `${level.progress}%` }} /></div><div className="profile-xp-caption"><span>{Math.round(level.progress)}% complete</span><span>{level.remaining.toLocaleString()} XP to Level {level.level + 1}</span></div></section>
    <section className="profile-stat-grid"><ProfileStat icon={Star} label="Total XP" value={xp.toLocaleString()} /><ProfileStat icon={Target} label="Completed quests" value={Number(profile.questsCompleted || 0)} /><ProfileStat icon={Flame} label="Current streak" value={`${streak} ${streak === 1 ? 'day' : 'days'}`} /><ProfileStat icon={Zap} label="Learning time" value={formatLearningTime(learningMinutes)} /></section>
    <section className="profile-streak-panel"><div className="section-row-heading"><div><span className="panel-kicker"><Flame size={13} /> KEEP YOUR RHYTHM</span><h2>Last 7 days</h2><p>Complete a quest on a day to keep the streak moving.</p></div><b className="profile-streak-count"><Flame size={16} /> {streak} day{streak === 1 ? '' : 's'}</b></div><div className="streak-week" aria-label="Quest activity over the last seven days">{activity.map((day) => <div className={`streak-day${day.xp > 0 ? ' is-active' : ''}`} key={day.date} aria-label={`${day.date}: ${day.xp > 0 ? `${day.xp} XP earned` : 'no quest completed'}`}><span>{day.label}</span><b>{day.xp > 0 ? <Medal size={15} /> : '·'}</b><small>{new Intl.DateTimeFormat('en', { day: 'numeric', timeZone: 'UTC' }).format(new Date(`${day.date}T12:00:00Z`))}</small></div>)}</div></section>
    <section className="profile-achievements"><div className="section-row-heading"><div><span className="panel-kicker"><Award size={13} /> MILESTONES</span><h2>Unlocked achievements</h2></div><Link to="/achievements">All achievements <ArrowRight size={14} /></Link></div>{achievements.length ? <div className="profile-achievement-list">{achievements.slice(0, 4).map((item) => <span className="profile-achievement" key={item.id}><b>{item.icon}</b>{item.title}</span>)}</div> : <div className="learning-empty"><Award size={15} /><span>Your first achievement is waiting. Complete a quest to earn one.</span></div>}</section>
    <footer className="dashboard-footer"><span><Sparkles size={13} /> Your progress is saved on this device.</span><span><Link to="/progress">Full progress report <ArrowRight size={13} /></Link></span></footer>
  </StudentLayout>
}

function ProfileStat({ icon: Icon, label, value }) {
  return <article className="profile-stat"><span><Icon size={16} /></span><small>{label}</small><b>{value}</b></article>
}

function formatLearningTime(minutes) {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`
}