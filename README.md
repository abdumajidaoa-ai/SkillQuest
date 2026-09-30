# SkillQuest

SkillQuest is a responsive, gamified learning platform for students in grades 1–11. Learners create a profile, choose a grade, subjects, interests, and goal, then receive grade-matched quests and track progress.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create a production bundle and `npm run lint` to run Oxlint.

## Learning flow

`/` → `/register` → `/onboarding` → `/dashboard`

The dashboard links to `/quest`, `/challenge`, `/progress`, and `/subjects/:subjectId`. Profile, quest history, XP, streaks, achievements, daily challenge results, and subject progress are stored in browser `localStorage` under `skillquest.profile`.

## Project structure

- `src/pages/` contains landing, account, onboarding, dashboard, quest, daily challenge, subject, and progress screens.
- `src/components/` contains shared branding, student navigation, subject cards, and typed quest answer controls.
- `src/utils/profile.js` owns profile persistence and grade tracks.
- `src/utils/learning.js` owns the subject catalog, grade-banded curriculum, typed answer checking, recommendations, adaptive difficulty, XP, streaks, daily challenges, weekly activity, accuracy, and achievements.
- `src/App.css` contains the existing visual system plus responsive student-workspace styles; `src/index.css` defines the global theme and Tailwind import.

Add curriculum entries to `src/utils/learning.js` to introduce more subjects or learning content. Keep answer checking and profile persistence behind the learning utilities when connecting a backend.

## Prototype boundaries

Authentication and Google sign-in are UI placeholders. Data is stored locally in the current browser and is not synchronized, backed up, or suitable for real student accounts. A production deployment should replace local profile storage with a secure backend, server-side validation, and appropriate privacy controls for minors.
