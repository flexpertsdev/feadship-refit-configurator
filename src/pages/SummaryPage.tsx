// ==================================================
// AI EXPLANATION: SummaryPage.tsx
// ==================================================
// WHAT: Final summary page displaying complete yacht configuration including design preferences, paint colors, features, services, sustainability options, voyage locations and activities
// WHY: Without this, users can't review their complete yacht configuration - it's the final review page before saving/exporting their custom design
// USED BY: App.tsx (route /summary), navigated to from Operations3Page or via navigation menu
// CRITICAL: YES - Final configuration review page, users need this to see and confirm their complete yacht design choices
// ==================================================

/**
 * TODO: SummaryPage V2 - Direct Architecture Cleanup
 * 
 * GOOD NEWS: This page already uses V2 data correctly!
 * - Uses getConfigsByIds and getPreferencesByIds
 * - Reads from currentYacht.preferences and currentYacht.configs
 * - Extracts design levels properly
 * 
 * Improvements to make:
 * 1. Remove ContentLayout dependency
 *    - No usePageConfig - hardcode the title/subtitle
 *    - Simple layout without wrapper
 * 2. Fix category filtering:
 *    - Features should filter by type='features'
 *    - Services should filter by type='services'
 *    - Sustainability should filter by type='sustainability'
 *    - Currently all using category which might be wrong
 * 3. Extensions/Configurator data:
 *    - Add section for currentYacht.extensions if any
 *    - Show selected hull/superstructure extensions
 * 4. Better empty states:
 *    - Show placeholders for sections with no selections
 *    - Encourage user to go back and configure
 * 5. Print/Export functionality:
 *    - Add button to export PDF summary
 *    - Add share functionality
 * 6. Navigation:
 *    - Add edit buttons to jump back to specific sections
 *    - Update active_level_1/2/3 when navigating
 * 7. Consistent styling:
 *    - Ensure all sections have similar spacing
 *    - Mobile-responsive layout
 */

import React from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import ContentLayout from '../components/layout/ContentLayout';
import { usePageConfig } from '../utils/usePageConfig';
import { useYachtStore } from '../stores/yachtStore';
import { getBackgroundImageUrl } from '../utils/designUtils';
import { getConfigsByIds } from '@/data/configs-library';
import { getPreferencesByIds, getDesignLevelFromPreferences } from '@/data/preferences-library';

import HeroSection from '../components/summary/HeroSection';
import DesignPreferencesSection from '../components/summary/DesignPreferencesSection';
import OperatingProfileSection from '../components/summary/OperatingProfileSection';
import PaintSection from '../components/summary/PaintSection';
import ActivitiesSection from '../components/summary/ActivitiesSection';
import FeaturesSection from '../components/summary/FeaturesSection';
import SustainabilitySection from '../components/summary/SustainabilitySection';
import ServicesSection from '../components/summary/ServicesSection';
import VoyageSection from '../components/summary/VoyageSection';

const SummaryPage = () => {
  const pageConfig = usePageConfig();
  const { currentYacht, updateYacht } = useYachtStore();

  if (!currentYacht) {
    return (
      <div className="flex flex-col h-screen">
        <NavigationBar position="top" />
        <div className="flex-1 overflow-auto">
          <ContentLayout
            preTitle={pageConfig.preTitle}
            title="Your Custom Feadship"
            subtitle="No configuration data found. Please start with design preferences."
            backgroundColor={pageConfig.backgroundColor}
            textColor={pageConfig.textColor}
            hideActionButton={true}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-neutral">Start by configuring your Feadship design preferences.</p>
            </div>
          </ContentLayout>
        </div>
      </div>
    );
  }

  // Extract design levels from preferences
  const complexityLevel = getDesignLevelFromPreferences(currentYacht.preferences, 'design_complexity');
  const traditionalLevel = getDesignLevelFromPreferences(currentYacht.preferences, 'design_traditional');
  const radicalLevel = getDesignLevelFromPreferences(currentYacht.preferences, 'design_radical');

  // Create design preferences array
  const designPreferences = [
    {
      title: "Clean / Complex",
      description: `Level ${complexityLevel}`,
      image: getBackgroundImageUrl(1, complexityLevel - 1)
    },
    {
      title: "Vintage / Modern", 
      description: `Level ${radicalLevel}`,
      image: getBackgroundImageUrl(2, radicalLevel - 1)
    },
    {
      title: "Classical / Contemporary",
      description: `Level ${traditionalLevel}`,
      image: getBackgroundImageUrl(3, traditionalLevel - 1)
    }
  ];

  // Extract operation type
  const isPrivate = currentYacht.preferences.includes('operation_private');
  const operationType = isPrivate ? 'private' : 'charter';

  // Paint colors
  const yachtColors = {
    hull: currentYacht.paint.hull,
    superstructure: currentYacht.paint.superstructure,
    deckhouse: currentYacht.paint.deckhouse,
    mast: currentYacht.paint.mast,
    bootstripe: currentYacht.paint.bootstripe
  };

  // Get activities
  const activityPrefs = getPreferencesByIds(
    currentYacht.preferences.filter(id => id.startsWith('activity_'))
  );
  const activities = activityPrefs.map(pref => ({
    title: pref.name,
    image: pref.image || '',
    description: pref.description || `Enjoy ${pref.name} on your yacht`
  }));

  // Get regions
  const regionPrefs = getPreferencesByIds(
    currentYacht.preferences.filter(id => id.startsWith('region_'))
  );
  const locations = regionPrefs.map(pref => ({
    id: pref.id,
    name: pref.name,
    description: pref.description || `Explore the beauty of ${pref.name}`,
    image: pref.image || '/assets/step4/Map.png'
  }));

  // Get all configs
  const allConfigs = getConfigsByIds(currentYacht.configs);
  
  // Separate features
  const features = {
    exterior: allConfigs.filter(c => c.category === 'exterior').map(f => ({
      title: f.name,
      image: f.image || '',
      description: f.description || 'Feature'
    })),
    interior: allConfigs.filter(c => c.category === 'interior').map(f => ({
      title: f.name,
      image: f.image || '',
      description: f.description || 'Feature'
    })),
    toys: allConfigs.filter(c => c.category === 'toys').map(f => ({
      title: f.name,
      image: f.image || '',
      description: f.description || 'Feature'
    })),
    additional: []
  };

  // Get sustainability
  const sustainabilityOptions = allConfigs
    .filter(c => c.category === 'sustainability')
    .map(s => ({
      title: s.name,
      description: s.description || "Eco-friendly solution",
      image: s.image || ''
    }));

  // Get services
  const services = allConfigs
    .filter(c => c.category === 'services')
    .map(s => ({
      title: s.name,
      description: s.description || "Premium service",
      image: s.image || ''
    }));

  const handleSaveYachtName = async (name: string): Promise<void> => {
    await updateYacht({ name });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar position="top" />
      <div className="flex-1 overflow-auto">
        <ContentLayout
          preTitle={pageConfig.preTitle}
          title={pageConfig.title}
          subtitle={pageConfig.subtitle}
          backgroundColor="bg-white"
          textColor="text-primary"
          hideActionButton={true}
        >
          <div className="flex flex-col gap-10 w-full">
            <HeroSection 
          onSaveYachtName={handleSaveYachtName} 
          yachtName={currentYacht.name}
        />
        
        <DesignPreferencesSection preferences={designPreferences} />
        
        <OperatingProfileSection operationType={operationType} />
        
        <PaintSection colors={yachtColors} />
        
        {Object.values(features).some(arr => arr.length > 0) && (
          <FeaturesSection features={features} />
        )}
        
        {sustainabilityOptions.length > 0 && (
          <SustainabilitySection options={sustainabilityOptions} />
        )}
        
        {services.length > 0 && (
          <ServicesSection services={services} />
        )}
        
        {locations.length > 0 && (
          <VoyageSection locations={locations} />
        )}
        
        {activities.length > 0 && (
          <ActivitiesSection activities={activities} />
        )}
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};

export default SummaryPage;