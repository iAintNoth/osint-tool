import re
import socket
from typing import Dict, Any

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_ip(ip: str) -> bool:
    """Validate IP address format"""
    try:
        socket.inet_aton(ip)
        return True
    except socket.error:
        return False

def validate_domain(domain: str) -> bool:
    """Validate domain format"""
    pattern = r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$'
    return re.match(pattern, domain) is not None

def validate_username(username: str) -> bool:
    """Validate username format"""
    if len(username) < 1 or len(username) > 50:
        return False
    pattern = r'^[a-zA-Z0-9._-]+$'
    return re.match(pattern, username) is not None

def calculate_reputation_score(data: Dict[str, Any]) -> int:
    """Calculate a reputation score based on various factors"""
    score = 50  # Base score
    
    # Adjust based on data availability and quality
    if data.get("breached"):
        score -= 20
    
    if data.get("suspicious_activity"):
        score -= 15
    
    if data.get("verified"):
        score += 10
    
    # Ensure score is between 0-100
    return max(0, min(100, score))

def format_response(success: bool, data: Any = None, message: str = None) -> Dict[str, Any]:
    """Format API response consistently"""
    response = {
        "success": success,
        "timestamp": "2024-01-01T00:00:00Z"
    }
    
    if data is not None:
        response["data"] = data
    
    if message:
        response["message"] = message
    
    return response
