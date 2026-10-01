import { useMemo, useState } from 'react'
import { Search, Sparkles, Target } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import QuestCard from '../components/QuestCard.jsx'
import { getRecommendedQuests } from '../utils/learning.js'
import useLanguage from '../utils/useLanguage.js'

const difficulties = [{ value: 'All', key: 'all' }, { value: 'Beginner', key: 'beginner' }, { value: 'Intermediate', key: 'intermediate' }, { value: 'Advanced', key: 'advanced' }]
const categories = [
  { id: 'all', key: 'all' },
  { id: 'english', key: 'english' },
  { id: 'technology', key: 'programming' },
  { id: 'mathematics', key: 'mathematics' },
  { id: 'science', key: 'science' },
  { id: 'design', key: 'design' },
  { id: 'business', key: 'business' },
  { id: 'general-skills', key: 'generalSkills' },
]

export default function QuestExplorerPage({ profile }) {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const category = searchParams.get('category') || 'all'
  const allQuests = getRecommendedQuests(profile)
  const filteredQuests = useMemo(() => allQuests.filter((quest) => {
    const matchesCategory = category === 'all' || quest.subjectId === category
    const matchesDifficulty = difficulty === 'All' || quest.difficulty.toLowerCase() === difficulty.toLowerCase() || (difficulty === 'Beginner' && quest.difficulty === 'Guided')
    const searchable = `${quest.title} ${quest.topic} ${quest.question} ${quest.subject.name}`.toLowerCase()
    return matchesCategory && matchesDifficulty && searchable.includes(query.trim().toLowerCase())
  }), [allQuests, category, difficulty, query])

  return <StudentLayout profile={profile} active="quests">
    <header className="discovery-heading"><div><span className="panel-kicker"><Target size={13} /> QUEST EXPLORER</span><h1>{t('questsTitle')}</h1><p>{t('questsSubtitle')}</p></div><span className="news-count"><Sparkles size={15} /> {allQuests.length} available</span></header>
    <div className="quest-explorer-toolbar"><label className="discovery-search"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search quests or skills" aria-label="Search quests" /></label><div className="quest-difficulty-filters" aria-label="Filter by difficulty">{difficulties.map((item) => <button className={difficulty === item.value ? 'is-active' : ''} type="button" key={item.value} aria-pressed={difficulty === item.value} onClick={() => setDifficulty(item.value)}>{t(item.key)}</button>)}</div></div>
    <div className="quest-category-filters" aria-label="Filter by category">{categories.map((item) => <button className={category === item.id ? 'is-active' : ''} type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setSearchParams(item.id === 'all' ? {} : { category: item.id })}>{t(item.key)}</button>)}</div>
    {filteredQuests.length ? <div className="quest-explorer-grid">{filteredQuests.map((quest) => <QuestCard quest={quest} key={quest.id} />)}</div> : <div className="learning-empty learning-empty--large"><Search size={20} /><h1>{allQuests.length ? 'No quests found' : 'Your quest board is ready'}</h1><p>{allQuests.length ? 'Try another search or adjust the difficulty and category filters.' : 'Choose subjects in your learning path to find quests made for you.'}</p>{allQuests.length ? <button className="button button--quiet" type="button" onClick={() => { setQuery(''); setDifficulty('All'); setSearchParams({}) }}>Clear filters</button> : <Link className="button button--primary" to="/onboarding">Choose subjects</Link>}</div>}
  </StudentLayout>
}