
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthContextType } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { fetchUserProfile } from '@/utils/userProfile';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, signOut: authSignOut, loading: actionLoading } = useAuthActions();

  useEffect(() => {
    console.log("AuthProvider initializing...");
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session) {
          try {
            setLoading(true);
            // Get user profile from timeout to avoid auth deadlock
            setTimeout(async () => {
              try {
                const userData = await fetchUserProfile(session.user.id);
                
                if (userData) {
                  console.log("User data retrieved on auth change:", userData);
                  setUser(userData);
                  
                  // Redirect based on role
                  if (userData.role === 'admin') {
                    navigate('/admin');
                  } else {
                    navigate('/student');
                  }
                } else {
                  console.error("Failed to get user data after sign in");
                  toast({
                    title: "Error",
                    description: "Failed to retrieve your user profile. Please try again.",
                    variant: "destructive"
                  });
                }
              } catch (error) {
                console.error("Error processing profile:", error);
              } finally {
                setLoading(false);
              }
            }, 0);
          } catch (error) {
            console.error("Error processing sign in:", error);
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          navigate('/login');
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found:", session.user.id);
          const userData = await fetchUserProfile(session.user.id);
          
          if (userData) {
            console.log("User data retrieved:", userData);
            setUser(userData);
          } else {
            console.log("No user data found for session");
          }
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error('Error fetching initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await authSignOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: loading || actionLoading, 
      signIn,
      signUp, 
      signOut: handleSignOut,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export type { User };
