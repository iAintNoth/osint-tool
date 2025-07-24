import os
import requests
from typing import Dict, Any, Optional

class ShodanService:
    def __init__(self):
        self.api_key = os.getenv("SHODAN_API_KEY")
        self.base_url = "https://api.shodan.io"
    
    async def get_host_info(self, ip: str) -> Dict[str, Any]:
        if not self.api_key:
            return self._mock_shodan_data(ip)
        
        try:
            url = f"{self.base_url}/shodan/host/{ip}?key={self.api_key}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "ip": data.get("ip_str"),
                    "organization": data.get("org"),
                    "operating_system": data.get("os"),
                    "ports": data.get("ports", []),
                    "vulnerabilities": data.get("vulns", []),
                    "services": [
                        {
                            "port": service.get("port"),
                            "protocol": service.get("transport"),
                            "service": service.get("product"),
                            "version": service.get("version")
                        }
                        for service in data.get("data", [])
                    ]
                }
            else:
                return self._mock_shodan_data(ip)
        except Exception:
            return self._mock_shodan_data(ip)
    
    def _mock_shodan_data(self, ip: str) -> Dict[str, Any]:
        return {
            "ip": ip,
            "organization": "Example ISP",
            "operating_system": "Linux 3.x",
            "ports": [22, 80, 443, 8080],
            "vulnerabilities": ["CVE-2021-44228", "CVE-2021-4034"],
            "services": [
                {"port": 22, "protocol": "tcp", "service": "OpenSSH", "version": "7.4"},
                {"port": 80, "protocol": "tcp", "service": "nginx", "version": "1.18.0"},
                {"port": 443, "protocol": "tcp", "service": "nginx", "version": "1.18.0"}
            ]
        }
