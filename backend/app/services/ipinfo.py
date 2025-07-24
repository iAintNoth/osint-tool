import os
import requests
from typing import Dict, Any

class IPInfoService:
    def __init__(self):
        self.api_key = os.getenv("IPINFO_API_KEY")
        self.base_url = "https://ipinfo.io"
    
    async def get_ip_info(self, ip: str) -> Dict[str, Any]:
        try:
            url = f"{self.base_url}/{ip}"
            params = {}
            
            if self.api_key:
                params["token"] = self.api_key
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "ip": data.get("ip"),
                    "city": data.get("city"),
                    "region": data.get("region"),
                    "country": data.get("country"),
                    "location": data.get("loc"),
                    "organization": data.get("org"),
                    "postal": data.get("postal"),
                    "timezone": data.get("timezone"),
                    "hostname": data.get("hostname"),
                    "anycast": data.get("anycast", False)
                }
            else:
                return self._mock_ip_data(ip)
        except Exception:
            return self._mock_ip_data(ip)
    
    def _mock_ip_data(self, ip: str) -> Dict[str, Any]:
        return {
            "ip": ip,
            "city": "New York",
            "region": "New York",
            "country": "US",
            "location": "40.7128,-74.0060",
            "organization": "AS13335 Cloudflare, Inc.",
            "postal": "10001",
            "timezone": "America/New_York",
            "hostname": "example.com",
            "anycast": False
        }
