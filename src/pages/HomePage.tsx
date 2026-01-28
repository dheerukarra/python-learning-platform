import { Link } from 'react-router-dom';
import {
    Code2,
    Zap,
    Trophy,
    Users,
    Play,
    ArrowRight,
    BookOpen,
    BarChart3,
    Sparkles
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
    const features = [
        {
            icon: Code2,
            title: 'Interactive Code Editor',
            description: 'Write, run, and debug Python code directly in your browser with real-time feedback.'
        },
        {
            icon: Zap,
            title: 'Step-by-Step Visualization',
            description: 'Watch your code execute line by line and understand exactly how it works.'
        },
        {
            icon: BarChart3,
            title: 'Progress Tracking',
            description: 'Track your learning journey with detailed statistics and achievement badges.'
        },
        {
            icon: Trophy,
            title: 'Gamified Learning',
            description: 'Earn points, unlock badges, and compete on leaderboards as you learn.'
        }
    ];

    const tracks = [
        {
            id: 'development',
            title: 'Development Track',
            description: 'Master web development, backend engineering, and full-stack development with Python.',
            courses: 12,
            gradient: 'linear-gradient(135deg, #1A5F7A 0%, #2A7F9A 100%)'
        },
        {
            id: 'datascience',
            title: 'Data Science Track',
            description: 'Learn machine learning, data analysis, and statistical computing from scratch.',
            courses: 8,
            gradient: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)'
        },
        {
            id: 'devops',
            title: 'DevOps Track',
            description: 'Master infrastructure automation, cloud engineering, and CI/CD pipelines.',
            courses: 6,
            gradient: 'linear-gradient(135deg, #F39C12 0%, #D68910 100%)'
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Interactive Python Learning</span>
                    </div>
                    <h1 className="hero-title">
                        Master Python Through
                        <span className="hero-title-gradient"> Hands-on Practice</span>
                    </h1>
                    <p className="hero-description">
                        Learn Python the right way with our interactive coding platform.
                        Write real code, visualize execution, and build projects that matter.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            <Play size={20} />
                            Start Learning Free
                        </Link>
                        <Link to="/courses" className="btn btn-secondary btn-lg">
                            <BookOpen size={20} />
                            Browse Courses
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">50+</span>
                            <span className="hero-stat-label">Courses</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">500+</span>
                            <span className="hero-stat-label">Exercises</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">10K+</span>
                            <span className="hero-stat-label">Learners</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-code-window">
                        <div className="code-window-header">
                            <div className="code-window-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <span className="code-window-title">hello.py</span>
                        </div>
                        <pre className="code-window-content">
                            <code>
                                {`# Welcome to PyLearn! 🐍
def greet(name):
    """Greet a new learner"""
    message = f"Hello, {name}!"
    return message

# Try it yourself
result = greet("Developer")
print(result)

# Output: Hello, Developer!`}
                            </code>
                        </pre>
                        <div className="code-window-output">
                            <span className="output-label">Output:</span>
                            <span className="output-text">Hello, Developer!</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Why Choose PyLearn?</h2>
                    <p className="section-description">
                        Our platform is designed to make learning Python effective, engaging, and fun.
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Learning Tracks Section */}
            <section className="tracks-section">
                <div className="section-header">
                    <h2 className="section-title">Choose Your Learning Path</h2>
                    <p className="section-description">
                        Follow structured learning tracks designed to take you from beginner to expert.
                    </p>
                </div>
                <div className="tracks-grid">
                    {tracks.map((track) => (
                        <Link
                            key={track.id}
                            to={`/courses?track=${track.id}`}
                            className="track-card"
                            style={{ '--track-gradient': track.gradient } as React.CSSProperties}
                        >
                            <div className="track-card-content">
                                <h3 className="track-title">{track.title}</h3>
                                <p className="track-description">{track.description}</p>
                                <div className="track-meta">
                                    <span className="track-courses">{track.courses} Courses</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Python Journey?</h2>
                    <p className="cta-description">
                        Join thousands of learners who are mastering Python with PyLearn.
                    </p>
                    <Link to="/register" className="btn btn-success btn-lg">
                        <Users size={20} />
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
