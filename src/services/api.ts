// API Service for backend communication

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

// Helper to get stored token
const getToken = (): string | null => {
    try {
        const stored = localStorage.getItem('pylearn-auth');
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.state?.token || null;
        }
    } catch {
        return null;
    }
    return null;
};

// Helper for authenticated requests
const authFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });
};

// ==================== AUTH API ====================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    display_name?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string;
        email: string;
        username: string;
        displayName: string;
        avatar: string | null;
        role: string;
        createdAt: string;
        stats: {
            totalPoints: number;
            exercisesCompleted: number;
            currentStreak: number;
            longestStreak: number;
            rank: number;
            badges: string[];
        };
    };
}

export const authApi = {
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                return { error: error.detail || 'Login failed' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error. Please check your connection.' };
        }
    },

    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                return { error: error.detail || 'Registration failed' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error. Please check your connection.' };
        }
    },

    async getMe(): Promise<ApiResponse<AuthResponse['user']>> {
        try {
            const response = await authFetch('/auth/me');

            if (!response.ok) {
                return { error: 'Failed to get user info' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error' };
        }
    },

    async getOAuthUrl(provider: 'google' | 'github'): Promise<ApiResponse<{ url: string }>> {
        try {
            const response = await fetch(`${API_URL}/auth/${provider}/url`);

            if (!response.ok) {
                const error = await response.json();
                return { error: error.detail || `${provider} OAuth not configured` };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Backend not available' };
        }
    },
};

// ==================== PROGRESS API ====================

export interface ProgressEntry {
    id: string;
    exerciseId: string;
    courseId: string;
    code: string | null;
    pointsEarned: number;
    attempts: number;
    completedAt: string;
}

export interface SaveProgressRequest {
    exerciseId: string;
    courseId: string;
    code: string;
    pointsEarned: number;
}

export const progressApi = {
    async getAll(): Promise<ApiResponse<ProgressEntry[]>> {
        try {
            const response = await authFetch('/progress');

            if (!response.ok) {
                return { error: 'Failed to get progress' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error' };
        }
    },

    async save(data: SaveProgressRequest): Promise<ApiResponse<ProgressEntry>> {
        try {
            const response = await authFetch('/progress', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return { error: 'Failed to save progress' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error' };
        }
    },

    async getForExercise(exerciseId: string): Promise<ApiResponse<ProgressEntry | null>> {
        try {
            const response = await authFetch(`/progress/exercise/${exerciseId}`);

            if (!response.ok) {
                return { data: null };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error' };
        }
    },
};

// ==================== LEADERBOARD API ====================

export interface LeaderboardEntry {
    rank: number;
    id: string;
    username: string;
    displayName: string;
    avatar: string | null;
    totalPoints: number;
    exercisesCompleted: number;
    currentStreak: number;
}

export const leaderboardApi = {
    async getTop(limit = 50): Promise<ApiResponse<LeaderboardEntry[]>> {
        try {
            const response = await fetch(`${API_URL}/leaderboard?limit=${limit}`);

            if (!response.ok) {
                return { error: 'Failed to get leaderboard' };
            }

            return { data: await response.json() };
        } catch (error) {
            return { error: 'Network error' };
        }
    },
};

// ==================== HEALTH CHECK ====================

export const healthApi = {
    async check(): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/health`);
            return response.ok;
        } catch {
            return false;
        }
    },
};

export default {
    auth: authApi,
    progress: progressApi,
    leaderboard: leaderboardApi,
    health: healthApi,
};
