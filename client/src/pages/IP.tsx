import { useState } from 'react';
import { MapPin, Globe, Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface IPResult {
  ip: string;
  geolocation?: {
    country: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
    timezone: string;
    isp: string;
    asn: string;
  };
  security?: {
    isVpn: boolean;
    isProxy: boolean;
    isTor: boolean;
    isMalicious: boolean;
    threatScore: number;
  };
  network?: {
    reverseDns?: string;
    ports: number[];
    services: string[];
  };
  reputation?: {
    reports: number;
    categories: string[];
    lastReported?: string;
  };
}

const IP = () => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IPResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!ip.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address to analyze",
        variant: "destructive"
      });
      return;
    }

    // Basic IP validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) {
      toast({
        title: "Invalid IP",
        description: "Please enter a valid IPv4 address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API calls with demo data
    await new Promise(resolve => setTimeout(resolve, 2500));

    const countries = ['United States', 'Germany', 'Japan', 'Canada', 'United Kingdom'];
    const cities = ['New York', 'Berlin', 'Tokyo', 'Toronto', 'London'];
    const isps = ['Cloudflare', 'Google', 'Amazon', 'Microsoft', 'DigitalOcean'];

    const mockResult: IPResult = {
      ip,
      geolocation: {
        country: countries[Math.floor(Math.random() * countries.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        region: 'NY',
        latitude: 40.7128 + (Math.random() - 0.5) * 10,
        longitude: -74.0060 + (Math.random() - 0.5) * 10,
        timezone: 'America/New_York',
        isp: isps[Math.floor(Math.random() * isps.length)],
        asn: `AS${Math.floor(Math.random() * 90000) + 10000}`
      },
      security: {
        isVpn: Math.random() > 0.8,
        isProxy: Math.random() > 0.9,
        isTor: Math.random() > 0.95,
        isMalicious: Math.random() > 0.85,
        threatScore: Math.floor(Math.random() * 100)
      },
      network: {
        reverseDns: `${Math.random().toString(36).substr(2, 9)}.example.com`,
        ports: [22, 80, 443, 993].filter(() => Math.random() > 0.5),
        services: ['SSH', 'HTTP', 'HTTPS'].filter(() => Math.random() > 0.3)
      },
      reputation: {
        reports: Math.floor(Math.random() * 50),
        categories: ['Scanning', 'Malware', 'Phishing'].filter(() => Math.random() > 0.7),
        lastReported: '2024-01-15'
      }
    };

    setResult(mockResult);
    setLoading(false);

    toast({
      title: "Analysis Complete",
      description: `IP analysis completed for ${ip}`,
    });
  };

  const exportResults = (format: 'json' | 'csv') => {
    if (!result) return;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ip.replace(/\./g, '_')}_ip_analysis.json`;
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold terminal-text">IP Intelligence</h1>
        <p className="text-xl text-muted-foreground">
          Geolocation, threat analysis, and network reconnaissance
        </p>
      </div>

      {/* Search Form */}
      <Card className="cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>IP Address Analysis</span>
          </CardTitle>
          <CardDescription>
            Enter an IP address for comprehensive geolocation and threat analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter IP address (e.g., 8.8.8.8)"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
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
                <MapPin className="w-4 h-4 mr-2" />
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
              <p className="text-muted-foreground">Analyzing IP address...</p>
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

          <Tabs defaultValue="geolocation" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geolocation">Location</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>

            <TabsContent value="geolocation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Geolocation Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Country</label>
                      <p className="font-semibold">{result.geolocation?.country}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">City</label>
                      <p className="font-semibold">{result.geolocation?.city}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ISP</label>
                      <p className="font-mono">{result.geolocation?.isp}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ASN</label>
                      <p className="font-mono">{result.geolocation?.asn}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                      <p className="font-mono">
                        {result.geolocation?.latitude.toFixed(4)}, {result.geolocation?.longitude.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                      <p className="font-mono">{result.geolocation?.timezone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.isVpn ? 'text-warning' : 'text-success'}`}>
                        {result.security?.isVpn ? '⚠' : '✓'}
                      </div>
                      <p className="font-medium text-sm">VPN</p>
                      <p className="text-xs text-muted-foreground">
                        {result.security?.isVpn ? 'Detected' : 'Not detected'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.isProxy ? 'text-warning' : 'text-success'}`}>
                        {result.security?.isProxy ? '⚠' : '✓'}
                      </div>
                      <p className="font-medium text-sm">Proxy</p>
                      <p className="text-xs text-muted-foreground">
                        {result.security?.isProxy ? 'Detected' : 'Not detected'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.isTor ? 'text-destructive' : 'text-success'}`}>
                        {result.security?.isTor ? '🧅' : '✓'}
                      </div>
                      <p className="font-medium text-sm">Tor</p>
                      <p className="text-xs text-muted-foreground">
                        {result.security?.isTor ? 'Exit node' : 'Not detected'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.security?.isMalicious ? 'text-destructive' : 'text-success'}`}>
                        {result.security?.isMalicious ? '💀' : '✓'}
                      </div>
                      <p className="font-medium text-sm">Malicious</p>
                      <p className="text-xs text-muted-foreground">
                        {result.security?.isMalicious ? 'Flagged' : 'Clean'}
                      </p>
                    </div>
                  </div>

                  <div className="text-center p-6 border border-border rounded-lg">
                    <div className={`text-4xl font-bold mb-2 ${
                      (result.security?.threatScore || 0) > 70 ? 'text-destructive' :
                      (result.security?.threatScore || 0) > 40 ? 'text-warning' : 'text-success'
                    }`}>
                      {result.security?.threatScore}/100
                    </div>
                    <p className="font-medium">Threat Score</p>
                    <p className="text-sm text-muted-foreground">Based on multiple intelligence sources</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="network" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Network Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Reverse DNS</label>
                    <p className="font-mono bg-secondary p-2 rounded">{result.network?.reverseDns || 'No PTR record'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Open Ports</label>
                      <div className="flex flex-wrap gap-2">
                        {result.network?.ports && result.network.ports.length > 0 ? (
                          result.network.ports.map((port, i) => (
                            <Badge key={i} variant="outline">{port}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No open ports detected</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {result.network?.services && result.network.services.length > 0 ? (
                          result.network.services.map((service, i) => (
                            <Badge key={i} variant="secondary">{service}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No services identified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reputation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Reputation & Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border border-border rounded-lg">
                    <div className={`text-4xl font-bold mb-2 ${
                      (result.reputation?.reports || 0) > 10 ? 'text-destructive' :
                      (result.reputation?.reports || 0) > 0 ? 'text-warning' : 'text-success'
                    }`}>
                      {result.reputation?.reports || 0}
                    </div>
                    <p className="font-medium">Abuse Reports</p>
                    {result.reputation?.lastReported && (
                      <p className="text-sm text-muted-foreground">Last reported: {result.reputation.lastReported}</p>
                    )}
                  </div>

                  {result.reputation?.categories && result.reputation.categories.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Threat Categories</label>
                      <div className="flex flex-wrap gap-2">
                        {result.reputation.categories.map((category, i) => (
                          <Badge key={i} variant="destructive">{category}</Badge>
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

export default IP;