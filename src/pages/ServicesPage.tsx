// ==================================================
// AI EXPLANATION: ServicesPage.tsx
// ==================================================
// WHAT: Services page component displaying yacht service options (crew training, maintenance, concierge) using FeatureGridView with service configuration
// WHY: Without this, users can't select service packages and support options - final configuration step before summary
// USED BY: App.tsx (route /services), navigated to from Sustainability page in configuration flow
// CRITICAL: YES - Final configuration page before summary, breaking this prevents completing yacht configuration
// ==================================================


/**
 * TODO: ServicesPage V2 - Direct Update Architecture & Standardized Cards
 * 
 * 1. Remove ALL external dependencies:
 *    - No ContentLayout wrapper
 *    - No usePageConfig - hardcode page texts
 *    - No useServicesConfig - use direct V2 configs
 * 2. Create standardized card layout:
 *    - 400x300 ratio cards (MUST match Features/Sustainability)
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
 *    - updateYacht({ active_level_1: 'SUMMARY', active_level_2: null })
 *    - navigate('/summary')
 * 6. Use V2 configs from unified library:
 *    - All services are now configs with same schema
 *    - Filter by type='services' and category
 * 7. Show selected count in header
 * 8. Share FeatureCard component with Features/Sustainability
 * 9. Services include things like crew training, concierge, etc.
 */

import React from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import ContentLayout from '../components/layout/ContentLayout';
import FeatureGridView from '../components/features/FeatureGridView';
import { useServicesConfig } from '../utils/featureConfigUtils';
import { usePageConfig } from '../utils/usePageConfig';

const ServicesPage = () => {
  // Get the services configuration for field names and categories
  const servicesConfig = useServicesConfig();
  // Get the page display config for titles and subtitles
  const pageConfig = usePageConfig();
  
  return (
    <div className="flex flex-col h-screen">
      <LogoRow />
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
              featureType={servicesConfig.featureType}
              category={servicesConfig.category}
              fieldName={servicesConfig.fieldName}
            />
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};

export default ServicesPage;
