import { Medal, Sparkles, Trophy } from 'lucide-react'
import StudentLayout from '../components/StudentLayout.jsx'
import { getLevel } from '../utils/learning.js'
import useLanguage from '../utils/useLanguage.js'

const learners = [
  { username: 'NovaLearns', xp: 1870, questsCompleted: 24 },
  { username: 'PixelPilot', xp: 1540, questsCompleted: 21 },
  { username: 'CuriousKai', xp: 1290, questsCompleted: 18 },
  { username: 'MiraMakes', xp: 1060, questsCompleted: 16 },
  { username: 'CodeComet', xp: 890, questsCompleted: 13 },
  { username: 'SunnySteps', xp: 720, questsCompleted: 11 },
  { username: 'BrainwaveBee', xp: 540, questsCompleted: 9 },
]

export default function LeaderboardPage({ profile }) {
  const { t } = useLanguage()
  const current = { username: profile.username || profile.name || 'You', xp: Number(profile.xp || 0), questsCompleted: Number(profile.questsCompleted || 0), isCurrentUser: true }
  const entries = [...learners.filter((learner) => learner.username.toLowerCase() !== current.username.toLowerCase()), current]
    .sort((first, second) => second.xp - first.xp || second.questsCompleted - first.questsCompleted)
  const podium = entries.slice(0, 3)
  const remaining = entries.slice(3)

  return <StudentLayout profile={profile} active="leaderboard">
    <header className="discovery-heading"><div><span className="panel-kicker"><Trophy size={13} /> LEARN TOGETHER</span><h1>{t('leaderboard')}</h1><p>{t('leaderboardSubtitle')}</p></div><span className="news-count"><Sparkles size={15} /> All-time XP</span></header>
    <section className="leaderboard-podium" aria-label="Top three learners">{podium.map((learner, index) => <article className={`podium-card podium-card--${index + 1}${learner.isCurrentUser ? ' is-current-user' : ''}`} key={learner.isCurrentUser ? 'current-podium' : learner.username}><span className="podium-rank">{index === 0 ? <Trophy size={17} /> : <Medal size={16} />} #{index + 1}</span><span className="podium-avatar">{learner.username.slice(0, 2).toUpperCase()}</span><b>{learner.username}{learner.isCurrentUser && <small className="you-label">YOU</small>}</b><span className="podium-level">Level {getLevel(learner.xp).level} · {learner.questsCompleted} quests</span><strong>{learner.xp.toLocaleString()} <small>XP</small></strong></article>)}</section>
    <section className="leaderboard-panel" aria-label="Learner rankings"><div className="leaderboard-header"><span>RANK · LEARNER</span><span>LEVEL</span><span>QUESTS</span><span>TOTAL XP</span></div><ol className="leaderboard-list">{remaining.map((learner, index) => {
      const level = getLevel(learner.xp)
      const rank = index + podium.length + 1
      return <li className={`leaderboard-row${learner.isCurrentUser ? ' is-current-user' : ''}`} key={learner.isCurrentUser ? 'current-user' : learner.username}><span className="leaderboard-person"><b className="leaderboard-rank">{String(rank).padStart(2, '0')}</b><span className="leaderboard-avatar">{learner.username.slice(0, 2).toUpperCase()}</span><span><b>{learner.username}{learner.isCurrentUser && <small className="you-label">YOU</small>}</b><small>{learner.isCurrentUser ? 'Your learning journey' : 'SkillQuest learner'}</small></span></span><span className="leaderboard-level">Lv. {level.level}</span><span className="leaderboard-quests">{learner.questsCompleted}</span><b className="leaderboard-xp">{learner.xp.toLocaleString()} XP</b></li>
    })}</ol><p className="leaderboard-note"><Trophy size={14} /> Your rank updates automatically as you earn XP.</p></section>
  </StudentLayout>
}