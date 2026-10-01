import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Search, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import { loadNews, newsCategories } from '../utils/news.js'
import useLanguage from '../utils/useLanguage.js'

const categoryKeys = { All: 'all', Education: 'newsEducation', Technology: 'newsTechnology', Science: 'newsScience', Programming: 'newsProgramming', English: 'newsEnglish', 'Study Tips': 'newsStudyTips' }

export default function NewsPage({ profile }) {
  const { t } = useLanguage()
  const { articleId } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let current = true
    loadNews().then((items) => {
      if (current) setArticles(items)
    }).catch(() => {
      if (current) setArticles([])
    }).finally(() => {
      if (current) setLoading(false)
    })
    return () => { current = false }
  }, [])

  const article = articleId ? articles.find((item) => item.id === articleId) : null
  const filtered = articles.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const text = `${item.title} ${item.description} ${item.category}`.toLowerCase()
    return matchesCategory && text.includes(query.trim().toLowerCase())
  })

  return (
    <StudentLayout profile={profile} active="news">
      {articleId ? <NewsArticle article={article} loading={loading} /> : <>
        <header className="discovery-heading"><div><span className="panel-kicker"><Sparkles size={13} /> THE SKILLQUEST JOURNAL</span><h1>{t('newsTitle')}</h1><p>{t('newsSubtitle')}</p></div><span className="news-count"><BookOpen size={15} /> {articles.length} stories</span></header>
        <div className="news-controls"><label className="discovery-search"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" aria-label="Search news stories" /></label><div className="news-categories" aria-label="Filter news by category">{newsCategories.map((item) => <button type="button" key={item} className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{t(categoryKeys[item])}</button>)}</div></div>
        {loading ? <div className="news-grid" aria-label="Loading news">{[1, 2, 3].map((item) => <div className="news-skeleton" key={item}><span /><i /><b /><small /></div>)}</div> : filtered.length ? <div className="news-grid">{filtered.map((item) => <NewsCard article={item} key={item.id} />)}</div> : <div className="learning-empty learning-empty--large"><Search size={20} /><h1>No stories found</h1><p>Try another search or choose a different category.</p><button className="button button--quiet" type="button" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button></div>}
      </>}
    </StudentLayout>
  )
}

function NewsCard({ article }) {
  const { language, t } = useLanguage()
  return <article className="news-card"><Link className="news-card__image" to={`/news/${article.id}`} aria-label={`${t('readMore')}: ${article.title}`}><img src={article.image} alt={article.imageAlt} loading="lazy" /><span>{t(categoryKeys[article.category])}</span></Link><div className="news-card__body"><div className="news-card__meta"><time dateTime={article.date}>{formatDate(article.date, language)}</time><span><Clock3 size={13} /> {article.readTime}</span></div><h2><Link to={`/news/${article.id}`}>{article.title}</Link></h2><p>{article.description}</p><Link className="news-read-more" to={`/news/${article.id}`}>{t('readMore')} <ArrowRight size={15} /></Link></div></article>
}

function NewsArticle({ article, loading }) {
  const { language, t } = useLanguage()
  if (loading) return <div className="learning-empty learning-empty--large"><BookOpen size={20} /><h1>Loading story</h1></div>
  if (!article) return <div className="learning-empty learning-empty--large"><BookOpen size={20} /><h1>Story not found</h1><p>This story may have moved.</p><Link className="button button--primary" to="/news">{t('newsTitle')} <ArrowRight size={15} /></Link></div>
  return <article className="news-article"><Link className="news-back" to="/news"><ArrowLeft size={15} /> {t('newsTitle')}</Link><img className="news-article__image" src={article.image} alt={article.imageAlt} /><div className="news-article__copy"><span className="news-category-label">{t(categoryKeys[article.category])}</span><div className="news-card__meta"><time dateTime={article.date}>{formatDate(article.date, language)}</time><span><Clock3 size={13} /> {article.readTime}</span></div><h1>{article.title}</h1><p className="news-article__intro">{article.description}</p>{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="news-read-more" to="/news">{t('newsTitle')} <ArrowRight size={15} /></Link></div></article>
}

function formatDate(value, language = 'en') {
  const locales = { en: 'en', uz: 'uz-UZ', ru: 'ru-RU' }
  return new Intl.DateTimeFormat(locales[language] || 'en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`))
}