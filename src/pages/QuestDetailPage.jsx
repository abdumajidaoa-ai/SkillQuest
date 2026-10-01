import { ArrowLeft, ArrowRight, Check, Clock3, Lightbulb, Sparkles, Star, Target } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getQuest, getSubject, getSubjectStats } from '../utils/learning.js'

export default function QuestDetailPage({ profile }) {
  const { subjectId } = useParams()
  const subject = getSubject(subjectId)
  const stats = subject ? getSubjectStats(profile, subjectId) : null
  const quest = subject && profile.subjects?.includes(subjectId) ? getQuest(profile, subjectId) : null

  return <StudentLayout profile={profile} active="quests">
    <div className="quest-page-heading"><Link to="/quests"><ArrowLeft size={15} /> Quest explorer</Link><span>QUEST DETAIL</span></div>
    {quest && subject ? <div className="quest-detail-layout"><article className="quest-detail-main">
      <div className="quest-title-row"><div><span className="panel-kicker"><Target size={13} /> {subject.name.toUpperCase()} QUEST</span><h1>{quest.title}</h1><p>{quest.topic}</p></div><span className={`quest-subject-icon subject-color--${subject.color}`}>{subject.icon}</span></div>
      <p className="quest-detail-description">{quest.support || `Build confidence with ${quest.topic.toLowerCase()} through a short, focused challenge.`}</p>
      <div className="quest-meta-strip"><span>{quest.difficulty}</span><span><Clock3 size={14} /> {quest.minutes} min</span><b className="quest-reward"><Star size={14} fill="currentColor" /> +{quest.reward} XP</b></div>
      <section className="quest-objectives"><h2><Check size={16} /> What you’ll practice</h2><ul><li>Understand the key idea behind {quest.topic.toLowerCase()}.</li><li>Apply it to a grade-matched challenge.</li><li>Review your answer and see the explanation.</li></ul></section>
      <section className="quest-detail-task"><span className="panel-kicker"><Lightbulb size={13} /> YOUR CHALLENGE</span><p>{quest.question}</p><small>{quest.type.replaceAll('_', ' ')} · {quest.minutes} minutes</small></section>
      <Link className="button button--primary" to={`/quest?subject=${subjectId}`}>Start quest <ArrowRight size={16} /></Link>
    </article><aside className="quest-detail-aside"><div className="quest-side-icon"><Sparkles size={20} /></div><span className="panel-kicker">YOUR PROGRESS</span><h2>{stats.completed} quests completed</h2><p>Progress on your {subject.name.toLowerCase()} learning path.</p><div className="profile-xp-track"><i style={{ width: `${stats.progress}%` }} /></div><div className="profile-xp-caption"><span>{stats.progress}% complete</span><span>+{quest.reward} XP available</span></div><Link to={`/subjects/${subjectId}`}>View learning path <ArrowRight size={14} /></Link></aside></div> : <div className="learning-empty learning-empty--large"><Target size={20} /><h1>Quest unavailable</h1><p>This quest is not part of your learning path yet. Add the subject to explore its challenges.</p><Link className="button button--primary" to={profile.subjects?.length ? '/onboarding' : '/onboarding'}>Edit learning path <ArrowRight size={15} /></Link></div>}
  </StudentLayout>
}