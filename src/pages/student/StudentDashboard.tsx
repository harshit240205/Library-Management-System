
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BookOpen, CalendarClock, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  // In a real app, these would be fetched from the backend
  const stats = {
    borrowedBooks: 2,
    dueToday: 0,
    overdue: 0,
    fineAmount: '$0.00',
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome, {user?.name || 'Student'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {user?.studentId ? `Student ID: ${user.studentId}` : 'Your library dashboard'}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Books Borrowed" 
            value={stats.borrowedBooks} 
            description="Currently checked out"
            icon={<Book className="h-5 w-5 text-primary" />}
            link="/student/borrows"
          />
          <StatsCard 
            title="Due Today" 
            value={stats.dueToday} 
            description="Return ASAP"
            icon={<CalendarClock className="h-5 w-5 text-amber-500" />}
            link="/student/borrows"
          />
          <StatsCard 
            title="Overdue" 
            value={stats.overdue} 
            description="Return immediately"
            icon={<BookOpen className="h-5 w-5 text-red-500" />}
            link="/student/borrows"
          />
          <StatsCard 
            title="Total Fines" 
            value={stats.fineAmount} 
            description="Outstanding balance"
            icon={<ReceiptText className="h-5 w-5 text-emerald-500" />}
            link="/student/pay-fine"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recently Borrowed Books</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Activity items would go here */}
                <p className="text-muted-foreground">No recent activity to display.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Due Dates</CardTitle>
              <CardDescription>Books to return soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Due date items would go here */}
                <p className="text-muted-foreground">No upcoming due dates.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const StatsCard = ({ title, value, description, icon, link }: StatsCardProps) => (
  <Card>
    <Link to={link} className="block h-full p-6 transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-full bg-background p-2 shadow-sm">{icon}</div>
      </div>
    </Link>
  </Card>
);

export default StudentDashboard;
