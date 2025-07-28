// ==================================================
// AI EXPLANATION: AuthContext.tsx
// ==================================================
// WHAT: React context providing mock authentication state and methods (signIn, signUp, signOut) using localStorage instead of real auth service for demo purposes
// WHY: Without this, no user authentication would work - protected routes would be inaccessible and yacht configurations couldn't be associated with users
// USED BY: App.tsx (wraps entire app), ProtectedRoute component, AuthPage, HomePage, any component using useAuth hook
// CRITICAL: YES - Core authentication system, breaking this prevents login/signup and access to protected configuration pages
// ==================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import { localStorageService } from '@/services/localStorageService';
// Removed toast import

// Mock types to replace Supabase types
type User = {
  id: string;
  email: string;
  created_at: string;
};

type Session = {
  user: User;
  access_token: string;
  expires_at: number;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Removed toast hook

  useEffect(() => {
    // Check for existing session in localStorage
    const initializeAuth = async () => {
      try {
        const { data: authData } = await localStorageService.getAuth();
        
        if (authData && authData.session) {
          // Check if session is still valid
          const now = Date.now();
          if (authData.session.expires_at > now) {
            setSession(authData.session);
            setUser(authData.session.user);
          } else {
            // Session expired, clear it
            await localStorageService.clearAuth();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // For demo purposes, accept any email/password
      // In production, this would validate against a real auth service
      
      if (!email || !password) {
        const error = { message: 'Email and password are required' };
        console.error("Login failed:", error.message);
        return { error };
      }

      // Create mock user and session
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        created_at: new Date().toISOString()
      };

      const mockSession: Session = {
        user: mockUser,
        access_token: `mock-token-${Date.now()}`,
        expires_at: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      };

      // Save to localStorage
      await localStorageService.setAuth({
        user: mockUser,
        session: mockSession
      });

      setSession(mockSession);
      setUser(mockUser);
      
      console.log(`Welcome back! Logged in as ${email}`);
      
      return { error: null };
    } catch (error: any) {
      console.error("Login failed:", error.message || "An unexpected error occurred");
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // For demo purposes, create a new user
      // In production, this would create a real account
      
      if (!email || !password) {
        const error = { message: 'Email and password are required' };
        console.error("Signup failed:", error.message);
        return { error };
      }

      // Check if user already exists
      const { data: authData } = await localStorageService.getAuth();
      if (authData && authData.users) {
        const existingUser = authData.users.find(u => u.email === email);
        if (existingUser) {
          const error = { message: 'User already exists' };
          console.error("Signup failed:", error.message);
          return { error };
        }
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        created_at: new Date().toISOString()
      };

      // Save user to localStorage (but don't log them in)
      const users = authData?.users || [];
      users.push(newUser);
      
      await localStorageService.setAuth({
        ...authData,
        users
      });
      
      console.log("Account created: Please log in with your new account");
      
      return { error: null };
    } catch (error: any) {
      console.error("Signup failed:", error.message || "An unexpected error occurred");
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await localStorageService.clearAuth();
      setSession(null);
      setUser(null);
      
      console.log("Logged out: You have been successfully logged out");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};