import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Award, BarChart3, Check, Flame, Plus, Sparkles, Star, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import SubjectCard from '../components/SubjectCard.jsx'
import StatCard from '../components/StatCard.jsx'
import GamificationCard from '../components/GamificationCard.jsx'
import { getAchievements, getLevel, getRecommendedQuests, getStreak, getSubject, getSubjectStats, getWeeklyActivity, subjectCatalog } from '../utils/learning.js'
import { saveProfile } from '../utils/profile.js'
import useLanguage from '../utils/useLanguage.js'

export default function DashboardHomePage({ profile }) {
  const { t } = useLanguage()
  const [student, setStudent] = useState(profile)
  const [todayKey] = useState(() => new Date().toISOString().slice(0, 10))
  const quests = getRecommendedQuests(student)
  const interestAliases = { mathematics: ['mathematics'], english: ['languages', 'english'], science: ['science'], technology: ['technology'] }
  const focusQuest = [...quests].sort((first, second) => {
    const practiceRank = Number(second.stats.practiceTopics.includes(second.topic)) - Number(first.stats.practiceTopics.includes(first.topic))
    const selectedInterests = (student.interests || []).map((interest) => interest.toLowerCase())
    const firstInterestRank = Math.min(...(interestAliases[first.subjectId] || []).map((interest) => selectedInterests.indexOf(interest)).filter((rank) => rank >= 0), 99)
    const secondInterestRank = Math.min(...(interestAliases[second.subjectId] || []).map((interest) => selectedInterests.indexOf(interest)).filter((rank) => rank >= 0), 99)
    const interestRank = firstInterestRank - secondInterestRank
    return practiceRank || interestRank || first.stats.progress - second.stats.progress
  })[0]
  const xp = Number(student.xp || 0)
  const level = getLevel(xp)
  const streak = getStreak(student)
  const weeklyActivity = getWeeklyActivity(student)
  const achievements = getAchievements(student)
  const recommendations = quests.filter((quest) => quest.subjectId !== focusQuest?.subjectId)
  if (!recommendations.length && focusQuest) recommendations.push(focusQuest)
  const subjects = (student.subjects || []).map((id) => ({ subject: getSubject(id), stats: getSubjectStats(student, id), quest: quests.find((item) => item.subjectId === id) })).filter((item) => item.subject)
  const averageProgress = subjects.length ? Math.round(subjects.reduce((total, item) => total + item.stats.progress, 0) / subjects.length) : 0
  const firstName = student.name?.trim().split(' ')[0] || student.username || 'Learner'
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length
  const focusHistory = focusQuest ? student.subjectStats?.[focusQuest.subjectId]?.history || [] : []
  const recentOutcomes = focusHistory.slice(-2)
  const needsPractice = Boolean(focusQuest && (focusQuest.stats.practiceTopics.includes(focusQuest.topic) || (recentOutcomes.length === 2 && recentOutcomes.every((attempt) => !attempt.correct))))
  const readyForChallenge = Boolean(focusQuest && !needsPractice && recentOutcomes.length === 2 && recentOutcomes.every((attempt) => attempt.correct))

  function updateProfile(next) {
    saveProfile(next)
    setStudent(next)
  }

  function addSubject(event) {
    const subjectId = event.target.value
    if (!subjectId || student.subjects?.includes(subjectId)) return
    updateProfile({ ...student, subjects: [...(student.subjects || []), subjectId] })
    event.target.value = ''
  }

  function removeSubject(subjectId) {
    updateProfile({ ...student, subjects: (student.subjects || []).filter((id) => id !== subjectId) })
  }

  return (
    <StudentLayout profile={student} active="dashboard">
      <header className="dashboard-welcome">
          <div><span className="dashboard-date">GRADE {student.grade?.replace(/\D/g, '') || '1'} <i /> YOUR LEARNING SPACE</span><h1>{t('welcomeBack')}, {firstName} <span>✦</span></h1><p>{t('welcomeToday')}</p></div>
        <div className="dashboard-welcome__actions"><div className="coin-wallet"><span>✦</span><b>{student.coins || 0}</b><small>COINS</small></div></div>
      </header>

      <GamificationCard xp={xp} level={level} track={student.track} />

      <section className="stats-row" aria-label="Learning summary">
        <StatCard icon={Flame} label="Daily streak" value={`${streak} ${streak === 1 ? 'day' : 'days'}`} tone="orange" />
        <StatCard icon={Target} label="Quests completed" value={Number(student.questsCompleted || 0)} tone="violet" />
        <StatCard icon={BarChart3} label="Overall progress" value={`${averageProgress}%`} tone="cyan" />
      </section>

      <Link className={`challenge-teaser${student.dailyChallenges?.[todayKey]?.completed ? ' is-complete' : ''}`} to="/challenge"><span className="challenge-teaser__icon"><Sparkles size={17} /></span><span><small>TODAY&apos;S MISSION</small><b>{student.dailyChallenges?.[todayKey]?.completed ? 'Today’s challenge complete' : 'Five questions, one streak bonus'}</b></span><span className="challenge-teaser__reward">+50 XP</span><ArrowUpRight size={16} /></Link>

      <div className="dashboard-grid">
        <section className="daily-quest-panel" id="quests">
          <div className="panel-heading"><div><span className="panel-kicker"><span className="quest-live-dot" /> TODAY’S QUEST</span><h2>{focusQuest ? 'A good next step.' : 'Choose a subject to begin.'}</h2></div><Link className="icon-button" to={focusQuest ? `/quest?subject=${focusQuest.subjectId}` : '/onboarding'} aria-label="Open today’s quest"><ArrowUpRight size={16} /></Link></div>
          {focusQuest ? <div className="today-quest-card"><div className={`today-quest-icon subject-color--${focusQuest.subject.color}`}>{focusQuest.subject.icon}</div><div className="today-quest-copy"><span>{focusQuest.subject.name} <i /> Grade {focusQuest.grade} <i /> {focusQuest.minutes} min</span><h3>{focusQuest.title}</h3><p>{focusQuest.topic}: {focusQuest.question}</p>{(needsPractice || readyForChallenge) && <div className={`learning-signal ${needsPractice ? 'learning-signal--practice' : 'learning-signal--challenge'}`}><Sparkles size={13} /><span><b>{needsPractice ? 'Practice recommended' : 'Ready for a challenge'}</b><small>{needsPractice ? 'Try a guided refresher and build confidence.' : 'Your recent answers are strong. Keep stretching your skills.'}</small></span></div>}<div className="today-quest-meta"><span>{focusQuest.difficulty}</span><b><Star size={13} fill="currentColor" /> +{focusQuest.reward} XP</b></div><Link className="button button--primary" to={`/quest?subject=${focusQuest.subjectId}`}>Start today’s quest <ArrowRight size={16} /></Link></div></div> : <EmptyPanel message="Pick at least one subject to get a grade-matched daily quest." />}
          <div className="quest-panel-footer"><span><Sparkles size={13} /> Personalized for your grade and progress</span><Link to="/quest">Browse quests <ArrowUpRight size={13} /></Link></div>
        </section>
        <section className="dashboard-side-stack">
          <article className="streak-panel"><div className="streak-panel__head"><span className="streak-flame"><Flame size={17} fill="currentColor" /></span><div><span>YOUR STREAK</span><b>{streak} <small>{streak === 1 ? 'day' : 'days'}</small></b></div><span className="streak-best">+10 XP <b>daily bonus</b></span></div><p>Complete a quest each day to keep your streak going.</p><div className="dashboard-streak-week" aria-label="Last seven days of learning activity">{weeklyActivity.map((day) => <span className={day.xp ? 'is-active' : ''} key={day.date} aria-label={`${day.date}: ${day.xp ? `${day.xp} XP earned` : 'no activity'}`}><i>{day.xp ? '✓' : '·'}</i><small>{day.label}</small></span>)}</div><Link to="/progress">View weekly activity <ArrowUpRight size={13} /></Link></article>
          <article className="achievement-panel"><div className="achievement-head"><span className="achievement-icon"><Award size={18} /></span><div><span>ACHIEVEMENTS</span><b>{unlockedCount} unlocked</b></div><Link to="/progress#achievements" aria-label="See achievements"><ArrowUpRight size={15} /></Link></div><p>{achievements.find((achievement) => achievement.unlocked)?.title || 'Your first badge is waiting.'}</p><div className="achievement-progress"><span><i style={{ width: `${(unlockedCount / achievements.length) * 100}%` }} /></span><b>{unlockedCount} / {achievements.length}</b></div></article>
        </section>
      </div>

      <section className="today-quests-section">
        <div className="section-row-heading"><div><span className="panel-kicker">READY WHEN YOU ARE</span><h2>Today’s quests</h2><p>Pick a skill and keep your momentum going.</p></div><Link to="/quests">Quest board <ArrowRight size={15} /></Link></div>
        {quests.length ? <div className="today-quests-grid">{quests.map((quest) => <article className="today-quest-tile" key={quest.id}>
          <div className={`today-quest-tile__icon subject-color--${quest.subject.color}`}>{quest.subject.icon}</div>
          <span className="today-quest-tile__subject">{quest.subject.name} · {quest.difficulty}</span>
          <h3>{quest.title}</h3><p>{quest.topic}: {quest.question}</p>
          <div className="today-quest-tile__meta"><span><Star size={13} fill="currentColor" /> +{quest.reward} XP</span><span>{quest.stats.progress}% path progress</span></div>
          <div className="today-quest-tile__progress" aria-label={`${quest.stats.progress}% path progress`}><i style={{ width: `${quest.stats.progress}%` }} /></div>
          <Link className="button button--primary button--small" to={`/quest?subject=${quest.subjectId}`}>Start Quest <ArrowRight size={14} /></Link>
        </article>)}</div> : <EmptyPanel message="Add a subject to see today's quests." />}
      </section>

      <section className="subjects-section" id="subjects">
        <div className="section-row-heading"><div><span className="panel-kicker">YOUR LEARNING PATH</span><h2>My subjects</h2><p>Progress and next steps, tailored to Grade {student.grade?.replace(/\D/g, '') || '1'}.</p></div><label className="subject-add-control"><Plus size={15} /><select value="" onChange={addSubject} aria-label="Add a subject"><option value="">Add subject</option>{subjectCatalog.filter(({ id }) => !student.subjects?.includes(id)).map(({ id, name }) => <option value={id} key={id}>{name}</option>)}</select></label></div>
        {subjects.length ? <div className="subject-card-grid">{subjects.map(({ subject, stats, quest }) => <SubjectCard key={subject.id} subject={subject} stats={stats} quest={quest} onRemove={removeSubject} />)}</div> : <EmptyPanel message="No subjects yet. Add a subject to build your personalized learning path." />}
      </section>

      <section className="recommendations-panel"><div className="section-row-heading"><div><span className="panel-kicker">BASED ON YOUR LEARNING PATH</span><h2>Recommended for you</h2></div><Link to="/quests">All quests <ArrowRight size={15} /></Link></div><div className="recommendation-list">{recommendations.slice(0, 3).map((quest, index) => <Link className="recommendation-item" to={`/quests/${quest.subjectId}`} key={`${quest.subjectId}-${index}`}><span className={`recommendation-icon subject-color--${quest.subject.color}`}>{quest.subject.icon}</span><span><small>{quest.subject.name} · {quest.difficulty} · {quest.minutes} min</small><b>{quest.title}</b><em>{quest.topic}</em></span><span className="recommendation-xp">+{quest.reward} XP</span><ArrowUpRight size={15} /></Link>)}{!recommendations.length && <EmptyPanel message="Add a subject to get personalized recommendations." />}</div></section>

      <footer className="dashboard-footer"><span><Check size={13} /> Small steps count.</span><span>SKILLQUEST <i /> <Link to="/progress">Your progress</Link></span></footer>
    </StudentLayout>
  )
}

function EmptyPanel({ message }) {
  return <div className="learning-empty"><Sparkles size={17} /><span>{message}</span></div>
}