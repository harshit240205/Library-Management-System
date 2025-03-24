
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthContextType } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { fetchUserProfile } from '@/utils/userProfile';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { signIn, signUp, signOut: authSignOut, loading: actionLoading } = useAuthActions();

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const userData = await fetchUserProfile(session.user.id);
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = await fetchUserProfile(session.user.id);
          
          if (userData) {
            setUser(userData);
            
            // Redirect based on role
            if (userData.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/student');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/login');
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
