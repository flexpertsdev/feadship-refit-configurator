// ==================================================
// AI EXPLANATION: FeaturesPage.tsx
// ==================================================
// WHAT: Features page component that displays yacht features based on current category selection, wrapping FeatureGridView with layout and configuration
// WHY: Without this, users can't access and select yacht features - it's a key page in the configuration flow after yacht model selection
// USED BY: App.tsx (route /features), linked to from navigation flow
// CRITICAL: YES - Core page in yacht configuration flow, breaking this prevents feature selection
// ==================================================

/**
 * TODO: FeaturesPage V2 - Direct Update Architecture & Standardized Cards
 * 
 * 1. Remove ALL external dependencies:
 *    - No ContentLayout wrapper
 *    - No usePageConfig - hardcode page texts
 *    - No useFeatureConfig - use direct V2 configs
 * 2. Create standardized card layout:
 *    - 400x300 ratio cards
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
 *    - updateYacht({ active_level_1: 'SUSTAINABILITY', active_level_2: 'tech' })
 *    - navigate('/sustainability')
 * 6. Use V2 configs from unified library:
 *    - All features are now configs with same schema
 *    - Filter by type and category from configs library
 * 7. Show selected count in header
 * 8. Consider creating shared FeatureCard component
 *    for Features/Sustainability/Services pages
 */

import React from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import ContentLayout from '../components/layout/ContentLayout';
import FeatureGridView from '../components/features/FeatureGridView';
import { useFeatureConfig } from '../utils/featureConfigUtils';
import { usePageConfig } from '../utils/usePageConfig';

const FeaturesPage = () => {
  // Keep the feature config for field names and categories
  const currentConfig = useFeatureConfig();
  // Get the page display config for titles and subtitles
  const pageConfig = usePageConfig();
  
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar position="top" />
      <div className="flex-1 overflow-auto">
        <ContentLayout
          preTitle={pageConfig.preTitle}
          title={pageConfig.title}
          subtitle={pageConfig.subtitle}
          backgroundColor={pageConfig.backgroundColor}
          textColor={pageConfig.textColor}
        >
          <div className="mt-8">
            <FeatureGridView 
              featureType={currentConfig.featureType}
              category={currentConfig.category}
              fieldName={currentConfig.fieldName}
            />
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};

export default FeaturesPage;
