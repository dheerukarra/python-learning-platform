from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserRegister(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=30)
    password: str = Field(..., min_length=6)
    display_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OAuthLogin(BaseModel):
    provider: str  # 'google' or 'github'
    access_token: str
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    displayName: Optional[str]
    avatar: Optional[str]
    role: str
    createdAt: Optional[str]
    stats: dict
