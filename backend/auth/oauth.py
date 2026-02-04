import httpx
from typing import Optional
from config import settings

async def get_google_user_info(code: str) -> Optional[dict]:
    """Exchange authorization code for user info from Google."""
    # Exchange code for access token
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    
    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=token_data)
        if token_response.status_code != 200:
            return None
        
        tokens = token_response.json()
        access_token = tokens.get("access_token")
        
        if not access_token:
            return None
        
        # Get user info
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        user_response = await client.get(
            user_info_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )
        
        if user_response.status_code != 200:
            return None
        
        user_data = user_response.json()
        return {
            "id": user_data.get("id"),
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "picture": user_data.get("picture"),
            "provider": "google"
        }


async def get_github_user_info(code: str) -> Optional[dict]:
    """Exchange authorization code for user info from GitHub."""
    # Exchange code for access token
    token_url = "https://github.com/login/oauth/access_token"
    token_data = {
        "code": code,
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "redirect_uri": settings.GITHUB_REDIRECT_URI
    }
    
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            token_url,
            data=token_data,
            headers={"Accept": "application/json"}
        )
        
        if token_response.status_code != 200:
            return None
        
        tokens = token_response.json()
        access_token = tokens.get("access_token")
        
        if not access_token:
            return None
        
        # Get user info
        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )
        
        if user_response.status_code != 200:
            return None
        
        user_data = user_response.json()
        
        # Get primary email (might be private)
        email = user_data.get("email")
        if not email:
            email_response = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/vnd.github.v3+json"
                }
            )
            if email_response.status_code == 200:
                emails = email_response.json()
                for e in emails:
                    if e.get("primary"):
                        email = e.get("email")
                        break
        
        return {
            "id": str(user_data.get("id")),
            "email": email,
            "name": user_data.get("name") or user_data.get("login"),
            "picture": user_data.get("avatar_url"),
            "username": user_data.get("login"),
            "provider": "github"
        }


def get_google_auth_url() -> str:
    """Generate Google OAuth authorization URL."""
    base_url = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{base_url}?{query}"


def get_github_auth_url() -> str:
    """Generate GitHub OAuth authorization URL."""
    base_url = "https://github.com/login/oauth/authorize"
    params = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "redirect_uri": settings.GITHUB_REDIRECT_URI,
        "scope": "read:user user:email"
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{base_url}?{query}"
