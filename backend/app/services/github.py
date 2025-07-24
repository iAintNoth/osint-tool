import httpx

async def get_github_profile(username: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://api.github.com/users/{username}")
            if response.status_code == 200:
                data = response.json()
                return {
                    "exists": True,
                    "name": data.get("name"),
                    "bio": data.get("bio"),
                    "followers": data.get("followers"),
                    "following": data.get("following"),
                    "public_repos": data.get("public_repos"),
                    "created_at": data.get("created_at"),
                    "avatar_url": data.get("avatar_url"),
                    "profile_url": data.get("html_url"),
                    "blog": data.get("blog"),
                    "location": data.get("location")
                }
    except Exception as e:
        print(f"GitHub API error: {e}")
    return None
