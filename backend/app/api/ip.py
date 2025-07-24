from fastapi import APIRouter
import httpx
import socket

router = APIRouter()

@router.get("/{ip}")
async def search_ip(ip: str):
    results = {}
    
    # Geolocation
    geo_data = await get_ip_geolocation(ip)
    if geo_data:
        results["geolocation"] = geo_data
        
    # Reverse DNS
    try:
        hostname = socket.gethostbyaddr(ip)[0]
        results["reverse_dns"] = hostname
    except:
        results["reverse_dns"] = None
        
    return {"ip": ip, "results": results}

async def get_ip_geolocation(ip: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"http://ip-api.com/json/{ip}")
            if response.status_code == 200:
                return response.json()
    except:
        pass
    return None
