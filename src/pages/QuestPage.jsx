import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Lightbulb, RotateCcw, Sparkles, Star, Target, X } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import QuestAnswer from '../components/QuestAnswer.jsx'
import { evaluateQuestAnswer, getAchievements, getLevel, getQuest, getRecommendedQuests, getSubject, recordQuestResult } from '../utils/learning.js'
import { saveProfile } from '../utils/profile.js'

export default function QuestPage({ profile }) {
  const location = useLocation()
  return <QuestSession key={location.search} profile={profile} />
}

function QuestSession({ profile }) {
  const [searchParams] = useSearchParams()
  const [student, setStudent] = useState(profile)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const subjectId = searchParams.get('subject') || student.subjects?.[0]
  const requestedTopic = Number.parseInt(searchParams.get('topic'), 10)
  const quest = subjectId && student.subjects?.includes(subjectId) ? getQuest(student, subjectId, Number.isInteger(requestedTopic) ? { ...student.subjectStats?.[subjectId], difficultyIndex: requestedTopic } : undefined) : null
  const displayQuest = result?.attempt || quest
  const subject = displayQuest ? getSubject(displayQuest.subjectId) : null
  function submitAnswer(event) {
    event.preventDefault()
    const hasAnswer = typeof answer === 'string' ? Boolean(answer.trim()) : Object.values(answer || {}).some(Boolean)
    if (!quest || !hasAnswer || result?.correct) return
    const submittedQuest = quest
    const evaluation = evaluateQuestAnswer(submittedQuest, answer)
    const previousLevel = getLevel(Number(student.xp || 0)).level
    const updated = recordQuestResult(student, submittedQuest, evaluation.correct)
    saveProfile(updated)
    setStudent(updated)
    const nextQuest = getRecommendedQuests(updated).find((item) => item.subjectId === submittedQuest.subjectId) || getRecommendedQuests(updated)[0]
    const achievementTitles = getAchievements(updated).filter((achievement) => updated.recentAchievementIds?.includes(achievement.id)).map((achievement) => achievement.title)
    setResult({ ...evaluation, xp: updated.xp - Number(student.xp || 0), rewardBreakdown: updated.lastRewardBreakdown, attempt: submittedQuest, nextQuest, levelUp: getLevel(updated.xp).level > previousLevel, achievementTitles })
  }

  function retry() {
    setResult(null)
    setAnswer('')
  }

  return (
    <StudentLayout profile={student} active="quests">
      <div className="quest-page-heading"><Link to="/dashboard"><ArrowLeft size={15} /> Dashboard</Link><span>QUEST BOARD <i /> GRADE {student.grade?.replace(/\D/g, '') || '1'}</span></div>
      {displayQuest && subject ? <div className="quest-workspace">
        <section className="quest-main-card">
          <div className="quest-title-row"><div><span className="panel-kicker"><Target size={13} /> PERSONALIZED QUEST</span><h1>{displayQuest.title}</h1><p>{subject.name} <i /> {displayQuest.topic}</p></div><span className={`quest-subject-icon subject-color--${subject.color}`}>{subject.icon}</span></div>
          <div className="quest-meta-strip"><span><b>GRADE {displayQuest.grade}</b> matched</span><span>{displayQuest.difficulty}</span><span><Clock3 size={14} /> {displayQuest.minutes} min</span><b className="quest-reward"><Star size={14} fill="currentColor" /> +{displayQuest.reward} XP</b></div>
          <div className="quest-progress-line"><div><span>QUEST PROGRESS</span><b>{result?.correct ? '100%' : result ? '70%' : '35%'}</b></div><span><i style={{ width: result?.correct ? '100%' : result ? '70%' : '35%' }} /></span></div>
          <section className="lesson-explainer"><span><Lightbulb size={15} /> QUICK EXPLAINER</span><p>{displayQuest.support || `Focus topic: ${displayQuest.topic}. Read the question carefully, think through one step at a time, and enter your answer below.`}</p></section>
          <form className="quest-answer-form" onSubmit={submitAnswer}>
            <div className="quest-answer-label">Your challenge <span className="quest-type-label">{quest.type.replaceAll('_', ' ')}</span></div>
            <p className="quest-question">{displayQuest.question}</p>
            <QuestAnswer quest={displayQuest} value={answer} onChange={setAnswer} disabled={Boolean(result?.correct)} />
            {!result && <button className="button button--primary" type="submit" disabled={typeof answer === 'string' ? !answer.trim() : !Object.values(answer || {}).some(Boolean)}>Check answer <ArrowRight size={16} /></button>}
          </form>
          {result && <section className={`quest-result ${result.correct ? 'quest-result--success' : 'quest-result--retry'}`} role="status">
            <span className="quest-result__icon">{result.correct ? <Check size={17} /> : <X size={17} />}</span>
            <div><h2>{result.correct ? 'Quest complete!' : 'Not quite yet'}</h2><p>{result.correct ? rewardMessage(result) : `${result.correctCount} of ${result.total} answers were right. Here’s how to work it out:`}</p>{result.levelUp && <p className="level-up-notice">✦ Level up! Your new level is ready.</p>}{result.achievementTitles.length > 0 && <p className="badge-unlock-notice">Badge unlocked: {result.achievementTitles.join(', ')}</p>}<p className="quest-explanation">{displayQuest.explanation}</p>{!result.correct && <p><b>Answer:</b> {typeof displayQuest.answer === 'string' ? displayQuest.answer : 'Review each answer with the explanation.'}</p>}{result.correct && result.nextQuest && <p className="next-quest-note"><b>Next up:</b> {result.nextQuest.title} · {result.nextQuest.subject.name}</p>}<div className="quest-result__actions">{!result.correct && <button className="button button--quiet" type="button" onClick={retry}><RotateCcw size={15} /> Try again</button>}<Link className="button button--primary" to="/dashboard">{result.correct ? 'See your next quest' : 'Back to dashboard'} <ArrowRight size={15} /></Link></div></div>
          </section>}
        </section>
        <aside className="quest-side-panel"><div className="quest-side-icon"><Sparkles size={20} /></div><span className="panel-kicker">YOUR LEARNING PATH</span><h2>Made for your level.</h2><p>This quest is selected using your grade, subject choice and recent results.</p><div className="quest-side-detail"><span>SUBJECT</span><b>{subject.name}</b></div><div className="quest-side-detail"><span>CURRENT TOPIC</span><b>{displayQuest.topic}</b></div><Link to="/progress">Review subject progress <ArrowRight size={14} /></Link></aside>
      </div> : <section className="learning-empty learning-empty--large"><Sparkles size={19} /><h1>{student.subjects?.length ? 'This subject is not in your path' : 'Choose your first subject'}</h1><p>{student.subjects?.length ? 'Choose one of your selected subjects, or add another subject from your dashboard.' : 'Add a subject to your learning path to get a grade-matched quest.'}</p><Link className="button button--primary" to={student.subjects?.length ? '/dashboard#subjects' : '/onboarding'}>{student.subjects?.length ? 'Manage subjects' : 'Set up my subjects'} <ArrowRight size={16} /></Link></section>}
    </StudentLayout>
  )
}

function rewardMessage(result) {
  const bonuses = []
  if (result.rewardBreakdown.streak) bonuses.push(`+${result.rewardBreakdown.streak} streak XP`)
  if (result.rewardBreakdown.practice) bonuses.push(`+${result.rewardBreakdown.practice} practice XP`)
  if (result.rewardBreakdown.achievements) bonuses.push(`+${result.rewardBreakdown.achievements} badge XP`)
  return `Great work. You earned ${result.xp} XP${bonuses.length ? ` (${bonuses.join(', ')})` : ''}.`
}