import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExerciseProgress {
    exerciseId: string;
    courseId: string;
    completed: boolean;
    completedAt?: string;
    pointsEarned: number;
    bestCode?: string;
}

interface AchievementProgress {
    achievementId: string;
    unlocked: boolean;
    unlockedAt?: string;
    progress: number; // 0-100
}

interface DailyProgress {
    date: string;
    challengeCompleted: boolean;
    exercisesCompleted: number;
}

interface ProgressState {
    // Core stats
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;

    // Exercise progress
    completedExercises: ExerciseProgress[];

    // Achievement progress
    achievements: AchievementProgress[];

    // Daily activity
    dailyProgress: DailyProgress[];

    // Actions
    completeExercise: (exerciseId: string, courseId: string, points: number, code?: string) => void;
    updateStreak: () => void;
    unlockAchievement: (achievementId: string) => void;
    updateAchievementProgress: (achievementId: string, progress: number) => void;
    completeDailyChallenge: () => void;

    // Getters
    getExerciseProgress: (exerciseId: string) => ExerciseProgress | undefined;
    getCourseProgress: (courseId: string) => { completed: number; total: number; percentage: number };
    getTotalExercisesCompleted: () => number;
    isExerciseCompleted: (exerciseId: string) => boolean;
    getUnlockedAchievements: () => AchievementProgress[];
}

const getTodayDate = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressState>()(
    persist(
        (set, get) => ({
            // Initial state
            totalXP: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: null,
            completedExercises: [],
            achievements: [],
            dailyProgress: [],

            // Complete an exercise
            completeExercise: (exerciseId, courseId, points, code) => {
                const state = get();
                const existingProgress = state.completedExercises.find(
                    (e) => e.exerciseId === exerciseId
                );

                if (existingProgress?.completed) {
                    // Already completed, just update best code if provided
                    if (code) {
                        set({
                            completedExercises: state.completedExercises.map((e) =>
                                e.exerciseId === exerciseId ? { ...e, bestCode: code } : e
                            ),
                        });
                    }
                    return;
                }

                const newProgress: ExerciseProgress = {
                    exerciseId,
                    courseId,
                    completed: true,
                    completedAt: new Date().toISOString(),
                    pointsEarned: points,
                    bestCode: code,
                };

                // Update daily progress
                const today = getTodayDate();
                const todayProgress = state.dailyProgress.find((d) => d.date === today);
                const updatedDailyProgress = todayProgress
                    ? state.dailyProgress.map((d) =>
                        d.date === today
                            ? { ...d, exercisesCompleted: d.exercisesCompleted + 1 }
                            : d
                    )
                    : [
                        ...state.dailyProgress,
                        { date: today, challengeCompleted: false, exercisesCompleted: 1 },
                    ];

                set({
                    completedExercises: [...state.completedExercises.filter(
                        (e) => e.exerciseId !== exerciseId
                    ), newProgress],
                    totalXP: state.totalXP + points,
                    dailyProgress: updatedDailyProgress,
                    lastActiveDate: today,
                });

                // Update streak
                get().updateStreak();

                // Check for achievements
                const totalCompleted = get().getTotalExercisesCompleted();
                if (totalCompleted === 1) {
                    get().unlockAchievement('first-steps');
                }
                if (totalCompleted >= 10) {
                    get().unlockAchievement('quick-learner');
                }
                if (totalCompleted >= 50) {
                    get().unlockAchievement('code-warrior');
                }
            },

            // Update streak based on consecutive days
            updateStreak: () => {
                const state = get();
                const today = getTodayDate();
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

                if (state.lastActiveDate === today) {
                    // Already active today, no change
                    return;
                }

                if (state.lastActiveDate === yesterday) {
                    // Continuing streak
                    const newStreak = state.currentStreak + 1;
                    set({
                        currentStreak: newStreak,
                        longestStreak: Math.max(state.longestStreak, newStreak),
                        lastActiveDate: today,
                    });

                    // Check streak achievements
                    if (newStreak >= 3) get().unlockAchievement('on-fire');
                    if (newStreak >= 7) get().unlockAchievement('week-warrior');
                    if (newStreak >= 30) get().unlockAchievement('unstoppable');
                    if (newStreak >= 100) get().unlockAchievement('legendary-dedication');
                } else {
                    // Streak broken or first day
                    set({
                        currentStreak: 1,
                        lastActiveDate: today,
                    });
                }
            },

            // Unlock an achievement
            unlockAchievement: (achievementId) => {
                const state = get();
                const existing = state.achievements.find((a) => a.achievementId === achievementId);

                if (existing?.unlocked) return;

                const updatedAchievements = existing
                    ? state.achievements.map((a) =>
                        a.achievementId === achievementId
                            ? { ...a, unlocked: true, unlockedAt: new Date().toISOString(), progress: 100 }
                            : a
                    )
                    : [
                        ...state.achievements,
                        {
                            achievementId,
                            unlocked: true,
                            unlockedAt: new Date().toISOString(),
                            progress: 100,
                        },
                    ];

                set({ achievements: updatedAchievements });
            },

            // Update achievement progress
            updateAchievementProgress: (achievementId, progress) => {
                const state = get();
                const existing = state.achievements.find((a) => a.achievementId === achievementId);

                if (existing) {
                    set({
                        achievements: state.achievements.map((a) =>
                            a.achievementId === achievementId
                                ? { ...a, progress: Math.min(100, progress) }
                                : a
                        ),
                    });
                } else {
                    set({
                        achievements: [
                            ...state.achievements,
                            { achievementId, unlocked: false, progress: Math.min(100, progress) },
                        ],
                    });
                }

                // Auto-unlock at 100%
                if (progress >= 100) {
                    get().unlockAchievement(achievementId);
                }
            },

            // Complete daily challenge
            completeDailyChallenge: () => {
                const state = get();
                const today = getTodayDate();
                const todayProgress = state.dailyProgress.find((d) => d.date === today);

                if (todayProgress?.challengeCompleted) return;

                const updatedDailyProgress = todayProgress
                    ? state.dailyProgress.map((d) =>
                        d.date === today ? { ...d, challengeCompleted: true } : d
                    )
                    : [
                        ...state.dailyProgress,
                        { date: today, challengeCompleted: true, exercisesCompleted: 0 },
                    ];

                set({
                    dailyProgress: updatedDailyProgress,
                    totalXP: state.totalXP + 50, // Bonus XP for daily challenge
                });

                get().updateStreak();
            },

            // Getters
            getExerciseProgress: (exerciseId) => {
                return get().completedExercises.find((e) => e.exerciseId === exerciseId);
            },

            getCourseProgress: (courseId) => {
                const exercises = get().completedExercises.filter((e) => e.courseId === courseId);
                const completed = exercises.filter((e) => e.completed).length;
                // This would need the total count from course data
                return { completed, total: 0, percentage: 0 };
            },

            getTotalExercisesCompleted: () => {
                return get().completedExercises.filter((e) => e.completed).length;
            },

            isExerciseCompleted: (exerciseId) => {
                const progress = get().completedExercises.find((e) => e.exerciseId === exerciseId);
                return progress?.completed ?? false;
            },

            getUnlockedAchievements: () => {
                return get().achievements.filter((a) => a.unlocked);
            },
        }),
        {
            name: 'pylearn-progress',
        }
    )
);
