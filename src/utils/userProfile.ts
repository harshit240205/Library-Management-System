
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

export async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    console.log("Fetching user profile for ID:", userId);
    
    // First check if the profile exists
    const { data: userData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Error fetching profile:", error.message);
      
      // If profile doesn't exist, try to get basic user data from auth
      const { data: authUser } = await supabase.auth.admin.getUserById(userId);
      if (authUser?.user) {
        console.log("Retrieved user from auth:", authUser.user);
        return {
          id: userId,
          email: authUser.user.email || '',
          role: 'student', // Default role
          name: authUser.user.user_metadata?.name,
          studentId: authUser.user.user_metadata?.student_id
        };
      }
      
      return null;
    }
    
    console.log("User profile found:", userData);
    
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
