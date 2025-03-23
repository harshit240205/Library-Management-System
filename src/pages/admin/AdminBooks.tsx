
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BookCard, { BookType } from '@/components/BookCard';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Sample book data
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

const AdminBooks = () => {
  const [books, setBooks] = useState<BookType[]>(sampleBooks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
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

  const handleAddBook = (newBook: Partial<BookType>) => {
    const book: BookType = {
      id: Date.now().toString(),
      title: newBook.title || 'Untitled',
      author: newBook.author || 'Unknown',
      isbn: newBook.isbn || '',
      available: true,
      published_year: newBook.published_year,
      category: newBook.category,
      cover: newBook.cover,
    };

    setBooks([...books, book]);
    setIsAddDialogOpen(false);
    toast({
      title: "Book Added",
      description: `"${book.title}" has been added to the library.`,
    });
  };

  const handleEditBook = (updatedBook: BookType) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setIsEditDialogOpen(false);
    setCurrentBook(null);
    toast({
      title: "Book Updated",
      description: `"${updatedBook.title}" has been updated.`,
    });
  };

  const handleDeleteBook = (bookId: string) => {
    const bookToDelete = books.find((book) => book.id === bookId);
    setBooks(books.filter((book) => book.id !== bookId));
    toast({
      title: "Book Deleted",
      description: `"${bookToDelete?.title}" has been removed from the library.`,
      variant: "destructive",
    });
  };

  const openEditDialog = (book: BookType) => {
    setCurrentBook(book);
    setIsEditDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Manage Books</h1>
            <p className="mt-2 text-muted-foreground">
              Add, edit, or remove books from your library
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
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
            <p className="text-muted-foreground">No books found</p>
            <Button 
              variant="link" 
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-2"
            >
              Add a new book
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={openEditDialog}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Enter the details of the book to add to your library
            </DialogDescription>
          </DialogHeader>
          <BookForm onSubmit={handleAddBook} />
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the details of this book
            </DialogDescription>
          </DialogHeader>
          {currentBook && (
            <BookForm book={currentBook} onSubmit={handleEditBook} />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface BookFormProps {
  book?: BookType;
  onSubmit: (book: Partial<BookType>) => void;
}

const BookForm = ({ book, onSubmit }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    cover: book?.cover || '',
    published_year: book?.published_year?.toString() || '',
    category: book?.category || '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...book,
      ...formData,
      published_year: formData.published_year ? parseInt(formData.published_year) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="author" className="text-right">
            Author
          </Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isbn" className="text-right">
            ISBN
          </Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="published_year" className="text-right">
            Year
          </Label>
          <Input
            id="published_year"
            name="published_year"
            type="number"
            value={formData.published_year}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cover" className="text-right">
            Cover URL
          </Label>
          <Input
            id="cover"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="col-span-3"
            placeholder="https://example.com/book-cover.jpg"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{book ? 'Update Book' : 'Add Book'}</Button>
      </DialogFooter>
    </form>
  );
};

export default AdminBooks;
