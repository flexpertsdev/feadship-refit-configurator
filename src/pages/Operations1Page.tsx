// ==================================================
// AI EXPLANATION: Operations1Page.tsx
// ==================================================
// WHAT: Operations page 1 - displays interactive world map for yacht cruising region selection with immediate preference updates on click
// WHY: Without this, users can't specify preferred cruising regions - it's the first step in operations configuration flow
// USED BY: App.tsx (route /operations1), navigated to from configuration flow
// CRITICAL: YES - Key part of operations configuration, breaks region selection without it
// ==================================================


/**
 * TODO: Operations1Page V2 - Direct Update Architecture
 * 
 * 1. Remove ALL external dependencies:
 *    - No navigationStore (DONE - but still using next())
 *    - No shared ContentLayout
 *    - No usePageConfig - hardcode the text
 * 2. Every map click = immediate yacht update:
 *    - Click region -> togglePreference() -> yacht updated
 *    - No batching, no "save" button needed
 * 3. Next button should:
 *    - updateYacht({ active_level_1: 'OPERATION', active_level_2: 'who' })
 *    - navigate('/operations2')
 *    - Remove the next() pattern
 * 4. Simple, direct, immediate updates
 * 5. ViewMap should call onLocationChange immediately on click
 * 6. Simplify the region ID conversion logic
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextNavigation } from '@/utils/navigationUtils';
import NavigationBar from '@/components/navigation/NavigationBar';
import { ActionButton } from '@/components/ui/action-button';
import { ViewMap } from '../components/operations/ViewMap';
import { usePageConfig } from '../utils/usePageConfig';
import { useYachtStore } from '../stores/yachtStore';
import '../styles/fonts.css';

const Operations1Page = () => {
  const navigate = useNavigate();
  const pageConfig = usePageConfig();
  const { togglePreference, currentYacht, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;

  // This function will be passed down to the ViewMap component
  const handleLocationChange = async (locations: string[]) => {
    // In V2, regions are stored as preferences
    if (!currentYacht) return;
    
    // Convert location names to preference IDs
    const newRegionIds = locations.map(location => 
      `region_${location.toLowerCase().replace(/\s+/g, '_')}`
    );
    
    // Get existing region preferences
    const existingRegions = currentYacht.preferences.filter(id => id.startsWith('region_'));
    
    // Remove regions that are no longer selected
    for (const regionId of existingRegions) {
      if (!newRegionIds.includes(regionId)) {
        await togglePreference(regionId);
      }
    }
    
    // Add newly selected regions
    for (const regionId of newRegionIds) {
      if (!currentYacht.preferences.includes(regionId)) {
        await togglePreference(regionId);
      }
    }
  };
  
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
      <div className="flex-1 overflow-auto bg-gradient-to-b from-primary via-accent to-primary">
        <div className="h-full flex flex-col relative transition-all duration-300">
          <div className="relative z-10 flex-1 overflow-auto transition-all duration-300 px-6 sm:px-8 tablet:px-10 py-6 sm:py-8">
            {/* Header text content */}
            <div className="relative z-20">
              {pageConfig.preTitle && (
                <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-1 font-gotham">
                  {pageConfig.preTitle}
                </p>
              )}
              <h1 className="text-xl sm:text-2xl tablet:text-3xl font-bold text-white mb-1 sm:mb-2 font-gotham transition-all duration-300">
                {pageConfig.title}
              </h1>
              {pageConfig.subtitle && (
                <p className="text-white text-sm sm:text-base font-gotham transition-all duration-300">
                  {pageConfig.subtitle}
                </p>
              )}
            </div>
            
            {/* Map content */}
            <div className="relative z-10 flex-1 transition-all duration-300 mt-6 my-[84px] mx-0 py-0">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <ViewMap onLocationChange={handleLocationChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="sticky bottom-4 sm:bottom-6 w-full flex justify-center z-20 transition-all duration-300">
            <ActionButton leftText="Continue" rightText="Next" onClick={handleNext} className="shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations1Page;
