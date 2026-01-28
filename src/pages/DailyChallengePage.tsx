import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Zap,
    Clock,
    Trophy,
    Target,
    Flame,
    ArrowRight
} from 'lucide-react';
import { exercises } from '../data/exercises';
import './DailyChallengePage.css';

// Get a random exercise based on the date (same exercise for everyone each day)
const getDailyChallenge = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const challengeIndex = dayOfYear % exercises.length;
    return exercises[challengeIndex];
};

const DailyChallengePage = () => {
    const challenge = getDailyChallenge();
    const [timeRemaining, setTimeRemaining] = useState('');
    const streak = 5; // Mock streak data

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="daily-challenge-page animate-fade-in">
            {/* Header with Timer */}
            <header className="challenge-header">
                <div className="challenge-date">
                    <Zap size={24} className="zap-icon" />
                    <div>
                        <h1>Daily Challenge</h1>
                        <p>{dateString}</p>
                    </div>
                </div>
                <div className="challenge-timer">
                    <Clock size={18} />
                    <span>Resets in {timeRemaining}</span>
                </div>
            </header>

            {/* Streak Card */}
            <div className="streak-card">
                <div className="streak-icon">
                    <Flame size={32} />
                </div>
                <div className="streak-info">
                    <h2>{streak} Day Streak!</h2>
                    <p>Complete today's challenge to keep it going</p>
                </div>
                <div className="streak-days">
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <div
                            key={day}
                            className={`streak-day ${day <= streak ? 'completed' : ''} ${day === streak + 1 ? 'today' : ''}`}
                        >
                            {day <= streak ? '🔥' : day === streak + 1 ? '?' : '○'}
                        </div>
                    ))}
                </div>
            </div>

            {/* Challenge Card */}
            <div className="challenge-card">
                <div className="challenge-badge">
                    <Zap size={20} />
                    Today's Challenge
                </div>

                <h2 className="challenge-title">{challenge.title}</h2>
                <p className="challenge-description">{challenge.description}</p>

                <div className="challenge-meta">
                    <span className={`badge ${challenge.difficulty === 'beginner' ? 'badge-success' :
                        challenge.difficulty === 'intermediate' ? 'badge-warning' : 'badge-error'
                        }`}>
                        {challenge.difficulty}
                    </span>
                    <span className="meta-item">
                        <Trophy size={14} />
                        {challenge.points * 2} bonus pts
                    </span>
                    <span className="meta-item">
                        <Clock size={14} />
                        {challenge.estimatedTime}
                    </span>
                </div>

                <Link to={`/exercise/${challenge.id}`} className="btn btn-primary btn-lg start-challenge-btn">
                    Start Challenge
                    <ArrowRight size={20} />
                </Link>
            </div>

            {/* Rewards */}
            <div className="rewards-section">
                <h3 className="rewards-title">
                    <Target size={20} />
                    Daily Rewards
                </h3>
                <div className="rewards-grid">
                    <div className="reward-card">
                        <div className="reward-icon">🔥</div>
                        <div className="reward-info">
                            <span className="reward-name">Keep Streak</span>
                            <span className="reward-value">+1 day</span>
                        </div>
                    </div>
                    <div className="reward-card">
                        <div className="reward-icon">⭐</div>
                        <div className="reward-info">
                            <span className="reward-name">Bonus XP</span>
                            <span className="reward-value">2x points</span>
                        </div>
                    </div>
                    <div className="reward-card">
                        <div className="reward-icon">🏆</div>
                        <div className="reward-info">
                            <span className="reward-name">Leaderboard</span>
                            <span className="reward-value">+50 pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyChallengePage;
