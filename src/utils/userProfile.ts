
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

export async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    console.log("Fetching user profile for ID:", userId);
    
    // For demo accounts, return hardcoded profiles
    if (userId === 'demo-admin-id') {
      console.log("Returning demo admin profile");
      return {
        id: 'demo-admin-id',
        email: 'admin@library.com',
        role: 'admin',
        name: 'Admin User'
      };
    } else if (userId === 'demo-student-id') {
      console.log("Returning demo student profile");
      return {
        id: 'demo-student-id',
        email: 'student@library.com',
        role: 'student',
        name: 'Student User',
        studentId: 'STU12345'
      };
    }
    
    // First check if the profile exists
    const { data: userData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Error fetching profile:", error.message);
      
      // If profile doesn't exist, try to get basic user data from auth
      const { data: authData } = await supabase.auth.getUser();
      
      if (authData && authData.user) {
        console.log("Retrieved user from auth session:", authData.user);
        return {
          id: userId,
          email: authData.user.email || '',
          role: 'student', // Default role
          name: authData.user.user_metadata?.name,
          studentId: authData.user.user_metadata?.student_id
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
