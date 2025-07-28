// ==================================================
// AI EXPLANATION: featureConfigUtils.ts
// ==================================================
// WHAT: Configuration utilities providing hooks that map navigation states to feature categories, field names, and display text
// WHY: Without this, feature/sustainability/services pages wouldn't know which data to display - provides context-aware configuration
// USED BY: FeaturesPage, SustainabilityPage, ServicesPage to get correct category and field mappings based on navigation
// CRITICAL: YES - Navigation-to-data mapping logic, breaking this prevents correct feature display on pages
// ==================================================


import { useYachtStore } from '../stores/yachtStore';

export interface FeatureConfig {
  featureType: string;
  category: string;
  fieldName: string;
  step: string;
  title: string;
  subTitle: string;
}

export const useFeatureConfig = (): FeatureConfig => {
  const { currentYacht } = useYachtStore();
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  // Get configuration based on the current active navigation level
  const getFeatureConfig = () => {
    switch (activeLevel2) {
      case 'exterior':
        return {
          featureType: 'features',
          category: 'exterior',
          fieldName: 'exterior_features',
          step: '5',
          title: 'EXTERIOR FEATURES',
          subTitle: 'Exterior'
        };
      case 'interior':
        return {
          featureType: 'features',
          category: 'interior',
          fieldName: 'interior_features',
          step: '5',
          title: 'INTERIOR FEATURES',
          subTitle: 'Interior'
        };
      case 'toys':
        return {
          featureType: 'features',
          category: 'toys_and_tender',
          fieldName: 'toy_features',
          step: '5',
          title: 'TOYS & TENDERS',
          subTitle: 'Toys & Tenders'
        };
      case 'additional':
        return {
          featureType: 'features',
          category: 'additional',
          fieldName: 'additional_features',
          step: '5',
          title: 'ADDITIONAL FEATURES',
          subTitle: 'Additional Features'
        };
      default:
        return {
          featureType: 'features',
          category: 'exterior',
          fieldName: 'exterior_features',
          step: '5',
          title: 'EXTERIOR FEATURES',
          subTitle: 'Exterior'
        };
    }
  };

  return getFeatureConfig();
};

// New hook for sustainability configuration
export const useSustainabilityConfig = (): FeatureConfig => {
  const { currentYacht } = useYachtStore();
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  // Get configuration based on the current active sustainability navigation level
  const getSustainabilityConfig = () => {
    switch (activeLevel2) {
      case 'power':
        return {
          featureType: 'sustainability',
          category: 'power_supply_and_propulsion',
          fieldName: 'sustainability_options',
          step: 'Step 6',
          title: 'POWER SUPPLY & PROPULSION',
          subTitle: 'Sustainability'
        };
      case 'energy':
        return {
          featureType: 'sustainability',
          category: 'energy_efficiency',
          fieldName: 'sustainability_options',
          step: 'Step 6',
          title: 'ENERGY EFFICIENCY',
          subTitle: 'Sustainability'
        };
      default:
        return {
          featureType: 'sustainability',
          category: 'power_supply_and_propulsion',
          fieldName: 'sustainability_options',
          step: 'Step 6',
          title: 'POWER SUPPLY & PROPULSION',
          subTitle: 'Sustainability'
        };
    }
  };

  return getSustainabilityConfig();
};

// New hook for services configuration
export const useServicesConfig = (): FeatureConfig => {
  const { currentYacht } = useYachtStore();
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  // Get configuration based on the current active services navigation level
  const getServicesConfig = () => {
    switch (activeLevel2) {
      case 'suite':
        return {
          featureType: 'services',
          category: 'suite_of_services',
          fieldName: 'services',
          step: 'Step 7',
          title: 'SUITE OF SERVICES',
          subTitle: 'Services'
        };
      default:
        return {
          featureType: 'services',
          category: 'suite_of_services',
          fieldName: 'services',
          step: 'Step 7',
          title: 'SUITE OF SERVICES',
          subTitle: 'Services'
        };
    }
  };

  return getServicesConfig();
};

// Format the category for display
export const formatCategory = (category: string): string => {
  return category.replace(/_/g, ' ');
};

// Generate subtitle based on feature type and category
export const getFeatureSubtitle = (featureType: string, category: string): string => {
  const formattedCategory = formatCategory(category);
  
  switch (featureType) {
    case 'sustainability':
      if (category === 'power_supply_and_propulsion') {
        return 'Select sustainable power and propulsion features for your eco-conscious yacht.';
      } else if (category === 'energy_efficiency') {
        return 'Choose energy efficiency options for your sustainable yacht.';
      }
      return 'Select sustainable features for your eco-conscious yacht.';
    case 'services':
      return 'Choose additional services to enhance your yacht experience.';
    default:
      return `Select your preferred ${formattedCategory} features.`;
  }
};
