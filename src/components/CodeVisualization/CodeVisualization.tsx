import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import './CodeVisualization.css';

interface VisualStep {
    id: number;
    title: string;
    description: string;
    visualType: 'variable' | 'print' | 'function' | 'loop' | 'condition' | 'list' | 'concept';
    animation: 'fadeIn' | 'slideIn' | 'bounce' | 'pulse' | 'flow';
    elements: VisualElement[];
}

interface VisualElement {
    type: 'box' | 'arrow' | 'terminal' | 'loop-visual' | 'condition-visual' | 'function-visual' | 'list-visual';
    label?: string;
    value?: string;
    from?: string;
    to?: string;
    color?: string;
}

interface CodeVisualizationProps {
    code: string;
    title: string;
}

// Parse code into visual learning steps
const parseCodeToVisuals = (code: string): VisualStep[] => {
    const lines = code.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));
    const steps: VisualStep[] = [];
    const variables: Map<string, string> = new Map();
    let stepId = 0;

    lines.forEach((line) => {
        const trimmed = line.trim();

        // Variable assignment
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
            const [, varName, varValue] = assignMatch;
            variables.set(varName, varValue);

            // Check for specific types
            if (varValue.startsWith('[')) {
                steps.push({
                    id: stepId++,
                    title: '📦 Creating a List',
                    description: `A list called "${varName}" is created to store multiple items together!`,
                    visualType: 'list',
                    animation: 'slideIn',
                    elements: [
                        { type: 'list-visual', label: varName, value: varValue, color: '#9b59b6' }
                    ]
                });
            } else if (varValue.startsWith('{')) {
                steps.push({
                    id: stepId++,
                    title: '🗂️ Creating a Dictionary',
                    description: `A dictionary "${varName}" stores key-value pairs - like a real dictionary!`,
                    visualType: 'variable',
                    animation: 'slideIn',
                    elements: [
                        { type: 'box', label: varName, value: 'Dict {...}', color: '#e67e22' }
                    ]
                });
            } else if (varValue.startsWith('f"') || varValue.startsWith("f'")) {
                steps.push({
                    id: stepId++,
                    title: '✨ F-String Magic',
                    description: `An f-string combines text with variable values. The {name} gets replaced with actual data!`,
                    visualType: 'variable',
                    animation: 'pulse',
                    elements: [
                        { type: 'box', label: varName, value: varValue, color: '#1abc9c' }
                    ]
                });
            } else {
                steps.push({
                    id: stepId++,
                    title: '📦 Storing Data',
                    description: `Create a variable called "${varName}" and store the value ${varValue} in it.`,
                    visualType: 'variable',
                    animation: 'bounce',
                    elements: [
                        { type: 'box', label: varName, value: varValue, color: '#3498db' }
                    ]
                });
            }
            return;
        }

        // Print statement
        if (trimmed.startsWith('print(')) {
            const content = trimmed.match(/print\((.+)\)$/)?.[1] || '';
            steps.push({
                id: stepId++,
                title: '🖨️ Displaying Output',
                description: `Python sends "${content}" to the screen so you can see the result!`,
                visualType: 'print',
                animation: 'flow',
                elements: [
                    { type: 'arrow', from: 'Code', to: 'Screen' },
                    { type: 'terminal', value: content }
                ]
            });
            return;
        }

        // Function definition
        if (trimmed.startsWith('def ')) {
            const funcMatch = trimmed.match(/def\s+(\w+)\s*\(([^)]*)\)/);
            if (funcMatch) {
                const [, funcName, params] = funcMatch;
                steps.push({
                    id: stepId++,
                    title: '🔧 Building a Function',
                    description: `A function is like a recipe! "${funcName}" can be called anytime. ${params ? `It takes: ${params}` : ''}`,
                    visualType: 'function',
                    animation: 'slideIn',
                    elements: [
                        { type: 'function-visual', label: funcName, value: params || 'no params', color: '#9b59b6' }
                    ]
                });
            }
            return;
        }

        // For loop
        if (trimmed.startsWith('for ')) {
            const forMatch = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
            if (forMatch) {
                const [, loopVar, iterable] = forMatch;
                steps.push({
                    id: stepId++,
                    title: '🔄 Loop Time!',
                    description: `The loop repeats for each item in ${iterable}. Each time, "${loopVar}" becomes the next value!`,
                    visualType: 'loop',
                    animation: 'pulse',
                    elements: [
                        { type: 'loop-visual', label: loopVar, value: iterable, color: '#e74c3c' }
                    ]
                });
            }
            return;
        }

        // If statement
        if (trimmed.startsWith('if ')) {
            const condition = trimmed.match(/if\s+(.+):/)?.[1] || '';
            steps.push({
                id: stepId++,
                title: '❓ Making a Decision',
                description: `Python checks: Is "${condition}" true? If yes, run the next block of code!`,
                visualType: 'condition',
                animation: 'fadeIn',
                elements: [
                    { type: 'condition-visual', label: 'IF', value: condition, color: '#f1c40f' }
                ]
            });
            return;
        }

        // Return statement
        if (trimmed.startsWith('return ')) {
            const returnValue = trimmed.slice(7);
            steps.push({
                id: stepId++,
                title: '↩️ Sending Back a Result',
                description: `The function finishes and sends back: ${returnValue}`,
                visualType: 'concept',
                animation: 'flow',
                elements: [
                    { type: 'arrow', from: 'Function', to: 'Caller' },
                    { type: 'box', label: 'Result', value: returnValue, color: '#2ecc71' }
                ]
            });
            return;
        }
    });

    // Add intro step
    if (steps.length > 0) {
        steps.unshift({
            id: -1,
            title: '🎯 Let\'s Learn This Code!',
            description: 'Watch the animation to understand how each part works. Click play or use the arrows!',
            visualType: 'concept',
            animation: 'fadeIn',
            elements: []
        });
    }

    return steps;
};

const CodeVisualization = ({ code, title: _title }: CodeVisualizationProps) => {
    const [steps] = useState(() => parseCodeToVisuals(code));
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 3000);
            return () => clearTimeout(timer);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, steps.length]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (currentStep >= steps.length - 1) setCurrentStep(0);
        setIsPlaying(!isPlaying);
    };

    const step = steps[currentStep];

    if (steps.length === 0) {
        return (
            <div className="code-viz-v2">
                <div className="viz-empty">No visualization available for this code.</div>
            </div>
        );
    }

    return (
        <div className="code-viz-v2">
            {/* Visual Canvas */}
            <div className="viz-canvas">
                <div className="viz-title-bar">
                    <span className="viz-badge">✨ Visual Learning</span>
                    <span className="viz-step-counter">{currentStep + 1} / {steps.length}</span>
                </div>

                <div className={`viz-stage ${step.animation}`}>
                    {/* Main Title */}
                    <h3 className="viz-step-title">{step.title}</h3>

                    {/* Visual Elements */}
                    <div className="viz-elements">
                        {step.elements.map((element, idx) => (
                            <div key={idx} className={`viz-element viz-${element.type}`} style={{ animationDelay: `${idx * 0.2}s` }}>
                                {element.type === 'box' && (
                                    <div className="memory-box" style={{ borderColor: element.color }}>
                                        <div className="memory-label" style={{ backgroundColor: element.color }}>
                                            {element.label}
                                        </div>
                                        <div className="memory-value">{element.value}</div>
                                    </div>
                                )}

                                {element.type === 'terminal' && (
                                    <div className="terminal-output">
                                        <div className="terminal-header">
                                            <span className="terminal-dot red"></span>
                                            <span className="terminal-dot yellow"></span>
                                            <span className="terminal-dot green"></span>
                                            <span className="terminal-title">Output</span>
                                        </div>
                                        <div className="terminal-body">
                                            <span className="terminal-prompt">&gt;&gt;&gt;</span>
                                            <span className="terminal-text">{element.value}</span>
                                        </div>
                                    </div>
                                )}

                                {element.type === 'arrow' && (
                                    <div className="flow-arrow">
                                        <span className="arrow-from">{element.from}</span>
                                        <div className="arrow-line">
                                            <div className="arrow-dot"></div>
                                            <div className="arrow-dot"></div>
                                            <div className="arrow-dot"></div>
                                            <div className="arrow-head">→</div>
                                        </div>
                                        <span className="arrow-to">{element.to}</span>
                                    </div>
                                )}

                                {element.type === 'loop-visual' && (
                                    <div className="loop-container">
                                        <div className="loop-circle">
                                            <div className="loop-arrow-circle"></div>
                                            <span className="loop-icon">🔄</span>
                                        </div>
                                        <div className="loop-info">
                                            <span className="loop-var">{element.label}</span>
                                            <span className="loop-in">iterates through</span>
                                            <span className="loop-source">{element.value}</span>
                                        </div>
                                    </div>
                                )}

                                {element.type === 'condition-visual' && (
                                    <div className="condition-container">
                                        <div className="condition-diamond">
                                            <span>?</span>
                                        </div>
                                        <div className="condition-text">{element.value}</div>
                                        <div className="condition-branches">
                                            <div className="branch branch-yes">
                                                <span className="branch-label">✓ Yes</span>
                                                <div className="branch-line"></div>
                                            </div>
                                            <div className="branch branch-no">
                                                <span className="branch-label">✗ No</span>
                                                <div className="branch-line"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {element.type === 'function-visual' && (
                                    <div className="function-container">
                                        <div className="function-box">
                                            <div className="function-header">
                                                <span className="function-icon">⚙️</span>
                                                <span className="function-name">{element.label}()</span>
                                            </div>
                                            <div className="function-body">
                                                <div className="function-input">
                                                    <span>Input: {element.value}</span>
                                                </div>
                                                <div className="function-arrow">↓</div>
                                                <div className="function-process">
                                                    <span>Process...</span>
                                                </div>
                                                <div className="function-arrow">↓</div>
                                                <div className="function-output">
                                                    <span>Output</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {element.type === 'list-visual' && (
                                    <div className="list-container">
                                        <div className="list-label">{element.label}</div>
                                        <div className="list-boxes">
                                            {element.value?.replace(/[\[\]]/g, '').split(',').slice(0, 5).map((item, i) => (
                                                <div key={i} className="list-item" style={{ animationDelay: `${i * 0.15}s` }}>
                                                    <span className="list-index">{i}</span>
                                                    <span className="list-value">{item.trim()}</span>
                                                </div>
                                            ))}
                                            {(element.value?.split(',').length || 0) > 5 && (
                                                <div className="list-more">...</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {step.elements.length === 0 && (
                            <div className="viz-intro">
                                <div className="intro-icon">🚀</div>
                                <p>Ready to explore?</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="viz-description">{step.description}</p>
                </div>

                {/* Progress */}
                <div className="viz-progress">
                    {steps.map((_, idx) => (
                        <button
                            key={idx}
                            className={`progress-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'done' : ''}`}
                            onClick={() => setCurrentStep(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="viz-controls-v2">
                <button className="viz-btn" onClick={handleReset} disabled={currentStep === 0}>
                    <RotateCcw size={16} />
                </button>
                <button className="viz-btn" onClick={handlePrev} disabled={currentStep === 0}>
                    <ChevronLeft size={20} />
                </button>
                <button className="viz-btn play-btn" onClick={togglePlay}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="viz-btn" onClick={handleNext} disabled={currentStep >= steps.length - 1}>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default CodeVisualization;
