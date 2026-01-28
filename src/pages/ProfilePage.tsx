import { useMemo } from 'react';
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
import { useProgressStore } from '../store/progressStore';
import './ProfilePage.css';

// Static user info (auth would provide this)
const userInfo = {
    displayName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: null,
    bio: 'Python enthusiast learning to build amazing things!',
    joinedAt: 'January 2024',
};

// Achievement definitions
const achievementDefs = [
    { id: 'first-steps', name: 'First Steps', icon: '🌱', description: 'Complete your first exercise', rarity: 'common' },
    { id: 'on-fire', name: 'On Fire', icon: '🔥', description: 'Achieve a 3-day streak', rarity: 'rare' },
    { id: 'week-warrior', name: 'Week Warrior', icon: '⚔️', description: 'Maintain a 7-day streak', rarity: 'rare' },
    { id: 'quick-learner', name: 'Quick Learner', icon: '⚡', description: 'Complete 10 exercises', rarity: 'rare' },
    { id: 'code-warrior', name: 'Code Warrior', icon: '🛡️', description: 'Complete 50 exercises', rarity: 'epic' },
    { id: 'unstoppable', name: 'Unstoppable', icon: '💪', description: '30-day streak', rarity: 'epic' },
];

const ProfilePage = () => {
    const { totalXP, currentStreak, getTotalExercisesCompleted, getUnlockedAchievements, completedExercises } = useProgressStore();

    const exercisesCompleted = getTotalExercisesCompleted();
    const unlockedAchievementIds = getUnlockedAchievements().map(a => a.achievementId);
    const rank = totalXP > 0 ? Math.max(1, 500 - Math.floor(totalXP / 10)) : 500;

    // Get earned badges with their definitions
    const earnedBadges = useMemo(() => {
        return achievementDefs.filter(def => unlockedAchievementIds.includes(def.id));
    }, [unlockedAchievementIds]);

    // Build recent activity from completed exercises
    const recentActivity = useMemo(() => {
        return completedExercises
            .filter(e => e.completed && e.completedAt)
            .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
            .slice(0, 5)
            .map(e => ({
                type: 'exercise' as const,
                title: e.exerciseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                course: e.courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                date: formatDate(e.completedAt!),
            }));
    }, [completedExercises]);

    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    return (
        <div className="profile-page animate-fade-in">
            {/* Profile Header */}
            <header className="profile-header">
                <div className="profile-cover" />
                <div className="profile-info">
                    <div className="profile-avatar">
                        {userInfo.avatar ? (
                            <img src={userInfo.avatar} alt={userInfo.displayName} />
                        ) : (
                            <User size={48} />
                        )}
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{userInfo.displayName}</h1>
                        <p className="profile-username">@{userInfo.username}</p>
                        <p className="profile-bio">{userInfo.bio}</p>
                        <div className="profile-meta">
                            <span className="meta-item">
                                <Calendar size={14} />
                                Joined {userInfo.joinedAt}
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
                            <span className="stat-value">{totalXP.toLocaleString()}</span>
                            <span className="stat-label">Total XP</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Code2 className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{exercisesCompleted}</span>
                            <span className="stat-label">Exercises</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <BookOpen className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{earnedBadges.length}</span>
                            <span className="stat-label">Badges</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Flame className="stat-icon streak" />
                        <div className="stat-info">
                            <span className="stat-value">{currentStreak}</span>
                            <span className="stat-label">Day Streak</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Target className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">#{rank}</span>
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
                            <span className="badge-count">{earnedBadges.length} badges earned</span>
                        </div>
                        <div className="badges-grid">
                            {earnedBadges.length > 0 ? (
                                earnedBadges.map((badge) => (
                                    <div key={badge.id} className={`badge-card ${badge.rarity}`}>
                                        <span className="badge-icon">{badge.icon}</span>
                                        <span className="badge-name">{badge.name}</span>
                                        <span className="badge-rarity">{badge.rarity}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="no-badges">
                                    <p>Complete exercises to earn badges!</p>
                                </div>
                            )}
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
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <div className={`activity-icon ${activity.type}`}>
                                            <Code2 size={16} />
                                        </div>
                                        <div className="activity-content">
                                            <span className="activity-title">{activity.title}</span>
                                            <span className="activity-description">
                                                {activity.course}
                                            </span>
                                        </div>
                                        <span className="activity-date">{activity.date}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="no-activity">
                                    <p>Start completing exercises to see your activity!</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
