import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
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
import { useProgressStore } from '../../store/progressStore';
import { exercises, courses } from '../../data/exercises';

const Sidebar = () => {
    const { completedExercises } = useProgressStore();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const currentTrack = location.pathname === '/courses' ? searchParams.get('track') : null;

    // Calculate real progress for each track
    const getTrackProgress = (trackId: string) => {
        const trackCourses = courses.filter(c => c.track === trackId);
        const trackExerciseIds = exercises
            .filter(e => trackCourses.some(c => c.id === e.courseId))
            .map(e => e.id);

        if (trackExerciseIds.length === 0) return 0;

        const completedCount = completedExercises.filter(
            ce => ce.completed && trackExerciseIds.includes(ce.exerciseId)
        ).length;

        return Math.round((completedCount / trackExerciseIds.length) * 100);
    };

    const tracks = [
        {
            id: 'development',
            name: 'Development',
            icon: Code2,
            progress: getTrackProgress('development'),
            courses: courses.filter(c => c.track === 'development').length
        },
        {
            id: 'datascience',
            name: 'Data Science',
            icon: Database,
            progress: getTrackProgress('datascience'),
            courses: courses.filter(c => c.track === 'datascience').length
        },
        {
            id: 'devops',
            name: 'DevOps',
            icon: Cloud,
            progress: getTrackProgress('devops'),
            courses: courses.filter(c => c.track === 'devops').length
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
                            className={`sidebar-nav-item ${currentTrack === track.id ? 'active' : ''}`}
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
