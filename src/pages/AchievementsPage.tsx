import { useState } from 'react';
import {
    Trophy,
    Medal,
    Star,
    Zap,
    Target,
    Flame,
    Award,
    Crown,
    BookOpen,
    Code2,
    CheckCircle2,
    Lock
} from 'lucide-react';
import './AchievementsPage.css';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: 'learning' | 'streak' | 'mastery' | 'social';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    progress: number;
    maxProgress: number;
    earned: boolean;
    earnedDate?: string;
    xpReward: number;
}

const achievements: Achievement[] = [
    // Learning Achievements
    {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Complete your first exercise',
        icon: <Star size={24} />,
        category: 'learning',
        rarity: 'common',
        progress: 1,
        maxProgress: 1,
        earned: true,
        earnedDate: '2024-01-15',
        xpReward: 50,
    },
    {
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Complete 10 exercises',
        icon: <Zap size={24} />,
        category: 'learning',
        rarity: 'common',
        progress: 7,
        maxProgress: 10,
        earned: false,
        xpReward: 100,
    },
    {
        id: 'python-novice',
        name: 'Python Novice',
        description: 'Complete the Python Fundamentals course',
        icon: <BookOpen size={24} />,
        category: 'learning',
        rarity: 'rare',
        progress: 12,
        maxProgress: 24,
        earned: false,
        xpReward: 250,
    },
    {
        id: 'code-warrior',
        name: 'Code Warrior',
        description: 'Complete 50 exercises',
        icon: <Code2 size={24} />,
        category: 'learning',
        rarity: 'epic',
        progress: 7,
        maxProgress: 50,
        earned: false,
        xpReward: 500,
    },
    // Streak Achievements
    {
        id: 'on-fire',
        name: 'On Fire',
        description: 'Maintain a 3-day streak',
        icon: <Flame size={24} />,
        category: 'streak',
        rarity: 'common',
        progress: 3,
        maxProgress: 3,
        earned: true,
        earnedDate: '2024-01-18',
        xpReward: 75,
    },
    {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: <Flame size={24} />,
        category: 'streak',
        rarity: 'rare',
        progress: 5,
        maxProgress: 7,
        earned: false,
        xpReward: 150,
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable',
        description: 'Maintain a 30-day streak',
        icon: <Flame size={24} />,
        category: 'streak',
        rarity: 'epic',
        progress: 5,
        maxProgress: 30,
        earned: false,
        xpReward: 500,
    },
    {
        id: 'legendary-dedication',
        name: 'Legendary Dedication',
        description: 'Maintain a 100-day streak',
        icon: <Crown size={24} />,
        category: 'streak',
        rarity: 'legendary',
        progress: 5,
        maxProgress: 100,
        earned: false,
        xpReward: 1000,
    },
    // Mastery Achievements
    {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Complete 5 exercises on the first try',
        icon: <Target size={24} />,
        category: 'mastery',
        rarity: 'rare',
        progress: 3,
        maxProgress: 5,
        earned: false,
        xpReward: 200,
    },
    {
        id: 'speed-demon',
        name: 'Speed Demon',
        description: 'Complete an exercise in under 2 minutes',
        icon: <Zap size={24} />,
        category: 'mastery',
        rarity: 'rare',
        progress: 1,
        maxProgress: 1,
        earned: true,
        earnedDate: '2024-01-16',
        xpReward: 100,
    },
    {
        id: 'master-coder',
        name: 'Master Coder',
        description: 'Reach 5000 XP',
        icon: <Award size={24} />,
        category: 'mastery',
        rarity: 'epic',
        progress: 2450,
        maxProgress: 5000,
        earned: false,
        xpReward: 500,
    },
    {
        id: 'python-master',
        name: 'Python Master',
        description: 'Complete all courses in a track',
        icon: <Trophy size={24} />,
        category: 'mastery',
        rarity: 'legendary',
        progress: 1,
        maxProgress: 3,
        earned: false,
        xpReward: 1000,
    },
];

const categoryLabels: Record<string, string> = {
    learning: 'Learning',
    streak: 'Streaks',
    mastery: 'Mastery',
    social: 'Social',
};

const rarityColors: Record<string, string> = {
    common: 'common',
    rare: 'rare',
    epic: 'epic',
    legendary: 'legendary',
};

const AchievementsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const earnedCount = achievements.filter(a => a.earned).length;
    const totalCount = achievements.length;
    const totalXP = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xpReward, 0);

    const filteredAchievements = selectedCategory === 'all'
        ? achievements
        : achievements.filter(a => a.category === selectedCategory);

    const categories = ['all', 'learning', 'streak', 'mastery'];

    return (
        <div className="achievements-page animate-fade-in">
            {/* Header */}
            <header className="achievements-header">
                <div className="achievements-header-content">
                    <h1 className="achievements-title">
                        <Trophy size={32} />
                        Achievements
                    </h1>
                    <p className="achievements-subtitle">
                        Track your progress and unlock rewards as you learn
                    </p>
                </div>

                <div className="achievements-stats">
                    <div className="achievement-stat">
                        <Medal size={24} />
                        <div className="stat-info">
                            <span className="stat-value">{earnedCount}/{totalCount}</span>
                            <span className="stat-label">Unlocked</span>
                        </div>
                    </div>
                    <div className="achievement-stat">
                        <Star size={24} />
                        <div className="stat-info">
                            <span className="stat-value">{totalXP}</span>
                            <span className="stat-label">XP Earned</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Filter */}
            <div className="achievements-filters">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category === 'all' ? 'All' : categoryLabels[category]}
                    </button>
                ))}
            </div>

            {/* Achievements Grid */}
            <div className="achievements-grid">
                {filteredAchievements.map(achievement => (
                    <div
                        key={achievement.id}
                        className={`achievement-card ${rarityColors[achievement.rarity]} ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                        <div className="achievement-icon-wrapper">
                            <div className={`achievement-icon ${rarityColors[achievement.rarity]}`}>
                                {achievement.earned ? achievement.icon : <Lock size={24} />}
                            </div>
                            {achievement.earned && (
                                <div className="earned-badge">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                        </div>

                        <div className="achievement-content">
                            <h3 className="achievement-name">{achievement.name}</h3>
                            <p className="achievement-description">{achievement.description}</p>

                            {!achievement.earned && (
                                <div className="achievement-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                        />
                                    </div>
                                    <span className="progress-text">
                                        {achievement.progress}/{achievement.maxProgress}
                                    </span>
                                </div>
                            )}

                            <div className="achievement-footer">
                                <span className={`rarity-badge ${rarityColors[achievement.rarity]}`}>
                                    {achievement.rarity}
                                </span>
                                <span className="xp-reward">+{achievement.xpReward} XP</span>
                            </div>

                            {achievement.earned && achievement.earnedDate && (
                                <span className="earned-date">
                                    Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsPage;
