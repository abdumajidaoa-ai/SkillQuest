const PROFILE_KEY = 'skillquest.profile'

export function getProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_KEY)
    return storedProfile ? JSON.parse(storedProfile) : null
  } catch {
    return null
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY)
}

export const grades = [
  '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade',
  '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade',
]

export function gradeNumber(grade) {
  return Number.parseInt(grade, 10) || 1
}

export function gradeTrack(grade) {
  const number = gradeNumber(grade)
  if (number <= 4) return 'Junior'
  if (number <= 8) return 'Explorer'
  return 'Pro'
}