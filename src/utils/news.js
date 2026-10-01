export const newsCategories = ['All', 'Education', 'Technology', 'Science', 'Programming', 'English', 'Study Tips']

export const newsArticles = [
  {
    id: 'small-habits-big-learning',
    category: 'Study Tips',
    title: 'Why small daily practice beats the last-minute cram',
    description: 'Short, spaced sessions give your brain more chances to strengthen a new idea and bring it back when you need it.',
    date: '2026-09-28',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Open notebook and pen on a study desk',
    readTime: '4 min read',
    body: [
      'Learning something new rarely happens in one dramatic moment. It is usually the result of returning to an idea, trying it again, and noticing what makes more sense this time.',
      'A short practice session creates a useful pause between attempts. That pause asks your memory to retrieve what it learned instead of simply recognizing the answer on the page. Retrieval is effortful, but that effort helps make knowledge easier to use later.',
      'Try one focused quest today, then revisit the same skill tomorrow. Keep the session small enough to repeat, and let steady progress do the heavy lifting.',
    ],
  },
  {
    id: 'coral-reef-classroom',
    category: 'Science',
    title: 'A reef in the classroom: students map a changing ocean',
    description: 'A hands-on model helps young scientists connect ocean temperature, coral health, and the choices communities make.',
    date: '2026-09-24',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Colorful coral reef beneath clear ocean water',
    readTime: '5 min read',
    body: [
      'A reef can look like a single colorful landscape, but it is a network of living things responding to the water around them. Students can explore that network by changing one condition at a time in a simple classroom model.',
      'When learners compare a stable reef with one exposed to warmer water, they can track cause and effect: stressed coral loses its partnership with algae, and the habitat around it changes too.',
      'The model is not the ocean itself. It is a starting point for asking better questions about evidence, ecosystems, and how local decisions connect to global systems.',
    ],
  },
  {
    id: 'creative-coding-tools',
    category: 'Programming',
    title: 'Creative coding is turning curiosity into a first project',
    description: 'Beginner-friendly coding tools are helping more students make interactive stories, animations, and tiny games.',
    date: '2026-09-19',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Students collaborating around a laptop',
    readTime: '3 min read',
    body: [
      'A first coding project does not need to solve a giant problem. A character that responds to a key press or a story with two possible endings can make abstract ideas feel tangible.',
      'Projects like these introduce useful building blocks: events, sequences, conditions, and feedback. More importantly, they give learners something to test and change when the result is not what they expected.',
      'Start with a playful question, build the smallest version that answers it, and share the result with someone who can suggest what to try next.',
    ],
  },
  {
    id: 'school-gardens-data',
    category: 'Science',
    title: 'School gardens are growing practical data skills',
    description: 'Measuring rainfall, light, and plant growth gives students a living reason to collect and compare evidence.',
    date: '2026-09-12',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Young green plants growing in sunlight',
    readTime: '4 min read',
    body: [
      'A garden changes a little every day, which makes it a natural place to practice observation. Students can measure the same plants each week and record what changed alongside the weather.',
      'Those notes can become tables, charts, and new questions. Did a sunnier patch grow faster? Did a rainy week change the pattern? The answers depend on careful measurement rather than a quick guess.',
      'The best part is that the data belongs to a real, shared project. Learners can use what they find to decide what to plant, where to plant it, and what to measure next.',
    ],
  },
  {
    id: 'study-groups-better-questions',
    category: 'Education',
    title: 'The best study groups make room for better questions',
    description: 'Explaining an idea to a classmate can reveal the gaps in your own understanding, without turning practice into a contest.',
    date: '2026-09-06',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Students studying together at a shared table',
    readTime: '3 min read',
    body: [
      'A helpful study group is not just a room where everyone reads quietly. It is a place to say what you think, hear another explanation, and ask a question that moves the group forward.',
      'Taking turns explaining a concept can make each person notice which steps feel solid and which still need practice. The goal is not to perform expertise; it is to make thinking visible.',
      'Try bringing one question to your next study session. Listen for a different way to explain the answer, then see whether you can teach it back in your own words.',
    ],
  },
  {
    id: 'english-reading-habits',
    category: 'English',
    title: 'Reading for ten minutes can open a bigger story',
    description: 'A short daily reading habit gives learners room to notice new words, stronger sentences, and different points of view.',
    date: '2026-08-30',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'A quiet library filled with bookshelves',
    readTime: '3 min read',
    body: [
      'A regular reading habit does not need a long block of free time. Ten focused minutes can be enough to follow an idea, meet a new word in context, or notice how an author builds a scene.',
      'Choosing something you genuinely want to read makes it easier to return tomorrow. A short note about one interesting phrase can also turn reading into a small, repeatable learning practice.',
      'Over time, those small sessions add up to a wider vocabulary and a more confident sense of how language works.',
    ],
  },
]

export async function loadNews() {
  return newsArticles
}