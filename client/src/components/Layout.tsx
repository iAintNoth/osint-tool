import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Globe, Mail, MapPin, Terminal } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/username', label: 'Username', icon: Search },
    { path: '/domain', label: 'Domain', icon: Globe },
    { path: '/email', label: 'Email', icon: Mail },
    { path: '/ip', label: 'IP Address', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <Terminal className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              <span className="text-2xl font-bold terminal-text">OSINT Portal</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                    location.pathname === path
                      ? 'bg-primary text-primary-foreground cyber-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>OSINT Portal - © 2025 copyright iAintNoth</p>
            <p className="mt-1">Built for ethical security research and investigations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;