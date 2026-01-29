import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Eye, Code2 } from 'lucide-react';
import './CodeVisualization.css';

interface CodeStep {
    lineNumber: number;
    code: string;
    explanation: string;
    variables?: { name: string; value: string; type: string }[];
    highlight?: 'execute' | 'define' | 'loop' | 'condition' | 'output';
}

interface CodeVisualizationProps {
    code: string;
    title: string;
}

// Parse code into steps with explanations
const parseCodeToSteps = (code: string): CodeStep[] => {
    const lines = code.split('\n').filter(line => line.trim() !== '');
    const steps: CodeStep[] = [];
    const variables: { name: string; value: string; type: string }[] = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Skip comments-only lines for execution but include for context
        if (trimmedLine.startsWith('#')) {
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `📝 Comment: ${trimmedLine.slice(1).trim()}`,
                variables: [...variables],
                highlight: 'define'
            });
            return;
        }

        // Parse variable assignments
        const assignMatch = trimmedLine.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
            const [, varName, varValue] = assignMatch;
            let type = 'unknown';
            let displayValue = varValue;

            if (varValue.startsWith('"') || varValue.startsWith("'")) {
                type = 'string';
                displayValue = varValue;
            } else if (varValue === 'True' || varValue === 'False') {
                type = 'boolean';
            } else if (varValue.includes('.')) {
                type = 'float';
            } else if (/^\d+$/.test(varValue)) {
                type = 'integer';
            } else if (varValue.startsWith('[')) {
                type = 'list';
            } else if (varValue.startsWith('{')) {
                type = 'dict';
            } else if (varValue.startsWith('f"') || varValue.startsWith("f'")) {
                type = 'f-string';
            }

            // Update or add variable
            const existingIdx = variables.findIndex(v => v.name === varName);
            if (existingIdx >= 0) {
                variables[existingIdx] = { name: varName, value: displayValue, type };
            } else {
                variables.push({ name: varName, value: displayValue, type });
            }

            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `📦 Create variable \`${varName}\` and assign ${type === 'string' ? 'text' : type} value: ${displayValue}`,
                variables: [...variables],
                highlight: 'execute'
            });
            return;
        }

        // Parse print statements
        if (trimmedLine.startsWith('print(')) {
            const printContent = trimmedLine.match(/print\((.+)\)$/)?.[1] || '';
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `🖨️ Output to console: ${printContent}`,
                variables: [...variables],
                highlight: 'output'
            });
            return;
        }

        // Parse function definitions
        if (trimmedLine.startsWith('def ')) {
            const funcMatch = trimmedLine.match(/def\s+(\w+)\s*\(([^)]*)\)/);
            if (funcMatch) {
                const [, funcName, params] = funcMatch;
                steps.push({
                    lineNumber: index + 1,
                    code: line,
                    explanation: `📋 Define function \`${funcName}\`${params ? ` with parameters: ${params}` : ''}`,
                    variables: [...variables],
                    highlight: 'define'
                });
                return;
            }
        }

        // Parse for loops
        if (trimmedLine.startsWith('for ')) {
            const forMatch = trimmedLine.match(/for\s+(\w+)\s+in\s+(.+):/);
            if (forMatch) {
                const [, loopVar, iterable] = forMatch;
                steps.push({
                    lineNumber: index + 1,
                    code: line,
                    explanation: `🔁 Loop: For each \`${loopVar}\` in ${iterable}`,
                    variables: [...variables],
                    highlight: 'loop'
                });
                return;
            }
        }

        // Parse if statements
        if (trimmedLine.startsWith('if ')) {
            const condition = trimmedLine.match(/if\s+(.+):/)?.[1] || '';
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `❓ Condition: If ${condition} is true, execute the next block`,
                variables: [...variables],
                highlight: 'condition'
            });
            return;
        }

        // Parse elif
        if (trimmedLine.startsWith('elif ')) {
            const condition = trimmedLine.match(/elif\s+(.+):/)?.[1] || '';
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `❓ Else if: If previous was false and ${condition} is true`,
                variables: [...variables],
                highlight: 'condition'
            });
            return;
        }

        // Parse else
        if (trimmedLine === 'else:') {
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `❓ Else: If all previous conditions were false`,
                variables: [...variables],
                highlight: 'condition'
            });
            return;
        }

        // Parse return statements
        if (trimmedLine.startsWith('return ')) {
            const returnValue = trimmedLine.slice(7);
            steps.push({
                lineNumber: index + 1,
                code: line,
                explanation: `↩️ Return value: ${returnValue}`,
                variables: [...variables],
                highlight: 'output'
            });
            return;
        }

        // Default: generic step
        steps.push({
            lineNumber: index + 1,
            code: line,
            explanation: `⚡ Execute: ${trimmedLine}`,
            variables: [...variables],
            highlight: 'execute'
        });
    });

    return steps;
};

const CodeVisualization = ({ code, title }: CodeVisualizationProps) => {
    const [steps] = useState(() => parseCodeToSteps(code));
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCode, setShowCode] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 2000);
            return () => clearTimeout(timer);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, steps.length]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (currentStep >= steps.length - 1) {
            setCurrentStep(0);
        }
        setIsPlaying(!isPlaying);
    };

    const currentStepData = steps[currentStep];

    return (
        <div className="code-visualization">
            <div className="viz-header">
                <div className="viz-title">
                    <Eye size={16} />
                    <span>Step-by-Step Visualization</span>
                </div>
                <button
                    className="viz-toggle-code"
                    onClick={() => setShowCode(!showCode)}
                >
                    <Code2 size={14} />
                    {showCode ? 'Hide Code' : 'Show Code'}
                </button>
            </div>

            <div className="viz-content">
                {/* Code Panel */}
                {showCode && (
                    <div className="viz-code-panel">
                        <div className="viz-code-header">
                            <span>{title}</span>
                        </div>
                        <div className="viz-code-lines">
                            {steps.map((step, index) => (
                                <div
                                    key={step.lineNumber}
                                    className={`viz-code-line ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'passed' : ''} ${step.highlight}`}
                                >
                                    <span className="line-number">{step.lineNumber}</span>
                                    <code>{step.code}</code>
                                    {index === currentStep && (
                                        <div className="execution-indicator">
                                            <span className="pulse-dot"></span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Explanation Panel */}
                <div className="viz-explanation-panel">
                    <div className="viz-step-info">
                        <span className="step-counter">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="viz-explanation">
                        <div className={`explanation-card ${currentStepData?.highlight}`}>
                            <p className="explanation-text">
                                {currentStepData?.explanation}
                            </p>
                        </div>
                    </div>

                    {/* Variables State */}
                    {currentStepData?.variables && currentStepData.variables.length > 0 && (
                        <div className="viz-variables">
                            <h4>📊 Current Variables</h4>
                            <div className="variables-grid">
                                {currentStepData.variables.map((variable, idx) => (
                                    <div
                                        key={variable.name}
                                        className="variable-box"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <span className="var-name">{variable.name}</span>
                                        <span className="var-value">{variable.value}</span>
                                        <span className="var-type">{variable.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="viz-controls">
                <button
                    className="viz-btn"
                    onClick={handleReset}
                    disabled={currentStep === 0 && !isPlaying}
                >
                    <RotateCcw size={16} />
                </button>
                <button
                    className="viz-btn"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    className="viz-btn play-btn"
                    onClick={togglePlay}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                    className="viz-btn"
                    onClick={handleNext}
                    disabled={currentStep >= steps.length - 1}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default CodeVisualization;
