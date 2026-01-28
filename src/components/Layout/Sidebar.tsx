import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Trophy,
    Target,
    Code2,
    Database,
    Cloud,
    Zap,
    Award,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const tracks = [
        {
            id: 'development',
            name: 'Development',
            icon: Code2,
            progress: 65,
            courses: 12
        },
        {
            id: 'datascience',
            name: 'Data Science',
            icon: Database,
            progress: 30,
            courses: 8
        },
        {
            id: 'devops',
            name: 'DevOps',
            icon: Cloud,
            progress: 10,
            courses: 6
        },
    ];

    return (
        <aside className="layout-sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-section-title">
                    <LayoutDashboard size={14} />
                    Menu
                </h3>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/courses"
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <BookOpen />
                        <span>All Courses</span>
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Trophy />
                        <span>Leaderboard</span>
                    </NavLink>
                    <NavLink
                        to="/achievements"
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Award />
                        <span>Achievements</span>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Settings />
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>

            <div className="sidebar-section">
                <h3 className="sidebar-section-title">
                    <Target size={14} />
                    Learning Tracks
                </h3>
                <nav className="sidebar-nav">
                    {tracks.map((track) => (
                        <NavLink
                            key={track.id}
                            to={`/courses?track=${track.id}`}
                            className="sidebar-nav-item"
                        >
                            <div className={`sidebar-track-icon ${track.id}`}>
                                <track.icon size={18} />
                            </div>
                            <div className="sidebar-track-info">
                                <div className="sidebar-track-name">{track.name}</div>
                                <div className="sidebar-track-progress">
                                    <div className="sidebar-track-progress-bar">
                                        <div
                                            className="sidebar-track-progress-fill"
                                            style={{ width: `${track.progress}%` }}
                                        />
                                    </div>
                                    <span className="sidebar-track-progress-text">{track.progress}%</span>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="sidebar-promo">
                <h4 className="sidebar-promo-title">
                    <Zap size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Daily Challenge
                </h4>
                <p className="sidebar-promo-text">
                    Complete today's challenge to earn bonus points and keep your streak alive!
                </p>
                <a href="/daily-challenge" className="sidebar-promo-btn">
                    Start Challenge →
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
