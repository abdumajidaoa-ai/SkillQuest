import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentLayout from '../components/StudentLayout.jsx'
import useLanguage from '../utils/useLanguage.js'

const helpTopics = [
  { title: 'faqQuestTitle', text: 'faqQuestBody' },
  { title: 'faqStorageTitle', text: 'faqStorageBody' },
  { title: 'faqPathTitle', text: 'faqPathBody' },
]

export default function HelpPage({ profile }) {
  const { t } = useLanguage()
  return <StudentLayout profile={profile} active="help">
    <header className="discovery-heading"><div><span className="panel-kicker"><Sparkles size={13} /> HERE TO HELP</span><h1>{t('helpTitle')}</h1><p>{t('helpSubtitle')}</p></div></header>
    <div className="help-layout"><section className="help-topics">{helpTopics.map((topic) => <article className="help-topic" key={topic.title}><BookOpen size={16} /><div><h2>{t(topic.title)}</h2><p>{t(topic.text)}</p></div></article>)}</section><aside className="help-contact"><span><ShieldCheck size={19} /></span><h2>{t('helpNeed')}</h2><p>{t('helpContactAdvice')}</p><Link className="button button--primary button--small" to="/settings">{t('helpReviewSettings')} <ArrowRight size={14} /></Link></aside></div>
  </StudentLayout>
}