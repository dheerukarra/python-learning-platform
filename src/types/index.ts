// User Types
export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
    createdAt: string;
    stats: UserStats;
}

export interface UserStats {
    totalPoints: number;
    exercisesCompleted: number;
    currentStreak: number;
    longestStreak: number;
    rank: number;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Course Types
export interface Course {
    id: string;
    title: string;
    description: string;
    track: LearningTrack;
    difficulty: Difficulty;
    thumbnail: string;
    duration: string;
    exerciseCount: number;
    completedCount: number;
    progress: number;
    isLocked: boolean;
}

export interface Exercise {
    id: string;
    courseId: string;
    title: string;
    description: string;
    instructions: string;
    difficulty: Difficulty;
    points: number;
    starterCode: string;
    solution: string;
    testCases: TestCase[];
    hints: string[];
    tags: string[];
    order: number;
    estimatedTime: string;
    status: ExerciseStatus;
}

export interface TestCase {
    id: string;
    input: string;
    expectedOutput: string;
    description: string;
    isHidden: boolean;
}

export interface ExerciseSubmission {
    id: string;
    exerciseId: string;
    userId: string;
    code: string;
    status: SubmissionStatus;
    score: number;
    testResults: TestResult[];
    submittedAt: string;
    executionTime: number;
}

export interface TestResult {
    testCaseId: string;
    passed: boolean;
    actualOutput: string;
    expectedOutput: string;
    error?: string;
}

// Enums
export type LearningTrack =
    | 'development'
    | 'datascience'
    | 'devops';

export type Difficulty =
    | 'beginner'
    | 'intermediate'
    | 'advanced';

export type ExerciseStatus =
    | 'locked'
    | 'available'
    | 'in_progress'
    | 'completed';

export type SubmissionStatus =
    | 'pending'
    | 'running'
    | 'passed'
    | 'failed'
    | 'error';

// Code Execution Types
export interface ExecutionResult {
    success: boolean;
    output: string;
    error?: string;
    executionTime: number;
    memoryUsage?: number;
}

export interface VisualizationStep {
    lineNumber: number;
    variables: Record<string, unknown>;
    callStack: string[];
    output: string;
    explanation?: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
    rank: number;
    user: Pick<User, 'id' | 'username' | 'displayName' | 'avatar'>;
    points: number;
    exercisesCompleted: number;
    streak: number;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
