import { ArrowRight, BookOpen, Compass, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getRecommendedQuests, getSubjectStats, subjectCatalog } from '../utils/learning.js'
import QuestCard from '../components/QuestCard.jsx'
import useLanguage from '../utils/useLanguage.js'

const descriptions = {
  mathematics: 'Build number sense, problem-solving, and confidence with patterns.',
  english: 'Grow vocabulary, reading comprehension, and clear communication.',
  science: 'Explore living systems, matter, energy, and the world around you.',
  technology: 'Practice algorithms, digital literacy, and computational thinking.',
  design: 'Turn observations into thoughtful, inclusive experiences.',
  business: 'Explore budgets, customer needs, and practical decision-making.',
  'general-skills': 'Build planning, communication, and critical-thinking habits.',
}

export default function ExplorePage({ profile }) {
  const { t } = useLanguage()
  const quests = getRecommendedQuests(profile)
  return <StudentLayout profile={profile} active="explore">
    <header className="discovery-heading"><div><span className="panel-kicker"><Compass size={13} /> EXPLORE SKILLS</span><h1>{t('exploreTitle')}</h1><p>{t('exploreSubtitle')}</p></div><Link className="button button--primary button--small" to="/quests">{t('browseQuests')} <ArrowRight size={14} /></Link></header>
    <section className="explore-subject-grid" aria-label="Learning categories">{subjectCatalog.map((subject, index) => {
      const selected = profile.subjects?.includes(subject.id)
      const stats = getSubjectStats(profile, subject.id)
      return <Link className={`explore-subject-card explore-subject-card--${subject.color}`} to={selected ? `/quests?category=${subject.id}` : '/onboarding'} key={subject.id}>
        <span className="explore-subject-card__index">0{index + 1}</span><span className="explore-subject-card__icon">{subject.icon}</span><span className="explore-subject-card__eyebrow">{selected ? `${stats.completed} QUESTS COMPLETED` : 'LEARNING CATEGORY'}</span><h2>{subject.name}</h2><p>{descriptions[subject.id]}</p><span className="explore-subject-card__action">{selected ? 'Explore quests' : 'Add to my path'} <ArrowRight size={14} /></span>
      </Link>
    })}</section>
    <section className="explore-feature-row"><div><span className="panel-kicker"><BookOpen size={13} /> YOUR NEXT STEP</span><h2>Learning works best in small wins.</h2><p>Pick one challenge, try it at your own pace, and see your progress build with every completed quest.</p><Link className="button button--quiet button--small" to="/progress">View my progress <ArrowRight size={14} /></Link></div><div className="explore-feature-mark"><Target size={27} /><Sparkles size={15} /></div></section>
    <section className="explore-quests-section"><div className="section-row-heading"><div><span className="panel-kicker">A GOOD PLACE TO START</span><h2>Popular in your learning path</h2></div><Link to="/quests">All quests <ArrowRight size={14} /></Link></div>{quests.length ? <div className="quest-explorer-grid">{quests.slice(0, 3).map((quest) => <QuestCard quest={quest} key={quest.id} />)}</div> : <div className="learning-empty"><Sparkles size={17} /><span>Choose a subject to see skill-matched quests here.</span><Link to="/onboarding">Set up learning path <ArrowRight size={14} /></Link></div>}</section>
  </StudentLayout>
}