# PyLearn - Interactive Python Learning Platform

![Python](https://img.shields.io/badge/Python-Learning-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
[![Netlify Status](https://api.netlify.com/api/v1/badges/python-learning-platform/deploy-status)](https://python-learning-platform.netlify.app/)

**🌐 Live Demo: [python-learning-platform.netlify.app](https://python-learning-platform.netlify.app/)**

A comprehensive, interactive Python coding exercise platform with real-time code execution, step-by-step visualization, and gamified learning paths.

## ✨ Features

### 🎓 Structured Learning Paths
- **Development Track**: Web development, backend engineering, full-stack
- **Data Science Track**: Machine learning, data analysis, statistical computing
- **DevOps Track**: Automation, cloud engineering, CI/CD

### 💻 Interactive Code Editor
- Monaco Editor with Python syntax highlighting
- Real-time code execution via Pyodide (WebAssembly)
- Automatic code assessment with test cases
- Step-by-step code visualization

### 🎮 Gamification
- Points and achievement badges (12 unique badges)
- Daily challenges with streak tracking
- Global leaderboard
- Progress tracking across courses

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/Light mode support
- Smooth animations and transitions
- Glassmorphism effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dheerukarra/python-learning-platform.git
cd python-learning-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
python-learning-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout/          # Header, Sidebar, Layout
│   ├── data/                # Exercise and course data
│   │   └── exercises.ts     # 15 Python exercises, 8 courses
│   ├── pages/               # Route pages
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── CourseDetailPage.tsx
│   │   ├── ExercisePage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   ├── AchievementsPage.tsx
│   │   ├── DailyChallengePage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript definitions
│   ├── App.tsx
│   └── index.css            # Design system
├── netlify.toml
└── package.json
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript |
| Build | Vite |
| Styling | CSS Variables |
| State | Zustand |
| Editor | Monaco Editor |
| Python | Pyodide (WebAssembly) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Deployment | Netlify |

## 📱 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Landing page with features and CTA |
| **Dashboard** | User stats, progress, recommendations |
| **Courses** | Browse and filter courses by track/difficulty |
| **Course Detail** | View exercises within a course |
| **Exercise** | Interactive coding environment with Python |
| **Leaderboard** | Rankings with podium display |
| **Achievements** | 12 badges with XP rewards and progress tracking |
| **Daily Challenge** | Streak system with countdown timer |
| **Settings** | Theme, editor preferences, notifications |
| **Profile** | User stats, badges, activity |
| **Login/Register** | Authentication UI |

## 🔐 Security Features

- JWT-based authentication
- OAuth 2.0 (Google, GitHub)
- Security headers configured
- Input validation
- XSS protection

## 📊 Performance

- Code splitting with React.lazy
- Optimized bundle size
- Lazy-loaded Pyodide runtime
- Efficient state management

## 🚢 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Netlify auto-detects `netlify.toml`
4. Deploy automatically on push

Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📄 License

MIT License - feel free to use for learning and projects!

---

Built with ❤️ for Python learners everywhere 🐍
