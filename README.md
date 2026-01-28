# PyLearn - Interactive Python Learning Platform

![Python](https://img.shields.io/badge/Python-Learning-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify)

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
- Points and achievement badges
- Daily challenges and streaks
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
│   ├── pages/               # Route pages
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── DashboardPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── ExercisePage.tsx # Code editor
│   │   ├── LeaderboardPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── store/               # Zustand state management
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   └── courseStore.ts
│   ├── types/               # TypeScript definitions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & design system
├── netlify.toml             # Netlify config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#1A5F7A` | Main brand, CTAs |
| Secondary | `#2ECC71` | Success, progress |
| Accent | `#F39C12` | Highlights, warnings |
| Background | `#F4F6F7` | Page background |

### Typography
- **Sans-serif**: Inter (UI elements)
- **Monospace**: JetBrains Mono (code)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript |
| Build | Vite |
| Styling | CSS Variables, CSS Modules |
| State | Zustand |
| Editor | Monaco Editor |
| Python | Pyodide (WebAssembly) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Deployment | Netlify |

## 📱 Pages Overview

1. **Home** - Landing page with features and CTA
2. **Dashboard** - User stats, progress, recommendations
3. **Courses** - Browse and filter courses by track/difficulty
4. **Exercise** - Interactive coding environment
5. **Leaderboard** - Rankings with podium display
6. **Profile** - User stats, badges, activity
7. **Login/Register** - Authentication with OAuth

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
