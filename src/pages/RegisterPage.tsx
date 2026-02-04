import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Code2,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    Chrome,
    Check
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './AuthPages.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.password.length >= 8 },
        { label: 'Contains a number', met: /\d/.test(formData.password) },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate registration
        setTimeout(() => {
            login({
                id: '1',
                email: formData.email,
                username: formData.email.split('@')[0],
                displayName: formData.name,
                role: 'student',
                createdAt: new Date().toISOString(),
                stats: {
                    totalPoints: 0,
                    exercisesCompleted: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    rank: 0,
                    badges: []
                }
            }, 'demo-token');
            navigate('/dashboard');
        }, 1000);
    };

    const handleOAuthSignup = (provider: 'google' | 'github') => {
        setOauthLoading(provider);

        // Simulate OAuth signup flow
        setTimeout(() => {
            const mockUser = provider === 'google'
                ? {
                    id: 'google-new-' + Date.now(),
                    email: 'newuser@gmail.com',
                    username: 'google_newuser',
                    displayName: 'New Google User',
                    avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
                }
                : {
                    id: 'github-new-' + Date.now(),
                    email: 'newuser@github.com',
                    username: 'github_newuser',
                    displayName: 'New GitHub User',
                    avatar: 'https://ui-avatars.com/api/?name=GitHub+User&background=333&color=fff',
                };

            login({
                ...mockUser,
                role: 'student',
                createdAt: new Date().toISOString(),
                stats: {
                    totalPoints: 0,
                    exercisesCompleted: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    rank: 0,
                    badges: []
                }
            }, `${provider}-demo-token`);

            setOauthLoading(null);
            navigate('/dashboard');
        }, 1500);
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
                            Start your Python journey today
                        </h1>
                        <p className="branding-description">
                            Join thousands of learners mastering Python through interactive exercises and real-world projects.
                        </p>
                        <ul className="branding-features">
                            <li>
                                <Check size={18} />
                                50+ structured courses
                            </li>
                            <li>
                                <Check size={18} />
                                500+ hands-on exercises
                            </li>
                            <li>
                                <Check size={18} />
                                Real-time code execution
                            </li>
                            <li>
                                <Check size={18} />
                                Track your progress
                            </li>
                        </ul>
                    </div>
                    <div className="branding-pattern" />
                </div>

                {/* Right Panel - Form */}
                <div className="auth-form-container">
                    <div className="auth-form-content">
                        <h2 className="form-title">Create your free account</h2>
                        <p className="form-subtitle">
                            Already have an account?{' '}
                            <Link to="/login" className="form-link">Sign in</Link>
                        </p>

                        {/* OAuth Buttons */}
                        <div className="oauth-buttons">
                            <button
                                className={`oauth-btn google ${oauthLoading === 'google' ? 'loading' : ''}`}
                                onClick={() => handleOAuthSignup('google')}
                                disabled={oauthLoading !== null}
                            >
                                {oauthLoading === 'google' ? (
                                    <span className="spinner" />
                                ) : (
                                    <Chrome size={20} />
                                )}
                                Sign up with Google
                            </button>
                            <button
                                className={`oauth-btn github ${oauthLoading === 'github' ? 'loading' : ''}`}
                                onClick={() => handleOAuthSignup('github')}
                                disabled={oauthLoading !== null}
                            >
                                {oauthLoading === 'github' ? (
                                    <span className="spinner" />
                                ) : (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                )}
                                Sign up with GitHub
                            </button>
                        </div>

                        <div className="divider-text">
                            <span>or register with email</span>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label className="input-label" htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <User className="input-icon" size={18} />
                                    <input
                                        id="name"
                                        type="text"
                                        className="input"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Create a password"
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

                                {formData.password && (
                                    <div className="password-requirements">
                                        {passwordRequirements.map((req, index) => (
                                            <div
                                                key={index}
                                                className={`requirement ${req.met ? 'met' : ''}`}
                                            >
                                                <Check size={14} />
                                                {req.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox" required />
                                    <span>
                                        I agree to the{' '}
                                        <Link to="/terms" className="form-link">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="form-link">Privacy Policy</Link>
                                    </span>
                                </label>
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
                                        Create Account
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

export default RegisterPage;
