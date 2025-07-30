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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextNavigation } from '@/utils/navigationUtils';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import { ActionButton } from '@/components/ui/action-button';
import { ViewMap } from '../components/operations/ViewMap';
import { usePageConfig } from '../utils/usePageConfig';
import { useYachtStore } from '../stores/yachtStore';

// Route configuration matching Figma design positioning
const ROUTE_CONFIGS = [
  // North America
  { id: 'northwest-passage', name: 'North West Passage', position: { top: '18%', left: '35%' } },
  { id: 'west-coast', name: 'West Coast', position: { top: '38%', left: '12%' } },
  { id: 'east-coast', name: 'East Coast', position: { top: '36%', left: '30%' } },
  
  // Caribbean/Central America
  { id: 'caribbean', name: 'Caribbean', position: { top: '48%', left: '32%' } },
  { id: 'galapagos', name: 'Galapagos', position: { top: '60%', left: '12%' } }, // Aligned with West Coast left position
  
  // Europe
  { id: 'nordics', name: 'Nordics', position: { top: '22%', left: '55%' } },
  { id: 'mediterranean', name: 'Mediterranean', position: { top: '36%', left: '56%' } }, // Fixed spelling
  
  // Middle East/Africa
  { id: 'suez-canal', name: 'Suez Canal', position: { top: '50%', left: '60%' } }, // Fixed ID
  
  // Atlantic - commented out
  // { id: 'transatlantic', name: 'Transatlantic', position: { top: '38%', left: '43%' } },
  
  // Pacific
  { id: 'french-polynesia', name: 'French Polynesia', position: { top: '58%', right: '8%' } },
  { id: 'australasia', name: 'Australasia', position: { top: '65%', right: '18%' } },
  
  // South America
  { id: 'patagonia', name: 'Patagonia', position: { bottom: '18%', left: '32%' } },
  
  // Global - commented out
  // { id: 'circumnavigation', name: 'Circumnavigation', position: { bottom: '15%', left: '48%' } },
];

const Operations1Page = () => {
  const navigate = useNavigate();
  const pageConfig = usePageConfig();
  const { togglePreference, currentYacht, setNavigationState } = useYachtStore();
  const [svgContent, setSvgContent] = useState<string>('');
  // const [debugMode, setDebugMode] = useState(false); // Debug mode removed
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;

  // Get selected routes from preferences
  const selectedRoutes = currentYacht?.preferences
    .filter(pref => pref.startsWith('route_'))
    .map(pref => pref.replace('route_', '').replace(/_/g, '-'))
    || [];

  // Load the combined SVG
  useEffect(() => {
    fetch('/assets/routes/combined-map.svg')
      .then(response => response.text())
      .then(svg => {
        console.log('SVG loaded successfully');
        setSvgContent(svg);
      })
      .catch(error => {
        console.error('Error loading combined map:', error);
        // Fallback to basic map
        setSvgContent('<img src="/assets/routes/Blue Map.svg" alt="World Map" class="w-full h-auto" />');
      });
  }, []);

  // Update route visibility when SVG loads or selectedRoutes change
  useEffect(() => {
    if (!svgContent) return;

    // Small delay to ensure DOM is updated
    const timeout = setTimeout(() => {
      const routePaths = document.querySelectorAll('.route-overlay');
      console.log('Found route paths:', routePaths.length);
      
      routePaths.forEach((path) => {
        const routeId = path.getAttribute('data-route');
        
        if (routeId) {
          if (selectedRoutes.includes(routeId)) {
            // Selected routes
            path.classList.add('active');
            (path as SVGElement).style.opacity = '1';
          } else {
            // Unselected routes - invisible
            path.classList.remove('active');
            (path as SVGElement).style.opacity = '0';
          }
        }
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [svgContent, selectedRoutes]);

  // Handle route toggle
  const handleRouteToggle = async (routeId: string) => {
    console.log('Toggling route:', routeId);
    const preferenceId = `route_${routeId.replace(/-/g, '_')}`;
    await togglePreference(preferenceId);
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
      <LogoRow />
      <NavigationBar position="top" />
      <div 
        className="flex-1 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0A003E 0%, #009FC6 39.45%, #00A1C7 47.78%, #0A003E 100%)'
        }}
      >
        <div className="h-full flex flex-col relative">
          {/* Fixed header */}
          <div className="flex-shrink-0 px-6 sm:px-8 tablet:px-10 py-6 sm:py-8">
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
              {/* Debug toggle removed
              <button 
                onClick={() => setDebugMode(!debugMode)}
                className="mt-2 text-xs text-white/60 underline"
              >
                {debugMode ? 'Hide' : 'Show'} all routes (debug)
              </button>
              */}
            </div>
          </div>
          
          {/* Scrollable map content */}
          <div className="flex-1 overflow-auto">
            <div className="h-full flex items-center justify-center p-4">
              <div className="relative w-full" style={{ maxWidth: '70%' }}>
                {/* Map SVG */}
                <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                
                {/* Route Toggle Buttons */}
                {ROUTE_CONFIGS.map((route) => {
                  const isSelected = selectedRoutes.includes(route.id);
                  return (
                    <div
                      key={route.id}
                      className="absolute flex items-center gap-2"
                      style={{
                        ...route.position,
                        transform: route.position.right ? 'translateX(50%)' : 'translateX(-50%)',
                      }}
                    >
                      <button
                        onClick={() => handleRouteToggle(route.id)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-full
                          backdrop-blur-sm transition-all duration-300 text-sm
                          ${isSelected 
                            ? 'bg-white border border-white' 
                            : 'bg-black/20 border border-white/20 hover:bg-black/30'
                          }
                        `}
                      >
                        {/* Toggle Circle */}
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-all duration-300
                          ${isSelected 
                            ? 'bg-[#00bcd4] border-[#00bcd4]' 
                            : 'bg-transparent border-white/60'
                          }
                        `} />
                        
                        {/* Route Name */}
                        <span className={`
                          text-xs font-medium whitespace-nowrap transition-all duration-300
                          ${isSelected ? 'text-[#0A003E]' : 'text-white'}
                        `}>
                          {route.name}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fixed action button */}
          <div className="flex-shrink-0 pb-4 sm:pb-6 pt-4">
            <div className="flex justify-center">
              <ActionButton leftText="Continue" rightText="Next" onClick={handleNext} className="shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations1Page;
