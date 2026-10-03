import { ArrowDown, ArrowUpRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, CirclePlay, Code2, Flame, GraduationCap, Layers3, Sparkles, Star, Target, Trophy, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import QuestCard from '../components/QuestCard.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'
import useLanguage from '../utils/useLanguage.js'
import { getRecommendedQuests, subjectCatalog } from '../utils/learning.js'

const featuredQuests = getRecommendedQuests({ grade: '5th Grade', subjects: ['technology', 'mathematics', 'english'] })

const featureItems = [
  { icon: Zap, title: 'Learning that clicks', text: 'Short, satisfying lessons turn tricky topics into small wins you can actually feel.' },
  { icon: BarChart3, title: 'See your progress', text: 'Watch your skills, streaks and confidence grow with every quest you complete.' },
  { icon: BriefcaseBusiness, title: 'Explore what’s next', text: 'Connect what you learn today with careers and creative projects for tomorrow.' },
]

const tracks = [
  { number: '01', name: 'Junior', grades: 'Grades 1–4', accent: 'mint', detail: 'Build your foundations' },
  { number: '02', name: 'Explorer', grades: 'Grades 5–8', accent: 'violet', detail: 'Find what sparks you' },
  { number: '03', name: 'Pro', grades: 'Grades 9–11', accent: 'amber', detail: 'Make your next move' },
]

function QuestPreview() {
  return (
    <div className="preview-wrap" aria-label="SkillQuest student dashboard preview">
      <div className="preview-orbit preview-orbit--one" /><div className="preview-orbit preview-orbit--two" />
      <div className="float-chip float-chip--streak"><span className="float-chip__icon"><Flame size={17} /></span><span><b>7 day streak</b><small>You’re on a roll</small></span></div>
      <div className="float-chip float-chip--badge"><span className="badge-icon"><Trophy size={17} /></span><span><b>New badge!</b><small>Curious mind</small></span></div>
      <div className="preview-card">
        <div className="preview-topline"><span className="preview-live"><i /> YOUR QUEST BOARD</span><span className="preview-dots"><i /><i /><i /></span></div>
        <div className="preview-profile">
          <div className="avatar-frame"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" alt="Student profile avatar" /></div>
          <div className="preview-name"><span>MONDAY, OCT 12</span><strong>Hey, Alex <span>✦</span></strong><small>Explorer <i /> Level 08</small></div>
          <div className="coin-pill"><span>✦</span> 240</div>
        </div>
        <div className="xp-block"><div><span>LEVEL PROGRESS</span><b>2,480 <small>/ 3,000 XP</small></b></div><div className="xp-track"><i /></div></div>
        <div className="quest-card">
          <div className="quest-card__heading"><span><Target size={16} /> TODAY’S QUEST</span><span className="quest-card__reward">+120 XP</span></div>
          <div className="quest-title"><span className="quest-illustration"><Code2 size={22} /></span><div><strong>Code your first loop</strong><small>Technology <i /> 12 min</small></div><ChevronRight size={18} /></div>
          <div className="quest-progress"><div className="quest-progress__bar"><i /></div><span>2 of 3 steps</span></div>
        </div>
        <div className="preview-bottom"><div className="stars-row"><span><Star size={14} fill="currentColor" /></span><span><Star size={14} fill="currentColor" /></span><span><Star size={14} fill="currentColor" /></span><span><Star size={14} /></span><span><Star size={14} /></span><small>3 quests today</small></div><div className="preview-level"><span>✦</span> LEVEL UP IN <b>520 XP</b></div></div>
      </div>
      <div className="preview-caption"><Sparkles size={13} /> YOUR NEXT CHAPTER STARTS HERE</div>
    </div>
  )
}

export default function LandingPage() {
  const { t } = useLanguage()
  return (
    <PublicLayout>
      <main>
        <section className="landing-hero">
          <div className="hero-grid" />
          <div className="landing-hero__inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-pulse" /> {t('welcomeBrand')}</div>
              <h1>{t('landingTitle')}</h1>
              <p className="hero-subtitle">{t('landingDescription')}</p>
              <div className="hero-actions"><Link className="button button--primary button--hero" to="/register">{t('getStarted')} →</Link><Link className="landing-signin" to="/login">{t('alreadyAccount')} <b>{t('signIn')}</b></Link><a className="landing-explore-link" href="#popular-quests"><CirclePlay size={16} /> {t('exploreQuests')}</a></div>
              <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><b>+</b></div><p><strong>12,000+</strong> students leveling up</p><span className="proof-separator" /><span className="proof-rating"><Star size={13} fill="currentColor" /> 4.9</span></div>
            </div>
            <QuestPreview />
          </div>
          <a className="scroll-cue" href="#how-it-works"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="proof-strip" aria-label="SkillQuest learning areas"><span>MADE FOR THE CURIOUS</span><b><Code2 size={16} /> TECHNOLOGY</b><b><Layers3 size={16} /> CREATIVE THINKING</b><b><GraduationCap size={17} /> SCHOOL SUCCESS</b><b><BriefcaseBusiness size={16} /> FUTURE SKILLS</b></section>

        <HowItWorks />

        <section className="popular-quests-section section-shell" id="popular-quests">
          <div className="section-heading"><div><span className="section-kicker">A FIRST LOOK</span><h2>Popular quests. <span>Real skills.</span></h2></div><p>Short challenges from the same learning paths you can explore after joining.</p></div>
          <div className="quest-explorer-grid">{featuredQuests.map((quest) => <QuestCard quest={quest} key={quest.id} to="/register" action="Start learning" />)}</div>
          <div className="landing-category-links"><span>EXPLORE A LEARNING CATEGORY</span>{subjectCatalog.map((subject) => <Link to="/register" key={subject.id}><i className={`subject-color--${subject.color}`}>{subject.icon}</i>{subject.name}<ArrowUpRight size={13} /></Link>)}</div>
        </section>

        <section className="feature-section section-shell" id="features">
          <div className="feature-intro"><span className="section-kicker">BUILT AROUND YOU</span><h2>More than points.<br /><span>Progress that matters.</span></h2><p>SkillQuest makes the work feel good and the growth easy to see, at every stage of the journey.</p><Link to="/register" className="text-link">See what you can do <ArrowUpRight size={15} /></Link></div>
          <div className="feature-list">{featureItems.map(({ icon, title, text }, index) => <FeatureCard icon={icon} title={title} description={text} index={index} key={title} />)}<div className="feature-tags"><span><Check size={13} /> BSB practice</span><span><Check size={13} /> Portfolio projects</span><span><Check size={13} /> Career paths</span></div></div>
        </section>

        <section className="track-section section-shell" id="students"><div className="track-heading"><div><span className="section-kicker">ROOM TO GROW</span><h2>Your age. <span>Your adventure.</span></h2></div><p>Made to meet you where you are and take you somewhere new.</p></div><div className="track-grid">{tracks.map((track) => <article className={`track-card track-card--${track.accent}`} key={track.name}><span className="track-number">{track.number}</span><div className="track-orbit"><div className="track-glyph">{track.name === 'Junior' ? <Sparkles size={21} /> : track.name === 'Explorer' ? <Target size={21} /> : <Zap size={21} />}</div></div><div className="track-info"><span>{track.grades}</span><h3>{track.name}</h3><p>{track.detail}</p></div><ArrowUpRight className="track-arrow" size={17} /></article>)}</div></section>

        <section className="learning-principle-section section-shell"><TestimonialCard quote="Big goals grow through small, clear steps. Every quest is a chance to make one of them." /></section>
        <CTA />
      </main>
      <Footer />
    </PublicLayout>
  )
}