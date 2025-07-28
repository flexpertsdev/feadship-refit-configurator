// ==================================================
// AI EXPLANATION: Operations3Page.tsx
// ==================================================
// WHAT: Operations page 3 - "WHAT" section displaying activity grid for selecting yacht usage activities (diving, fishing, etc.) with scrollable layout
// WHY: Without this, users can't specify intended yacht activities - affects equipment and feature recommendations in configuration
// USED BY: App.tsx (route /operations3), navigated to from Operations2Page
// CRITICAL: YES - Final operations step that completes usage profile before main configurator
// ==================================================

/**
 * TODO: Operations3Page V2 - Direct Update Architecture
 * 
 * 1. Remove ALL external dependencies:
 *    - No navigationStore (still using next())
 *    - No usePageConfig - hardcode "WHAT" texts
 *    - Remove unused useState, useEffect imports
 * 2. Every activity click = immediate update:
 *    - Click activity -> togglePreference('activity_X')
 *    - No "confirm" button, no batching
 * 3. Next button should:
 *    - updateYacht({ active_level_1: 'PAINT', active_level_2: 'Hull' })
 *    - navigate('/configurator')
 * 4. ActivityGridView should NOT have internal state:
 *    - Just read from yacht.preferences
 *    - Call togglePreference on each click
 *    - Remove the handleConfirm pattern
 * 5. Show selected count in header (e.g., "5 activities selected")
 * 6. Consider search/filter for better UX with many activities
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextNavigation } from '@/utils/navigationUtils';
import { useYachtStore } from '@/stores/yachtStore';
import NavigationBar from '@/components/navigation/NavigationBar';
import { ActionButton } from '@/components/ui/action-button';
import ActivityGridView from '../components/operations/ActivityGridView';
import { usePageConfig } from '../utils/usePageConfig';
import '../styles/fonts.css';

const Operations3Page = () => {
  const navigate = useNavigate();
  const pageConfig = usePageConfig();
  const { currentYacht, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;
  
  const handleNext = () => {
    const { level1, level2, level3, path } = getNextNavigation(
      activeLevel1,
      activeLevel2,
      activeLevel3
    );
    if (path) {
      setNavigationState(level1, level2, level3);
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar position="top" />
      <div className="flex-1 overflow-auto bg-primary">
        <div className="h-full flex flex-col">
          {/* Scrollable content area with iOS-style scrollbar */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{
              // Custom scrollbar styles for webkit browsers
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
            }}
          >
            <div className="px-6 sm:px-8 tablet:px-10 py-6 sm:py-8">
              {/* Header text content */}
              <div className="mb-8">
                {pageConfig.preTitle && (
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-1 font-gotham">
                    {pageConfig.preTitle}
                  </p>
                )}
                <h1 className="text-xl sm:text-2xl tablet:text-3xl font-bold text-white mb-1 sm:mb-2 font-gotham">
                  {pageConfig.title}
                </h1>
                {pageConfig.subtitle && (
                  <p className="text-white text-sm sm:text-base font-gotham">
                    {pageConfig.subtitle}
                  </p>
                )}
              </div>
              
              {/* Activity grid content */}
              <ActivityGridView />
              
              {/* Bottom padding to ensure last row clears the fixed button */}
              <div className="h-32" />
            </div>
          </div>

          {/* Fixed action button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary via-primary/95 to-transparent pointer-events-none">
            <div className="flex justify-center pointer-events-auto">
              <ActionButton 
                leftText="Continue" 
                rightText="Next" 
                onClick={handleNext} 
                className="shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations3Page;
