from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date, timedelta

from database import get_db
from models.user import User
from models.progress import Progress, DailyStreak
from auth.jwt import get_current_user

router = APIRouter(prefix="/progress", tags=["Progress"])

class SaveProgressRequest(BaseModel):
    exerciseId: str
    courseId: str
    code: str
    pointsEarned: int

class ProgressResponse(BaseModel):
    id: str
    exerciseId: str
    courseId: str
    code: Optional[str]
    pointsEarned: int
    attempts: int
    completedAt: str

@router.get("/", response_model=List[ProgressResponse])
async def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all progress for the current user."""
    progress_list = db.query(Progress).filter(
        Progress.user_id == current_user.id
    ).all()
    
    return [
        ProgressResponse(
            id=p.id,
            exerciseId=p.exercise_id,
            courseId=p.course_id,
            code=p.code,
            pointsEarned=p.points_earned,
            attempts=p.attempts,
            completedAt=p.completed_at.isoformat() if p.completed_at else ""
        )
        for p in progress_list
    ]

@router.post("/", response_model=ProgressResponse)
async def save_progress(
    data: SaveProgressRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Save exercise completion progress."""
    # Check if already completed
    existing = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.exercise_id == data.exerciseId
    ).first()
    
    if existing:
        # Update existing progress
        existing.code = data.code
        existing.attempts += 1
        existing.completed_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        
        return ProgressResponse(
            id=existing.id,
            exerciseId=existing.exercise_id,
            courseId=existing.course_id,
            code=existing.code,
            pointsEarned=existing.points_earned,
            attempts=existing.attempts,
            completedAt=existing.completed_at.isoformat()
        )
    
    # Create new progress
    progress = Progress(
        user_id=current_user.id,
        exercise_id=data.exerciseId,
        course_id=data.courseId,
        code=data.code,
        points_earned=data.pointsEarned
    )
    
    db.add(progress)
    
    # Update user stats
    current_user.total_points += data.pointsEarned
    current_user.exercises_completed += 1
    
    # Update daily streak
    today = date.today().isoformat()
    daily = db.query(DailyStreak).filter(
        DailyStreak.user_id == current_user.id,
        DailyStreak.date == today
    ).first()
    
    if daily:
        daily.exercises_count += 1
        daily.points_earned += data.pointsEarned
    else:
        # New day - update streak
        yesterday = (date.today() - timedelta(days=1)).isoformat() if hasattr(date, 'timedelta') else today
        had_yesterday = db.query(DailyStreak).filter(
            DailyStreak.user_id == current_user.id,
            DailyStreak.date == yesterday
        ).first()
        
        if had_yesterday:
            current_user.current_streak += 1
        else:
            current_user.current_streak = 1
        
        if current_user.current_streak > current_user.longest_streak:
            current_user.longest_streak = current_user.current_streak
        
        daily = DailyStreak(
            user_id=current_user.id,
            date=today,
            exercises_count=1,
            points_earned=data.pointsEarned
        )
        db.add(daily)
    
    db.commit()
    db.refresh(progress)
    
    return ProgressResponse(
        id=progress.id,
        exerciseId=progress.exercise_id,
        courseId=progress.course_id,
        code=progress.code,
        pointsEarned=progress.points_earned,
        attempts=progress.attempts,
        completedAt=progress.completed_at.isoformat()
    )

@router.get("/exercise/{exercise_id}")
async def get_exercise_progress(
    exercise_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get progress for a specific exercise."""
    progress = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.exercise_id == exercise_id
    ).first()
    
    if not progress:
        return None
    
    return ProgressResponse(
        id=progress.id,
        exerciseId=progress.exercise_id,
        courseId=progress.course_id,
        code=progress.code,
        pointsEarned=progress.points_earned,
        attempts=progress.attempts,
        completedAt=progress.completed_at.isoformat()
    )
