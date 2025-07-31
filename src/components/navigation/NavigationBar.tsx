// ==================================================
// AI EXPLANATION: NavigationBar.tsx
// ==================================================
// WHAT: Main navigation component containing Level1 and Level2 navigation bars, handles mobile menu, syncs URL path with navigation state, and manages back/next buttons
// WHY: Without this, users can't navigate between configuration pages - it's the primary navigation UI showing current location and available sections
// USED BY: AppLayout component (used on most pages), ConfiguratorPage (bottom position)
// CRITICAL: YES - Primary navigation interface, breaking this prevents users from moving between configuration steps
// ==================================================

/**
 * TODO: NavigationBar V2 - Remove navigationStore
 * 
 * 1. Replace useNavigationStore with useYachtStore:
 *    - Read active_level_1/2/3 from currentYacht
 *    - Remove back() and next() function usage
 * 2. Import navigation utilities:
 *    - NAVIGATION_ITEMS from navigationUtils
 *    - getPreviousNavigation and getNextNavigation functions
 * 3. Implement navigation handlers:
 *    - handleBack: use getPreviousNavigation() + updateYacht()
 *    - handleNext: use getNextNavigation() + updateYacht()
 * 4. Update path synchronization:
 *    - Remove setActiveItem calls
 *    - Update yacht config directly when path changes
 * 5. Pass navigation state to child components:
 *    - activeLevel1, activeLevel2, activeLevel3 from yacht
 *    - onNavigate callback to update yacht
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useYachtStore } from '../../stores/yachtStore';
import { NAVIGATION_ITEMS, getNextNavigation, getPreviousNavigation } from '../../utils/navigationUtils';
import { getLevel3ForPaintPart } from '../../utils/navigationHelpers';
import { NavigationItem } from '../../types/navigation';
import Level1Navigation from './Level1Navigation';
import Level2Navigation from './Level2Navigation';
import MobileNavigation from './MobileNavigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface NavigationBarProps {
  position?: 'top' | 'bottom';
}
const NavigationBar = ({
  position = 'top'
}: NavigationBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const level2ScrollRef = useRef<HTMLDivElement>(null);
  const { currentYacht, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;
  
  // Scroll Level 2 navigation into view when it changes
  useEffect(() => {
    if (level2ScrollRef.current && activeLevel2) {
      const activeElement = level2ScrollRef.current.querySelector(`[data-id="${activeLevel2}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeLevel1, activeLevel2, activeLevel3]);
  const handleBack = async () => {
    const prev = getPreviousNavigation(activeLevel1, activeLevel2, activeLevel3);
    if (prev.level1) {
      // For PAINT navigation, get the correct Level 3 based on yacht paint config
      let finalLevel3 = prev.level3;
      if (prev.level1 === 'PAINT' && prev.level2 && currentYacht) {
        finalLevel3 = getLevel3ForPaintPart(currentYacht, prev.level2);
      }
      
      // Update yacht navigation state
      await setNavigationState(prev.level1, prev.level2, finalLevel3);
      // Navigate to the page if path is different
      if (prev.path && prev.path !== location.pathname) {
        navigate(prev.path);
      }
    }
  };
  
  const handleNext = async () => {
    const next = getNextNavigation(activeLevel1, activeLevel2, activeLevel3);
    if (next.level1) {
      // For PAINT navigation, get the correct Level 3 based on yacht paint config
      let finalLevel3 = next.level3;
      if (next.level1 === 'PAINT' && next.level2 && currentYacht) {
        finalLevel3 = getLevel3ForPaintPart(currentYacht, next.level2);
      }
      
      // Update yacht navigation state
      await setNavigationState(next.level1, next.level2, finalLevel3);
      // Navigate to the page if path is different
      if (next.path && next.path !== location.pathname) {
        navigate(next.path);
      }
    }
  };
  
  const handleNavigate = (level1: string | null, level2: string | null, level3: string | null = null) => {
    setNavigationState(level1, level2, level3);
  };
  const currentLevel1Item = NAVIGATION_ITEMS.find(item => item.id === activeLevel1);
  const currentLevel2Items = currentLevel1Item?.subItems || [];
  return (
    <div className={`w-full ${position === 'top' ? 'sticky top-0' : ''} ${position === 'bottom' ? 'sticky bottom-0' : ''} z-40 shadow-md`}>
      <Level1Navigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        activeLevel1={activeLevel1}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onNext={handleNext}
      />
      <Level2Navigation 
        items={currentLevel2Items} 
        ref={level2ScrollRef}
        activeLevel1={activeLevel1}
        activeLevel2={activeLevel2}
        activeLevel3={activeLevel3}
        onNavigate={handleNavigate}
      />
      <MobileNavigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        activeLevel1={activeLevel1}
        activeLevel2={activeLevel2}
        activeLevel3={activeLevel3}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
export default NavigationBar;