
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { BookOpen, CheckCircle, Users, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12">
        <div className="space-y-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            About <span className="text-primary">LibraryHub</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            A comprehensive library management system designed for educational institutions
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-8 shadow">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Rich Catalog Management</h2>
            </div>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Manage thousands of books with detailed information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Categorize by subject, author, and publication year</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Track book availability in real-time</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-8 shadow">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Student Management</h2>
            </div>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Manage student accounts and borrowing privileges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Track student borrowing history</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Handle overdue books and fine management</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-8 shadow">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Borrowing System</h2>
            </div>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Easy book checkout and return process</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Automated due date calculation and reminders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Extend borrowing periods with approval</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-8 shadow">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Reporting & Analytics</h2>
            </div>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Generate usage reports for administration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Analyze popular books and reading trends</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span>Track library resource utilization</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-muted p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to get started?</h2>
          <p className="mt-2 text-muted-foreground">
            Join thousands of schools already using LibraryHub to manage their libraries efficiently.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/signup">Create an Account</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearnMore;
