import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
    Zap
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import './ExercisePage.css';

// Mock exercise data
const mockExercise = {
    id: '1',
    courseId: '1',
    title: 'List Comprehensions',
    description: 'Learn to create lists using Python list comprehensions.',
    instructions: `# List Comprehensions

List comprehensions provide a concise way to create lists in Python.

## Basic Syntax
\`\`\`python
[expression for item in iterable]
\`\`\`

## Your Task
Create a list comprehension that:
1. Takes the numbers 1-10
2. Returns only the even numbers
3. Squares each even number

Expected output: \`[4, 16, 36, 64, 100]\`

## Hints
- Use \`range(1, 11)\` to get numbers 1-10
- Use \`x % 2 == 0\` to check if a number is even
- Use \`x ** 2\` to square a number`,
    difficulty: 'intermediate' as const,
    points: 25,
    starterCode: `# Create a list of squared even numbers from 1 to 10
# Your code here:

squared_evens = []

print(squared_evens)`,
    solution: `# Create a list of squared even numbers from 1 to 10
squared_evens = [x ** 2 for x in range(1, 11) if x % 2 == 0]

print(squared_evens)`,
    testCases: [
        { id: '1', input: '', expectedOutput: '[4, 16, 36, 64, 100]', description: 'Correct output', isHidden: false },
    ],
    hints: [
        'Use range(1, 11) to generate numbers 1 through 10',
        'Add a condition after the for clause to filter even numbers',
        'Apply the square operation in the expression part'
    ],
    tags: ['lists', 'comprehensions', 'basics'],
    order: 5,
    estimatedTime: '10 min',
    status: 'available' as const
};

const ExercisePage = () => {
    const { exerciseId } = useParams();
    const [code, setCode] = useState(mockExercise.starterCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
    const [showHints, setShowHints] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [pyodide, setPyodide] = useState<unknown>(null);

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
            document.head.removeChild(script);
        };
    }, []);

    const runCode = useCallback(async () => {
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
                const results = mockExercise.testCases.map(testCase => {
                    const passed = stdout.trim() === testCase.expectedOutput;
                    return {
                        passed,
                        message: passed ? '✓ ' + testCase.description : `✗ Expected: ${testCase.expectedOutput}, Got: ${stdout.trim()}`
                    };
                });

                setTestResults(results);

                if (results.every(r => r.passed)) {
                    setIsComplete(true);
                }
            } else {
                // Fallback: Simple evaluation for demo
                setOutput('⏳ Python environment loading... Running basic check.');

                // Basic check for demo
                if (code.includes('for x in range') && code.includes('if x % 2 == 0') && code.includes('x ** 2')) {
                    setOutput('[4, 16, 36, 64, 100]');
                    setTestResults([{ passed: true, message: '✓ Correct output' }]);
                    setIsComplete(true);
                } else {
                    setOutput('Check your code - make sure to use list comprehension with the correct logic.');
                    setTestResults([{ passed: false, message: '✗ Output does not match expected result' }]);
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setOutput(`Error: ${errorMessage}`);
            setTestResults([{ passed: false, message: `✗ Runtime error: ${errorMessage}` }]);
        } finally {
            setIsRunning(false);
        }
    }, [code, pyodide]);

    const resetCode = () => {
        setCode(mockExercise.starterCode);
        setOutput('');
        setTestResults([]);
        setIsComplete(false);
    };

    const toggleSolution = () => {
        setShowSolution(!showSolution);
        if (!showSolution) {
            setCode(mockExercise.solution);
        } else {
            setCode(mockExercise.starterCode);
        }
    };

    return (
        <div className="exercise-page">
            {/* Exercise Info Panel */}
            <aside className="exercise-info-panel">
                <div className="exercise-header">
                    <div className="exercise-breadcrumb">Python Basics / Lesson 5</div>
                    <h1 className="exercise-title">{mockExercise.title}</h1>
                    <div className="exercise-meta">
                        <span className="badge badge-warning">{mockExercise.difficulty}</span>
                        <span className="exercise-meta-item">
                            <Trophy size={14} />
                            {mockExercise.points} pts
                        </span>
                        <span className="exercise-meta-item">
                            <Clock size={14} />
                            {mockExercise.estimatedTime}
                        </span>
                    </div>
                </div>

                <div className="exercise-instructions">
                    <div className="instructions-content">
                        <pre>{mockExercise.instructions}</pre>
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
                                <strong>Hint {currentHint + 1}:</strong> {mockExercise.hints[currentHint]}
                            </p>
                            {currentHint < mockExercise.hints.length - 1 && (
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
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            fontFamily: 'JetBrains Mono, monospace',
                            minimap: { enabled: false },
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            wordWrap: 'on',
                            padding: { top: 16 },
                            automaticLayout: true,
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
                            <p>You've completed this exercise and earned {mockExercise.points} points!</p>
                            <div className="success-actions">
                                <button className="btn btn-primary">
                                    Next Exercise
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExercisePage;
