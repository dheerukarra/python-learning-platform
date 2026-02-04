from sqlalchemy import Column, String, DateTime, Integer, Boolean
from sqlalchemy.sql import func
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    display_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=True)  # Null for OAuth users
    avatar = Column(String, nullable=True)
    
    # OAuth
    oauth_provider = Column(String, nullable=True)  # 'google', 'github', or null
    oauth_id = Column(String, nullable=True)
    
    # Stats (denormalized for performance)
    total_points = Column(Integer, default=0)
    exercises_completed = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    
    # Metadata
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "displayName": self.display_name or self.username,
            "avatar": self.avatar,
            "role": "student",
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "stats": {
                "totalPoints": self.total_points,
                "exercisesCompleted": self.exercises_completed,
                "currentStreak": self.current_streak,
                "longestStreak": self.longest_streak,
                "rank": 0,  # Calculated dynamically
                "badges": []
            }
        }
