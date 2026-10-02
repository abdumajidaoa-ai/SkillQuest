import { Zap } from 'lucide-react'

export default function GamificationCard({ xp, level, track }) {
  return <section className="dashboard-level" aria-label="Level and experience">
    <div className="level-badge"><span><Zap size={20} fill="currentColor" /></span><small>LVL</small><b>{String(level.level).padStart(2, '0')}</b></div>
    <div className="level-copy"><div className="level-copy__top"><div><span>{track ? `${track.toUpperCase()} · ` : ''}LEVEL {level.level} · {level.title.toUpperCase()}</span><h2>Every quest moves you forward.</h2></div><div className="level-xp"><b>{xp.toLocaleString()}</b><span> / {level.next.toLocaleString()} XP</span></div></div><div className="dashboard-xp-track"><i style={{ width: `${level.progress}%` }} /></div><div className="level-copy__bottom"><span>{level.remaining.toLocaleString()} XP to Level {level.level + 1}</span><span className="next-level"><span>✦</span> LEVEL {level.level + 1}</span></div></div>
    <div className="level-decoration">✦</div>
  </section>
}