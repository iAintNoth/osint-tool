import whois
from datetime import datetime

async def get_whois_info(domain: str):
    try:
        w = whois.whois(domain)
        return {
            "registrar": w.registrar,
            "creation_date": str(w.creation_date[0]) if w.creation_date else None,
            "expiration_date": str(w.expiration_date[0]) if w.expiration_date else None,
            "name_servers": w.name_servers,
            "status": w.status,
            "registrant_name": w.name,
            "registrant_org": w.org,
            "registrant_country": w.country
        }
    except Exception as e:
        print(f"WHOIS error: {e}")
        return None
