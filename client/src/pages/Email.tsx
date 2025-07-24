import { useState } from 'react';
import { Mail, AlertTriangle, Shield, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface EmailResult {
  email: string;
  validation?: {
    valid: boolean;
    deliverable: boolean;
    domain: string;
    type: 'personal' | 'professional' | 'disposable';
  };
  breaches?: {
    count: number;
    breaches: Array<{
      name: string;
      date: string;
      dataClasses: string[];
      verified: boolean;
    }>;
  };
  reputation?: {
    score: number;
    riskLevel: 'low' | 'medium' | 'high';
    sources: string[];
  };
}

const Email = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address to analyze",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API calls with demo data
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockResult: EmailResult = {
      email,
      validation: {
        valid: true,
        deliverable: Math.random() > 0.3,
        domain: email.split('@')[1],
        type: email.includes('gmail') || email.includes('yahoo') ? 'personal' : 'professional'
      },
      breaches: {
        count: Math.floor(Math.random() * 5),
        breaches: [
          {
            name: "Adobe",
            date: "2013-10-04",
            dataClasses: ["Email addresses", "Password hints", "Passwords", "Usernames"],
            verified: true
          },
          {
            name: "LinkedIn",
            date: "2012-05-05",
            dataClasses: ["Email addresses", "Passwords"],
            verified: true
          }
        ].slice(0, Math.floor(Math.random() * 3))
      },
      reputation: {
        score: Math.floor(Math.random() * 100),
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        sources: ['VirusTotal', 'AbuseIPDB', 'ThreatMiner']
      }
    };

    setResult(mockResult);
    setLoading(false);

    toast({
      title: "Analysis Complete",
      description: `Email analysis completed for ${email}`,
    });
  };

  const exportResults = (format: 'json' | 'csv') => {
    if (!result) return;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${email.replace('@', '_')}_email_analysis.json`;
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold terminal-text">Email Intelligence</h1>
        <p className="text-xl text-muted-foreground">
          Email validation, breach detection, and reputation analysis
        </p>
      </div>

      {/* Search Form */}
      <Card className="cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email Investigation</span>
          </CardTitle>
          <CardDescription>
            Enter an email address for comprehensive security and breach analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter email address (e.g., user@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                <Mail className="w-4 h-4 mr-2" />
              )}
              Investigate
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
              <p className="text-muted-foreground">Investigating email...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Investigation Results</h2>
            <Button variant="outline" onClick={() => exportResults('json')}>
              Export JSON
            </Button>
          </div>

          <Tabs defaultValue="validation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="breaches">Data Breaches</TabsTrigger>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>

            <TabsContent value="validation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Email Validation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.validation?.valid ? 'text-success' : 'text-destructive'}`}>
                        {result.validation?.valid ? '✓' : '✗'}
                      </div>
                      <p className="font-medium">Format Valid</p>
                      <p className="text-sm text-muted-foreground">
                        {result.validation?.valid ? 'Valid email format' : 'Invalid format'}
                      </p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className={`text-2xl mb-2 ${result.validation?.deliverable ? 'text-success' : 'text-warning'}`}>
                        {result.validation?.deliverable ? '✓' : '?'}
                      </div>
                      <p className="font-medium">Deliverable</p>
                      <p className="text-sm text-muted-foreground">
                        {result.validation?.deliverable ? 'Can receive emails' : 'Unknown status'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Domain</label>
                      <p className="font-mono">{result.validation?.domain}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <Badge variant={result.validation?.type === 'professional' ? 'default' : 'secondary'}>
                        {result.validation?.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breaches" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Data Breach History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 border border-border rounded-lg mb-4">
                    <div className={`text-3xl font-bold mb-2 ${(result.breaches?.count || 0) > 0 ? 'text-destructive' : 'text-success'}`}>
                      {result.breaches?.count || 0}
                    </div>
                    <p className="font-medium">Breaches Found</p>
                  </div>

                  {result.breaches?.breaches && result.breaches.breaches.length > 0 ? (
                    <div className="space-y-4">
                      {result.breaches.breaches.map((breach, index) => (
                        <div key={index} className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{breach.name}</h4>
                            <div className="flex space-x-2">
                              <Badge variant={breach.verified ? 'destructive' : 'secondary'}>
                                {breach.verified ? 'Verified' : 'Unverified'}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Date: {breach.date}</p>
                          <div className="flex flex-wrap gap-1">
                            {breach.dataClasses.map((dataClass, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {dataClass}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No data breaches found for this email address
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reputation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Reputation Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border border-border rounded-lg">
                    <div className="mb-4">
                      <div className={`text-4xl font-bold mb-2 ${
                        result.reputation?.riskLevel === 'high' ? 'text-destructive' :
                        result.reputation?.riskLevel === 'medium' ? 'text-warning' : 'text-success'
                      }`}>
                        {result.reputation?.score}/100
                      </div>
                      <p className="font-medium">Reputation Score</p>
                    </div>
                    <Badge 
                      variant={
                        result.reputation?.riskLevel === 'high' ? 'destructive' :
                        result.reputation?.riskLevel === 'medium' ? 'secondary' : 'default'
                      }
                      className="mb-4"
                    >
                      {result.reputation?.riskLevel?.toUpperCase()} RISK
                    </Badge>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Intelligence Sources</label>
                    <div className="flex flex-wrap gap-2">
                      {result.reputation?.sources.map((source, i) => (
                        <Badge key={i} variant="outline">{source}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Email;