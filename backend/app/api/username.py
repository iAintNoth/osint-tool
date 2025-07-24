from fastapi import APIRouter, HTTPException
from app.services.github import get_github_profile
import httpx
import asyncio

router = APIRouter()

@router.get("/{username}")
async def search_username(username: str):
    results = {}
    
    try:
        # GitHub
        github_data = await get_github_profile(username)
        if github_data:
            results["github"] = github_data
            
        # Reddit
        reddit_data = await check_reddit_profile(username)
        if reddit_data:
            results["reddit"] = reddit_data
            
        # Twitter (Basic check)
        twitter_data = await check_twitter_profile(username)
        if twitter_data:
            results["twitter"] = twitter_data
            
        return {"username": username, "results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def check_reddit_profile(username: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://www.reddit.com/user/{username}/about.json")
            if response.status_code == 200:
                data = response.json()
                return {
                    "exists": True,
                    "created": data["data"]["created_utc"],
                    "comment_karma": data["data"]["comment_karma"],
                    "link_karma": data["data"]["link_karma"],
                    "profile_url": f"https://reddit.com/u/{username}"
                }
    except:
        pass
    return None

async def check_twitter_profile(username: str):
    return {
        "exists": "unknown",
        "profile_url": f"https://twitter.com/{username}",
        "note": "Manual verification required"
    }
