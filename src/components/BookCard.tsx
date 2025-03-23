
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Book, Edit, Trash } from 'lucide-react';

export interface BookType {
  id: string;
  title: string;
  author: string;
  isbn: string;
  cover?: string;
  available: boolean;
  published_year?: number;
  category?: string;
}

interface BookCardProps {
  book: BookType;
  onBorrow?: (bookId: string) => void;
  onEdit?: (book: BookType) => void;
  onDelete?: (bookId: string) => void;
  className?: string;
}

const BookCard = ({
  book,
  onBorrow,
  onEdit,
  onDelete,
  className,
}: BookCardProps) => {
  const { isAdmin } = useAuth();
  const placeholderCover = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3";

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        !book.available && "opacity-75",
        className
      )}
    >
      <div 
        className="aspect-[4/5] w-full relative overflow-hidden"
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <img
              src={placeholderCover}
              alt="Book cover placeholder"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        {!book.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-lg font-medium text-white">Borrowed</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-medium leading-none">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {book.category && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
              {book.category}
            </div>
          )}
          {book.published_year && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
              {book.published_year}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex p-4 pt-0">
        {isAdmin ? (
          <div className="flex w-full gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(book)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(book.id)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
          </div>
        ) : (
          <>
            {onBorrow && (
              <Button
                className="w-full"
                variant={book.available ? "default" : "outline"}
                disabled={!book.available}
                onClick={() => book.available && onBorrow(book.id)}
              >
                <Book className="mr-2 h-4 w-4" />
                {book.available ? "Borrow" : "Unavailable"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
