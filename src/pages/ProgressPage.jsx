import { ArrowRight, Award, BarChart3, Check, Flame, Gauge, Sparkles, Star, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import SubjectCard from '../components/SubjectCard.jsx'
import { getAccuracy, getAchievements, getLevel, getRecommendedQuests, getStreak, getSubject, getSubjectStats, getWeeklyActivity } from '../utils/learning.js'

export default function ProgressPage({ profile }) {
  const quests = getRecommendedQuests(profile)
  const subjects = (profile.subjects || []).map((id) => ({ subject: getSubject(id), stats: getSubjectStats(profile, id), quest: quests.find((quest) => quest.subjectId === id) })).filter((item) => item.subject)
  const level = getLevel(Number(profile.xp || 0))
  const activity = getWeeklyActivity(profile)
  const maxActivity = Math.max(1, ...activity.map((item) => item.xp))
  const achievements = getAchievements(profile)
  const accuracy = getAccuracy(profile)
  const strengths = [...new Set(subjects.flatMap(({ stats }) => stats.strongTopics))]
  const practice = [...new Set(subjects.flatMap(({ stats }) => stats.practiceTopics))]

  return (
    <StudentLayout profile={profile} active="progress">
      <header className="progress-page-heading"><div><span className="panel-kicker"><BarChart3 size={13} /> YOUR LEARNING JOURNEY</span><h1>Progress</h1><p>Every completed quest builds a skill you can keep.</p></div><Link className="button button--quiet" to="/dashboard">Back to dashboard <ArrowRight size={15} /></Link></header>
      <section className="progress-summary-grid">
        <ProgressMetric icon={Star} label="Total XP" value={Number(profile.xp || 0).toLocaleString()} caption="Across all subjects" tone="violet" />
        <ProgressMetric icon={Zap} label="Level" value={level.level} caption={`${level.remaining} XP to next level`} tone="cyan" />
        <ProgressMetric icon={Flame} label="Streak" value={`${getStreak(profile)} ${getStreak(profile) === 1 ? 'day' : 'days'}`} caption="Keep your daily rhythm" tone="orange" />
        <ProgressMetric icon={Target} label="Quests completed" value={Number(profile.questsCompleted || 0)} caption="Correctly completed" tone="green" />
        <ProgressMetric icon={Gauge} label="Accuracy" value={`${accuracy.percent}%`} caption={`${accuracy.correct} / ${accuracy.attempts} correct`} tone="cyan" />
      </section>
      <div className="progress-grid">
        <section className="progress-panel"><div className="section-row-heading"><div><span className="panel-kicker">LAST 7 DAYS</span><h2>Weekly activity</h2></div><span className="activity-total">{activity.reduce((total, day) => total + day.xp, 0)} XP</span></div>
          {activity.some((day) => day.xp > 0) ? <div className="activity-chart" aria-label="Weekly XP activity">{activity.map((day) => <div className="activity-day" key={day.date}><span className="activity-bar-track"><i style={{ height: `${day.xp ? Math.max(9, (day.xp / maxActivity) * 100) : 3}%` }} /></span><b>{day.label}</b></div>)}</div> : <div className="learning-empty"><Sparkles size={16} /><span>Your weekly activity chart will fill in as you complete quests.</span></div>}
          <div className="progress-level-line"><div><span>LEVEL {level.level} PROGRESS</span><b>{Math.round(level.progress)}%</b></div><span><i style={{ width: `${level.progress}%` }} /></span></div>
        </section>
        <section className="progress-panel topic-panel"><div><span className="panel-kicker">SKILL CHECK-IN</span><h2>What’s clicking?</h2></div><TopicGroup title="Getting stronger" topics={strengths} tone="strong" empty="Finish a quest to find your strengths." /><TopicGroup title="Worth another look" topics={practice} tone="practice" empty="No tricky topics yet. Keep exploring." /></section>
      </div>
      <section className="subjects-section progress-subjects"><div className="section-row-heading"><div><span className="panel-kicker">SUBJECT BY SUBJECT</span><h2>My subjects</h2></div><Link to="/dashboard#subjects">Manage subjects <ArrowRight size={15} /></Link></div>{subjects.length ? <div className="subject-card-grid">{subjects.map(({ subject, stats, quest }) => <SubjectCard key={subject.id} subject={subject} stats={stats} quest={quest} />)}</div> : <div className="learning-empty"><span>Add a subject to start tracking progress.</span><Link to="/onboarding">Choose subjects <ArrowRight size={14} /></Link></div>}</section>
      <section className="achievement-section" id="achievements"><div className="section-row-heading"><div><span className="panel-kicker"><Award size={13} /> MILESTONES</span><h2>Badges & achievements</h2></div><span className="achievement-count">{achievements.filter((item) => item.unlocked).length} / {achievements.length} unlocked</span></div><div className="achievement-grid">{achievements.map((achievement) => <article className={`achievement-card${achievement.unlocked ? ' is-unlocked' : ''}`} key={achievement.id}><span className="achievement-card__icon">{achievement.unlocked ? achievement.icon : <span>?</span>}</span><span><b>{achievement.title}</b><small>{achievement.detail}</small></span>{achievement.unlocked && <Check size={15} />}</article>)}</div></section>
      <footer className="dashboard-footer"><span><Check size={13} /> Progress is saved on this device.</span><span>SKILLQUEST <i /> <Link to="/dashboard">Keep learning</Link></span></footer>
    </StudentLayout>
  )
}

function ProgressMetric({ icon: Icon, label, value, caption, tone }) {
  return <article className="progress-metric"><span className={`stat-icon stat-icon--${tone}`}><Icon size={17} /></span><span className="stat-label">{label}</span><b>{value}</b><small>{caption}</small></article>
}

function TopicGroup({ title, topics, tone, empty }) {
  return <div className={`topic-group topic-group--${tone}`}><b>{title}</b>{topics.length ? <div>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div> : <small>{empty}</small>}</div>
}