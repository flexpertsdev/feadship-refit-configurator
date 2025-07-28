// ==================================================
// AI EXPLANATION: AppLayout.tsx
// ==================================================
// WHAT: Root layout wrapper component that conditionally renders NavigationBar and LogoRow based on current route, manages page scroll behavior
// WHY: Without this, navigation and branding wouldn't appear consistently across pages - it provides the app-wide layout structure
// USED BY: App.tsx (wraps most routes except configurator pages), provides layout for all main pages
// CRITICAL: YES - Structural layout component, modifying affects appearance and navigation on all non-configurator pages
// ==================================================


import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';
import LogoRow from './LogoRow';
import { useNavigationSync } from '@/hooks/useNavigationSync';

// Pages where logo row should be hidden
const NO_LOGO_PATHS = ['/configurator', '/extensions'];
// Pages where navigation bar should be hidden
const NO_NAV_PATHS = ['/', '/home', '/auth', '/admin'];
// Pages where full scrolling should be enabled
const SCROLLABLE_PATHS = ['/home'];



const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  );
};

export default AppLayout;