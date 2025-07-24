from fastapi import APIRouter
import httpx
import os

router = APIRouter()

@router.get("/{email}")
async def search_email(email: str):
    results = {}
    
    # Have I Been Pwned
    hibp_data = await check_hibp(email)
    if hibp_data:
        results["breaches"] = hibp_data
        
    # Email validation
    results["validation"] = validate_email_format(email)
    
    return {"email": email, "results": results}

async def check_hibp(email: str):
    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "hibp-api-key": os.getenv("HIBP_API_KEY", ""),
                "User-Agent": "OSINT-Portal"
            }
            response = await client.get(
                f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}",
                headers=headers
            )
            if response.status_code == 200:
                return response.json()
    except:
        pass
    return None

def validate_email_format(email: str):
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return {"valid": bool(re.match(pattern, email))}
