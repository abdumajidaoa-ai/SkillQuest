import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight, Compass, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import { getProfile, grades, gradeNumber, gradeTrack, saveProfile } from '../utils/profile.js'
import { subjectCatalog } from '../utils/learning.js'

const interests = [
  { name: 'Technology', emoji: '💻' }, { name: 'Design', emoji: '🎨' },
  { name: 'Science', emoji: '🔬' }, { name: 'Mathematics', emoji: '🧮' },
  { name: 'Languages', emoji: '🌎' }, { name: 'Business', emoji: '💼' },
  { name: 'Media', emoji: '🎬' }, { name: 'Engineering', emoji: '🏗️' },
  { name: 'Personal Development', emoji: '🧠' },
]

const goals = [
  'Improve my grades', 'Learn new skills', 'Prepare for BSB',
  'Discover my future career', 'Build a portfolio', 'Just have fun learning',
]

export default function OnboardingPage() {
  const profile = getProfile()
  const [grade, setGrade] = useState(profile?.grade || '')
  const [selectedSubjects, setSelectedSubjects] = useState(profile?.subjects || [])
  const [selectedInterests, setSelectedInterests] = useState(profile?.interests || [])
  const [goal, setGoal] = useState(profile?.goal || '')
  const navigate = useNavigate()
  const gradeValue = gradeNumber(grade)

  function toggleInterest(interest) {
    setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest])
  }

  function toggleSubject(subjectId) {
    setSelectedSubjects((current) => current.includes(subjectId) ? current.filter((item) => item !== subjectId) : [...current, subjectId])
  }

  function createQuest() {
    if (!grade || selectedSubjects.length === 0 || selectedInterests.length === 0 || !goal) return
    saveProfile({ ...profile, grade, track: gradeTrack(grade), subjects: selectedSubjects, interests: selectedInterests, goal, onboardingComplete: true, xp: profile.xp || 0, coins: profile.coins || 0, questsCompleted: profile.questsCompleted || 0, streak: profile.streak || 0, subjectStats: profile.subjectStats || {} })
    navigate('/dashboard')
  }

  return (
    <main className="onboarding-page">
      <header className="onboarding-header"><Brand /><Link className="auth-back" to="/register"><ArrowLeft size={15} /> Back</Link><span className="onboarding-save"><span /> SAVED AS YOU GO</span></header>
      <div className="onboarding-shell">
        <div className="onboarding-welcome"><span className="onboarding-kicker"><Sparkles size={14} /> THE ADVENTURE STARTS HERE</span><h1>Welcome to SkillQuest, <span>{profile?.username || 'Questmaker'}</span>!</h1><p>Let’s build your learning journey.</p></div>
        <div className="onboarding-progress"><span className="progress-step is-complete"><i><Check size={13} /></i><b>Your account</b></span><span className="progress-line is-complete" /><span className="progress-step is-current"><i>02</i><b>Your path</b></span><span className="progress-line" /><span className="progress-step"><i>03</i><b>Your quest</b></span></div>
        <section className="onboarding-section grade-section"><div className="onboarding-section__heading"><div><span className="onboarding-step-number">01 / 04</span><h2>Choose your grade</h2><p>We’ll find challenges that feel just right.</p></div><span className="section-note">YOU CAN CHANGE THIS LATER</span></div>
          <div className="grade-path-grid">{[
            { name: 'Junior', range: 'Grades 1–4', start: 1, end: 4, className: 'junior' },
            { name: 'Explorer', range: 'Grades 5–8', start: 5, end: 8, className: 'explorer' },
            { name: 'Pro', range: 'Grades 9–11', start: 9, end: 11, className: 'pro' },
          ].map((track) => <article className={`grade-track grade-track--${track.className}${gradeValue >= track.start && gradeValue <= track.end ? ' is-selected' : ''}`} key={track.name}><div className="grade-track__top"><span className="grade-track__icon">{track.name === 'Junior' ? '✳' : track.name === 'Explorer' ? '◈' : '✦'}</span><div><h3>{track.name}</h3><span>{track.range}</span></div></div><div className="grade-options" role="group" aria-label={`${track.name} grade selection`}>{grades.slice(track.start - 1, track.end).map((item) => <button className={grade === item ? 'is-selected' : ''} type="button" key={item} onClick={() => setGrade(item)}>{gradeNumber(item)}{grade === item && <Check size={12} />}</button>)}</div></article>)}
          </div>
          {grade && <div className="grade-recommendation"><Sparkles size={15} /><span><b>Grade {gradeValue} learning path</b><small>Quest difficulty and lesson topics adapt to this grade.</small></span></div>}
        </section>
        <section className="onboarding-section interest-section"><div className="onboarding-section__heading"><div><span className="onboarding-step-number">02 / 04</span><h2>Choose your subjects</h2><p>We’ll build grade-level quests only for these subjects.</p></div><span className="selection-count">{selectedSubjects.length} SELECTED</span></div><div className="subject-pick-grid">{subjectCatalog.map(({ id, name, icon, color }) => <button type="button" className={`subject-pick-card subject-pick-card--${color}${selectedSubjects.includes(id) ? ' is-selected' : ''}`} key={id} onClick={() => toggleSubject(id)} aria-pressed={selectedSubjects.includes(id)}><span>{icon}</span><b>{name}</b><i><Check size={12} /></i></button>)}</div></section>
        <section className="onboarding-section interest-section"><div className="onboarding-section__heading"><div><span className="onboarding-step-number">03 / 04</span><h2>What are you interested in?</h2><p>Choose all the things you’d love to explore.</p></div><span className="selection-count">{selectedInterests.length} SELECTED</span></div><div className="interest-grid">{interests.map(({ name, emoji }) => <button type="button" className={`interest-card${selectedInterests.includes(name) ? ' is-selected' : ''}`} key={name} onClick={() => toggleInterest(name)} aria-pressed={selectedInterests.includes(name)}><span className="interest-emoji">{emoji}</span><span>{name}</span><i className="interest-check"><Check size={12} /></i></button>)}</div></section>
        <section className="onboarding-section goal-section"><div className="onboarding-section__heading"><div><span className="onboarding-step-number">04 / 04</span><h2>Choose your goal</h2><p>What would make your quest a win?</p></div></div><div className="goal-grid">{goals.map((item, index) => <button type="button" className={`goal-option${goal === item ? ' is-selected' : ''}`} key={item} onClick={() => setGoal(item)}><span className={`goal-icon goal-icon--${index}`}>{['↗', '✧', '◎', '⌁', '▤', '✳'][index]}</span><span>{item}</span><i><Check size={13} /></i></button>)}</div></section>
        <div className="onboarding-submit"><div className="submit-hint"><Compass size={17} /><span><b>Your path is yours.</b><small>Pick what feels right today.</small></span></div><button className="button button--primary create-quest-button" type="button" onClick={createQuest} disabled={!grade || selectedSubjects.length === 0 || selectedInterests.length === 0 || !goal}>Create My Quest <ChevronRight size={18} /></button></div>
      </div>
      <footer className="onboarding-footer"><span>SKILLQUEST <i /> LEARN. QUEST. LEVEL UP.</span><span>STEP 2 OF 2 <b>● ● ○</b></span></footer>
    </main>
  )
}