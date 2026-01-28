import { useState } from 'react';
import {
    Trophy,
    Medal,
    Flame,
    TrendingUp,
    Crown,
    Award
} from 'lucide-react';
import './LeaderboardPage.css';

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, username: 'pythonmaster', displayName: 'Alex Chen', avatar: null, points: 12500, exercises: 145, streak: 45 },
    { rank: 2, username: 'codecrusher', displayName: 'Sarah Miller', avatar: null, points: 11200, exercises: 132, streak: 38 },
    { rank: 3, username: 'datawhiz', displayName: 'Mike Johnson', avatar: null, points: 10800, exercises: 128, streak: 29 },
    { rank: 4, username: 'devninja', displayName: 'Emily Davis', avatar: null, points: 9500, exercises: 115, streak: 21 },
    { rank: 5, username: 'algoace', displayName: 'Chris Wilson', avatar: null, points: 8900, exercises: 108, streak: 18 },
    { rank: 6, username: 'pycoder', displayName: 'Lisa Anderson', avatar: null, points: 8200, exercises: 98, streak: 15 },
    { rank: 7, username: 'techguru', displayName: 'David Brown', avatar: null, points: 7800, exercises: 92, streak: 12 },
    { rank: 8, username: 'codewarrior', displayName: 'Emma Taylor', avatar: null, points: 7200, exercises: 85, streak: 10 },
    { rank: 9, username: 'byteboss', displayName: 'James Martin', avatar: null, points: 6500, exercises: 78, streak: 8 },
    { rank: 10, username: 'scriptking', displayName: 'Sophie Garcia', avatar: null, points: 6100, exercises: 72, streak: 7 },
];

const currentUser = { rank: 156, username: 'johndoe', displayName: 'John Doe', avatar: null, points: 2450, exercises: 47, streak: 12 };

const LeaderboardPage = () => {
    const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="rank-icon gold" />;
            case 2:
                return <Medal className="rank-icon silver" />;
            case 3:
                return <Medal className="rank-icon bronze" />;
            default:
                return <span className="rank-number">{rank}</span>;
        }
    };

    return (
        <div className="leaderboard-page animate-fade-in">
            <header className="leaderboard-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Trophy size={28} />
                        Leaderboard
                    </h1>
                    <p className="page-subtitle">
                        See how you stack up against other Python learners worldwide.
                    </p>
                </div>
                <div className="time-filters">
                    <button
                        className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setTimeFilter('all')}
                    >
                        All Time
                    </button>
                    <button
                        className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
                        onClick={() => setTimeFilter('month')}
                    >
                        This Month
                    </button>
                    <button
                        className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
                        onClick={() => setTimeFilter('week')}
                    >
                        This Week
                    </button>
                </div>
            </header>

            {/* Top 3 Podium */}
            <section className="podium">
                <div className="podium-item second">
                    <div className="podium-avatar">
                        {leaderboardData[1].displayName.charAt(0)}
                    </div>
                    <div className="podium-info">
                        <Medal className="podium-medal silver" />
                        <span className="podium-name">{leaderboardData[1].displayName}</span>
                        <span className="podium-points">{leaderboardData[1].points.toLocaleString()} pts</span>
                    </div>
                    <div className="podium-stand second" />
                </div>

                <div className="podium-item first">
                    <div className="podium-avatar gold">
                        {leaderboardData[0].displayName.charAt(0)}
                    </div>
                    <div className="podium-info">
                        <Crown className="podium-medal gold" />
                        <span className="podium-name">{leaderboardData[0].displayName}</span>
                        <span className="podium-points">{leaderboardData[0].points.toLocaleString()} pts</span>
                    </div>
                    <div className="podium-stand first" />
                </div>

                <div className="podium-item third">
                    <div className="podium-avatar">
                        {leaderboardData[2].displayName.charAt(0)}
                    </div>
                    <div className="podium-info">
                        <Medal className="podium-medal bronze" />
                        <span className="podium-name">{leaderboardData[2].displayName}</span>
                        <span className="podium-points">{leaderboardData[2].points.toLocaleString()} pts</span>
                    </div>
                    <div className="podium-stand third" />
                </div>
            </section>

            {/* Leaderboard Table */}
            <section className="leaderboard-table-container">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Points</th>
                            <th>Exercises</th>
                            <th>Streak</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((user) => (
                            <tr key={user.rank} className={user.rank <= 3 ? 'top-three' : ''}>
                                <td className="rank-cell">
                                    {getRankIcon(user.rank)}
                                </td>
                                <td className="user-cell">
                                    <div className="user-avatar">
                                        {user.displayName.charAt(0)}
                                    </div>
                                    <div className="user-info">
                                        <span className="user-name">{user.displayName}</span>
                                        <span className="user-username">@{user.username}</span>
                                    </div>
                                </td>
                                <td className="points-cell">
                                    <Trophy size={14} />
                                    {user.points.toLocaleString()}
                                </td>
                                <td className="exercises-cell">
                                    <Award size={14} />
                                    {user.exercises}
                                </td>
                                <td className="streak-cell">
                                    <Flame size={14} />
                                    {user.streak} days
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Current User Position */}
            <section className="your-position">
                <div className="your-position-content">
                    <div className="your-position-info">
                        <TrendingUp size={24} />
                        <div>
                            <h3>Your Position</h3>
                            <p>Keep going! You're climbing the ranks.</p>
                        </div>
                    </div>
                    <div className="your-position-stats">
                        <div className="your-stat">
                            <span className="stat-label">Rank</span>
                            <span className="stat-value">#{currentUser.rank}</span>
                        </div>
                        <div className="your-stat">
                            <span className="stat-label">Points</span>
                            <span className="stat-value">{currentUser.points.toLocaleString()}</span>
                        </div>
                        <div className="your-stat">
                            <span className="stat-label">Streak</span>
                            <span className="stat-value">{currentUser.streak} days</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LeaderboardPage;
