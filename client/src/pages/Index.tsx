import { Link } from 'react-router-dom';
import { Search, Globe, Mail, MapPin, Shield, Terminal, Eye, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: 'Username Intelligence',
      description: 'Search for username presence across multiple social platforms and repositories',
      path: '/username',
      color: 'text-primary'
    },
    {
      icon: Globe,
      title: 'Domain Analysis',
      description: 'Comprehensive WHOIS, DNS records, and security analysis',
      path: '/domain',
      color: 'text-accent'
    },
    {
      icon: Mail,
      title: 'Email Investigation',
      description: 'Email validation, breach detection, and professional analysis',
      path: '/email',
      color: 'text-warning'
    },
    {
      icon: MapPin,
      title: 'IP Intelligence',
      description: 'Geolocation, reverse DNS, and threat intelligence analysis',
      path: '/ip',
      color: 'text-info'
    }
  ];

  const stats = [
    { label: 'Platforms Monitored', value: '25+', icon: Eye },
    { label: 'Data Sources', value: '15+', icon: Database },
    { label: 'Security Checks', value: '50+', icon: Shield }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <Terminal className="w-16 h-16 text-primary cyber-glow" />
        </div>
        <h1 className="text-5xl font-bold terminal-text">
          OSINT Portal
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive Open Source Intelligence gathering platform for ethical security research, 
          threat intelligence, and digital investigations.
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <Button size="lg" className="cyber-glow" asChild>
            <Link to="/username">Start Investigation</Link>
          </Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center cyber-glow">
            <CardContent className="pt-6">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold terminal-text mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Intelligence Modules</h2>
          <p className="text-lg text-muted-foreground">
            Powerful OSINT tools for comprehensive digital reconnaissance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:border-primary transition-all duration-300 cyber-glow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <feature.icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                  <Link to={feature.path}>
                    Launch Module
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <Card className="border-warning bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <Shield className="w-5 h-5" />
            <span>Ethical Use Notice</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This tool is designed for legitimate security research, threat intelligence, and authorized investigations only. 
            Users are responsible for ensuring compliance with applicable laws and regulations. 
            Always respect privacy and obtain proper authorization before conducting investigations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
