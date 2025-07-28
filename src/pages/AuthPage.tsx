// ==================================================
// AI EXPLANATION: AuthPage.tsx
// ==================================================
// WHAT: Authentication page with sign in/sign up tabs, email/password forms, and guest access option - uses mock auth context
// WHY: Without this, users can't create accounts or sign in to save yacht configurations - provides authentication UI flow
// USED BY: App.tsx (route /auth), linked from SplashPage and protected routes redirect here
// CRITICAL: YES - Authentication gateway for user accounts and saved configurations
// ==================================================


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is already logged in, redirect to home or the last visited page
  useEffect(() => {
    if (user) {
      const redirectPath = sessionStorage.getItem('redirectPath') || '/home';
      navigate(redirectPath, { replace: true });
      sessionStorage.removeItem('redirectPath');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (!error) {
        // Will be redirected by the useEffect above when user state changes
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      if (!error) {
        // Stay on auth page after signup to prompt for login
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-primary-light">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-neutral hover:text-primary transition-colors mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-3xl font-bold text-center text-primary flex-1">Authentication</h2>
        </div>

        <Tabs defaultValue="signin" className="mb-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent-hover" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-neutral-400">Password must be at least 6 characters</p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent-hover" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            to="/home"
            className="block text-center text-accent hover:underline"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
