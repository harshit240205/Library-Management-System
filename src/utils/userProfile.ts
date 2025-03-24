
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

export async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    const { data: userData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (!userData) return null;
    
    return {
      id: userId,
      email: userData.email || '',
      role: (userData.role as 'admin' | 'student') || 'student',
      name: userData.name,
      studentId: userData.student_id
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
