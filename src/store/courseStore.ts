import { create } from 'zustand';
import type { Course, Exercise, LearningTrack, Difficulty } from '../types';

interface CourseState {
    courses: Course[];
    currentCourse: Course | null;
    exercises: Exercise[];
    currentExercise: Exercise | null;
    filters: {
        track: LearningTrack | 'all';
        difficulty: Difficulty | 'all';
        search: string;
    };
    setCourses: (courses: Course[]) => void;
    setCurrentCourse: (course: Course | null) => void;
    setExercises: (exercises: Exercise[]) => void;
    setCurrentExercise: (exercise: Exercise | null) => void;
    setFilters: (filters: Partial<CourseState['filters']>) => void;
    getFilteredCourses: () => Course[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    currentCourse: null,
    exercises: [],
    currentExercise: null,
    filters: {
        track: 'all',
        difficulty: 'all',
        search: '',
    },
    setCourses: (courses) => set({ courses }),
    setCurrentCourse: (currentCourse) => set({ currentCourse }),
    setExercises: (exercises) => set({ exercises }),
    setCurrentExercise: (currentExercise) => set({ currentExercise }),
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),
    getFilteredCourses: () => {
        const { courses, filters } = get();
        return courses.filter((course) => {
            const matchesTrack = filters.track === 'all' || course.track === filters.track;
            const matchesDifficulty = filters.difficulty === 'all' || course.difficulty === filters.difficulty;
            const matchesSearch = !filters.search ||
                course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                course.description.toLowerCase().includes(filters.search.toLowerCase());
            return matchesTrack && matchesDifficulty && matchesSearch;
        });
    },
}));
