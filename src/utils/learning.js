export const subjectCatalog = [
  { id: 'mathematics', name: 'Mathematics', shortName: 'Math', icon: '∑', color: 'violet' },
  { id: 'english', name: 'English', shortName: 'English', icon: 'Aa', color: 'cyan' },
  { id: 'science', name: 'Science', shortName: 'Science', icon: '◉', color: 'green' },
  { id: 'technology', name: 'Technology', shortName: 'Tech', icon: '</>', color: 'gold' },
  { id: 'design', name: 'Design', shortName: 'Design', icon: '◇', color: 'cyan' },
  { id: 'business', name: 'Business', shortName: 'Business', icon: '↗', color: 'gold' },
  { id: 'general-skills', name: 'General Skills', shortName: 'Skills', icon: '✦', color: 'violet' },
]

const curriculum = {
  mathematics: [
    { title: 'Number patterns', topic: 'Patterns & place value', type: 'fill_blank', question: 'What number comes next: 4, 8, 12, 16, __?', answer: '20', explanation: 'Each number increases by 4, so 16 + 4 = 20.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Fractions in action', topic: 'Fractions & ratios', type: 'multiple_choice', question: 'What is 3/4 of 20?', options: ['12', '15', '16', '18'], answer: '15', explanation: 'Divide 20 into 4 equal groups (5 each), then take 3 groups: 5 × 3 = 15.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Algebra foundations', topic: 'Equations & expressions', type: 'short_answer', question: 'Solve for x: 3x + 4 = 19.', answer: '5', explanation: 'Subtract 4 from both sides to get 3x = 15, then divide by 3. So x = 5.', difficulty: 'Advanced', minutes: 12 },
  ],
  english: [
    { title: 'Word detective', topic: 'Vocabulary in context', type: 'multiple_choice', question: 'In “Mina was reluctant to speak”, what does reluctant mean?', options: ['hesitant', 'excited', 'confident'], answer: 'hesitant', explanation: 'Reluctant means unsure or unwilling to do something. “Hesitant” is a close match.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Build a stronger sentence', topic: 'Grammar & sentence structure', type: 'true_false', question: 'True or false: “The team is ready” uses a singular verb.', answer: 'true', explanation: '“Team” is a collective noun treated as singular here, so the verb is “is”.', difficulty: 'Intermediate', minutes: 9 },
    { title: 'Reading between the lines', topic: 'Reading comprehension', type: 'fill_blank', question: 'A character checks the dark sky and grabs an umbrella. They expect ____.', answer: 'rain', explanation: 'The character expects rain, even though the passage does not say it directly.', difficulty: 'Advanced', minutes: 11 },
  ],
  science: [
    { title: 'Living systems', topic: 'Life & ecosystems', type: 'multiple_choice', question: 'Which part of a plant takes in most water from the soil?', options: ['Leaves', 'Roots', 'Flowers'], answer: 'Roots', explanation: 'Roots absorb water and minerals from the soil and help anchor the plant.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Matter detectives', topic: 'Matter & energy', type: 'true_false', question: 'True or false: Heating ice can change it from a solid into a liquid.', answer: 'true', explanation: 'Adding heat gives particles more energy, changing solid ice into liquid water.', difficulty: 'Intermediate', minutes: 9 },
    { title: 'Forces in motion', topic: 'Forces & motion', type: 'short_answer', question: 'A 2 kg object accelerates at 3 m/s². What force acts on it, in newtons?', answer: '6', explanation: 'Newton’s second law is force = mass × acceleration: 2 × 3 = 6 N.', difficulty: 'Advanced', minutes: 12 },
  ],
  technology: [
    { title: 'Think in steps', topic: 'Logic & sequences', type: 'match_pairs', question: 'Match each computer part to its job.', pairs: [{ left: 'Keyboard', right: 'Input' }, { left: 'Screen', right: 'Output' }, { left: 'Processor', right: 'Thinking' }], answer: { Keyboard: 'Input', Screen: 'Output', Processor: 'Thinking' }, explanation: 'A keyboard sends input, a screen shows output, and a processor handles instructions.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Loop it again', topic: 'Loops & patterns', type: 'mini_challenge', question: 'Trace the loop and answer both steps.', tasks: [{ id: 'total', prompt: 'A loop adds 3 four times. What is the total?', answer: '12' }, { id: 'runs', prompt: 'How many times does the loop run?', answer: '4' }], answer: { total: '12', runs: '4' }, explanation: 'The loop runs four times, so 3 + 3 + 3 + 3 = 12.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Debug the condition', topic: 'Algorithms & conditions', type: 'short_answer', question: 'A score passes when it is at least 70. Does 68 pass? (yes/no)', answer: 'no', explanation: '“At least 70” means 70 or greater. Since 68 is lower, it does not pass.', difficulty: 'Advanced', minutes: 11 },
  ],
  design: [
    { title: 'Design for everyone', topic: 'Color & contrast', type: 'multiple_choice', question: 'Which choice makes small text easiest to read?', options: ['Light gray on white', 'Dark text on a light background', 'Yellow text on white'], answer: 'Dark text on a light background', explanation: 'Strong contrast between text and its background makes words easier to read for more people.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Sketch a user journey', topic: 'User-centered design', type: 'fill_blank', question: 'A designer learns what people need by asking them and listening. This is user ____.', answer: 'research', explanation: 'User research helps a designer understand people before deciding what to build.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Improve the prototype', topic: 'Testing & iteration', type: 'multiple_choice', question: 'A prototype is confusing to several testers. What is the best next step?', options: ['Ignore the feedback', 'Study where they get stuck and revise the design', 'Add more features immediately'], answer: 'Study where they get stuck and revise the design', explanation: 'Testing reveals friction. Designers use evidence from those moments to improve a prototype.', difficulty: 'Advanced', minutes: 12 },
  ],
  business: [
    { title: 'Plan a simple budget', topic: 'Money choices', type: 'multiple_choice', question: 'You have $10 and spend $4 on supplies. How much remains?', options: ['$4', '$6', '$14'], answer: '$6', explanation: 'Subtract the $4 cost from the $10 budget to find the $6 that remains.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Find the customer need', topic: 'Ideas & value', type: 'multiple_choice', question: 'Before building a product, what is most useful to learn?', options: ['What problem people need solved', 'Which name sounds coolest', 'How many colors to use'], answer: 'What problem people need solved', explanation: 'Useful products start with a real need. Talking with potential customers helps reveal it.', difficulty: 'Intermediate', minutes: 10 },
    { title: 'Read the break-even point', topic: 'Costs & revenue', type: 'fill_blank', question: 'A project earns $80 and costs $55. Its profit is $____.', answer: '25', explanation: 'Profit equals revenue minus costs: $80 - $55 = $25.', difficulty: 'Advanced', minutes: 12 },
  ],
  'general-skills': [
    { title: 'Check the source', topic: 'Information literacy', type: 'multiple_choice', question: 'Which is the strongest first check for an online claim?', options: ['See who published it and when', 'Trust the first search result', 'Share it before reading'], answer: 'See who published it and when', explanation: 'A source’s author, evidence, and date help you judge whether a claim is reliable.', difficulty: 'Beginner', minutes: 8 },
    { title: 'Choose the next step', topic: 'Planning & priorities', type: 'fill_blank', question: 'Breaking a big task into smaller actions makes it easier to ____.', answer: 'start', explanation: 'A clear first step lowers the effort needed to begin and makes progress easier to track.', difficulty: 'Intermediate', minutes: 9 },
    { title: 'Make a strong decision', topic: 'Critical thinking', type: 'multiple_choice', question: 'Two plans solve a problem. What helps you compare them fairly?', options: ['Use the same clear criteria for both', 'Choose the first idea', 'Ignore possible trade-offs'], answer: 'Use the same clear criteria for both', explanation: 'Shared criteria make trade-offs visible and keep a comparison grounded in evidence.', difficulty: 'Advanced', minutes: 11 },
  ],
}

const gradeBands = [
  { min: 1, max: 4, index: 0 },
  { min: 5, max: 8, index: 1 },
  { min: 9, max: 11, index: 2 },
]

const dailyChallengeBanks = {
  mathematics: [
    [
      ['Patterns & place value', 'What is 8 + 7?', ['13', '15', '17'], '15'],
      ['Addition & subtraction', 'What is 18 - 9?', ['7', '9', '11'], '9'],
      ['Multiplication', 'What is 4 × 3?', ['7', '12', '16'], '12'],
      ['Shapes', 'How many sides does a triangle have?', ['3', '4', '5'], '3'],
      ['Fractions', 'Which is half of 10?', ['2', '5', '8'], '5'],
    ],
    [
      ['Fractions & ratios', 'What is 2/3 of 18?', ['6', '12', '15'], '12'],
      ['Percentages', 'What is 25% of 80?', ['15', '20', '25'], '20'],
      ['Equations', 'If x + 8 = 21, what is x?', ['11', '13', '29'], '13'],
      ['Integers', 'What is -4 + 9?', ['-13', '5', '13'], '5'],
      ['Ratios', 'A recipe uses 2 cups for 4 people. How many for 8?', ['3', '4', '6'], '4'],
    ],
    [
      ['Algebra', 'Solve: 3x = 27.', ['6', '9', '24'], '9'],
      ['Functions', 'If f(x) = 2x + 1, what is f(4)?', ['8', '9', '10'], '9'],
      ['Geometry', 'What is the area of a 6 by 7 rectangle?', ['13', '36', '42'], '42'],
      ['Probability', 'What is the probability of heads on a fair coin?', ['1/4', '1/2', '1'], '1/2'],
      ['Linear equations', 'Solve: 2x - 5 = 11.', ['3', '8', '16'], '8'],
    ],
  ],
  english: [
    [
      ['Vocabulary', 'Which word means the opposite of “cold”?', ['warm', 'dark', 'quiet'], 'warm'],
      ['Grammar', 'Choose the correct word: “___ going to the park.”', ['Their', 'They’re', 'There'], 'They’re'],
      ['Punctuation', 'Which mark ends a question?', ['.', '?', ','], '?'],
      ['Reading', 'A character shares their lunch. What quality do they show?', ['Kindness', 'Anger', 'Fear'], 'Kindness'],
      ['Spelling', 'Which word is spelled correctly?', ['Frend', 'Friend', 'Freind'], 'Friend'],
    ],
    [
      ['Vocabulary in context', '“The path was narrow.” What does narrow mean?', ['Not wide', 'Very long', 'Bright'], 'Not wide'],
      ['Grammar', 'Choose the correct verb: “The birds ___ south.”', ['flies', 'fly', 'flying'], 'fly'],
      ['Reading inference', 'A character packs a swimsuit and towel. Where are they likely going?', ['The beach', 'A library', 'A mountain'], 'The beach'],
      ['Sentence structure', 'Which is a complete sentence?', ['After the game', 'The team celebrated.', 'Running quickly'], 'The team celebrated.'],
      ['Synonyms', 'Which word is closest in meaning to “rapid”?', ['Quick', 'Careful', 'Silent'], 'Quick'],
    ],
    [
      ['Vocabulary', 'Which word means “carefully thought out”?', ['Deliberate', 'Casual', 'Sudden'], 'Deliberate'],
      ['Grammar', 'Choose the correct form: “If I ___ earlier, I would have called.”', ['knew', 'had known', 'know'], 'had known'],
      ['Reading analysis', 'An author repeats a phrase to emphasize an idea. What is this mainly doing?', ['Creating emphasis', 'Changing tense', 'Introducing a setting'], 'Creating emphasis'],
      ['Punctuation', 'Which punctuation can join two closely related independent clauses?', ['Semicolon', 'Apostrophe', 'Hyphen'], 'Semicolon'],
      ['Word choice', 'Which is the most precise verb for “walked slowly and heavily”?', ['Strolled', 'Trudged', 'Skipped'], 'Trudged'],
    ],
  ],
  science: [
    [
      ['Life & ecosystems', 'Which part of a plant absorbs water?', ['Roots', 'Petals', 'Fruit'], 'Roots'],
      ['Animals', 'What do bees collect from flowers?', ['Nectar', 'Sand', 'Bark'], 'Nectar'],
      ['Weather', 'What do we call water falling from clouds?', ['Rain', 'Shadow', 'Steam'], 'Rain'],
      ['Matter', 'Which state of matter keeps its own shape?', ['Solid', 'Liquid', 'Gas'], 'Solid'],
      ['Senses', 'Which sense helps you hear music?', ['Sight', 'Hearing', 'Taste'], 'Hearing'],
    ],
    [
      ['Ecosystems', 'Which is a producer in a food chain?', ['Grass', 'Rabbit', 'Fox'], 'Grass'],
      ['Matter & energy', 'What happens to liquid water when it freezes?', ['It becomes a solid', 'It becomes a gas', 'It disappears'], 'It becomes a solid'],
      ['Earth science', 'What causes day and night on Earth?', ['Earth rotating', 'The Moon rotating', 'Clouds moving'], 'Earth rotating'],
      ['Life science', 'Which cell part contains genetic instructions?', ['Nucleus', 'Cell wall', 'Cytoplasm'], 'Nucleus'],
      ['Forces', 'Which force pulls objects toward Earth?', ['Gravity', 'Friction', 'Magnetism'], 'Gravity'],
    ],
    [
      ['Biology', 'Which process do plants use to make glucose from light?', ['Photosynthesis', 'Respiration', 'Evaporation'], 'Photosynthesis'],
      ['Chemistry', 'A solution with pH 3 is best described as…', ['Acidic', 'Neutral', 'Basic'], 'Acidic'],
      ['Physics', 'What is the SI unit of force?', ['Newton', 'Joule', 'Watt'], 'Newton'],
      ['Ecology', 'What is the main role of decomposers?', ['Recycle nutrients', 'Create sunlight', 'Stop energy transfer'], 'Recycle nutrients'],
      ['Genetics', 'Which molecule carries inherited genetic information?', ['DNA', 'Glucose', 'Water'], 'DNA'],
    ],
  ],
  technology: [
    [
      ['Digital basics', 'Which device is mainly used to enter text?', ['Keyboard', 'Monitor', 'Speaker'], 'Keyboard'],
      ['Logic & sequences', 'What comes next: 2, 4, 6, __?', ['7', '8', '10'], '8'],
      ['Online safety', 'Which is safest to share online?', ['A favorite hobby', 'Your password', 'Your home address'], 'A favorite hobby'],
      ['Input & output', 'Which part shows a computer’s visual output?', ['Screen', 'Mouse', 'Microphone'], 'Screen'],
      ['Algorithms', 'What should an algorithm have?', ['Clear ordered steps', 'Random guesses', 'Only pictures'], 'Clear ordered steps'],
    ],
    [
      ['Algorithms', 'A loop repeats an instruction. What does it help reduce?', ['Repeated code', 'Computer memory', 'Screen size'], 'Repeated code'],
      ['Data', 'Which value is a Boolean?', ['true', '7.5', 'hello'], 'true'],
      ['Networks', 'What does a router help devices do?', ['Connect to a network', 'Print a page', 'Store a password'], 'Connect to a network'],
      ['Digital citizenship', 'What should you do with a suspicious link?', ['Check before opening', 'Forward it quickly', 'Enter your password'], 'Check before opening'],
      ['Patterns & loops', 'If a loop runs 5 times and adds 2, what is the total?', ['7', '10', '25'], '10'],
    ],
    [
      ['Programming logic', 'What does a conditional statement control?', ['Which code path runs', 'The monitor brightness', 'The network speed'], 'Which code path runs'],
      ['Data representation', 'How many bits are in one byte?', ['4', '8', '16'], '8'],
      ['Cybersecurity', 'What is a strong password practice?', ['Use unique long passwords', 'Reuse one password', 'Share it with friends'], 'Use unique long passwords'],
      ['Algorithms', 'What is a useful first step when debugging?', ['Reproduce the issue', 'Delete the project', 'Ignore the error'], 'Reproduce the issue'],
      ['Computing systems', 'Which component executes program instructions?', ['CPU', 'Keyboard', 'Webcam'], 'CPU'],
    ],
  ],
  design: [
    [
      ['Color & contrast', 'Which is easiest to read?', ['Dark text on a light background', 'Yellow text on white', 'Light gray on white'], 'Dark text on a light background'],
      ['Shapes', 'Which shape has three sides?', ['Triangle', 'Circle', 'Square'], 'Triangle'],
      ['Observation', 'What can a sketch help a designer do?', ['Share an idea', 'Measure sound', 'Charge a device'], 'Share an idea'],
      ['Patterns', 'Which pattern repeats?', ['Circle, square, circle, square', 'Circle, square, triangle, star', 'Square, triangle, star, circle'], 'Circle, square, circle, square'],
      ['Visual clarity', 'Which makes a label clearer?', ['Readable text', 'Tiny pale text', 'Text hidden behind an image'], 'Readable text'],
    ],
    [
      ['User-centered design', 'What helps a designer learn what users need?', ['Ask and listen to users', 'Guess without testing', 'Add features first'], 'Ask and listen to users'],
      ['Color systems', 'What is a useful reason to use a consistent color system?', ['Help users recognize related actions', 'Make every screen different', 'Hide important labels'], 'Help users recognize related actions'],
      ['Prototyping', 'What is a prototype?', ['A testable early version', 'A final sales report', 'A password'], 'A testable early version'],
      ['Accessibility', 'Which text choice usually improves readability?', ['Clear contrast', 'Low contrast', 'Very small type'], 'Clear contrast'],
      ['Feedback', 'What should a useful design test observe?', ['Where users hesitate or get stuck', 'Only the designer’s favorite color', 'How quickly a laptop starts'], 'Where users hesitate or get stuck'],
    ],
    [
      ['Design testing', 'Several testers miss the same control. What should happen next?', ['Review the evidence and revise it', 'Blame the testers', 'Remove every control'], 'Review the evidence and revise it'],
      ['Information hierarchy', 'What should visual hierarchy help a user notice first?', ['The most important information', 'Every detail at once', 'Decorative elements only'], 'The most important information'],
      ['Research ethics', 'How should a designer handle personal research notes?', ['Protect private details', 'Publish names without consent', 'Collect unrelated secrets'], 'Protect private details'],
      ['Iteration', 'Why test another version after a change?', ['Check whether the change helped', 'Avoid collecting evidence', 'Make the design less clear'], 'Check whether the change helped'],
      ['Inclusive design', 'What is a strong accessibility practice?', ['Offer more than one way to understand key information', 'Use color as the only signal', 'Prevent keyboard navigation'], 'Offer more than one way to understand key information'],
    ],
  ],
  business: [
    [
      ['Money choices', 'You have $10 and spend $4. What remains?', ['$4', '$6', '$14'], '$6'],
      ['Saving', 'What does saving mean?', ['Keeping money for later', 'Spending money twice', 'Borrowing without a plan'], 'Keeping money for later'],
      ['Planning', 'What is a budget for?', ['Planning income and spending', 'Choosing a team name', 'Measuring distance'], 'Planning income and spending'],
      ['Needs & wants', 'Which is usually a need?', ['Food', 'A third toy', 'A new game skin'], 'Food'],
      ['Teamwork', 'What helps a team reach a shared goal?', ['Clear roles and communication', 'Keeping plans secret', 'Ignoring questions'], 'Clear roles and communication'],
    ],
    [
      ['Ideas & value', 'What is useful to learn before building a product?', ['What problem people need solved', 'Which logo is trendiest', 'How many colors to use'], 'What problem people need solved'],
      ['Budgeting', 'A plan has $30 and spends $18. What remains?', ['$12', '$18', '$48'], '$12'],
      ['Team roles', 'Why agree on team roles?', ['Make responsibilities clear', 'Stop sharing ideas', 'Avoid a common goal'], 'Make responsibilities clear'],
      ['Customer feedback', 'What should you do with repeated customer feedback?', ['Look for a pattern and investigate it', 'Delete every comment', 'Assume it is always wrong'], 'Look for a pattern and investigate it'],
      ['Value', 'A useful service mainly helps by…', ['Solving a real problem', 'Adding steps without a reason', 'Hiding its cost'], 'Solving a real problem'],
    ],
    [
      ['Costs & revenue', 'Revenue is $80 and costs are $55. What is the profit?', ['$15', '$25', '$135'], '$25'],
      ['Break-even', 'If costs are $40 and revenue is $40, what is the result?', ['Break-even', 'A $40 profit', 'A $80 loss'], 'Break-even'],
      ['Decision making', 'What makes a business decision more reliable?', ['Compare evidence, costs, and trade-offs', 'Ignore the budget', 'Choose without checking assumptions'], 'Compare evidence, costs, and trade-offs'],
      ['Ethics', 'What is a responsible way to use customer data?', ['Collect only what is needed and protect it', 'Share it publicly', 'Keep it forever without a reason'], 'Collect only what is needed and protect it'],
      ['Planning', 'Why test a small version of an idea first?', ['Learn before investing more resources', 'Avoid hearing feedback', 'Guarantee every outcome'], 'Learn before investing more resources'],
    ],
  ],
  'general-skills': [
    [
      ['Information literacy', 'What is a good first check for an online claim?', ['Check who published it and when', 'Share it right away', 'Trust the first result'], 'Check who published it and when'],
      ['Planning', 'What helps make a big task easier to begin?', ['Choose one small first step', 'Wait until it feels easy', 'Hide the deadline'], 'Choose one small first step'],
      ['Communication', 'What is active listening?', ['Paying attention and checking what you understood', 'Planning your reply while someone speaks', 'Changing the subject'], 'Paying attention and checking what you understood'],
      ['Online safety', 'Which detail should stay private?', ['Your password', 'A favorite book', 'A public school subject'], 'Your password'],
      ['Problem solving', 'What is a useful first move when a problem feels large?', ['Describe the problem clearly', 'Guess at a solution', 'Ignore the details'], 'Describe the problem clearly'],
    ],
    [
      ['Planning & priorities', 'What makes a useful priority list?', ['Important tasks with clear next steps', 'Every idea with no order', 'Only tasks you already finished'], 'Important tasks with clear next steps'],
      ['Information literacy', 'Which source is usually stronger?', ['A dated report that shows its evidence', 'An anonymous post with no sources', 'A headline with no article'], 'A dated report that shows its evidence'],
      ['Communication', 'What can you do if instructions are unclear?', ['Ask a focused question', 'Pretend you understand', 'Skip the task'], 'Ask a focused question'],
      ['Digital wellbeing', 'What is a useful break during focused study?', ['Step away briefly and return', 'Keep switching between unrelated tabs', 'Remove every planned pause'], 'Step away briefly and return'],
      ['Critical thinking', 'How can you compare two plans fairly?', ['Use the same clear criteria', 'Choose the newest one', 'Ignore trade-offs'], 'Use the same clear criteria'],
    ],
    [
      ['Critical thinking', 'What strengthens a conclusion?', ['Relevant evidence and clear reasoning', 'Repeating a claim', 'Ignoring counterexamples'], 'Relevant evidence and clear reasoning'],
      ['Source evaluation', 'Why check a source’s date?', ['Evidence may change over time', 'Newer always means correct', 'Dates replace author checks'], 'Evidence may change over time'],
      ['Planning', 'A plan is behind schedule. What is a useful response?', ['Review progress and adjust the next steps', 'Hide the delay', 'Add unrelated tasks'], 'Review progress and adjust the next steps'],
      ['Communication', 'What makes feedback constructive?', ['Specific observations and a useful next step', 'Personal insults', 'Vague criticism only'], 'Specific observations and a useful next step'],
      ['Decision making', 'What is a good way to handle uncertainty?', ['Name assumptions and seek more evidence', 'Pretend there is no uncertainty', 'Choose randomly'], 'Name assumptions and seek more evidence'],
    ],
  ],
}

export function gradeBand(grade) {
  const value = Number.parseInt(grade, 10) || 1
  return gradeBands.find(({ min, max }) => value >= min && value <= max) || gradeBands[0]
}

function gradeDifficultyCap(grade) {
  return gradeBand(grade).max <= 4 ? 0 : 2
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
  const index = Math.max(0, Math.min(gradeDifficultyCap(profile.grade), lessons.length - 1, Number.isInteger(stats.difficultyIndex) ? stats.difficultyIndex : band.index))
  const lesson = lessons[index]
  return {
    ...lesson,
    id: `${subjectId}-${band.min}-${index}`,
    subjectId,
    subject: getSubject(subjectId),
    difficultyIndex: index,
    grade: Number.parseInt(profile.grade, 10) || 1,
    reward: 50 + (index * 15),
    difficulty: index < band.index ? 'Guided' : lesson.difficulty,
    support: index < band.index ? 'A quick refresher is included before you try.' : '',
    explanation: index < band.index ? `${lesson.explanation} Take your time and look for the key idea.` : lesson.explanation,
  }
}

export function getRecommendedQuests(profile) {
  return (profile.subjects || []).map((subjectId) => ({
    ...getQuest(profile, subjectId),
    stats: getSubjectStats(profile, subjectId),
  })).filter((quest) => quest.subject)
}

export function getSubjectTopics(profile, subjectId) {
  const lessons = curriculum[subjectId] || []
  const maxIndex = gradeDifficultyCap(profile.grade)
  const stats = profile.subjectStats?.[subjectId] || {}
  const history = stats.history || []
  return lessons.slice(0, maxIndex + 1).map((lesson, index) => ({
    ...lesson,
    id: `${subjectId}-${index}`,
    difficultyIndex: index,
    isCurrent: index === (stats.difficultyIndex ?? maxIndex),
    completed: history.filter((attempt) => attempt.correct && attempt.topic === lesson.topic).length,
  }))
}

function normalizeAnswer(value) {
  return String(value ?? '').toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ')
}

export function evaluateQuestAnswer(quest, submitted) {
  if (quest.type === 'match_pairs') {
    const total = quest.pairs.length
    const correctCount = quest.pairs.filter(({ left }) => normalizeAnswer(submitted?.[left]) === normalizeAnswer(quest.answer[left])).length
    return { correct: correctCount === total, correctCount, total }
  }
  if (quest.type === 'mini_challenge') {
    const total = quest.tasks.length
    const correctCount = quest.tasks.filter(({ id }) => normalizeAnswer(submitted?.[id]) === normalizeAnswer(quest.answer[id])).length
    return { correct: correctCount === total, correctCount, total }
  }
  const correct = normalizeAnswer(submitted) === normalizeAnswer(quest.answer)
  return { correct, correctCount: correct ? 1 : 0, total: 1 }
}

export function getAccuracy(profile) {
  const attempts = Object.values(profile.subjectStats || {}).flatMap((stats) => stats.history || [])
  const correct = attempts.filter((attempt) => attempt.correct).length
  return { attempts: attempts.length, correct, percent: attempts.length ? Math.round((correct / attempts.length) * 100) : 0 }
}

function applyAchievementRewards(previousProfile, nextProfile) {
  const previousUnlocked = new Set((previousProfile.achievements || getAchievements(previousProfile).filter((item) => item.unlocked).map((item) => item.id)))
  const unlocked = getAchievements(nextProfile).filter((item) => item.unlocked)
  const newlyUnlocked = unlocked.filter((item) => !previousUnlocked.has(item.id))
  const bonus = newlyUnlocked.length * 25
  const today = new Date().toISOString().slice(0, 10)
  const weeklyActivity = nextProfile.weeklyActivity || []
  return {
    ...nextProfile,
    xp: Number(nextProfile.xp || 0) + bonus,
    coins: Number(nextProfile.coins || 0) + (newlyUnlocked.length * 5),
    achievements: unlocked.map((item) => item.id),
    recentAchievementIds: newlyUnlocked.map((item) => item.id),
    weeklyActivity: bonus ? weeklyActivity.map((item) => item.date === today ? { ...item, xp: item.xp + bonus } : item) : weeklyActivity,
  }
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
  const titles = ['Beginner', 'Explorer', 'Learner', 'Skilled', 'Advanced']
  return { level, title: titles[Math.min(level - 1, titles.length - 1)], current, next, progress: Math.min(100, ((xp - current) / (next - current)) * 100), remaining: Math.max(0, next - xp) }
}

export function getStreak(profile) {
  const today = new Date().toISOString().slice(0, 10)
  if (!profile.lastQuestDate) return Number(profile.streak || 0)
  const last = new Date(`${profile.lastQuestDate}T00:00:00Z`)
  const current = new Date(`${today}T00:00:00Z`)
  const daysAgo = Math.round((current - last) / 86400000)
  return daysAgo <= 1 ? Number(profile.streak || 0) : 0
}

export function recordQuestResult(profile, quest, correct, durationMinutes = quest.minutes) {
  const previous = profile.subjectStats?.[quest.subjectId] || {}
  const history = [...(previous.history || []), { correct, date: new Date().toISOString().slice(0, 10), topic: quest.topic, type: quest.type, minutes: durationMinutes }]
  const completed = Number(previous.completed || 0) + (correct ? 1 : 0)
  const recommendedPractice = (previous.practiceTopics || []).includes(quest.topic)
  const gainedXp = correct ? quest.reward + (recommendedPractice ? 10 : 0) : 0
  const previousDifficulty = Number.isInteger(previous.difficultyIndex) ? previous.difficultyIndex : gradeBand(profile.grade).index
  const recentMisses = history.slice(-2)
  const maxDifficulty = gradeDifficultyCap(profile.grade)
  const difficultyIndex = correct ? Math.min(maxDifficulty, previousDifficulty + 1) : recentMisses.length === 2 && recentMisses.every((item) => !item.correct) ? Math.max(0, previousDifficulty - 1) : previousDifficulty
  const subjectStats = {
    ...profile.subjectStats,
    [quest.subjectId]: {
      ...previous,
      xp: Number(previous.xp || 0) + gainedXp,
      completed,
      difficultyIndex,
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
  const weeklyActivity = profile.weeklyActivity || []
  const todayActivity = weeklyActivity.find((item) => item.date === today)
  const nextWeeklyActivity = !correct ? weeklyActivity : todayActivity
    ? weeklyActivity.map((item) => item.date === today ? { ...item, xp: item.xp + gainedXp } : item)
    : [...weeklyActivity.slice(-6), { date: today, xp: gainedXp + streakBonus }]
  const nextProfile = {
    ...profile,
    subjectStats,
    learningMinutes: Number(profile.learningMinutes || 0) + durationMinutes,
    xp: Number(profile.xp || 0) + gainedXp + streakBonus,
    coins: Number(profile.coins || 0) + (correct ? Math.max(1, Math.floor(quest.reward / 10)) : 0),
    questsCompleted: Number(profile.questsCompleted || 0) + (correct ? 1 : 0),
    correctAnswers: Number(profile.correctAnswers || 0) + (correct ? 1 : 0),
    perfectQuests: Number(profile.perfectQuests || 0) + (correct ? 1 : 0),
    recommendedPracticeCompleted: Number(profile.recommendedPracticeCompleted || 0) + (correct && recommendedPractice ? 1 : 0),
    streak,
    lastQuestDate: correct ? today : profile.lastQuestDate,
    weeklyActivity: nextWeeklyActivity,
  }
  const rewardedProfile = correct ? applyAchievementRewards(profile, nextProfile) : nextProfile
  return {
    ...rewardedProfile,
    lastRewardBreakdown: correct ? {
      quest: quest.reward,
      practice: recommendedPractice ? 10 : 0,
      streak: streakBonus,
      achievements: rewardedProfile.xp - nextProfile.xp,
    } : null,
  }
}

export function getAchievements(profile) {
  const completed = Number(profile.questsCompleted || 0)
  const correctAnswers = Number(profile.correctAnswers ?? getAccuracy(profile).correct)
  const streak = getStreak(profile)
  const level = getLevel(Number(profile.xp || 0)).level
  return [
    { id: 'first-quest', title: 'First Quest', detail: 'Complete your first quest', icon: '🎯', unlocked: completed >= 1 },
    { id: 'quests-5', title: '5 Quests Completed', detail: 'Complete five quests', icon: '📚', unlocked: completed >= 5 },
    { id: 'quests-10', title: '10 Quests Completed', detail: 'Complete ten quests', icon: '🏅', unlocked: completed >= 10 },
    { id: 'fast-learner', title: 'Fast Learner', detail: 'Complete three quests with at least 80% accuracy', icon: '⚡', unlocked: completed >= 3 && getAccuracy(profile).percent >= 80 },
    { id: 'streak-7', title: '7 Day Streak', detail: 'Learn 7 days in a row', icon: '🔥', unlocked: streak >= 7 },
    { id: 'streak-3', title: '3 Day Streak', detail: 'Learn 3 days in a row', icon: '🌱', unlocked: streak >= 3 },
    { id: 'correct-10', title: '10 Correct Answers', detail: 'Answer ten questions correctly', icon: '✅', unlocked: correctAnswers >= 10 },
    { id: 'math-master', title: 'Math Master', detail: 'Complete 5 math quests', icon: '🧠', unlocked: Number(profile.subjectStats?.mathematics?.completed || 0) >= 5 },
    { id: 'science-explorer', title: 'Science Explorer', detail: 'Complete 5 science quests', icon: '🔬', unlocked: Number(profile.subjectStats?.science?.completed || 0) >= 5 },
    { id: 'tech-builder', title: 'Tech Builder', detail: 'Complete 5 technology quests', icon: '🛠️', unlocked: Number(profile.subjectStats?.technology?.completed || 0) >= 5 },
    { id: 'code-starter', title: 'Code Starter', detail: 'Complete your first technology quest', icon: '💻', unlocked: Number(profile.subjectStats?.technology?.completed || 0) >= 1 },
    { id: 'perfect-quest', title: 'Perfect Quest', detail: 'Complete a quest with every answer correct', icon: '💯', unlocked: Number(profile.perfectQuests || 0) >= 1 },
    { id: 'english-explorer', title: 'English Explorer', detail: 'Complete 5 English quests', icon: '🚀', unlocked: Number(profile.subjectStats?.english?.completed || 0) >= 5 },
    { id: 'level-up', title: 'Level Up', detail: 'Reach Level 2', icon: '⚡', unlocked: level >= 2 },
    { id: 'quest-master', title: 'Quest Master', detail: 'Complete 25 quests', icon: '🏆', unlocked: completed >= 25 },
  ]
}

export function getWeeklyActivity(profile) {
  const xpByDate = new Map((profile.weeklyActivity || []).map((item) => [item.date, item.xp]))
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - index))
    const key = date.toISOString().slice(0, 10)
    return { date: key, xp: Number(xpByDate.get(key) || 0), label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).slice(0, 1) }
  })
}

export function getDailyChallenge(profile, date = new Date()) {
  const subjects = (profile.subjects || []).filter((subjectId) => getSubject(subjectId))
  if (!subjects.length) return null
  const dateKey = date.toISOString().slice(0, 10)
  const dayIndex = Math.floor(date.getTime() / 86400000)
  const bandIndex = gradeBand(profile.grade).index
  const questions = Array.from({ length: 5 }, (_, index) => {
    const subjectId = subjects[index % subjects.length]
    const bank = dailyChallengeBanks[subjectId][bandIndex]
    const questionIndex = Math.floor(index / subjects.length) % bank.length
    const [topic, question, options, answer] = bank[(questionIndex + dayIndex) % bank.length]
    return {
      id: `${dateKey}-${index}`,
      type: 'multiple_choice',
      subjectId,
      topic,
      question,
      options,
      answer,
      explanation: `The correct answer is “${answer}”. Keep the key idea in mind: ${topic.toLowerCase()}.`,
    }
  })
  return {
    id: dateKey,
    date: dateKey,
    grade: Number.parseInt(profile.grade, 10) || 1,
    title: 'Today’s Challenge',
    questions,
    reward: 50,
    completed: Boolean(profile.dailyChallenges?.[dateKey]?.completed),
    previousResult: profile.dailyChallenges?.[dateKey] || null,
  }
}

export function recordDailyChallenge(profile, challenge, answers, durationMinutes) {
  if (!challenge || profile.dailyChallenges?.[challenge.date]?.completed) return profile
  const trackedMinutes = durationMinutes ?? challenge.questions.length * 2
  const outcomes = challenge.questions.map((question) => ({
    question,
    correct: evaluateQuestAnswer(question, answers[question.id]).correct,
  }))
  const correctCount = outcomes.filter((outcome) => outcome.correct).length
  const today = challenge.date
  const yesterday = new Date(`${today}T00:00:00Z`)
  yesterday.setUTCDate(yesterday.getUTCDate() - 1)
  const yesterdayKey = yesterday.toISOString().slice(0, 10)
  const streak = profile.lastQuestDate === today ? Number(profile.streak || 1) : profile.lastQuestDate === yesterdayKey ? Number(profile.streak || 0) + 1 : 1
  const streakBonus = profile.lastQuestDate === today ? 0 : 10
  const reward = challenge.reward + (correctCount * 5) + streakBonus
  const bySubject = outcomes.reduce((groups, outcome) => {
    const { subjectId } = outcome.question
    groups[subjectId] = [...(groups[subjectId] || []), outcome]
    return groups
  }, {})
  const subjectStats = { ...profile.subjectStats }
  Object.entries(bySubject).forEach(([subjectId, subjectOutcomes]) => {
    const previous = subjectStats[subjectId] || {}
    const history = [...(previous.history || []), ...subjectOutcomes.map(({ question, correct }) => ({ correct, date: today, topic: question.topic, type: 'daily_challenge' }))]
    const correct = subjectOutcomes.filter((outcome) => outcome.correct)
    const misses = subjectOutcomes.filter((outcome) => !outcome.correct)
    const gradeMax = gradeDifficultyCap(profile.grade)
    const currentDifficulty = Number.isInteger(previous.difficultyIndex) ? previous.difficultyIndex : gradeMax
    subjectStats[subjectId] = {
      ...previous,
      xp: Number(previous.xp || 0) + (correct.length * 5),
      progress: Math.min(100, Number(previous.progress || 0) + Math.round((correct.length / subjectOutcomes.length) * 10)),
      difficultyIndex: correct.length === subjectOutcomes.length ? Math.min(gradeMax, currentDifficulty + 1) : misses.length >= 2 && misses.length === subjectOutcomes.length ? Math.max(0, currentDifficulty - 1) : currentDifficulty,
      history,
      strongTopics: [...new Set([...(previous.strongTopics || []), ...correct.map(({ question }) => question.topic)])],
      practiceTopics: [...new Set([...(previous.practiceTopics || []), ...misses.map(({ question }) => question.topic)])].filter((topic) => !correct.some((outcome) => outcome.question.topic === topic)),
    }
  })
  const nextWeeklyActivity = [...(profile.weeklyActivity || []).filter((item) => item.date !== today).slice(-6), { date: today, xp: Number(profile.weeklyActivity?.find((item) => item.date === today)?.xp || 0) + reward }]
  const nextProfile = {
    ...profile,
    subjectStats,
    learningMinutes: Number(profile.learningMinutes || 0) + trackedMinutes,
    xp: Number(profile.xp || 0) + reward,
    coins: Number(profile.coins || 0) + Math.floor(reward / 10),
    correctAnswers: Number(profile.correctAnswers || 0) + correctCount,
    perfectQuests: Number(profile.perfectQuests || 0) + (correctCount === challenge.questions.length ? 1 : 0),
    streak,
    lastQuestDate: today,
    dailyChallenges: { ...profile.dailyChallenges, [today]: { completed: true, correct: correctCount, total: challenge.questions.length } },
    weeklyActivity: nextWeeklyActivity,
  }
  return applyAchievementRewards(profile, nextProfile)
}