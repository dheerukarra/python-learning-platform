import { Link, NavLink } from 'react-router-dom';
import {
    Code2,
    Search,
    Moon,
    Sun,
    User,
    Settings,
    LogOut,
    Flame,
    Trophy,
    BookOpen
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';

const Header = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { user, isAuthenticated, logout } = useAuthStore();
    const { currentStreak } = useProgressStore();

    return (
        <header className="layout-header">
            <Link to="/" className="header-logo">
                <div className="header-logo-icon">
                    <Code2 size={20} />
                </div>
                <span className="header-logo-text">PyLearn</span>
            </Link>

            <nav className="header-nav">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
                >
                    <BookOpen size={18} />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/courses"
                    className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
                >
                    <Code2 size={18} />
                    Courses
                </NavLink>
                <NavLink
                    to="/leaderboard"
                    className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
                >
                    <Trophy size={18} />
                    Leaderboard
                </NavLink>
            </nav>

            <div className="header-actions">
                <div className="header-search">
                    <Search className="header-search-icon" />
                    <input
                        type="text"
                        placeholder="Search courses, exercises..."
                        className="header-search-input"
                    />
                </div>

                {isAuthenticated && currentStreak > 0 && (
                    <div className="streak-badge">
                        <Flame />
                        <span>{currentStreak} day streak</span>
                    </div>
                )}

                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {isAuthenticated && user ? (
                    <div className="user-menu">
                        <button className="user-menu-trigger">
                            <div className="user-avatar">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.displayName} />
                                ) : (
                                    user.displayName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <span className="user-name">{user.displayName}</span>
                        </button>
                        <div className="user-dropdown">
                            <Link to="/profile" className="user-dropdown-item">
                                <User size={16} />
                                Profile
                            </Link>
                            <Link to="/settings" className="user-dropdown-item">
                                <Settings size={16} />
                                Settings
                            </Link>
                            <div className="user-dropdown-divider" />
                            <button
                                className="user-dropdown-item danger"
                                onClick={logout}
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
