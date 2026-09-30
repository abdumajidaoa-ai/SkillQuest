import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import { getProfile } from './utils/profile.js'
import './App.css'

function OnboardingRoute() {
  const profile = getProfile()
  return profile ? <OnboardingPage /> : <Navigate to="/register" replace />
}

function DashboardRoute() {
  const profile = getProfile()
  if (!profile) return <Navigate to="/register" replace />
  if (!profile.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <DashboardPage profile={profile} />
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
