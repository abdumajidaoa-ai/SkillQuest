import { ArrowDown, ArrowRight, ArrowUpRight, Award, BarChart3, BriefcaseBusiness, Check, ChevronRight, CirclePlay, Code2, Flame, GraduationCap, Layers3, Sparkles, Star, Target, Trophy, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import PublicLayout from '../layouts/PublicLayout.jsx'

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
  return (
    <PublicLayout>
      <main>
        <section className="landing-hero">
          <div className="hero-grid" />
          <div className="landing-hero__inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-pulse" /> THE FUTURE OF LEARNING</div>
              <h1>Turn learning<br />into a <span>quest.</span></h1>
              <p className="hero-subtitle">Learn new skills, complete challenges, earn rewards and build your future.</p>
              <div className="hero-actions"><Link className="button button--primary button--hero" to="/register">Start your quest <ArrowRight size={17} /></Link><a className="button button--quiet button--hero" href="#how-it-works"><CirclePlay size={17} /> Explore</a></div>
              <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><b>+</b></div><p><strong>12,000+</strong> students leveling up</p><span className="proof-separator" /><span className="proof-rating"><Star size={13} fill="currentColor" /> 4.9</span></div>
            </div>
            <QuestPreview />
          </div>
          <a className="scroll-cue" href="#how-it-works"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="proof-strip" aria-label="SkillQuest learning areas"><span>MADE FOR THE CURIOUS</span><b><Code2 size={16} /> TECHNOLOGY</b><b><Layers3 size={16} /> CREATIVE THINKING</b><b><GraduationCap size={17} /> SCHOOL SUCCESS</b><b><BriefcaseBusiness size={16} /> FUTURE SKILLS</b></section>

        <section className="how-section section-shell" id="how-it-works">
          <div className="section-heading"><div><span className="section-kicker">YOUR JOURNEY, YOUR RULES</span><h2>Big goals. <span>Small wins.</span></h2></div><p>Every great quest starts with one curious click. Here’s how you’ll get there.</p></div>
          <div className="steps-grid">
            <article className="step-card step-card--path"><div className="step-number">01 <span>— START HERE</span></div><div className="step-art path-art"><div className="path-node path-node--active"><Sparkles size={18} /></div><i /><div className="path-node"><Code2 size={16} /></div><i /><div className="path-node"><Award size={16} /></div><span className="path-star path-star--a">✦</span><span className="path-star path-star--b">✳</span></div><h3>Choose your path</h3><p>Pick a grade, follow a spark, and make your learning journey yours.</p></article>
            <article className="step-card step-card--quest"><div className="step-number">02 <span>— GET INTO IT</span></div><div className="step-art quest-art"><div className="mini-quest mini-quest--one"><span><Code2 size={14} /></span><i><b /><b /><b /></i><em>+80 XP</em></div><div className="mini-quest mini-quest--two"><span><Target size={14} /></span><i><b /><b /><b /></i><em>+120 XP</em></div><div className="quest-spark">✦</div></div><h3>Complete quests</h3><p>Practice real skills through bite-size challenges made to keep you moving.</p></article>
            <article className="step-card step-card--level"><div className="step-number">03 <span>— KEEP RISING</span></div><div className="step-art level-art"><div className="level-disc"><Trophy size={26} /><span>LVL<br /><b>08</b></span></div><div className="level-rays" /><span className="level-spark level-spark--a">✦</span><span className="level-spark level-spark--b">✧</span></div><h3>Level up</h3><p>Earn XP, unlock achievements, and build a portfolio you’re proud to show.</p></article>
          </div>
        </section>

        <section className="feature-section section-shell" id="features">
          <div className="feature-intro"><span className="section-kicker">BUILT AROUND YOU</span><h2>More than points.<br /><span>Progress that matters.</span></h2><p>SkillQuest makes the work feel good and the growth easy to see, at every stage of the journey.</p><Link to="/register" className="text-link">See what you can do <ArrowUpRight size={15} /></Link></div>
          <div className="feature-list">{featureItems.map(({ icon: Icon, title, text }, index) => <article className="feature-row" key={title}><span className={`feature-icon feature-icon--${index}`}><Icon size={18} /></span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="feature-arrow" size={17} /></article>)}<div className="feature-tags"><span><Check size={13} /> BSB practice</span><span><Check size={13} /> Portfolio projects</span><span><Check size={13} /> Career paths</span></div></div>
        </section>

        <section className="track-section section-shell" id="students"><div className="track-heading"><div><span className="section-kicker">ROOM TO GROW</span><h2>Your age. <span>Your adventure.</span></h2></div><p>Made to meet you where you are and take you somewhere new.</p></div><div className="track-grid">{tracks.map((track) => <article className={`track-card track-card--${track.accent}`} key={track.name}><span className="track-number">{track.number}</span><div className="track-orbit"><div className="track-glyph">{track.name === 'Junior' ? <Sparkles size={21} /> : track.name === 'Explorer' ? <Target size={21} /> : <Zap size={21} />}</div></div><div className="track-info"><span>{track.grades}</span><h3>{track.name}</h3><p>{track.detail}</p></div><ArrowUpRight className="track-arrow" size={17} /></article>)}</div></section>

        <section className="final-cta"><div className="cta-mark"><Sparkles size={20} /></div><span className="section-kicker">YOUR NEXT LEVEL IS WAITING</span><h2>Ready to start your quest?</h2><p>Pick your first challenge. The rest follows.</p><Link className="button button--primary button--hero" to="/register">Create your free account <ArrowRight size={17} /></Link><span className="cta-footnote">FREE TO START <i /> MADE FOR GRADES 1–11</span></section>
      </main>
      <footer className="site-footer"><div className="footer-main"><Brand compact /><span className="footer-tagline">Learn. Quest. Level Up.</span><nav><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#students">For students</a><Link to="/login">Log in</Link></nav><span className="footer-copy">© 2026 SkillQuest</span></div></footer>
    </PublicLayout>
  )
}