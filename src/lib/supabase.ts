
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
