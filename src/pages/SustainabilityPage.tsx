// ==================================================
// AI EXPLANATION: SustainabilityPage.tsx
// ==================================================
// WHAT: Sustainability page component displaying eco-friendly yacht options using FeatureGridView with sustainability-specific configuration
// WHY: Without this, users can't select sustainability features like solar panels or water recycling - key part of modern yacht configuration
// USED BY: App.tsx (route /sustainability), navigated to from Features page in configuration flow
// CRITICAL: YES - Core page for sustainability options, breaking this removes eco-friendly configuration choices
// ==================================================


/**
 * TODO: SustainabilityPage V2 - Direct Update Architecture & Standardized Cards
 * 
 * 1. Remove ALL external dependencies:
 *    - No ContentLayout wrapper
 *    - No useSustainabilityConfig - use direct V2 configs
 *    - No getFeatureSubtitle - hardcode or simplify
 * 2. Create standardized card layout:
 *    - 400x300 ratio cards (MUST match Features/Services)
 *    - 2/3 image area (top)
 *    - 1/3 text area (bottom) with title + button
 *    - Consistent shadow and border radius
 * 3. Direct update pattern:
 *    - Click card = immediate toggleConfig()
 *    - No batching, no confirmation
 *    - Visual feedback shows selection state
 * 4. Grid layout requirements:
 *    - Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop
 *    - Scrollable area that doesn't go under bottom button
 *    - Gap between cards for clean look
 * 5. Next button should:
 *    - updateYacht({ active_level_1: 'SERVICES', active_level_2: 'crew' })
 *    - navigate('/services')
 * 6. Use V2 configs from unified library:
 *    - All sustainability items are now configs
 *    - Filter by type='sustainability' and category
 * 7. Show selected count in header
 * 8. Share FeatureCard component with Features/Services
 * 9. Remove backgroundColor="bg-primary" - use consistent theme
 */

import React from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import ContentLayout from '../components/layout/ContentLayout';
import FeatureGridView from '../components/features/FeatureGridView';
import { useSustainabilityConfig, getFeatureSubtitle } from '../utils/featureConfigUtils';

const SustainabilityPage = () => {
  // Get the sustainability configuration based on the navigation state
  const sustainabilityConfig = useSustainabilityConfig();
  
  // Generate dynamic subtitle based on the category
  const subtitle = getFeatureSubtitle(sustainabilityConfig.featureType, sustainabilityConfig.category);
  
  return (
    <div className="flex flex-col h-screen">
      <LogoRow />
      <NavigationBar position="top" />
      <div className="flex-1 overflow-auto">
        <ContentLayout
          preTitle={`${sustainabilityConfig.step} / ${sustainabilityConfig.subTitle}`}
          title={sustainabilityConfig.title}
          subtitle={subtitle}
          backgroundColor="bg-primary"
          textColor="text-white"
        >
          <div className="mt-8">
            <FeatureGridView 
              featureType={sustainabilityConfig.featureType}
              category={sustainabilityConfig.category}
              fieldName={sustainabilityConfig.fieldName}
            />
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};

export default SustainabilityPage;
