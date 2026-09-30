import { ArrowLeft, ArrowRight, BookOpen, Check, CircleDot, LockKeyhole, Sparkles, Target } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getQuest, getSubject, getSubjectStats, getSubjectTopics } from '../utils/learning.js'

export default function SubjectPage({ profile }) {
  const { subjectId } = useParams()
  const subject = getSubject(subjectId)

  if (!subject || !profile.subjects?.includes(subjectId)) {
    return <StudentLayout profile={profile} active="dashboard"><section className="learning-empty learning-empty--large"><BookOpen size={20} /><h1>Subject not in your path</h1><p>Add this subject to your learning path to explore its topics.</p><Link className="button button--primary" to="/dashboard#subjects">Manage subjects <ArrowRight size={15} /></Link></section></StudentLayout>
  }

  const stats = getSubjectStats(profile, subjectId)
  const topics = getSubjectTopics(profile, subjectId)
  const quest = getQuest(profile, subjectId)

  return (
    <StudentLayout profile={profile} active="dashboard">
      <div className="subject-page-back"><Link to="/dashboard#subjects"><ArrowLeft size={15} /> My subjects</Link><span>GRADE {profile.grade?.replace(/\D/g, '') || '1'} <i /> PERSONAL LEARNING PATH</span></div>
      <header className={`subject-page-hero subject-page-hero--${subject.color}`}>
        <span className="subject-page-icon">{subject.icon}</span>
        <div><span className="panel-kicker">SUBJECT OVERVIEW</span><h1>{subject.name}</h1><p>{stats.progress}% complete <i /> Level {stats.level} <i /> {stats.xp} XP</p></div>
        {quest && <Link className="button button--primary" to={`/quest?subject=${subjectId}`}>Continue learning <ArrowRight size={15} /></Link>}
      </header>
      <section className="subject-progress-panel"><div><span>SUBJECT PROGRESS</span><b>{stats.progress}%</b></div><span><i style={{ width: `${stats.progress}%` }} /></span><div className="subject-progress-facts"><span><Target size={13} /> {stats.completed} quests completed</span><span><Sparkles size={13} /> {topics.length} grade-matched topics</span></div></section>
      <section className="subject-topics-section"><div className="section-row-heading"><div><span className="panel-kicker">TOPICS · QUESTS · PROGRESS</span><h2>Your topics</h2><p>Topics are selected for grade {profile.grade?.replace(/\D/g, '') || '1'}.</p></div></div><div className="subject-topic-list">{topics.map((topic, index) => <article className={`subject-topic-card${topic.isCurrent ? ' is-current' : ''}`} key={topic.id}><span className="subject-topic-index">{String(index + 1).padStart(2, '0')}</span><div className="subject-topic-copy"><span>{topic.difficulty} <i /> {topic.completed} completed</span><h3>{topic.title}</h3><p>{topic.topic}</p></div><span className={`subject-topic-status${topic.completed ? ' is-complete' : ''}`}>{topic.completed ? <Check size={14} /> : topic.isCurrent ? <CircleDot size={14} /> : <LockKeyhole size={14} />}{topic.completed ? 'Completed' : topic.isCurrent ? 'In progress' : 'Up next'}</span><Link className="subject-topic-action" to={`/quest?subject=${subjectId}&topic=${topic.difficultyIndex}`} aria-label={`Start ${topic.title}`}><ArrowRight size={16} /></Link></article>)}</div></section>
      <footer className="dashboard-footer"><span><Check size={13} /> Your subject progress saves automatically.</span><span>SKILLQUEST <i /> <Link to="/progress">All progress</Link></span></footer>
    </StudentLayout>
  )
}