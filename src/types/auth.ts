
import { User as SupabaseUser } from '@supabase/supabase-js';

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'student';
  name?: string;
  studentId?: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  signUp: (email: string, password: string, name?: string, studentId?: string) => Promise<void>;
}
