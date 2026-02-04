from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from datetime import datetime

from config import settings
from database import get_db
from models.user import User
from auth.jwt import (
    get_password_hash, 
    verify_password, 
    create_access_token,
    get_current_user
)
from auth.schemas import UserRegister, UserLogin, TokenResponse
from auth.oauth import (
    get_google_auth_url,
    get_github_auth_url,
    get_google_user_info,
    get_github_user_info
)

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

# ==================== GOOGLE OAUTH ====================

@router.get("/google")
async def google_auth():
    """Redirect to Google OAuth."""
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth not configured"
        )
    return RedirectResponse(url=get_google_auth_url())

@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    """Handle Google OAuth callback."""
    user_info = await get_google_user_info(code)
    
    if not user_info or not user_info.get("email"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info from Google"
        )
    
    # Find or create user
    user = db.query(User).filter(User.email == user_info["email"]).first()
    
    if not user:
        # Create new user
        username = user_info["email"].split("@")[0]
        # Ensure unique username
        base_username = username
        counter = 1
        while db.query(User).filter(User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
        
        user = User(
            email=user_info["email"],
            username=username,
            display_name=user_info.get("name", username),
            avatar=user_info.get("picture"),
            oauth_provider="google",
            oauth_id=user_info.get("id"),
            total_points=0,
            exercises_completed=0,
            current_streak=0,
            longest_streak=0
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Update existing user
        user.last_login = datetime.utcnow()
        if user_info.get("picture") and not user.avatar:
            user.avatar = user_info["picture"]
        db.commit()
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    # Redirect to frontend with token
    frontend_url = settings.FRONTEND_URL
    return RedirectResponse(url=f"{frontend_url}/auth/callback?token={access_token}")

# ==================== GITHUB OAUTH ====================

@router.get("/github")
async def github_auth():
    """Redirect to GitHub OAuth."""
    if not settings.GITHUB_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="GitHub OAuth not configured"
        )
    return RedirectResponse(url=get_github_auth_url())

@router.get("/github/callback")
async def github_callback(code: str, db: Session = Depends(get_db)):
    """Handle GitHub OAuth callback."""
    user_info = await get_github_user_info(code)
    
    if not user_info or not user_info.get("email"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info from GitHub"
        )
    
    # Find or create user
    user = db.query(User).filter(User.email == user_info["email"]).first()
    
    if not user:
        # Create new user
        username = user_info.get("username") or user_info["email"].split("@")[0]
        # Ensure unique username
        base_username = username
        counter = 1
        while db.query(User).filter(User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
        
        user = User(
            email=user_info["email"],
            username=username,
            display_name=user_info.get("name", username),
            avatar=user_info.get("picture"),
            oauth_provider="github",
            oauth_id=user_info.get("id"),
            total_points=0,
            exercises_completed=0,
            current_streak=0,
            longest_streak=0
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Update existing user
        user.last_login = datetime.utcnow()
        if user_info.get("picture") and not user.avatar:
            user.avatar = user_info["picture"]
        db.commit()
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    # Redirect to frontend with token
    frontend_url = settings.FRONTEND_URL
    return RedirectResponse(url=f"{frontend_url}/auth/callback?token={access_token}")

# ==================== OAuth URL Endpoints (for frontend) ====================

@router.get("/google/url")
async def get_google_url():
    """Get Google OAuth URL for frontend redirect."""
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth not configured"
        )
    return {"url": get_google_auth_url()}

@router.get("/github/url")
async def get_github_url():
    """Get GitHub OAuth URL for frontend redirect."""
    if not settings.GITHUB_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="GitHub OAuth not configured"
        )
    return {"url": get_github_auth_url()}
