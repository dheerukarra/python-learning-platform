from sqlalchemy import Column, String, DateTime, Integer, Text, ForeignKey
from sqlalchemy.sql import func
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Progress(Base):
    __tablename__ = "progress"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    exercise_id = Column(String, nullable=False, index=True)
    course_id = Column(String, nullable=False)
    
    # Completion data
    code = Column(Text, nullable=True)  # User's solution code
    points_earned = Column(Integer, default=0)
    attempts = Column(Integer, default=1)
    
    # Timestamps
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "exerciseId": self.exercise_id,
            "courseId": self.course_id,
            "code": self.code,
            "pointsEarned": self.points_earned,
            "attempts": self.attempts,
            "completedAt": self.completed_at.isoformat() if self.completed_at else None
        }


class DailyStreak(Base):
    """Track daily activity for streak calculation."""
    __tablename__ = "daily_streaks"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    date = Column(String, nullable=False)  # YYYY-MM-DD format
    exercises_count = Column(Integer, default=0)
    points_earned = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
