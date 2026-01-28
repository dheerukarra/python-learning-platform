import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Code2,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Chrome
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './AuthPages.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            login({
                id: '1',
                email: formData.email,
                username: formData.email.split('@')[0],
                displayName: 'Demo User',
                role: 'student',
                createdAt: new Date().toISOString(),
                stats: {
                    totalPoints: 2450,
                    exercisesCompleted: 47,
                    currentStreak: 12,
                    longestStreak: 21,
                    rank: 156,
                    badges: []
                }
            }, 'demo-token');
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Left Panel - Branding */}
                <div className="auth-branding">
                    <div className="branding-content">
                        <Link to="/" className="auth-logo">
                            <div className="logo-icon">
                                <Code2 size={24} />
                            </div>
                            <span className="logo-text">PyLearn</span>
                        </Link>
                        <h1 className="branding-title">
                            Welcome back!
                        </h1>
                        <p className="branding-description">
                            Continue your Python learning journey. Your progress is waiting for you.
                        </p>
                        <div className="branding-stats">
                            <div className="branding-stat">
                                <span className="stat-value">50+</span>
                                <span className="stat-label">Courses</span>
                            </div>
                            <div className="branding-stat">
                                <span className="stat-value">10K+</span>
                                <span className="stat-label">Learners</span>
                            </div>
                            <div className="branding-stat">
                                <span className="stat-value">500+</span>
                                <span className="stat-label">Exercises</span>
                            </div>
                        </div>
                    </div>
                    <div className="branding-pattern" />
                </div>

                {/* Right Panel - Form */}
                <div className="auth-form-container">
                    <div className="auth-form-content">
                        <h2 className="form-title">Sign in to your account</h2>
                        <p className="form-subtitle">
                            Don't have an account?{' '}
                            <Link to="/register" className="form-link">Sign up for free</Link>
                        </p>

                        {/* OAuth Buttons */}
                        <div className="oauth-buttons">
                            <button className="oauth-btn google">
                                <Chrome size={20} />
                                Continue with Google
                            </button>
                            <button className="oauth-btn github">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                Continue with GitHub
                            </button>
                        </div>

                        <div className="divider-text">
                            <span>or continue with email</span>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        id="email"
                                        type="email"
                                        className="input"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="forgot-link">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary btn-lg w-full ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
