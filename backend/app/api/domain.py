from fastapi import APIRouter, HTTPException
from app.services.whois import get_whois_info
from app.services.dns import get_dns_records
import socket

router = APIRouter()

@router.get("/{domain}")
async def search_domain(domain: str):
    try:
        results = {}
        
        # WHOIS
        whois_data = await get_whois_info(domain)
        if whois_data:
            results["whois"] = whois_data
            
        # DNS Records
        dns_data = await get_dns_records(domain)
        if dns_data:
            results["dns"] = dns_data
            
        # Basic IP resolution
        try:
            ip = socket.gethostbyname(domain)
            results["ip"] = ip
        except:
            results["ip"] = None
            
        return {"domain": domain, "results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
