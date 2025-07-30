// ==================================================
// AI EXPLANATION: Operations2Page.tsx
// ==================================================
// WHAT: Operations page 2 - "WHO" section for selecting yacht operation type (Private or Charter) with centered card selection UI
// WHY: Without this, users can't specify if yacht is for private use or charter operations - affects available services and configurations
// USED BY: App.tsx (route /operations2), navigated to from Operations1Page
// CRITICAL: YES - Key decision point in configuration flow that affects available options
// ==================================================

/**
 * TODO: Operations2Page V2 - Direct Update Architecture
 * 
 * 1. Remove ALL external dependencies:
 *    - No navigationStore (still using next())
 *    - No usePageConfig - hardcode "WHO" texts
 * 2. Click Private or Charter = immediate update:
 *    - addPreference('operation_private') or removePreference()
 *    - No confirmation needed
 * 3. Next button should:
 *    - updateYacht({ active_level_1: 'OPERATION', active_level_2: 'what' })
 *    - navigate('/operations3')
 * 4. OperationTypeCard clicks update yacht immediately
 * 5. Visual feedback shows current selection from yacht.preferences
 * 6. Consider embedding the card selection logic directly here
 *    instead of separate OperationTypeView component
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextNavigation } from '@/utils/navigationUtils';
import { useYachtStore } from '@/stores/yachtStore';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import { ActionButton } from '@/components/ui/action-button';
import OperationTypeView from '../components/operations/OperationTypeView';
import { usePageConfig } from '../utils/usePageConfig';

const Operations2Page = () => {
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
      <LogoRow />
      <NavigationBar position="top" />
      <div className="flex-1 overflow-hidden bg-primary">
        <div className="h-full flex flex-col relative">
          {/* Main content area with dynamic height */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header section */}
            <div className="px-4 sm:px-6 tablet:px-8 laptop:px-10 py-4 sm:py-6 tablet:py-8 flex-shrink-0">
              {pageConfig.preTitle && (
                <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-1 font-gotham">
                  {pageConfig.preTitle}
                </p>
              )}
              <h1 className="text-lg sm:text-xl tablet:text-2xl laptop:text-3xl font-bold text-white mb-1 sm:mb-2 font-gotham">
                {pageConfig.title}
              </h1>
              {pageConfig.subtitle && (
                <p className="text-white/90 text-xs sm:text-sm tablet:text-base font-gotham">
                  {pageConfig.subtitle}
                </p>
              )}
            </div>
            
            {/* Operation type selection - fills remaining space with proper constraints */}
            <div className="flex-1 min-h-0 px-4 sm:px-6 tablet:px-8 laptop:px-10 pb-24 sm:pb-28 tablet:pb-32">
              <div className="h-full flex items-center justify-center">
                <OperationTypeView />
              </div>
            </div>
          </div>

          {/* Fixed action button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 tablet:p-6 bg-gradient-to-t from-primary via-primary/95 to-transparent pointer-events-none">
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

export default Operations2Page;
