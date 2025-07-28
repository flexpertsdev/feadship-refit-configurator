// ==================================================
// AI EXPLANATION: ProtectedRoute.tsx
// ==================================================
// WHAT: Route wrapper component that checks authentication status and redirects unauthenticated users to login, preserving intended destination
// WHY: Without this, protected pages would be accessible without login - enforces authentication requirements for user-specific features
// USED BY: App.tsx to wrap routes that require authentication (saved configurations, user-specific data)
// CRITICAL: YES - Security component that prevents unauthorized access to protected routes
// ==================================================


import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Store the current path in session storage when navigating
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('lastPath', location.pathname);
    }
  }, [location.pathname, user]);

  if (loading) {
    // Show loading state while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page, storing the intended destination
  if (!user) {
    sessionStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // For admin routes, check role (this is a placeholder, implement as needed)
  if (requiredRole === 'admin') {
    // Replace with actual role check logic
    const isAdmin = false; // Example logic, replace with actual admin check
    if (!isAdmin) {
      return <Navigate to="/home" replace />;
    }
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
