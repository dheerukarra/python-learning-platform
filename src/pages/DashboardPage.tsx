import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Flame,
    Trophy,
    CheckCircle2,
    Clock,
    TrendingUp,
    Play,
    ArrowRight,
    Target,
    Zap,
    Award
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './DashboardPage.css';

// Mock data for demonstration
const mockUser = {
    id: '1',
    email: 'john@example.com',
    username: 'johndoe',
    displayName: 'John Doe',
    role: 'student' as const,
    createdAt: '2024-01-01',
    stats: {
        totalPoints: 2450,
        exercisesCompleted: 47,
        currentStreak: 12,
        longestStreak: 21,
        rank: 156,
        badges: []
    }
};

const recentExercises = [
    { id: '1', title: 'List Comprehensions', course: 'Python Basics', progress: 80, difficulty: 'intermediate' },
    { id: '2', title: 'Dictionary Methods', course: 'Python Basics', progress: 100, difficulty: 'beginner' },
    { id: '3', title: 'Class Inheritance', course: 'OOP in Python', progress: 45, difficulty: 'intermediate' },
    { id: '4', title: 'Error Handling', course: 'Python Basics', progress: 0, difficulty: 'beginner' },
];

const recommendedCourses = [
    { id: '1', title: 'Data Structures', description: 'Master arrays, linked lists, and trees', progress: 0, exercises: 24 },
    { id: '2', title: 'Web APIs with FastAPI', description: 'Build modern APIs with Python', progress: 0, exercises: 18 },
];

const DashboardPage = () => {
    const { user, login, isAuthenticated } = useAuthStore();

    // Auto-login for demo
    useEffect(() => {
        if (!isAuthenticated) {
            login(mockUser, 'demo-token');
        }
    }, [isAuthenticated, login]);

    const displayUser = user || mockUser;

    return (
        <div className="dashboard-page animate-fade-in">
            {/* Welcome Section */}
            <section className="dashboard-welcome">
                <div className="welcome-content">
                    <h1 className="welcome-title">Welcome back, {displayUser.displayName}! 👋</h1>
                    <p className="welcome-subtitle">Ready to continue your Python journey? You're doing great!</p>
                </div>
                <div className="welcome-actions">
                    <Link to="/exercise/next" className="btn btn-primary">
                        <Play size={18} />
                        Continue Learning
                    </Link>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="stats-grid">
                <div className="stat-card streak">
                    <div className="stat-icon">
                        <Flame />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{displayUser.stats.currentStreak}</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                    <div className="stat-badge">🔥 On Fire!</div>
                </div>

                <div className="stat-card points">
                    <div className="stat-icon">
                        <Trophy />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{displayUser.stats.totalPoints.toLocaleString()}</span>
                        <span className="stat-label">Total Points</span>
                    </div>
                    <div className="stat-trend positive">
                        <TrendingUp size={14} />
                        +120 this week
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">
                        <CheckCircle2 />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{displayUser.stats.exercisesCompleted}</span>
                        <span className="stat-label">Exercises Done</span>
                    </div>
                    <div className="stat-subtext">3 this week</div>
                </div>

                <div className="stat-card rank">
                    <div className="stat-icon">
                        <Award />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">#{displayUser.stats.rank}</span>
                        <span className="stat-label">Global Rank</span>
                    </div>
                    <div className="stat-trend positive">
                        <TrendingUp size={14} />
                        Up 12 places
                    </div>
                </div>
            </section>

            <div className="dashboard-content">
                {/* Recent Activity */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <Clock size={20} />
                            Recent Activity
                        </h2>
                        <Link to="/courses" className="section-link">
                            View All
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="activity-list">
                        {recentExercises.map((exercise) => (
                            <Link
                                key={exercise.id}
                                to={`/exercise/${exercise.id}`}
                                className="activity-item"
                            >
                                <div className="activity-info">
                                    <span className="activity-title">{exercise.title}</span>
                                    <span className="activity-course">{exercise.course}</span>
                                </div>
                                <div className="activity-status">
                                    {exercise.progress === 100 ? (
                                        <span className="activity-complete">
                                            <CheckCircle2 size={16} />
                                            Completed
                                        </span>
                                    ) : exercise.progress > 0 ? (
                                        <div className="activity-progress">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: `${exercise.progress}%` }}
                                                />
                                            </div>
                                            <span>{exercise.progress}%</span>
                                        </div>
                                    ) : (
                                        <span className="activity-start">
                                            <Play size={14} />
                                            Start
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recommended */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <Target size={20} />
                            Recommended for You
                        </h2>
                    </div>
                    <div className="recommended-grid">
                        {recommendedCourses.map((course) => (
                            <Link
                                key={course.id}
                                to={`/courses/${course.id}`}
                                className="recommended-card"
                            >
                                <h3 className="recommended-title">{course.title}</h3>
                                <p className="recommended-description">{course.description}</p>
                                <div className="recommended-meta">
                                    <span className="recommended-exercises">{course.exercises} exercises</span>
                                    <span className="recommended-action">
                                        Start Course
                                        <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            {/* Daily Challenge Banner */}
            <section className="daily-challenge">
                <div className="challenge-content">
                    <div className="challenge-icon">
                        <Zap size={24} />
                    </div>
                    <div className="challenge-info">
                        <h3 className="challenge-title">Daily Challenge Available!</h3>
                        <p className="challenge-description">
                            Complete today's challenge to earn 50 bonus points and keep your streak alive.
                        </p>
                    </div>
                    <Link to="/exercise/daily" className="btn btn-success">
                        <Zap size={18} />
                        Take Challenge
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
