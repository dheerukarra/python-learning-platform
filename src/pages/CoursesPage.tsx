import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    Search,
    Filter,
    Code2,
    Database,
    Cloud,
    Clock,
    Users,
    CheckCircle2,
    Lock,
    ArrowRight
} from 'lucide-react';
import { courses as courseData } from '../data/exercises';
import './CoursesPage.css';

// Add learners count to courses
const courses = courseData.map(course => ({
    ...course,
    learners: Math.floor(Math.random() * 3000) + 1500
}));

const trackIcons: Record<string, typeof Code2> = {
    development: Code2,
    datascience: Database,
    devops: Cloud
};

const trackLabels: Record<string, string> = {
    development: 'Development',
    datascience: 'Data Science',
    devops: 'DevOps'
};

const difficultyColors: Record<string, string> = {
    beginner: 'badge-success',
    intermediate: 'badge-warning',
    advanced: 'badge-error'
};

const CoursesPage = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTrack, setSelectedTrack] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

    // Read track from URL on mount and when URL changes
    useEffect(() => {
        const trackFromUrl = searchParams.get('track');
        if (trackFromUrl && ['development', 'datascience', 'devops'].includes(trackFromUrl)) {
            setSelectedTrack(trackFromUrl);
        } else {
            setSelectedTrack('all');
        }
    }, [searchParams]);

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
        const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
        return matchesSearch && matchesTrack && matchesDifficulty;
    });

    return (
        <div className="courses-page animate-fade-in">
            <header className="courses-header">
                <div className="courses-header-content">
                    <h1 className="courses-title">Explore Courses</h1>
                    <p className="courses-subtitle">
                        Choose from our curated collection of Python courses designed for all skill levels.
                    </p>
                </div>
            </header>

            <div className="courses-filters">
                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <Filter size={16} />
                    <select
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Tracks</option>
                        <option value="development">Development</option>
                        <option value="datascience">Data Science</option>
                        <option value="devops">DevOps</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <div className="courses-grid">
                {filteredCourses.map((course) => {
                    const TrackIcon = trackIcons[course.track];

                    return (
                        <div key={course.id} className={`course-card ${course.isLocked ? 'locked' : ''}`}>
                            {course.isLocked && (
                                <div className="course-lock-overlay">
                                    <Lock size={32} />
                                    <span>Complete prerequisites to unlock</span>
                                </div>
                            )}

                            <div className="course-thumbnail">
                                <span className="course-emoji">{course.thumbnail}</span>
                            </div>

                            <div className="course-content">
                                <div className="course-meta">
                                    <span className={`badge ${difficultyColors[course.difficulty]}`}>
                                        {course.difficulty}
                                    </span>
                                    <span className="course-track">
                                        <TrackIcon size={14} />
                                        {trackLabels[course.track]}
                                    </span>
                                </div>

                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-description">{course.description}</p>

                                <div className="course-stats">
                                    <span className="course-stat">
                                        <Clock size={14} />
                                        {course.duration}
                                    </span>
                                    <span className="course-stat">
                                        <Code2 size={14} />
                                        {course.exerciseCount} exercises
                                    </span>
                                    <span className="course-stat">
                                        <Users size={14} />
                                        {course.learners.toLocaleString()}
                                    </span>
                                </div>

                                {course.progress > 0 && (
                                    <div className="course-progress-section">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                        <span className="course-progress-text">
                                            {course.progress === 100 ? (
                                                <>
                                                    <CheckCircle2 size={14} />
                                                    Completed
                                                </>
                                            ) : (
                                                `${course.progress}% complete`
                                            )}
                                        </span>
                                    </div>
                                )}

                                <Link
                                    to={course.isLocked ? '#' : `/courses/${course.id}`}
                                    className="btn btn-primary course-btn"
                                    onClick={(e) => course.isLocked && e.preventDefault()}
                                >
                                    {course.progress > 0 ? 'Continue' : 'Start Course'}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredCourses.length === 0 && (
                <div className="no-results">
                    <p>No courses found matching your criteria.</p>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTrack('all');
                            setSelectedDifficulty('all');
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
