import { useState } from 'react';
import { Search, Github, Twitter, Instagram, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PlatformResult {
  platform: string;
  username: string;
  found: boolean;
  profile?: {
    bio?: string;
    followers?: number;
    avatar?: string;
    verified?: boolean;
  };
  url?: string;
}

const Username = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlatformResult[]>([]);
  const { toast } = useToast();

  const platforms = [
    { name: 'GitHub', icon: Github, color: 'text-foreground' },
    { name: 'Twitter', icon: Twitter, color: 'text-info' },
    { name: 'Instagram', icon: Instagram, color: 'text-destructive' },
    { name: 'Reddit', icon: Search, color: 'text-warning' },
  ];

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResults([]);

    // Simulate API calls with demo data
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResults: PlatformResult[] = platforms.map(platform => ({
      platform: platform.name,
      username,
      found: Math.random() > 0.3,
      profile: Math.random() > 0.3 ? {
        bio: `Software developer and ${platform.name} enthusiast`,
        followers: Math.floor(Math.random() * 10000),
        verified: Math.random() > 0.7,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      } : undefined,
      url: `https://${platform.name.toLowerCase()}.com/${username}`
    }));

    setResults(mockResults);
    setLoading(false);

    toast({
      title: "Search Complete",
      description: `Found ${mockResults.filter(r => r.found).length} profiles for ${username}`,
    });
  };

  const exportResults = (format: 'json' | 'csv') => {
    const data = results.filter(r => r.found);
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${username}_osint_results.json`;
      a.click();
    } else {
      const csv = [
        'Platform,Username,URL,Bio,Followers,Verified',
        ...data.map(r => `${r.platform},${r.username},${r.url},"${r.profile?.bio || ''}",${r.profile?.followers || 0},${r.profile?.verified || false}`)
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${username}_osint_results.csv`;
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold terminal-text">Username Intelligence</h1>
        <p className="text-xl text-muted-foreground">
          Search for username presence across multiple platforms
        </p>
      </div>

      {/* Search Form */}
      <Card className="cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Username Search</span>
          </CardTitle>
          <CardDescription>
            Enter a username to search across social platforms and code repositories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter username (e.g., johndoe)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
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
              <p className="text-muted-foreground">Scanning platforms...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportResults('json')}>
                Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportResults('csv')}>
                Export CSV
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => {
              const platform = platforms.find(p => p.name === result.platform);
              const Icon = platform?.icon || Search;

              return (
                <Card key={index} className={`${result.found ? 'border-primary cyber-glow' : 'border-muted'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${platform?.color || 'text-foreground'}`} />
                        <CardTitle className="text-lg">{result.platform}</CardTitle>
                      </div>
                      <Badge variant={result.found ? 'default' : 'secondary'}>
                        {result.found ? 'Found' : 'Not Found'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {result.found && result.profile && (
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={result.profile.avatar} 
                          alt="Avatar"
                          className="w-12 h-12 rounded-full border border-border"
                        />
                        <div>
                          <p className="font-semibold">@{result.username}</p>
                          {result.profile.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {result.profile.bio && (
                        <p className="text-sm text-muted-foreground">{result.profile.bio}</p>
                      )}
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-muted-foreground">
                          {result.profile.followers?.toLocaleString()} followers
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={result.url} target="_blank" rel="noopener noreferrer">
                            View Profile
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Username;