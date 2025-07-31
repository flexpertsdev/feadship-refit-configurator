// ==================================================
// AI EXPLANATION: App.tsx
// ==================================================
// WHAT: Main React application component that sets up routing, providers (React Query, Auth, Tooltip), and defines all application routes with protected access control
// WHY: Without this file, the entire application won't start - it's the root component that React mounts and contains all route definitions and provider setup
// USED BY: main.tsx (renders this component), all page components are routed through here
// CRITICAL: YES - Deleting breaks entire app, modifying routes affects navigation throughout the app
// ==================================================

// Removed toast imports
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

// Import all pages
import SplashPage from "./pages/SplashPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DesignPage from "./pages/DesignPage";

import Operations1Page from "./pages/Operations1Page";
import Operations2Page from "./pages/Operations2Page";
import Operations3Page from "./pages/Operations3Page";
import ConfiguratorPage from "./pages/ConfiguratorPage";
import FeaturesPage from "./pages/FeaturesPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ServicesPage from "./pages/ServicesPage";
import SummaryPage from "./pages/SummaryPage";
import FontTestPage from "./pages/FontTestPage";
import FontTestFirebase from "./pages/FontTestFirebase";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DebugPanel from "./components/debug/DebugPanel";

// Create a query client instance
const queryClient = new QueryClient();

// Here we define the App component with proper provider ordering
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            {/* Debug panel appears on all pages */}
            <DebugPanel />
            
            {/* Removed toast components */}
            <Routes>
              {/* Configurator pages without AppLayout */}
              <Route path="/configurator" element={
                <ProtectedRoute>
                  <ConfiguratorPage />
                </ProtectedRoute>
              } />
              <Route path="/extensions" element={
                <ProtectedRoute>
                  <ConfiguratorPage />
                </ProtectedRoute>
              } />
              
              {/* All other pages with AppLayout */}
              <Route element={<AppLayout />}>
                {/* Splash page is the root */}
                <Route path="/" element={<SplashPage />} />
                
                {/* Authentication route */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                
                {/* Design routes - protected */}
                <Route path="/design/:variant" element={
                  <ProtectedRoute>
                    <DesignPage />
                  </ProtectedRoute>
                } />
                
                {/* Redirect old routes for backward compatibility */}
                <Route path="/design1" element={<Navigate to="/design/1" replace />} />
                <Route path="/design2" element={<Navigate to="/design/2" replace />} />
                <Route path="/design3" element={<Navigate to="/design/3" replace />} />
                
                {/* Operations routes - protected */}
                <Route path="/operations1" element={
                  <ProtectedRoute>
                    <Operations1Page />
                  </ProtectedRoute>
                } />
                <Route path="/operations2" element={
                  <ProtectedRoute>
                    <Operations2Page />
                  </ProtectedRoute>
                } />
                <Route path="/operations3" element={
                  <ProtectedRoute>
                    <Operations3Page />
                  </ProtectedRoute>
                } />
                
                {/* Other main routes - protected */}
                <Route path="/features" element={
                  <ProtectedRoute>
                    <FeaturesPage />
                  </ProtectedRoute>
                } />
                <Route path="/sustainability" element={
                  <ProtectedRoute>
                    <SustainabilityPage />
                  </ProtectedRoute>
                } />
                <Route path="/services" element={
                  <ProtectedRoute>
                    <ServicesPage />
                  </ProtectedRoute>
                } />
                <Route path="/summary" element={
                  <ProtectedRoute>
                    <SummaryPage />
                  </ProtectedRoute>
                } />
                
                {/* Font test pages - public access */}
                <Route path="/font-test" element={<FontTestPage />} />
                <Route path="/font-test-firebase" element={<FontTestFirebase />} />
                
                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
