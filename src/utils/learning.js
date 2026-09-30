export const subjectCatalog = [
  { id: 'mathematics', name: 'Mathematics', shortName: 'Math', icon: '∑', color: 'violet' },
  { id: 'english', name: 'English', shortName: 'English', icon: 'Aa', color: 'cyan' },
  { id: 'science', name: 'Science', shortName: 'Science', icon: '◉', color: 'green' },
  { id: 'technology', name: 'Technology', shortName: 'Tech', icon: '</>', color: 'gold' },
]

const curriculum = {
  mathematics: [
    { title: 'Number patterns', topic: 'Patterns & place value', question: 'What number comes next: 4, 8, 12, 16, __?', answer: '20', explanation: 'Each number increases by 4, so 16 + 4 = 20.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Fractions in action', topic: 'Fractions & ratios', question: 'What is 3/4 of 20?', answer: '15', explanation: 'Divide 20 into 4 equal groups (5 each), then take 3 groups: 5 × 3 = 15.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Algebra foundations', topic: 'Equations & expressions', question: 'Solve for x: 3x + 4 = 19.', answer: '5', explanation: 'Subtract 4 from both sides to get 3x = 15, then divide by 3. So x = 5.', difficulty: 'Advanced', minutes: 12 },
  ],
  english: [
    { title: 'Word detective', topic: 'Vocabulary in context', question: 'In “Mina was reluctant to speak”, what does reluctant mean?', answer: 'hesitant', explanation: 'Reluctant means unsure or unwilling to do something. “Hesitant” is a close match.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Build a stronger sentence', topic: 'Grammar & sentence structure', question: 'Choose the correct verb: “The team ___ ready.” (is / are)', answer: 'is', explanation: '“Team” is a collective noun treated as singular here, so the verb is “is”.', difficulty: 'Intermediate', minutes: 9 },
    { title: 'Reading between the lines', topic: 'Reading comprehension', question: 'A character checks the dark sky and grabs an umbrella. What can you infer?', answer: 'rain', explanation: 'The character expects rain, even though the passage does not say it directly.', difficulty: 'Advanced', minutes: 11 },
  ],
  science: [
    { title: 'Living systems', topic: 'Life & ecosystems', question: 'Which part of a plant takes in most water from the soil?', answer: 'roots', explanation: 'Roots absorb water and minerals from the soil and help anchor the plant.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Matter detectives', topic: 'Matter & energy', question: 'What happens to ice when it gains enough heat?', answer: 'melts', explanation: 'Adding heat gives particles more energy, changing solid ice into liquid water.', difficulty: 'Intermediate', minutes: 9 },
    { title: 'Forces in motion', topic: 'Forces & motion', question: 'A 2 kg object accelerates at 3 m/s². What force acts on it?', answer: '6', explanation: 'Newton’s second law is force = mass × acceleration: 2 × 3 = 6 N.', difficulty: 'Advanced', minutes: 12 },
  ],
  technology: [
    { title: 'Think in steps', topic: 'Logic & sequences', question: 'A robot moves 2 steps each turn. How many steps after 5 turns?', answer: '10', explanation: 'Repeat 2 steps five times: 2 × 5 = 10 steps.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Loop it again', topic: 'Loops & patterns', question: 'A loop repeats 4 times and adds 3 each time. What is the total?', answer: '12', explanation: 'The repeated action runs four times: 3 + 3 + 3 + 3 = 12.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Debug the condition', topic: 'Algorithms & conditions', question: 'A score passes when it is at least 70. Does 68 pass? (yes/no)', answer: 'no', explanation: '“At least 70” means 70 or greater. Since 68 is lower, it does not pass.', difficulty: 'Advanced', minutes: 11 },
  ],
}

const gradeBands = [
  { min: 1, max: 4, index: 0 },
  { min: 5, max: 8, index: 1 },
  { min: 9, max: 11, index: 2 },
]

export function gradeBand(grade) {
  const value = Number.parseInt(grade, 10) || 1
  return gradeBands.find(({ min, max }) => value >= min && value <= max) || gradeBands[0]
}

export function getSubject(id) {
  return subjectCatalog.find((subject) => subject.id === id)
}

export function getSubjectStats(profile, subjectId) {
  const stats = profile.subjectStats?.[subjectId] || {}
  const xp = Number(stats.xp || 0)
  return {
    xp,
    completed: Number(stats.completed || 0),
    progress: Math.min(100, Number(stats.progress || 0)),
    level: Math.floor(xp / 250) + 1,
    currentTopic: stats.currentTopic || getQuest(profile, subjectId, stats).topic,
    strongTopics: stats.strongTopics || [],
    practiceTopics: stats.practiceTopics || [],
  }
}

export function getQuest(profile, subjectId, stats = profile.subjectStats?.[subjectId] || {}) {
  const band = gradeBand(profile.grade)
  const lessons = curriculum[subjectId]
  if (!lessons) return null
  const outcomes = (stats.history || []).slice(-3)
  const correctCount = outcomes.filter((outcome) => outcome.correct).length
  let adjustment = 0
  if (outcomes.length >= 2 && correctCount === outcomes.length) adjustment = 1
  if (outcomes.length >= 2 && correctCount === 0) adjustment = -1
  const index = Math.max(0, Math.min(lessons.length - 1, band.index + adjustment))
  const lesson = lessons[index]
  return {
    ...lesson,
    id: `${subjectId}-${band.min}-${index}`,
    subjectId,
    subject: getSubject(subjectId),
    grade: Number.parseInt(profile.grade, 10) || 1,
    reward: 50 + (index * 15),
    difficulty: adjustment < 0 ? 'Guided' : lesson.difficulty,
    support: adjustment < 0 ? 'A quick refresher is included before you try.' : '',
    explanation: adjustment < 0 ? `${lesson.explanation} Take your time and look for the key idea.` : lesson.explanation,
  }
}

export function getRecommendedQuests(profile) {
  return (profile.subjects || []).map((subjectId) => ({
    ...getQuest(profile, subjectId),
    stats: getSubjectStats(profile, subjectId),
  })).filter((quest) => quest.subject)
}

export function getLevel(xp = 0) {
  const thresholds = [0, 250, 600, 1050, 1600, 2300, 3150, 4150, 5300, 6600]
  let level = 1
  for (let index = 1; index < thresholds.length; index += 1) {
    if (xp < thresholds[index]) break
    level = index + 1
  }
  const current = thresholds[level - 1]
  const next = thresholds[level] || current + 1500
  return { level, current, next, progress: Math.min(100, ((xp - current) / (next - current)) * 100), remaining: Math.max(0, next - xp) }
}

export function getStreak(profile) {
  const today = new Date().toISOString().slice(0, 10)
  if (!profile.lastQuestDate) return Number(profile.streak || 0)
  const last = new Date(`${profile.lastQuestDate}T00:00:00Z`)
  const current = new Date(`${today}T00:00:00Z`)
  const daysAgo = Math.round((current - last) / 86400000)
  return daysAgo <= 1 ? Number(profile.streak || 0) : 0
}

export function recordQuestResult(profile, quest, correct) {
  const previous = profile.subjectStats?.[quest.subjectId] || {}
  const history = [...(previous.history || []), { correct, date: new Date().toISOString().slice(0, 10) }]
  const completed = Number(previous.completed || 0) + (correct ? 1 : 0)
  const gainedXp = correct ? quest.reward : 0
  const subjectStats = {
    ...profile.subjectStats,
    [quest.subjectId]: {
      ...previous,
      xp: Number(previous.xp || 0) + gainedXp,
      completed,
      progress: Math.min(100, Number(previous.progress || 0) + (correct ? 10 : 0)),
      currentTopic: quest.topic,
      history,
      strongTopics: correct ? [...new Set([...(previous.strongTopics || []), quest.topic])] : previous.strongTopics || [],
      practiceTopics: correct ? (previous.practiceTopics || []).filter((topic) => topic !== quest.topic) : [...new Set([...(previous.practiceTopics || []), quest.topic])],
    },
  }
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const streak = !correct ? Number(profile.streak || 0) : profile.lastQuestDate === today ? Number(profile.streak || 1) : profile.lastQuestDate === yesterday ? Number(profile.streak || 0) + 1 : 1
  const streakBonus = correct && profile.lastQuestDate !== today ? 10 : 0
  return {
    ...profile,
    subjectStats,
    xp: Number(profile.xp || 0) + gainedXp + streakBonus,
    questsCompleted: Number(profile.questsCompleted || 0) + (correct ? 1 : 0),
    streak,
    lastQuestDate: correct ? today : profile.lastQuestDate,
    weeklyActivity: correct ? [...(profile.weeklyActivity || []).slice(-6), { date: today, xp: gainedXp + streakBonus }] : profile.weeklyActivity || [],
  }
}

export function getAchievements(profile) {
  const completed = Number(profile.questsCompleted || 0)
  const streak = getStreak(profile)
  return [
    { id: 'first-quest', title: 'First Quest', detail: 'Complete your first quest', icon: '🎯', unlocked: completed >= 1 },
    { id: 'streak-7', title: '7 Day Streak', detail: 'Learn 7 days in a row', icon: '🔥', unlocked: streak >= 7 },
    { id: 'quests-10', title: 'Quest Collector', detail: 'Complete 10 quests', icon: '📚', unlocked: completed >= 10 },
    { id: 'math-master', title: 'Math Master', detail: 'Complete 5 math quests', icon: '🧠', unlocked: Number(profile.subjectStats?.mathematics?.completed || 0) >= 5 },
    { id: 'english-explorer', title: 'English Explorer', detail: 'Complete 5 English quests', icon: '🚀', unlocked: Number(profile.subjectStats?.english?.completed || 0) >= 5 },
  ]
}