import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Flame, Sparkles, Star, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuestAnswer from '../components/QuestAnswer.jsx'
import StudentLayout from '../components/StudentLayout.jsx'
import { evaluateQuestAnswer, getAchievements, getDailyChallenge, getLevel, recordDailyChallenge } from '../utils/learning.js'
import { saveProfile } from '../utils/profile.js'

export default function DailyChallengePage({ profile }) {
  const [student, setStudent] = useState(profile)
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState(null)
  const challenge = getDailyChallenge(student)

  function submitChallenge(event) {
    event.preventDefault()
    if (!challenge || challenge.completed || Object.keys(answers).length < challenge.questions.length) return
    const previousLevel = getLevel(Number(student.xp || 0)).level
    const outcomes = challenge.questions.map((question) => evaluateQuestAnswer(question, answers[question.id]))
    const correct = outcomes.filter((outcome) => outcome.correct).length
    const updated = recordDailyChallenge(student, challenge, answers)
    saveProfile(updated)
    setStudent(updated)
    const achievementTitles = getAchievements(updated).filter((achievement) => updated.recentAchievementIds?.includes(achievement.id)).map((achievement) => achievement.title)
    setFeedback({ correct, total: challenge.questions.length, xp: updated.xp - Number(student.xp || 0), levelUp: getLevel(updated.xp).level > previousLevel, achievementTitles })
  }

  if (!challenge) {
    return <StudentLayout profile={student} active="quests"><section className="learning-empty learning-empty--large"><Sparkles size={19} /><h1>Choose a subject first</h1><p>Your daily challenge is made from the subjects in your learning path.</p><Link className="button button--primary" to="/onboarding">Choose subjects <ArrowRight size={15} /></Link></section></StudentLayout>
  }

  const completed = challenge.completed || Boolean(feedback)
  const answeredCount = completed ? challenge.questions.length : Object.keys(answers).length

  return (
    <StudentLayout profile={student} active="quests">
      <div className="quest-page-heading"><Link to="/dashboard"><ArrowLeft size={15} /> Dashboard</Link><span>DAILY QUEST <i /> GRADE {challenge.grade}</span></div>
      <header className="daily-challenge-hero"><div className="daily-challenge-icon"><Flame size={22} /></div><div><span className="panel-kicker">YOUR DAILY CHALLENGE</span><h1>{challenge.title}</h1><p>Five quick questions from your chosen subjects.</p></div><div className="daily-challenge-reward"><Star size={15} fill="currentColor" /><b>+50 XP</b></div></header>
      <div className="challenge-overview"><span><Target size={14} /> {challenge.questions.length} questions</span><span><Sparkles size={14} /> {challenge.questions.map((question) => question.subjectId).filter((id, index, ids) => ids.indexOf(id) === index).length} selected subjects</span><b>{answeredCount} / {challenge.questions.length} answered</b></div>
      <div className="quest-progress-line challenge-progress"><span><i style={{ width: `${(answeredCount / challenge.questions.length) * 100}%` }} /></span></div>
      {completed ? <section className="daily-challenge-result" role="status"><span className="quest-result__icon"><Check size={17} /></span><div><span className="panel-kicker">CHALLENGE COMPLETE</span><h2>{feedback?.correct ?? challenge.previousResult?.correct} / {feedback?.total ?? challenge.previousResult?.total} correct</h2><p>{feedback ? `You earned ${feedback.xp} XP and your daily streak is up to date.` : 'You already completed today’s challenge.'}</p>{feedback?.levelUp && <p className="level-up-notice"><ZapIcon /> Level up! Your new level is ready.</p>}{feedback?.achievementTitles.length > 0 && <p className="badge-unlock-notice">Badge unlocked: {feedback.achievementTitles.join(', ')}</p>}<Link className="button button--primary" to="/progress">See your progress <ArrowRight size={15} /></Link></div></section> : <form className="daily-challenge-questions" onSubmit={submitChallenge}>
        {challenge.questions.map((question, index) => <article className="challenge-question-card" key={question.id}><div className="challenge-question-heading"><span>{String(index + 1).padStart(2, '0')}</span><small>{question.subjectId.replace('mathematics', 'Math').replace('technology', 'Technology')} <i /> {question.topic}</small></div><h2>{question.question}</h2><QuestAnswer quest={question} value={answers[question.id] || ''} onChange={(answer) => setAnswers((previous) => ({ ...previous, [question.id]: answer }))} /></article>)}
        <div className="daily-challenge-submit"><span>Finish all five to keep your streak going.</span><button className="button button--primary" type="submit" disabled={answeredCount < challenge.questions.length}>Complete challenge <Check size={16} /></button></div>
      </form>}
    </StudentLayout>
  )
}

function ZapIcon() {
  return <span aria-hidden="true">✦</span>
}