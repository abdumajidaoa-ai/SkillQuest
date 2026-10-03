import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import LanguageSelector from '../components/LanguageSelector.jsx'
import StudentLayout from '../components/StudentLayout.jsx'
import { getProfile, gradeNumber, gradeTrack, saveProfile } from '../utils/profile.js'
import { getRecommendedQuests, subjectCatalog } from '../utils/learning.js'
import useLanguage from '../utils/useLanguage.js'

const interestOptions = [
  { id: 'technology', key: 'interestsProgramming', emoji: '💻', subjectId: 'technology' },
  { id: 'english', key: 'interestsEnglish', emoji: '🇬🇧', subjectId: 'english' },
  { id: 'mathematics', key: 'interestsMath', emoji: '🔢', subjectId: 'mathematics' },
  { id: 'science', key: 'interestsScience', emoji: '🔬', subjectId: 'science' },
  { id: 'design', key: 'interestsDesign', emoji: '🎨', subjectId: 'design' },
  { id: 'business', key: 'interestsBusiness', emoji: '💼', subjectId: 'business' },
  { id: 'critical-thinking', key: 'interestsCritical', emoji: '🧠', subjectId: 'general-skills' },
  { id: 'communication', key: 'interestsCommunication', emoji: '🗣', subjectId: 'english' },
  { id: 'general-knowledge', key: 'interestsGeneral', emoji: '📚', subjectId: 'science' },
]

const goalOptions = [
  { id: 'improve-grades', key: 'goalGrades', icon: '🎯' },
  { id: 'new-skill', key: 'goalSkill', icon: '🚀' },
  { id: 'competitions', key: 'goalCompetition', icon: '🏆' },
  { id: 'programmer', key: 'goalProgrammer', icon: '💻' },
  { id: 'english', key: 'goalEnglish', icon: '🌍' },
  { id: 'future-career', key: 'goalCareer', icon: '🎓' },
]

const stepKeys = ['stepClassTitle', 'stepInterestsTitle', 'stepGoalsTitle', 'stepReadyTitle']

function getInitialInterests(profile) {
  const saved = profile?.interests || []
  const legacy = {
    technology: ['Technology'], english: ['English', 'Languages'], mathematics: ['Mathematics'], science: ['Science'],
    design: ['Design'], business: ['Business'], 'critical-thinking': ['Critical Thinking', 'Personal Development'],
    communication: ['Communication'], 'general-knowledge': ['General Knowledge', 'Media', 'Engineering'],
  }
  return interestOptions.filter((item) => saved.includes(item.id) || legacy[item.id].some((name) => saved.includes(name))).map((item) => item.id)
}

function getInitialGoals(profile) {
  const saved = profile?.goals || []
  const legacy = {
    'improve-grades': ['Improve my grades'], 'new-skill': ['Learn new skills', 'Learn a new skill'],
    competitions: ['Prepare for BSB', 'Prepare for competitions'], programmer: ['Become a programmer'],
    english: ['Improve my English'], 'future-career': ['Discover my future career', 'Prepare for my future career'],
  }
  return goalOptions.filter((item) => saved.includes(item.id) || legacy[item.id].includes(profile?.goal)).map((item) => item.id)
}

function formatGrade(value, language) {
  if (language === 'uz') return `${value}-sinf`
  if (language === 'ru') return `${value} класс`
  const suffix = value % 100 >= 11 && value % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' })[value % 10] || 'th'
  return `${value}${suffix} Grade`
}

export default function OnboardingPage() {
  const profile = getProfile()
  const { language, t } = useLanguage()
  const [step, setStep] = useState(1)
  const [grade, setGrade] = useState(profile?.grade || '')
  const [selectedInterests, setSelectedInterests] = useState(() => getInitialInterests(profile))
  const [selectedGoals, setSelectedGoals] = useState(() => getInitialGoals(profile))
  const navigate = useNavigate()
  const gradeValue = gradeNumber(grade)
  const selectedInterestOptions = interestOptions.filter((item) => selectedInterests.includes(item.id))
  const mappedSubjects = selectedInterestOptions.map((item) => item.subjectId)
  const subjects = [...new Set(mappedSubjects.length ? mappedSubjects : profile?.subjects || [])]
  const previewProfile = { ...profile, grade: grade || profile?.grade || '1st Grade', subjects }
  const allSubjectIds = subjectCatalog.map((item) => item.id)
  const recommendedQuests = step === 4
    ? [...getRecommendedQuests(previewProfile), ...getRecommendedQuests({ ...previewProfile, subjects: allSubjectIds })]
      .filter((quest, index, quests) => quests.findIndex((item) => item.subjectId === quest.subjectId) === index)
      .slice(0, 3)
    : []

  function toggleInterest(id) {
    setSelectedInterests((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function toggleGoal(id) {
    setSelectedGoals((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function continueStep() {
    if (step === 1 && !grade) return
    if (step === 2 && !selectedInterests.length) return
    if (step === 3 && !selectedGoals.length) return
    if (step === 3) {
      const labels = selectedGoals.map((id) => t(goalOptions.find((item) => item.id === id)?.key || 'goalSkill'))
      const preferredSubjectIds = [...new Set(selectedInterestOptions.map((item) => item.subjectId))]
      const next = {
        ...profile,
        grade,
        track: gradeTrack(grade),
        subjects: preferredSubjectIds.length ? preferredSubjectIds : profile.subjects || [],
        interests: selectedInterests,
        goals: selectedGoals,
        goal: labels[0] || '',
        onboardingComplete: true,
        xp: Number(profile.xp || 0),
        coins: Number(profile.coins || 0),
        questsCompleted: Number(profile.questsCompleted || 0),
        streak: Number(profile.streak || 0),
        subjectStats: profile.subjectStats || {},
      }
      saveProfile(next)
    }
    setStep((current) => Math.min(4, current + 1))
  }

  function enterDashboard() {
    navigate('/dashboard')
  }

  function back() {
    if (step > 1) setStep((current) => current - 1)
    else navigate(profile ? '/register' : '/')
  }

  if (step === 4) {
    return <StudentLayout profile={{ ...profile, grade, track: gradeTrack(grade), subjects }} active="learningpath">
      <button className="button button--quiet button--small onboarding-result-back" type="button" onClick={() => setStep(3)}><ArrowLeft size={14} /> {t('back')}</button>
      <div className="guided-progress onboarding-result-progress"><div><span>{t('stepCounter').replace('{step}', '4')}</span><b>4/4</b></div><div className="guided-progress__dots" aria-label={t('stepCounter').replace('{step}', '4')}>{[1, 2, 3, 4].map((item) => <i className="is-complete" key={item} />)}</div></div>
      <header className="onboarding-result-heading"><span className="panel-kicker"><Sparkles size={14} /> YOUR NEXT CHAPTER</span><h1>{t('stepReadyTitle')}</h1><p>{t('stepReadySubtitle')}</p></header>
      <section className="onboarding-profile-summary"><span className="panel-kicker">{t('stepProfile')}</span><div><b>{t('className')}:</b><span>{formatGrade(gradeValue, language)}</span></div><div><b>{t('stepInterests')}:</b><span>{selectedInterestOptions.map((item) => t(item.key)).join(' • ')}</span></div><div><b>{t('stepGoal')}:</b><span>{selectedGoals.map((id) => t(goalOptions.find((item) => item.id === id)?.key || 'goalSkill')).join(' • ')}</span></div></section>
      <section className="onboarding-result-quests"><div className="section-row-heading"><div><span className="panel-kicker">YOUR LEARNING PATH</span><h2>{t('firstQuests')}</h2></div></div>{recommendedQuests.length ? <div className="quest-explorer-grid">{recommendedQuests.map((quest) => <article className="quest-explorer-card" key={quest.id}><span className={`quest-explorer-card__icon subject-color--${quest.subject.color}`}>{quest.subject.icon}</span><span className="quest-explorer-card__category">{quest.subject.name} · {quest.difficulty}</span><h2>{quest.title}</h2><p>{quest.topic}: {quest.question}</p><div className="quest-explorer-card__meta"><span>{quest.minutes} min</span><span>+{quest.reward} XP</span></div></article>)}</div> : <div className="learning-empty">{t('firstQuestsEmpty')}</div>}</section>
      <button className="button button--primary onboarding-result-button" type="button" onClick={enterDashboard}>{t('enterLearningSpace')} <ArrowRight size={17} /></button>
    </StudentLayout>
  }

  const canContinue = step === 1 ? Boolean(grade) : step === 2 ? selectedInterests.length > 0 : selectedGoals.length > 0

  return <main className="onboarding-page onboarding-page--guided">
    <header className="onboarding-header">
      <div className="onboarding-header__left">
        <Brand />
        <button className="auth-back onboarding-back" type="button" onClick={back}><ArrowLeft size={15} /> {t('back')}</button>
      </div>
      <LanguageSelector />
    </header>
    <div className="onboarding-shell">
      <div className="onboarding-welcome"><span className="onboarding-kicker"><Sparkles size={14} /> {t('welcomeBrand')}</span><h1>{profile?.username ? `${t('welcomeBack')}, ${profile.username}` : t('welcomeBrand')}</h1><p>{t(stepKeys[step - 1] === 'stepClassTitle' ? 'stepClassSubtitle' : stepKeys[step - 1] === 'stepInterestsTitle' ? 'stepInterestsSubtitle' : 'stepGoalsSubtitle')}</p></div>
      <div className="guided-progress"><div><span>{t('stepCounter').replace('{step}', String(step))}</span><b>{step}/4</b></div><div className="guided-progress__dots" aria-label={t('stepCounter').replace('{step}', String(step))}>{[1, 2, 3, 4].map((item) => <i className={item <= step ? 'is-complete' : ''} key={item} />)}</div></div>
      <section className="onboarding-section guided-step" key={step}>
        <div className="onboarding-section__heading"><div><span className="onboarding-step-number">0{step} / 04</span><h2>{t(stepKeys[step - 1])}</h2>{step === 1 && <p>{t('stepClassWhy')}</p>}</div></div>
        {step === 1 && <div className={`grade-choice-grid grade-choice-grid--${gradeValue <= 4 ? 'junior' : gradeValue <= 8 ? 'explorer' : 'pro'}`} role="group" aria-label={t('stepClassTitle')}>{Array.from({ length: 11 }, (_, index) => {
          const value = index + 1
          const option = `${value}${value === 1 ? 'st' : value === 2 ? 'nd' : value === 3 ? 'rd' : 'th'} Grade`
          const active = gradeNumber(grade) === value
          return <button className={`grade-choice${active ? ' is-selected' : ''}`} type="button" key={value} onClick={() => setGrade(option)} aria-pressed={active}><span>{value}</span><small>{formatGrade(value, language)}</small>{active && <Check size={15} />}</button>
        })}</div>}
        {step === 2 && <div className="onboarding-choice-grid">{interestOptions.map((item) => <button className={`onboarding-choice${selectedInterests.includes(item.id) ? ' is-selected' : ''}`} type="button" key={item.id} onClick={() => toggleInterest(item.id)} aria-pressed={selectedInterests.includes(item.id)}><span className="onboarding-choice__emoji">{item.emoji}</span><span>{t(item.key)}</span><i>{selectedInterests.includes(item.id) && <Check size={13} />}</i></button>)}</div>}
        {step === 3 && <div className="onboarding-goal-grid">{goalOptions.map((item) => <button className={`onboarding-goal${selectedGoals.includes(item.id) ? ' is-selected' : ''}`} type="button" key={item.id} onClick={() => toggleGoal(item.id)} aria-pressed={selectedGoals.includes(item.id)}><span>{item.icon}</span><b>{t(item.key)}</b><i>{selectedGoals.includes(item.id) && <Check size={13} />}</i></button>)}</div>}
        {!canContinue && <p className="onboarding-validation" role="status">{t(step === 1 ? 'selectGrade' : step === 2 ? 'selectInterest' : 'selectGoal')}</p>}
      </section>
      <div className="guided-step-actions"><span><i className="onboarding-save__dot" />{t('stepCounter').replace('{step}', String(step))}</span><button className="button button--primary" type="button" onClick={continueStep} disabled={!canContinue}>{step === 3 ? t('createPath') : t('continue')} <ArrowRight size={17} /></button></div>
    </div>
  </main>
}