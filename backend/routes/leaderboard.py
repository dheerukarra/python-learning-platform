from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from pydantic import BaseModel

from database import get_db
from models.user import User

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

class LeaderboardEntry(BaseModel):
    rank: int
    id: str
    username: str
    displayName: str
    avatar: str | None
    totalPoints: int
    exercisesCompleted: int
    currentStreak: int

@router.get("/", response_model=List[LeaderboardEntry])
async def get_leaderboard(
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get top users by total points."""
    users = db.query(User).order_by(
        desc(User.total_points)
    ).limit(limit).all()
    
    return [
        LeaderboardEntry(
            rank=i + 1,
            id=user.id,
            username=user.username,
            displayName=user.display_name or user.username,
            avatar=user.avatar,
            totalPoints=user.total_points,
            exercisesCompleted=user.exercises_completed,
            currentStreak=user.current_streak
        )
        for i, user in enumerate(users)
    ]
