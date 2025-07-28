// ==================================================
// AI EXPLANATION: NotFound.tsx
// ==================================================
// WHAT: 404 error page component displaying not found message with home link and console error logging for debugging
// WHY: Without this, users hitting invalid routes see a blank page - provides user-friendly error handling and debugging info
// USED BY: App.tsx (catch-all route *), displayed when no routes match
// CRITICAL: NO - Error handling page, not critical for functionality but important for UX
// ==================================================

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
