
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in with:", email);
      
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error.message);
        throw error;
      }
      
      console.log("Sign in successful:", data);
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast({
        title: "Error signing in",
        description: error.message || "Invalid login credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string, studentId?: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign up with:", email);
      
      // First check if this is a demo account
      if (email === 'admin@library.com' || email === 'student@library.com') {
        toast({
          title: "Demo Account",
          description: "This is a demo account. Please use the 'Use Admin Demo' or 'Use Student Demo' buttons on the login page.",
          variant: "destructive",
        });
        return;
      }
      
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            student_id: studentId
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error.message);
        throw error;
      }
      
      console.log("Sign up successful:", data);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please sign in with your credentials.",
      });
      
      // Navigate to login page after successful signup
      navigate('/login');
      
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      console.error("Sign out error:", error.message);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signIn,
    signUp,
    signOut
  };
}
