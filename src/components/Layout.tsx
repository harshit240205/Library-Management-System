
import React from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main 
        className={cn(
          "flex-1 px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300 ease-in-out page-transition-wrapper",
          className
        )}
      >
        <div
          key={location.pathname}
          className="page-transition"
        >
          {children}
        </div>
      </main>
      <footer className="border-t py-6 px-4 sm:px-6 lg:px-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
