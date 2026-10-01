import { useState } from 'react'
import { ArrowRight, Newspaper, Search, Sparkles, Target } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { getRecommendedQuests } from '../utils/learning.js'
import { newsArticles } from '../utils/news.js'
import useLanguage from '../utils/useLanguage.js'

export default function SearchPage({ profile }) {
  const { t } = useLanguage()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const term = query.trim().toLowerCase()
  const quests = getRecommendedQuests(profile).filter((quest) => `${quest.title} ${quest.topic} ${quest.subject.name} ${quest.question}`.toLowerCase().includes(term))
  const articles = newsArticles.filter((article) => `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(term))
  const hasQuery = Boolean(term)

  function search(event) {
    event.preventDefault()
    setParams(query.trim() ? { q: query.trim() } : {})
  }

  function updateQuery(value) {
    setQuery(value)
    setParams(value.trim() ? { q: value.trim() } : {}, { replace: true })
  }

  return <StudentLayout profile={profile} active="search">
    <header className="discovery-heading"><div><span className="panel-kicker"><Sparkles size={13} /> DISCOVER YOUR NEXT STEP</span><h1>{t('searchTitle')}</h1><p>{t('searchSubtitle')}</p></div></header>
    <form className="global-search-form" onSubmit={search}><label className="discovery-search"><Search size={19} /><input autoFocus type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Try science, fractions, coding…" aria-label="Search quests and news" /><button type="submit" aria-label="Search"><ArrowRight size={17} /></button></label></form>
    {!hasQuery ? <div className="learning-empty learning-empty--large"><Search size={20} /><h1>What are you curious about?</h1><p>Search quests and learning stories by topic or subject.</p></div> : quests.length || articles.length ? <div className="search-results">
      {quests.length > 0 && <section className="search-result-section"><div className="section-row-heading"><div><span className="panel-kicker"><Target size={13} /> QUESTS</span><h2>{quests.length} matching {quests.length === 1 ? 'quest' : 'quests'}</h2></div></div><div className="search-result-list">{quests.map((quest) => <Link className="search-result-item" to={`/quest?subject=${quest.subjectId}`} key={quest.id}><span className={`recommendation-icon subject-color--${quest.subject.color}`}>{quest.subject.icon}</span><span><small>{quest.subject.name} · {quest.difficulty}</small><b>{quest.title}</b><em>{quest.topic}</em></span><span className="recommendation-xp">+{quest.reward} XP</span><ArrowRight size={15} /></Link>)}</div></section>}
      {articles.length > 0 && <section className="search-result-section"><div className="section-row-heading"><div><span className="panel-kicker"><Newspaper size={13} /> NEWS</span><h2>{articles.length} matching {articles.length === 1 ? 'story' : 'stories'}</h2></div></div><div className="search-result-list">{articles.map((article) => <Link className="search-result-item" to={`/news/${article.id}`} key={article.id}><img className="search-result-image" src={article.image} alt="" /><span><small>{article.category} · {article.date}</small><b>{article.title}</b><em>{article.description}</em></span><ArrowRight size={15} /></Link>)}</div></section>}
    </div> : <div className="learning-empty learning-empty--large"><Search size={20} /><h1>No results for “{params.get('q')}”</h1><p>Try a subject such as science, technology, mathematics, or learning.</p><button className="button button--quiet" type="button" onClick={() => { setQuery(''); setParams({}) }}>Clear search</button></div>}
  </StudentLayout>
}