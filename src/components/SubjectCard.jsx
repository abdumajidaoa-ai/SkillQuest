import { ArrowUpRight, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SubjectCard({ subject, stats, quest, onRemove }) {
  return (
    <article className={`subject-card subject-card--${subject.color}`}>
      <div className="subject-card__head">
        <span className="subject-card__icon">{subject.icon}</span>
        <div><Link className="subject-card__title" to={`/subjects/${subject.id}`}><h3>{subject.name}</h3></Link><span>LEVEL {stats.level} <i /> {stats.xp} XP</span></div>
        {onRemove && <button type="button" className="subject-remove" onClick={() => onRemove(subject.id)} aria-label={`Remove ${subject.name}`} title={`Remove ${subject.name}`}><X size={15} /></button>}
      </div>
      <div className="subject-card__progress"><span><i style={{ width: `${stats.progress}%` }} /></span><b>{stats.progress}%</b></div>
      <div className="subject-card__facts"><span><b>{stats.completed}</b> quests</span><span>Now: <b>{stats.currentTopic}</b></span></div>
      {stats.strongTopics.length > 0 && <div className="topic-note topic-note--strong"><Check size={12} /><span>Strong: {stats.strongTopics.slice(-2).join(', ')}</span></div>}
      {stats.practiceTopics.length > 0 && <div className="topic-note topic-note--practice"><span>Practice: {stats.practiceTopics.slice(-2).join(', ')}</span></div>}
      {quest && <Link className="subject-next-quest" to={`/quest?subject=${subject.id}`}><span><small>NEXT QUEST</small><b>{quest.title}</b></span><ArrowUpRight size={16} /></Link>}
    </article>
  )
}