import { ArrowRight, Award, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getAchievements } from '../utils/learning.js'
import useLanguage from '../utils/useLanguage.js'

export default function AchievementsPage({ profile }) {
  const { t } = useLanguage()
  const achievements = getAchievements(profile)
  const unlocked = achievements.filter((item) => item.unlocked).length
  return <StudentLayout profile={profile} active="achievements">
    <header className="discovery-heading"><div><span className="panel-kicker"><Award size={13} /> YOUR MILESTONES</span><h1>{t('achievements')}</h1><p>{t('achievementsSubtitle')}</p></div><span className="news-count">{unlocked} / {achievements.length} unlocked</span></header>
    <section className="achievement-overview"><span className="achievement-overview__icon"><Sparkles size={19} /></span><div><b>{unlocked ? 'Nice work. Keep building.' : 'Your first milestone is waiting.'}</b><p>{unlocked} achievements unlocked from your learning journey.</p></div><div className="achievement-overview__progress"><span><i style={{ width: `${achievements.length ? unlocked / achievements.length * 100 : 0}%` }} /></span><small>{Math.round(achievements.length ? unlocked / achievements.length * 100 : 0)}%</small></div></section>
    <div className="achievement-library">{achievements.map((item) => <article className={`achievement-library-card${item.unlocked ? ' is-unlocked' : ''}`} key={item.id}><span className="achievement-library-card__icon">{item.unlocked ? item.icon : <Award size={19} />}</span><span><b>{item.title}</b><small>{item.detail}</small></span>{item.unlocked && <Check size={16} />}</article>)}</div>
    <footer className="dashboard-footer"><span><Sparkles size={13} /> Complete quests to unlock more milestones.</span><span><Link to="/quests">Find a quest <ArrowRight size={13} /></Link></span></footer>
  </StudentLayout>
}