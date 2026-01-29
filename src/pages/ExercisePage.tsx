import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Play,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Lightbulb,
    ChevronRight,
    Clock,
    Trophy,
    Eye,
    EyeOff,
    Terminal,
    BookOpen,
    Zap,
    ArrowLeft,
    LogIn
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { getExerciseById, exercises as allExercises, getCourseById } from '../data/exercises';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import CodeVisualization from '../components/CodeVisualization/CodeVisualization';
import { handleEditorWillMount } from '../utils/pythonCompletions';
import type { TestCase } from '../types';
import './ExercisePage.css';

const difficultyColors: Record<string, string> = {
    beginner: 'badge-success',
    intermediate: 'badge-warning',
    advanced: 'badge-error'
};

// Format instructions to bold important keywords
const formatInstructions = (text: string): React.ReactNode => {
    // Split by code blocks first
    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
            // It's a code block
            return <code key={index}>{part.slice(1, -1)}</code>;
        }

        // Bold important keywords
        const boldPattern = /(Task:|Goal:|Objective:|Expected Output:|Output:|Input:|Example:|Note:|Tip:|Important:|Warning:|Remember:)/gi;
        const segments = part.split(boldPattern);

        return segments.map((segment, segIndex) => {
            if (boldPattern.test(segment)) {
                return <strong key={`${index}-${segIndex}`}>{segment}</strong>;
            }
            return segment;
        });
    });
};

const ExercisePage = () => {
    const { exerciseId } = useParams();
    const { isAuthenticated } = useAuthStore();

    // Get exercise data
    const exercise = useMemo(() => {
        if (!exerciseId) return null;
        return getExerciseById(exerciseId);
    }, [exerciseId]);

    // Get next exercise for navigation
    const nextExercise = useMemo(() => {
        if (!exercise) return null;
        const courseExercises = allExercises.filter(e => e.courseId === exercise.courseId);
        const currentIndex = courseExercises.findIndex(e => e.id === exercise.id);
        return courseExercises[currentIndex + 1] || null;
    }, [exercise]);

    const course = exercise ? getCourseById(exercise.courseId) : null;

    // Progress tracking
    const { completeExercise } = useProgressStore();

    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
    const [showHints, setShowHints] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [showVisualization, setShowVisualization] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [pyodide, setPyodide] = useState<unknown>(null);

    // Reset state when exercise changes
    useEffect(() => {
        if (exercise) {
            setCode(exercise.starterCode);
            setOutput('');
            setTestResults([]);
            setShowHints(false);
            setCurrentHint(0);
            setShowSolution(false);
            setIsComplete(false);
        }
    }, [exercise]);

    // Load Pyodide
    useEffect(() => {
        const loadPyodide = async () => {
            try {
                // @ts-expect-error - Pyodide is loaded from CDN
                const pyodideInstance = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
                });
                setPyodide(pyodideInstance);
                setPyodideReady(true);
            } catch (error) {
                console.error('Failed to load Pyodide:', error);
                setOutput('⚠️ Python environment loading... Please wait.');
            }
        };

        // Add Pyodide script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        script.onload = loadPyodide;
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const runCode = useCallback(async () => {
        if (!exercise) return;

        setIsRunning(true);
        setOutput('');
        setTestResults([]);

        try {
            if (pyodide) {
                // Capture stdout
                // @ts-expect-error - Pyodide API
                pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

                // Run user code
                // @ts-expect-error - Pyodide API
                await pyodide.runPythonAsync(code);

                // Get stdout
                // @ts-expect-error - Pyodide API
                const stdout = pyodide.runPython('sys.stdout.getvalue()');
                setOutput(stdout || '(No output)');

                // Check test cases
                const results = exercise.testCases.map((testCase: TestCase) => {
                    const passed = stdout.trim() === testCase.expectedOutput;
                    return {
                        passed,
                        message: passed ? '✓ ' + testCase.description : `✗ Expected: ${testCase.expectedOutput}, Got: ${stdout.trim()}`
                    };
                });

                setTestResults(results);

                if (results.every((r: { passed: boolean }) => r.passed)) {
                    setIsComplete(true);
                    // Record completion in progress store
                    if (exercise) {
                        completeExercise(exercise.id, exercise.courseId, exercise.points, code);
                    }
                }
            } else {
                // Fallback: Basic check when Pyodide isn't loaded
                setOutput('⏳ Python environment loading... Running basic check.');

                // Compare against expected output pattern
                if (exercise.testCases.length > 0) {
                    const expected = exercise.testCases[0].expectedOutput;
                    // Simple pattern check - in production this would be more sophisticated
                    if (code.includes('print') && code.length > exercise.starterCode.length) {
                        setOutput(`Running code check...\nExpected: ${expected}`);
                        setTestResults([{ passed: false, message: '⏳ Waiting for Python environment to verify' }]);
                    } else {
                        setOutput('Add your code and try again.');
                        setTestResults([{ passed: false, message: '✗ Code appears incomplete' }]);
                    }
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setOutput(`Error: ${errorMessage}`);
            setTestResults([{ passed: false, message: `✗ Runtime error: ${errorMessage}` }]);
        } finally {
            setIsRunning(false);
        }
    }, [code, pyodide, exercise]);

    const resetCode = () => {
        if (!exercise) return;
        setCode(exercise.starterCode);
        setOutput('');
        setTestResults([]);
        setIsComplete(false);
    };

    const toggleSolution = () => {
        if (!exercise) return;
        setShowSolution(!showSolution);
        if (!showSolution) {
            setCode(exercise.solution);
        } else {
            setCode(exercise.starterCode);
        }
    };

    // Auth check - require login to solve exercises
    if (!isAuthenticated) {
        return (
            <div className="exercise-page">
                <div className="auth-required-container">
                    <div className="auth-required-card">
                        <div className="auth-required-icon">
                            <div className="icon-ring"></div>
                            <div className="icon-ring delay-1"></div>
                            <div className="icon-ring delay-2"></div>
                            <span className="lock-emoji">🔐</span>
                        </div>
                        <h2 className="auth-required-title">Sign In Required</h2>
                        <p className="auth-required-text">
                            Please sign in to start solving exercises and track your progress.
                        </p>
                        <div className="auth-required-features">
                            <div className="feature-item">
                                <span className="feature-icon">📊</span>
                                <span>Track your progress</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🏆</span>
                                <span>Earn achievements</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔥</span>
                                <span>Build streaks</span>
                            </div>
                        </div>
                        <Link to="/login" className="btn btn-primary auth-required-btn">
                            <LogIn size={18} />
                            Sign In to Continue
                        </Link>
                        <p className="auth-required-signup">
                            Don't have an account? <Link to="/register">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Loading or not found state
    if (!exercise) {
        return (
            <div className="exercise-page">
                <div className="exercise-not-found">
                    <h2>Exercise Not Found</h2>
                    <p>The exercise you're looking for doesn't exist.</p>
                    <Link to="/courses" className="btn btn-primary">
                        <ArrowLeft size={18} />
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="exercise-page">
            {/* Exercise Info Panel */}
            <aside className="exercise-info-panel">
                <div className="exercise-header">
                    <Link to={`/courses/${exercise.courseId}`} className="exercise-breadcrumb">
                        <ArrowLeft size={14} />
                        {course?.title || 'Back to Course'}
                    </Link>
                    <h1 className="exercise-title">{exercise.title}</h1>
                    <div className="exercise-meta">
                        <span className={`badge ${difficultyColors[exercise.difficulty]}`}>
                            {exercise.difficulty}
                        </span>
                        <span className="exercise-meta-item">
                            <Trophy size={14} />
                            {exercise.points} pts
                        </span>
                        <span className="exercise-meta-item">
                            <Clock size={14} />
                            {exercise.estimatedTime}
                        </span>
                    </div>
                </div>

                <div className="exercise-instructions">
                    <div className="instructions-content">
                        <pre>{formatInstructions(exercise.instructions)}</pre>
                    </div>
                </div>

                {/* Hints Section */}
                <div className="exercise-hints">
                    <button
                        className="hints-toggle"
                        onClick={() => setShowHints(!showHints)}
                    >
                        <Lightbulb size={18} />
                        <span>Need a hint?</span>
                        <ChevronRight
                            size={16}
                            className={`hints-arrow ${showHints ? 'open' : ''}`}
                        />
                    </button>

                    {showHints && (
                        <div className="hints-content">
                            <p className="hint-text">
                                <strong>Hint {currentHint + 1}:</strong> {exercise.hints[currentHint]}
                            </p>
                            {currentHint < exercise.hints.length - 1 && (
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setCurrentHint(currentHint + 1)}
                                >
                                    Next Hint
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Solution Toggle */}
                <button
                    className="solution-toggle"
                    onClick={toggleSolution}
                >
                    {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
                </button>

                {/* Visualization Toggle */}
                <button
                    className="solution-toggle viz-toggle"
                    onClick={() => setShowVisualization(!showVisualization)}
                >
                    <Zap size={16} />
                    <span>{showVisualization ? 'Hide Visualization' : '✨ Step-by-Step Guide'}</span>
                </button>

                {/* Code Visualization */}
                {showVisualization && (
                    <div className="exercise-visualization">
                        <CodeVisualization
                            code={exercise.solution}
                            title={exercise.title}
                        />
                    </div>
                )}
            </aside>

            {/* Code Editor Panel */}
            <main className="exercise-editor-panel">
                <div className="editor-toolbar">
                    <div className="editor-tabs">
                        <button className="editor-tab active">
                            <BookOpen size={14} />
                            main.py
                        </button>
                    </div>
                    <div className="editor-actions">
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={resetCode}
                            title="Reset Code"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>
                        <button
                            className={`btn btn-success btn-sm ${isRunning ? 'loading' : ''}`}
                            onClick={runCode}
                            disabled={isRunning}
                        >
                            {isRunning ? (
                                <span className="spinner" />
                            ) : (
                                <Play size={16} />
                            )}
                            Run Code
                        </button>
                    </div>
                </div>

                <div className="editor-container">
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme="python-dark-blue"
                        beforeMount={handleEditorWillMount}
                        options={{
                            fontSize: 14,
                            fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                            fontLigatures: false,
                            minimap: { enabled: false },
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            wordWrap: 'on',
                            padding: { top: 16 },
                            automaticLayout: true,
                            cursorStyle: 'line',
                            cursorWidth: 2,
                            renderWhitespace: 'none',
                            // IntelliSense settings
                            quickSuggestions: {
                                other: true,
                                comments: false,
                                strings: true,
                            },
                            suggestOnTriggerCharacters: true,
                            acceptSuggestionOnEnter: 'on',
                            tabCompletion: 'on',
                            wordBasedSuggestions: 'currentDocument',
                            suggest: {
                                insertMode: 'replace',
                                showKeywords: true,
                                showSnippets: true,
                                showFunctions: true,
                                showVariables: true,
                                showClasses: true,
                                showMethods: true,
                            },
                            // Prevent auto-capitalization issues
                            autoClosingBrackets: 'always',
                            autoClosingQuotes: 'always',
                            formatOnPaste: false,
                            formatOnType: false,
                        }}
                    />
                </div>

                {/* Output Panel */}
                <div className="output-panel">
                    <div className="output-header">
                        <Terminal size={16} />
                        <span>Output</span>
                        {!pyodideReady && (
                            <span className="pyodide-status">
                                <Zap size={14} />
                                Loading Python...
                            </span>
                        )}
                    </div>
                    <div className="output-content">
                        {output ? (
                            <pre>{output}</pre>
                        ) : (
                            <span className="output-placeholder">
                                Click "Run Code" to see the output
                            </span>
                        )}
                    </div>

                    {testResults.length > 0 && (
                        <div className="test-results">
                            <div className="test-results-header">
                                <span>Test Results</span>
                                {testResults.every(r => r.passed) ? (
                                    <span className="test-status passed">
                                        <CheckCircle2 size={16} />
                                        All tests passed!
                                    </span>
                                ) : (
                                    <span className="test-status failed">
                                        <XCircle size={16} />
                                        Some tests failed
                                    </span>
                                )}
                            </div>
                            <div className="test-results-list">
                                {testResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                                    >
                                        {result.passed ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            <XCircle size={14} />
                                        )}
                                        <span>{result.message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Success Modal */}
                {isComplete && (
                    <div className="success-overlay">
                        <div className="success-modal">
                            <div className="success-icon">🎉</div>
                            <h2>Congratulations!</h2>
                            <p>You've completed this exercise and earned {exercise.points} points!</p>
                            <div className="success-actions">
                                {nextExercise ? (
                                    <Link to={`/exercise/${nextExercise.id}`} className="btn btn-primary">
                                        Next Exercise
                                        <ChevronRight size={18} />
                                    </Link>
                                ) : (
                                    <Link to={`/courses/${exercise.courseId}`} className="btn btn-primary">
                                        Back to Course
                                        <ChevronRight size={18} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExercisePage;
