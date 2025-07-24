import dns.resolver

async def get_dns_records(domain: str):
    results = {}
    record_types = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME']
    
    for record_type in record_types:
        try:
            answers = dns.resolver.resolve(domain, record_type)
            results[record_type] = [str(answer) for answer in answers]
        except Exception:
            results[record_type] = []
            
    return results
