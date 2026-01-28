import {
    User,
    Trophy,
    Flame,
    Award,
    Calendar,
    Edit,
    Settings,
    BookOpen,
    Code2,
    Target
} from 'lucide-react';
import './ProfilePage.css';

// Mock user data
const user = {
    displayName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: null,
    bio: 'Python enthusiast learning to build amazing things!',
    joinedAt: 'January 2024',
    stats: {
        totalPoints: 2450,
        exercisesCompleted: 47,
        coursesCompleted: 3,
        currentStreak: 12,
        longestStreak: 21,
        rank: 156
    }
};

const badges = [
    { id: '1', name: 'First Steps', icon: '🌱', description: 'Complete your first exercise', rarity: 'common' },
    { id: '2', name: 'On Fire', icon: '🔥', description: 'Achieve a 7-day streak', rarity: 'rare' },
    { id: '3', name: 'Python Basics', icon: '🐍', description: 'Complete Python Basics course', rarity: 'common' },
    { id: '4', name: 'Problem Solver', icon: '🧩', description: 'Solve 25 exercises', rarity: 'rare' },
    { id: '5', name: 'Persistent', icon: '💪', description: 'Complete 50 exercises', rarity: 'epic' },
    { id: '6', name: 'Quick Learner', icon: '⚡', description: 'Complete 3 courses', rarity: 'rare' },
];

const recentActivity = [
    { type: 'exercise', title: 'List Comprehensions', course: 'Python Basics', date: 'Today' },
    { type: 'badge', title: 'On Fire Badge', description: 'Earned for 7-day streak', date: 'Yesterday' },
    { type: 'course', title: 'Python Basics', description: 'Completed', date: '2 days ago' },
    { type: 'exercise', title: 'Dictionary Methods', course: 'Python Basics', date: '3 days ago' },
];

const ProfilePage = () => {
    return (
        <div className="profile-page animate-fade-in">
            {/* Profile Header */}
            <header className="profile-header">
                <div className="profile-cover" />
                <div className="profile-info">
                    <div className="profile-avatar">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.displayName} />
                        ) : (
                            <User size={48} />
                        )}
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{user.displayName}</h1>
                        <p className="profile-username">@{user.username}</p>
                        <p className="profile-bio">{user.bio}</p>
                        <div className="profile-meta">
                            <span className="meta-item">
                                <Calendar size={14} />
                                Joined {user.joinedAt}
                            </span>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn btn-secondary btn-sm">
                            <Edit size={16} />
                            Edit Profile
                        </button>
                        <button className="btn btn-ghost btn-sm">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="profile-content">
                {/* Stats Section */}
                <section className="profile-stats">
                    <div className="stat-card">
                        <Trophy className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{user.stats.totalPoints.toLocaleString()}</span>
                            <span className="stat-label">Total Points</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Code2 className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{user.stats.exercisesCompleted}</span>
                            <span className="stat-label">Exercises</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <BookOpen className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{user.stats.coursesCompleted}</span>
                            <span className="stat-label">Courses</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Flame className="stat-icon streak" />
                        <div className="stat-info">
                            <span className="stat-value">{user.stats.currentStreak}</span>
                            <span className="stat-label">Day Streak</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Target className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">#{user.stats.rank}</span>
                            <span className="stat-label">Global Rank</span>
                        </div>
                    </div>
                </section>

                <div className="profile-grid">
                    {/* Badges Section */}
                    <section className="profile-section badges-section">
                        <div className="section-header">
                            <h2>
                                <Award size={20} />
                                Achievements
                            </h2>
                            <span className="badge-count">{badges.length} badges earned</span>
                        </div>
                        <div className="badges-grid">
                            {badges.map((badge) => (
                                <div key={badge.id} className={`badge-card ${badge.rarity}`}>
                                    <span className="badge-icon">{badge.icon}</span>
                                    <span className="badge-name">{badge.name}</span>
                                    <span className="badge-rarity">{badge.rarity}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="profile-section activity-section">
                        <div className="section-header">
                            <h2>
                                <Calendar size={20} />
                                Recent Activity
                            </h2>
                        </div>
                        <div className="activity-timeline">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className={`activity-icon ${activity.type}`}>
                                        {activity.type === 'exercise' && <Code2 size={16} />}
                                        {activity.type === 'badge' && <Award size={16} />}
                                        {activity.type === 'course' && <BookOpen size={16} />}
                                    </div>
                                    <div className="activity-content">
                                        <span className="activity-title">{activity.title}</span>
                                        <span className="activity-description">
                                            {activity.course || activity.description}
                                        </span>
                                    </div>
                                    <span className="activity-date">{activity.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
