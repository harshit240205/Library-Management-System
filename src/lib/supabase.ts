
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'student';
  name?: string;
  studentId?: string;
};

/*
To set up an admin user:
1. Sign up a new user in Supabase Authentication
2. In the Supabase Database, create a 'profiles' table with fields:
   - id (references auth.users.id)
   - email (text)
   - role (text, set to 'admin' for admin users)
   - name (text, optional)
   - student_id (text, null for admin)
3. Insert a record for the admin user with role='admin'

Admin credentials for testing:
- Email: admin@library.com
- Password: AdminPass123
*/

// Database schema setup instructions:
/*
For the Library Management System, you'll need to create these tables in Supabase:

1. profiles (already mentioned above)
   - id (uuid, references auth.users.id)
   - email (text)
   - role (text, 'admin' or 'student')
   - name (text, optional)
   - student_id (text, null for admin)

2. books
   - id (uuid, primary key)
   - title (text, not null)
   - author (text, not null)
   - isbn (text, unique)
   - cover (text, URL to image, optional)
   - available (boolean, default true)
   - published_year (integer, optional)
   - category (text, optional)

3. borrows
   - id (uuid, primary key)
   - book_id (uuid, references books.id)
   - user_id (uuid, references profiles.id)
   - borrowed_date (timestamp with time zone, default now())
   - due_date (timestamp with time zone, not null)
   - returned_date (timestamp with time zone, null if not returned)
   - fine_amount (decimal, default 0)
   - fine_paid (boolean, default false)

To access this data, use the supabase client as shown in the examples below:

// Example: Fetch all books
const { data: books, error } = await supabase
  .from('books')
  .select('*');

// Example: Borrow a book
const { data, error } = await supabase
  .from('borrows')
  .insert([
    {
      book_id: 'book-uuid',
      user_id: 'user-uuid',
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    }
  ]);
*/
