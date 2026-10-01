import { ArrowRight, Clock3, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function QuestCard({ quest, to = `/quests/${quest.subjectId}`, action = 'View quest' }) {
  return <article className="quest-explorer-card">
    <div className={`quest-explorer-card__icon subject-color--${quest.subject.color}`}>{quest.subject.icon}</div>
    <span className="quest-explorer-card__category">{categoryName(quest.subjectId)} · {quest.difficulty}</span>
    <h2>{quest.title}</h2>
    <p>{quest.topic}: {quest.question}</p>
    <div className="quest-explorer-card__meta"><span><Clock3 size={13} /> {quest.minutes} min</span><span><Star size={13} fill="currentColor" /> {quest.reward} XP</span></div>
    <div className="quest-explorer-card__progress"><span><i style={{ width: `${quest.stats.progress}%` }} /></span><small>{quest.stats.progress}% path</small></div>
    <Link className="button button--primary button--small" to={to}>{action} <ArrowRight size={14} /></Link>
  </article>
}

function categoryName(subjectId) {
  return ({
    technology: 'Programming',
    mathematics: 'Mathematics',
    english: 'English',
    science: 'Science',
    design: 'Design',
    business: 'Business',
    'general-skills': 'General Skills',
  })[subjectId] || 'General Skills'
}