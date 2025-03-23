
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Book, BookOpen, Users } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();

  // If logged in, redirect to appropriate dashboard
  if (user && !loading) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/student" replace />;
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-12 text-center md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl animate-scale-in">
        <div className="mb-8 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
          <Book className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Welcome to <span className="text-primary">LibraryHub</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          A modern library management system designed for efficiency and simplicity
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="mt-24 grid w-full max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-panel">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-medium">Rich Book Catalog</h3>
            <p className="mt-2 text-muted-foreground">
              Browse through our extensive collection of books across various genres and subjects
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-medium">Easy Student Access</h3>
            <p className="mt-2 text-muted-foreground">
              Students can borrow books, track returns, and manage payments all in one place
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel md:col-span-2 lg:col-span-1">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-medium">Efficient Administration</h3>
            <p className="mt-2 text-muted-foreground">
              Administrators can easily manage books, student accounts, and track library statistics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
