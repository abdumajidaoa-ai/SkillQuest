import { Award, Code2, Sparkles, Target, Trophy } from 'lucide-react'

export default function HowItWorks() {
  return <section className="how-section section-shell" id="how-it-works">
    <div className="section-heading"><div><span className="section-kicker">YOUR JOURNEY, YOUR RULES</span><h2>Big goals. <span>Small wins.</span></h2></div><p>Every great quest starts with one curious click. Here’s how you’ll get there.</p></div>
    <div className="steps-grid">
      <article className="step-card step-card--path"><div className="step-number">01 <span>— START HERE</span></div><div className="step-art path-art"><div className="path-node path-node--active"><Sparkles size={18} /></div><i /><div className="path-node"><Code2 size={16} /></div><i /><div className="path-node"><Award size={16} /></div><span className="path-star path-star--a">✦</span><span className="path-star path-star--b">✳</span></div><h3>Choose your path</h3><p>Pick a grade, follow a spark, and make your learning journey yours.</p></article>
      <article className="step-card step-card--quest"><div className="step-number">02 <span>— GET INTO IT</span></div><div className="step-art quest-art"><div className="mini-quest mini-quest--one"><span><Code2 size={14} /></span><i><b /><b /><b /></i><em>+80 XP</em></div><div className="mini-quest mini-quest--two"><span><Target size={14} /></span><i><b /><b /><b /></i><em>+120 XP</em></div><div className="quest-spark">✦</div></div><h3>Complete quests</h3><p>Practice real skills through bite-size challenges made to keep you moving.</p></article>
      <article className="step-card step-card--level"><div className="step-number">03 <span>— KEEP RISING</span></div><div className="step-art level-art"><div className="level-disc"><Trophy size={26} /><span>LVL<br /><b>08</b></span></div><div className="level-rays" /><span className="level-spark level-spark--a">✦</span><span className="level-spark level-spark--b">✧</span></div><h3>Level up</h3><p>Earn XP, unlock achievements, and build a portfolio you’re proud to show.</p></article>
    </div>
  </section>
}