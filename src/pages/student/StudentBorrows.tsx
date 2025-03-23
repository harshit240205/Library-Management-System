
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Book, Calendar, Check } from 'lucide-react';

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
  coverImage?: string;
}

const StudentBorrows = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([
    {
      id: '1',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      borrowDate: '2023-04-10',
      dueDate: '2023-05-10',
      isOverdue: true,
    },
    {
      id: '2',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      borrowDate: '2023-05-01',
      dueDate: '2023-06-01',
      isOverdue: false,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
  ]);
  const { toast } = useToast();

  const handleReturnBook = (bookId: string) => {
    const bookToReturn = borrowedBooks.find((book) => book.id === bookId);
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
    
    toast({
      title: "Book Returned",
      description: `You have successfully returned "${bookToReturn?.title}".`,
    });
  };

  const handleRenewBook = (bookId: string) => {
    setBorrowedBooks(
      borrowedBooks.map((book) => {
        if (book.id === bookId) {
          // Add 14 days to the due date
          const newDueDate = new Date(book.dueDate);
          newDueDate.setDate(newDueDate.getDate() + 14);
          
          return {
            ...book,
            dueDate: newDueDate.toISOString().split('T')[0],
            isOverdue: false,
          };
        }
        return book;
      })
    );
    
    const bookToRenew = borrowedBooks.find((book) => book.id === bookId);
    toast({
      title: "Book Renewed",
      description: `You have successfully renewed "${bookToRenew?.title}" for 14 more days.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">My Borrowed Books</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your current loans and returns
          </p>
        </div>

        {borrowedBooks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium">No Borrowed Books</h3>
              <p className="mt-2 text-muted-foreground">
                You don't have any books checked out at the moment.
              </p>
              <Button className="mt-6" asChild>
                <a href="/student/books">Browse Books</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {borrowedBooks.map((book) => (
              <Card key={book.id} className={book.isOverdue ? "border-red-300" : ""}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-[3/4] h-full w-full">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full w-full rounded-l-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Book className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="font-display text-xl">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-2 p-0">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Borrowed: {formatDate(book.borrowDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className={`mr-2 h-4 w-4 ${book.isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
                        <span className={book.isOverdue ? 'text-red-500 font-medium' : ''}>
                          Due: {formatDate(book.dueDate)}
                          {book.isOverdue && ' (Overdue)'}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 p-0 pt-4">
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleReturnBook(book.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Return
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleRenewBook(book.id)}
                        disabled={book.isOverdue}
                      >
                        {book.isOverdue ? 'Cannot Renew' : 'Renew'}
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentBorrows;
