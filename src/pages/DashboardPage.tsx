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
    Award,
    LogIn
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import './DashboardPage.css';

const recentExercises = [
    { id: 'hello-world', title: 'Hello World', course: 'Python Fundamentals', progress: 0, difficulty: 'beginner' },
    { id: 'variables-and-types', title: 'Variables and Types', course: 'Python Fundamentals', progress: 0, difficulty: 'beginner' },
    { id: 'basic-arithmetic', title: 'Basic Arithmetic', course: 'Python Fundamentals', progress: 0, difficulty: 'beginner' },
    { id: 'string-formatting', title: 'String Formatting', course: 'Python Fundamentals', progress: 0, difficulty: 'beginner' },
];

const recommendedCourses = [
    { id: 'python-fundamentals', title: 'Python Fundamentals', description: 'Start your Python journey with the basics', progress: 0, exercises: 5 },
    { id: 'data-structures', title: 'Data Structures', description: 'Master lists, dictionaries, and more', progress: 0, exercises: 5 },
];

const DashboardPage = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { totalXP, currentStreak, getTotalExercisesCompleted, getUnlockedAchievements, completedExercises } = useProgressStore();

    const exercisesCompleted = getTotalExercisesCompleted();
    const unlockedAchievements = getUnlockedAchievements();

    // Calculate rank based on XP (simple formula for demo)
    const rank = totalXP > 0 ? Math.max(1, 500 - Math.floor(totalXP / 10)) : 500;

    // Calculate next exercise to continue - find first uncompleted or default to first exercise
    const completedIds = completedExercises.filter(e => e.completed).map(e => e.exerciseId);
    const nextExerciseId = recentExercises.find(e => !completedIds.includes(e.id))?.id || 'hello-world';

    // Show sign-in prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="dashboard-page animate-fade-in">
                <section className="dashboard-welcome">
                    <div className="welcome-content">
                        <h1 className="welcome-title">Welcome to PyLearn! 🐍</h1>
                        <p className="welcome-subtitle">Sign in to track your progress and earn achievements.</p>
                    </div>
                    <div className="welcome-actions">
                        <Link to="/login" className="btn btn-primary">
                            <LogIn size={18} />
                            Sign In to Start Learning
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="dashboard-page animate-fade-in">
            {/* Welcome Section */}
            <section className="dashboard-welcome">
                <div className="welcome-content">
                    <h1 className="welcome-title">Welcome back, {user?.displayName || 'Learner'}! 👋</h1>
                    <p className="welcome-subtitle">Ready to continue your Python journey? You're doing great!</p>
                </div>
                <div className="welcome-actions">
                    <Link to={`/exercise/${nextExerciseId}`} className="btn btn-primary">
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
                        <span className="stat-value">{currentStreak}</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                    {currentStreak >= 3 && <div className="stat-badge">🔥 On Fire!</div>}
                </div>

                <div className="stat-card points">
                    <div className="stat-icon">
                        <Trophy />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{totalXP.toLocaleString()}</span>
                        <span className="stat-label">Total XP</span>
                    </div>
                    {totalXP > 0 && (
                        <div className="stat-trend positive">
                            <TrendingUp size={14} />
                            Earning XP!
                        </div>
                    )}
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">
                        <CheckCircle2 />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{exercisesCompleted}</span>
                        <span className="stat-label">Exercises Done</span>
                    </div>
                    {unlockedAchievements.length > 0 && (
                        <div className="stat-subtext">{unlockedAchievements.length} badges earned</div>
                    )}
                </div>

                <div className="stat-card rank">
                    <div className="stat-icon">
                        <Award />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">#{rank}</span>
                        <span className="stat-label">Global Rank</span>
                    </div>
                    {totalXP > 0 && (
                        <div className="stat-trend positive">
                            <TrendingUp size={14} />
                            Keep learning!
                        </div>
                    )}
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
