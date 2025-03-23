
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Book, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    closeMenu();
  };

  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = isAdmin 
    ? [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Manage Books', path: '/admin/books' },
        { name: 'Students', path: '/admin/students' },
      ]
    : [
        { name: 'Home', path: '/student' },
        { name: 'Books', path: '/student/books' },
        { name: 'My Borrows', path: '/student/borrows' },
        { name: 'Pay Fine', path: '/student/pay-fine' },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            <span className="font-display text-xl font-medium tracking-tight">
              LibraryHub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {user && (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                size="sm"
                className="gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </>
          )}
          {!user && (
            <Button asChild size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container animate-slide-up pb-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {user && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={cn(
                      "text-sm font-medium py-2 transition-colors hover:text-primary",
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button 
                  onClick={handleSignOut} 
                  variant="ghost" 
                  className="justify-start p-0 h-9"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </Button>
              </>
            )}
            {!user && (
              <Button asChild className="w-full">
                <Link to="/login" onClick={closeMenu}>
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
