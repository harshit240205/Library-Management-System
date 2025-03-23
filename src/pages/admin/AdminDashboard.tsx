
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BarChart, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const AdminDashboard = () => {
  // In a real app, these would be fetched from the backend
  const stats = {
    totalBooks: 532,
    availableBooks: 423,
    totalStudents: 180,
    activeLoans: 109,
    overdue: 14,
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Overview of your library management system
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Total Books" 
            value={stats.totalBooks} 
            description="Books in catalog"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            link="/admin/books"
          />
          <StatsCard 
            title="Available" 
            value={stats.availableBooks} 
            description="Books available"
            icon={<BookMarked className="h-5 w-5 text-emerald-500" />}
            link="/admin/books"
          />
          <StatsCard 
            title="Students" 
            value={stats.totalStudents} 
            description="Registered students"
            icon={<Users className="h-5 w-5 text-violet-500" />}
            link="/admin/students"
          />
          <StatsCard 
            title="Active Loans" 
            value={stats.activeLoans} 
            description={`${stats.overdue} overdue`}
            icon={<BarChart className="h-5 w-5 text-amber-500" />}
            link="/admin/loans"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events in your library</CardDescription>
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
              <CardTitle>Overdue Books</CardTitle>
              <CardDescription>Books that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Overdue items would go here */}
                <p className="text-muted-foreground">No overdue books to display.</p>
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

export default AdminDashboard;
