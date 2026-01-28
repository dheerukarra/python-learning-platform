import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Trophy,
    Code2,
    CheckCircle2,
    Lock,
    Play,
    ChevronRight
} from 'lucide-react';
import { getCourseById, getExercisesByCourse } from '../data/exercises';
import './CourseDetailPage.css';

const difficultyColors: Record<string, string> = {
    beginner: 'badge-success',
    intermediate: 'badge-warning',
    advanced: 'badge-error'
};

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const course = courseId ? getCourseById(courseId) : null;
    const exercises = courseId ? getExercisesByCourse(courseId) : [];

    if (!course) {
        return (
            <div className="course-detail-page">
                <div className="course-not-found">
                    <h2>Course Not Found</h2>
                    <Link to="/courses" className="btn btn-primary">
                        <ArrowLeft size={18} />
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="course-detail-page animate-fade-in">
            {/* Course Header */}
            <header className="course-detail-header">
                <Link to="/courses" className="back-link">
                    <ArrowLeft size={18} />
                    Back to Courses
                </Link>

                <div className="course-detail-info">
                    <span className="course-emoji-large">{course.thumbnail}</span>
                    <div className="course-detail-text">
                        <div className="course-detail-meta">
                            <span className={`badge ${difficultyColors[course.difficulty]}`}>
                                {course.difficulty}
                            </span>
                            <span className="course-detail-stat">
                                <Clock size={14} />
                                {course.duration}
                            </span>
                            <span className="course-detail-stat">
                                <Code2 size={14} />
                                {course.exerciseCount} exercises
                            </span>
                        </div>
                        <h1 className="course-detail-title">{course.title}</h1>
                        <p className="course-detail-description">{course.description}</p>
                    </div>
                </div>

                <div className="course-progress-overview">
                    <div className="progress-ring">
                        <span className="progress-value">{course.progress}%</span>
                    </div>
                    <div className="progress-details">
                        <span className="progress-label">Progress</span>
                        <span className="progress-exercises">
                            {course.completedCount} / {course.exerciseCount} completed
                        </span>
                    </div>
                </div>
            </header>

            {/* Exercises List */}
            <section className="exercises-section">
                <h2 className="exercises-section-title">Course Exercises</h2>

                {exercises.length === 0 ? (
                    <div className="no-exercises">
                        <Code2 size={48} />
                        <h3>Coming Soon!</h3>
                        <p>Exercises for this course are being prepared.</p>
                    </div>
                ) : (
                    <div className="exercises-list">
                        {exercises.map((exercise, index) => (
                            <div
                                key={exercise.id}
                                className={`exercise-item ${exercise.status === 'locked' ? 'locked' : ''}`}
                            >
                                <div className="exercise-number">
                                    {exercise.status === 'completed' ? (
                                        <CheckCircle2 size={24} className="completed-icon" />
                                    ) : exercise.status === 'locked' ? (
                                        <Lock size={20} />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>

                                <div className="exercise-content">
                                    <h3 className="exercise-item-title">{exercise.title}</h3>
                                    <p className="exercise-item-description">{exercise.description}</p>
                                    <div className="exercise-item-meta">
                                        <span className={`badge badge-sm ${difficultyColors[exercise.difficulty]}`}>
                                            {exercise.difficulty}
                                        </span>
                                        <span className="exercise-points">
                                            <Trophy size={12} />
                                            {exercise.points} pts
                                        </span>
                                        <span className="exercise-time">
                                            <Clock size={12} />
                                            {exercise.estimatedTime}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    to={exercise.status === 'locked' ? '#' : `/exercise/${exercise.id}`}
                                    className={`btn ${exercise.status === 'completed' ? 'btn-secondary' : 'btn-primary'} btn-sm exercise-action`}
                                    onClick={(e) => exercise.status === 'locked' && e.preventDefault()}
                                >
                                    {exercise.status === 'completed' ? (
                                        <>
                                            Review
                                            <ChevronRight size={16} />
                                        </>
                                    ) : exercise.status === 'locked' ? (
                                        <>
                                            <Lock size={14} />
                                            Locked
                                        </>
                                    ) : (
                                        <>
                                            <Play size={14} />
                                            Start
                                        </>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default CourseDetailPage;
