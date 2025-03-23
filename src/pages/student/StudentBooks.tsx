
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import BookCard, { BookType } from '@/components/BookCard';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample book data - same as admin page but for student view
const sampleBooks: BookType[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    available: true,
    published_year: 1925,
    category: 'Fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780060935467',
    available: false,
    published_year: 1960,
    category: 'Fiction'
  },
  {
    id: '3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
    available: true,
    published_year: 1988,
    category: 'Science',
    cover: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    available: true,
    published_year: 1813,
    category: 'Classic'
  },
];

const StudentBooks = () => {
  const [books] = useState<BookType[]>(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  const handleBorrowBook = (bookId: string) => {
    const bookToBorrow = books.find((book) => book.id === bookId);
    toast({
      title: "Book Borrowed",
      description: `You have successfully borrowed "${bookToBorrow?.title}".`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Browse Books</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and borrow books from our library
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books by title, author, or ISBN..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {filteredBooks.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No books found matching your search</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrow={handleBorrowBook}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentBooks;
