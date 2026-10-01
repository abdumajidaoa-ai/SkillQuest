import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardHomePage from './pages/DashboardHomePage.jsx'
import QuestPage from './pages/QuestPage.jsx'
import QuestExplorerPage from './pages/QuestExplorerPage.jsx'
import QuestDetailPage from './pages/QuestDetailPage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import AchievementsPage from './pages/AchievementsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import SubjectPage from './pages/SubjectPage.jsx'
import DailyChallengePage from './pages/DailyChallengePage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import LeaderboardPage from './pages/LeaderboardPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { getProfile } from './utils/profile.js'
import LanguageProvider from './utils/language.jsx'
import './App.css'

function OnboardingRoute() {
  const profile = getProfile()
  return profile ? <OnboardingPage /> : <Navigate to="/register" replace />
}

function DashboardRoute() {
  const profile = getProfile()
  if (!profile) return <Navigate to="/register" replace />
  if (!profile.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <DashboardHomePage profile={profile} />
}

function LearningRoute({ page: Page }) {
  const profile = getProfile()
  if (!profile) return <Navigate to="/register" replace />
  if (!profile.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <Page profile={profile} />
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/explore" element={<LearningRoute page={ExplorePage} />} />
        <Route path="/quests" element={<LearningRoute page={QuestExplorerPage} />} />
        <Route path="/quests/:subjectId" element={<LearningRoute page={QuestDetailPage} />} />
        <Route path="/achievements" element={<LearningRoute page={AchievementsPage} />} />
        <Route path="/settings" element={<LearningRoute page={SettingsPage} />} />
        <Route path="/help" element={<LearningRoute page={HelpPage} />} />
        <Route path="/quest" element={<LearningRoute page={QuestPage} />} />
        <Route path="/progress" element={<LearningRoute page={ProgressPage} />} />
        <Route path="/subjects/:subjectId" element={<LearningRoute page={SubjectPage} />} />
        <Route path="/challenge" element={<LearningRoute page={DailyChallengePage} />} />
        <Route path="/news" element={<LearningRoute page={NewsPage} />} />
        <Route path="/news/:articleId" element={<LearningRoute page={NewsPage} />} />
        <Route path="/search" element={<LearningRoute page={SearchPage} />} />
        <Route path="/leaderboard" element={<LearningRoute page={LeaderboardPage} />} />
        <Route path="/profile" element={<LearningRoute page={ProfilePage} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}
