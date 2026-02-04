from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from database import get_db
from models.user import User
from auth.jwt import (
    get_password_hash, 
    verify_password, 
    create_access_token,
    get_current_user
)
from auth.schemas import UserRegister, UserLogin, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user."""
    # Check if email exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username exists
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user
    user = User(
        email=user_data.email,
        username=user_data.username,
        display_name=user_data.display_name or user_data.username,
        hashed_password=get_password_hash(user_data.password),
        total_points=0,
        exercises_completed=0,
        current_streak=0,
        longest_streak=0
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=user.to_dict()
    )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login with email and password."""
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=user.to_dict()
    )

@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user."""
    return current_user.to_dict()

@router.post("/demo/{provider}", response_model=TokenResponse)
async def demo_oauth_login(provider: str, db: Session = Depends(get_db)):
    """Demo OAuth login (simulated for development)."""
    if provider not in ["google", "github"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid provider"
        )
    
    # Create or get demo user for this provider
    demo_email = f"demo_{provider}@pylearn.dev"
    user = db.query(User).filter(User.email == demo_email).first()
    
    if not user:
        user = User(
            email=demo_email,
            username=f"{provider}_user",
            display_name=f"{provider.title()} User",
            oauth_provider=provider,
            oauth_id=f"demo-{provider}-123",
            avatar=f"https://ui-avatars.com/api/?name={provider.title()}+User&background={'4285F4' if provider == 'google' else '333'}&color=fff",
            total_points=500,
            exercises_completed=10,
            current_streak=3,
            longest_streak=7
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=user.to_dict()
    )
