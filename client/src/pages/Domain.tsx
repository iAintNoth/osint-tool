import { useState } from 'react';
import { Globe, Server, Shield, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface DomainResult {
  domain: string;
  whois?: {
    registrar: string;
    created: string;
    expires: string;
    status: string[];
  };
  dns?: {
    A: string[];
    AAAA: string[];
    MX: string[];
    TXT: string[];
    NS: string[];
  };
  security?: {
    ssl: boolean;
    dnssec: boolean;
    blacklisted: boolean;
  };
  shodan?: {
    ports: number[];
    services: string[];
    vulnerabilities: string[];
  };
}

const Domain = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain to analyze",
        variant: "destructive"
      });
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      toast({
        title: "Invalid Domain",
        description: "Please enter a valid domain name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API calls with demo data
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockResult: DomainResult = {
      domain,
      whois: {
        registrar: "Example Registrar Inc.",
        created: "2020-03-15",
        expires: "2025-03-15",
        status: ["clientTransferProhibited", "clientUpdateProhibited"]
      },
      dns: {
        A: ["192.0.2.1", "192.0.2.2"],
        AAAA: ["2001:db8::1"],
        MX: ["10 mail.example.com", "20 backup.example.com"],
        TXT: ["v=spf1 include:_spf.google.com ~all", "google-site-verification=abc123"],
        NS: ["ns1.example.com", "ns2.example.com"]
      },
      security: {
        ssl: Math.random() > 0.2,
        dnssec: Math.random() > 0.5,
        blacklisted: Math.random() > 0.9
      },
      shodan: {
        ports: [22, 80, 443, 993],
        services: ["SSH", "HTTP", "HTTPS", "IMAPS"],
        vulnerabilities: Math.random() > 0.7 ? ["CVE-2023-1234"] : []
      }
    };

    setResult(mockResult);
    setLoading(false);

    toast({
      title: "Analysis Complete",
      description: `Domain analysis completed for ${domain}`,
    });
  };

  const exportResults = (format: 'json' | 'csv') => {
    if (!result) return;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}_domain_analysis.json`;
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold terminal-text">Domain Intelligence</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive domain analysis and reconnaissance
        </p>
      </div>

      {/* Search Form */}
      <Card className="cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Domain Analysis</span>
          </CardTitle>
          <CardDescription>
            Enter a domain name for WHOIS, DNS, and security analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter domain (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="cyber-glow"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Globe className="w-4 h-4 mr-2" />
              )}
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Analyzing domain...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Analysis Results</h2>
            <Button variant="outline" onClick={() => exportResults('json')}>
              Export JSON
            </Button>
          </div>

          <Tabs defaultValue="whois" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="whois">WHOIS</TabsTrigger>
              <TabsTrigger value="dns">DNS Records</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="shodan">Shodan</TabsTrigger>
            </TabsList>

            <TabsContent value="whois" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>WHOIS Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Registrar</label>
                      <p className="font-mono">{result.whois?.registrar}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created</label>
                      <p className="font-mono">{result.whois?.created}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Expires</label>
                      <p className="font-mono">{result.whois?.expires}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <div className="space-y-1">
                        {result.whois?.status.map((status, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{status}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="w-5 h-5" />
                    <span>DNS Records</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(result.dns || {}).map(([type, records]) => (
                    <div key={type}>
                      <label className="text-sm font-medium text-muted-foreground">{type} Records</label>
                      <div className="space-y-1">
                        {records.map((record, i) => (
                          <p key={i} className="font-mono text-sm bg-secondary p-2 rounded">{record}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.ssl ? 'text-success' : 'text-destructive'}`}>
                        {result.security?.ssl ? '✓' : '✗'}
                      </div>
                      <p className="font-medium">SSL Certificate</p>
                      <p className="text-sm text-muted-foreground">
                        {result.security?.ssl ? 'Valid' : 'Invalid/Missing'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.dnssec ? 'text-success' : 'text-warning'}`}>
                        {result.security?.dnssec ? '✓' : '?'}
                      </div>
                      <p className="font-medium">DNSSEC</p>
                      <p className="text-sm text-muted-foreground">
                        {result.security?.dnssec ? 'Enabled' : 'Not Detected'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.blacklisted ? 'text-destructive' : 'text-success'}`}>
                        {result.security?.blacklisted ? '⚠' : '✓'}
                      </div>
                      <p className="font-medium">Blacklist Status</p>
                      <p className="text-sm text-muted-foreground">
                        {result.security?.blacklisted ? 'Blacklisted' : 'Clean'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shodan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="w-5 h-5" />
                    <span>Shodan Intelligence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Open Ports</label>
                      <div className="flex flex-wrap gap-2">
                        {result.shodan?.ports.map((port, i) => (
                          <Badge key={i} variant="outline">{port}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {result.shodan?.services.map((service, i) => (
                          <Badge key={i} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {result.shodan?.vulnerabilities && result.shodan.vulnerabilities.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Vulnerabilities</label>
                      <div className="space-y-2">
                        {result.shodan.vulnerabilities.map((vuln, i) => (
                          <div key={i} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <Badge variant="destructive" className="mb-1">{vuln}</Badge>
                            <p className="text-sm text-muted-foreground">Security vulnerability detected</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Domain;