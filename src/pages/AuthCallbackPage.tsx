import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './AuthPages.css';

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuthStore();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');
        const errorParam = searchParams.get('error');

        if (errorParam) {
            setError('Authentication failed. Please try again.');
            setTimeout(() => navigate('/login'), 3000);
            return;
        }

        if (token) {
            // Store token and fetch user info
            handleAuthentication(token);
        } else {
            setError('No authentication token received.');
            setTimeout(() => navigate('/login'), 3000);
        }
    }, [searchParams]);

    const handleAuthentication = async (token: string) => {
        try {
            // Fetch user info with the token
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const userData = await response.json();

            // Login with the token and user data
            login({
                id: userData.id,
                email: userData.email,
                username: userData.username,
                displayName: userData.displayName,
                avatar: userData.avatar,
                role: userData.role || 'student',
                createdAt: userData.createdAt,
                stats: userData.stats || {
                    totalPoints: 0,
                    exercisesCompleted: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    rank: 0,
                    badges: []
                }
            }, token);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Auth callback error:', err);
            setError('Failed to complete authentication. Please try again.');
            setTimeout(() => navigate('/login'), 3000);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-callback-container">
                {error ? (
                    <div className="callback-error">
                        <p>{error}</p>
                        <p>Redirecting to login...</p>
                    </div>
                ) : (
                    <div className="callback-loading">
                        <Loader2 className="spinner-icon" size={48} />
                        <p>Completing authentication...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCallbackPage;
