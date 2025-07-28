// ==================================================
// AI EXPLANATION: Level2Navigation.tsx
// ==================================================
// WHAT: Second-level navigation component displaying sub-categories with inline level3 items when active, handles horizontal scrolling overflow
// WHY: Without this, users can't access sub-categories within main sections - provides drill-down navigation for features, operations, etc.
// USED BY: NavigationBar component as the second navigation level
// CRITICAL: YES - Core navigation component, breaking this prevents access to sub-sections and level3 navigation
// ==================================================


import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from '../../types/navigation';
import { THEME } from './navigationTheme';
import { ChevronRight } from 'lucide-react';

interface Level2NavigationProps {
  items: NavigationItem[];
  activeLevel1: string | null;
  activeLevel2: string | null;
  activeLevel3: string | null;
  onNavigate: (level1: string | null, level2: string | null, level3?: string | null) => void;
}

const Level2Navigation = forwardRef<HTMLDivElement, Level2NavigationProps>(({
  items,
  activeLevel1,
  activeLevel2,
  activeLevel3,
  onNavigate
}, ref) => {

  // Early return if no level 2 items
  if (!items || items.length === 0) {
    return null;
  }
  
  // Find the current level2 item to get its subItems
  const currentLevel2Item = items.find(item => item.id.toLowerCase() === (activeLevel2?.toLowerCase() ?? ''));
  
  return (
    <nav className="w-full bg-primary text-white" ref={ref}>
      <div className="flex overflow-x-auto scrollbar-none" style={{
        scrollbarWidth: 'none'
      }}>
        {/* Spacer div at start of row - increased to match the home icon button width in Level1Navigation */}
        <div className="w-[70px] flex items-center justify-center">
          <div className="px-9"></div>
        </div>
        
        {items.map(item => {
          const isActive = activeLevel2?.toLowerCase() === item.id.toLowerCase();
          const level3Items = item.subItems || [];
          const showLevel3 = isActive && level3Items.length > 0;
          
          return (
            <div key={item.id} className="flex items-center">
              <Link 
                to={item.path} 
                className={`
                  ${THEME.spacing.level2Padding} ${THEME.fontSize.level2} whitespace-nowrap uppercase font-medium
                  ${THEME.transitions.default} relative mx-0.5
                  ${isActive ? 
                    `border-b-[${THEME.borderWidth.active}] border-accent bg-primary-light` : 
                    `border-b-[3px] border-[#00a1c7] border-opacity-50`}
                `} 
                onClick={() => onNavigate(activeLevel1, item.id.toLowerCase())}
              >
                {item.name}
              </Link>
              
              {/* If this item is active and has subItems, show them inline */}
              {showLevel3 && (
                <>
                  <div className="flex items-center">
                    <ChevronRight size={16} className="mx-1" />
                  </div>
                  {level3Items.map(subItem => (
                    <Link 
                      key={subItem.id} 
                      to={subItem.path} 
                      className={`
                        ${THEME.spacing.level3Padding} ${THEME.fontSize.level3} whitespace-nowrap
                        ${THEME.transitions.default} relative
                        ${activeLevel3 === subItem.id ? 
                          `border-b-[${THEME.borderWidth.active}] border-accent` : 
                          'border-b-[3px] border-accent/50 hover:border-accent'}
                      `} 
                      onClick={() => onNavigate(activeLevel1, activeLevel2, subItem.id)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
});

Level2Navigation.displayName = 'Level2Navigation';
export default Level2Navigation;
