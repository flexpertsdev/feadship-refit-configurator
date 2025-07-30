// ==================================================
// AI EXPLANATION: MobileNavigation.tsx
// ==================================================
// WHAT: Mobile hamburger menu overlay component displaying full navigation hierarchy with slide-in animation for small screens
// WHY: Without this, mobile users can't access navigation - provides touch-friendly menu overlay for phones and tablets
// USED BY: NavigationBar component when mobile menu is toggled via hamburger button
// CRITICAL: YES - Essential for mobile navigation, breaking this makes app unusable on phones
// ==================================================


import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
// Temporarily using V2 for testing
import { NAVIGATION_ITEMS } from '../../utils/navigationUtilsV2';

// Custom Home Icon SVG component
const HomeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="23.263" 
    height="20.815" 
    viewBox="0.612 1.612 23.263 20.815"
    className="fill-current"
  >
    <g data-name="Group 161">
      <g data-name="Group 3" transform="translate(0 1)" clipPath="url(#mobile-home-icon-clip)">
        <path d="M21.427 8.344v13.083h-4.898v-5.51c0-.676-.548-1.224-1.224-1.224H9.183c-.677 0-1.224.548-1.224 1.224v5.51H3.06V8.344" fill="currentColor" fillRule="evenodd" data-name="Path 27"/>
        <path d="M.612 10.407 12.244.612l11.632 9.795" fill="currentColor" fillRule="evenodd" data-name="Path 28"/>
      </g>
    </g>
    <defs>
      <clipPath id="mobile-home-icon-clip">
        <path d="M0 0h24v22H0V0z" data-name="Rectangle 56"/>
      </clipPath>
    </defs>
  </svg>
);

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeLevel1: string | null;
  activeLevel2: string | null;
  activeLevel3: string | null;
  onNavigate: (level1: string | null, level2: string | null, level3?: string | null) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen,
  activeLevel1,
  activeLevel2,
  activeLevel3,
  onNavigate
}) => {
  
  const handleHome = () => {
    // Navigate to home handled by Link component
    setMobileMenuOpen(false);
  };
  
  if (!mobileMenuOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
      <div className="flex flex-col h-full w-4/5 max-w-xs bg-primary animate-in slide-in-from-left">
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <Link to="/home" onClick={handleHome} className="p-2">
            <HomeIcon />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.id} className="border-b border-white/20">
              <Link
                to={item.path}
                className={`
                  block p-4 ${activeLevel1 === item.id ? 'bg-primary-light' : ''}
                `}
                onClick={() => {
                  onNavigate(item.id, null);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
              
              {activeLevel1 === item.id && item.subItems.length > 0 && (
                <div className="bg-primary-light pl-8">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      className={`
                        block p-3 ${activeLevel2 === subItem.id ? 'bg-primary-lighter' : ''}
                      `}
                      onClick={() => {
                        onNavigate(activeLevel1, subItem.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
