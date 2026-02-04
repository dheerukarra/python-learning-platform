import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Badge } from '../types';
import { authApi } from '../services/api';

// Convert API stats to proper UserStats type
const convertStats = (stats: { totalPoints: number; exercisesCompleted: number; currentStreak: number; longestStreak: number; rank: number; badges: string[]; }) => ({
    totalPoints: stats.totalPoints,
    exercisesCompleted: stats.exercisesCompleted,
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
    rank: stats.rank,
    badges: [] as Badge[], // API returns string[], convert to empty Badge[] for now
});

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // API Actions
    loginWithCredentials: (email: string, password: string) => Promise<boolean>;
    registerWithCredentials: (email: string, username: string, password: string, displayName?: string) => Promise<boolean>;
    refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: (user, token) =>
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                }),

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            // Login with email/password via backend API
            loginWithCredentials: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                const result = await authApi.login({ email, password });

                if (result.error) {
                    set({ isLoading: false, error: result.error });
                    return false;
                }

                if (result.data) {
                    const { access_token, user } = result.data;
                    set({
                        user: {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            displayName: user.displayName,
                            avatar: user.avatar || undefined,
                            role: (user.role === 'admin' || user.role === 'instructor') ? user.role : 'student' as const,
                            createdAt: user.createdAt,
                            stats: convertStats(user.stats),
                        },
                        token: access_token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return true;
                }

                return false;
            },

            // Register with email/password via backend API
            registerWithCredentials: async (email: string, username: string, password: string, displayName?: string) => {
                set({ isLoading: true, error: null });

                const result = await authApi.register({
                    email,
                    username,
                    password,
                    display_name: displayName
                });

                if (result.error) {
                    set({ isLoading: false, error: result.error });
                    return false;
                }

                if (result.data) {
                    const { access_token, user } = result.data;
                    set({
                        user: {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            displayName: user.displayName,
                            avatar: user.avatar || undefined,
                            role: (user.role === 'admin' || user.role === 'instructor') ? user.role : 'student' as const,
                            createdAt: user.createdAt,
                            stats: convertStats(user.stats),
                        },
                        token: access_token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return true;
                }

                return false;
            },

            // Refresh user data from backend
            refreshUser: async () => {
                const token = get().token;
                if (!token) return;

                const result = await authApi.getMe();

                if (result.data) {
                    const userData = result.data;
                    set((state) => ({
                        user: state.user ? {
                            ...state.user,
                            displayName: userData.displayName,
                            avatar: userData.avatar || undefined,
                            // Keep existing stats since getMe response format may differ
                        } : null,
                    }));
                }
            },
        }),
        {
            name: 'pylearn-auth',
        }
    )
);
