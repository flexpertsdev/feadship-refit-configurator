// ==================================================
// AI EXPLANATION: Level1Navigation.tsx
// ==================================================
// WHAT: Top-level navigation component displaying main categories (DESIGN, OPERATIONS, etc.) with home button, back/next navigation controls
// WHY: Without this, users can't navigate between major sections - provides the primary navigation bar for category selection
// USED BY: NavigationBar component as the top navigation level
// CRITICAL: YES - Primary navigation component, breaking this prevents navigation between major sections
// ==================================================

/**
 * TODO: Level1Navigation V2 - Remove navigationStore
 * 
 * 1. Replace useNavigationStore with props:
 *    - activeLevel1: string | null
 *    - onNavigate: (level1: string, level2: string | null) => void
 * 2. Import NAVIGATION_ITEMS from navigationUtils
 * 3. Remove setActiveItem calls, use onNavigate callback
 * 4. Remove back() and next() function usage
 * 5. Update parent (NavigationBar) to pass these props
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../utils/navigationUtils';
import { getDefaultLevel2ForLevel1, getLevel3ForPaintPart } from '../../utils/navigationHelpers';
import { useYachtStore } from '../../stores/yachtStore';
import { Button } from "../ui/button";
import { THEME } from './navigationTheme';

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
      <g data-name="Group 3" transform="translate(0 1)" clipPath="url(#home-icon-clip)">
        <path d="M21.427 8.344v13.083h-4.898v-5.51c0-.676-.548-1.224-1.224-1.224H9.183c-.677 0-1.224.548-1.224 1.224v5.51H3.06V8.344" fill="currentColor" fillRule="evenodd" data-name="Path 27"/>
        <path d="M.612 10.407 12.244.612l11.632 9.795" fill="currentColor" fillRule="evenodd" data-name="Path 28"/>
      </g>
    </g>
    <defs>
      <clipPath id="home-icon-clip">
        <path d="M0 0h24v22H0V0z" data-name="Rectangle 56"/>
      </clipPath>
    </defs>
  </svg>
);

interface Level1NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeLevel1: string | null;
  onNavigate: (level1: string | null, level2: string | null, level3?: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}

const Level1Navigation: React.FC<Level1NavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen,
  activeLevel1,
  onNavigate,
  onBack,
  onNext
}) => {
  const navigate = useNavigate();
  const { currentYacht } = useYachtStore();

  // Handle home navigation
  const handleHome = () => {
    navigate('/home');
  };
  
  return (
    <div className="flex w-full justify-between items-center bg-primary text-white overflow-x-auto scrollbar-none">
      <div className="w-[70px] flex items-center justify-center">
        <button onClick={handleHome} className="p-4 hover:text-accent transition-colors">
          <HomeIcon />
        </button>
      </div>
      
      <div className="flex flex-1 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              ${THEME.spacing.level1Padding} text-center whitespace-nowrap font-medium
              ${THEME.transitions.default} relative mx-0.5
              ${activeLevel1 === item.id 
                ? `border-b-[${THEME.borderWidth.active}] border-accent bg-[#102765]` 
                : `border-b-[${THEME.borderWidth.active}] border-[#00a1c7] border-opacity-50`}
            `}
            onClick={() => {
              const defaultLevel2 = getDefaultLevel2ForLevel1(item.id);
              
              // Special handling for PAINT - also set Level 3
              if (item.id === 'PAINT' && currentYacht && defaultLevel2) {
                const level3 = getLevel3ForPaintPart(currentYacht, defaultLevel2);
                onNavigate(item.id, defaultLevel2, level3);
              } else {
                onNavigate(item.id, defaultLevel2);
              }
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center">
        {/* Desktop back button with text */}
        <Button
          variant="static"
          size="sm"
          className="mr-2 sm:flex"
          onClick={onBack}
        >
          <span>Back</span>
        </Button>

        {/* Desktop next button with text */}
        <Button
          variant="static" 
          size="sm"
          className="mr-2 sm:flex mr-4"
          onClick={onNext}
        >
          <span>Next</span>
        </Button>
        
        {/* Mobile back button - icon only */}
        <Button
          variant="outline" 
          size="icon"
          className="mr-2 bg-white text-primary border-white flex sm:hidden"
          onClick={onBack}
        >
          <ChevronLeft size={16} />
        </Button>
        
        {/* Mobile next button - icon only */}
        <Button
          variant="outline" 
          size="icon"
          className="bg-white text-primary border-white flex sm:hidden mr-4"
          onClick={onNext}
        >
          <ChevronRight size={16} />
        </Button>
        
        <button 
          className="p-4 block sm:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Level1Navigation;
