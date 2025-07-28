// ==================================================
// AI EXPLANATION: useFeatureSelection.ts
// ==================================================
// WHAT: Custom React hook that manages yacht feature selection logic, filtering features by category and model compatibility, and handling toggle state through yachtStore
// WHY: Without this, feature selection UI components would need to duplicate logic for filtering, model compatibility checks, and state management
// USED BY: FeaturesPage, SustainabilityPage, ServicesPage, FeatureGridView component, any component displaying selectable features
// CRITICAL: YES - Central logic for feature selection throughout the app, breaking this affects all feature selection pages
// ==================================================


import { useYachtStore } from '../stores/yachtStore';
import { getConfigsByCategory } from '@/data/configs-library';
import { isConfigAvailableForModel } from '@/data/yacht-models-library';

interface UseFeatureSelectionProps {
  featureType: string;
  category: string;
  fieldName: string;
}

export const useFeatureSelection = ({ featureType, category, fieldName }: UseFeatureSelectionProps) => {
  const { currentYacht, toggleConfig } = useYachtStore();
  
  // Map legacy categories to new configs library categories
  const mapCategory = (cat: string): string => {
    const mapping: Record<string, string> = {
      'exterior-features': 'exterior',
      'interior-features': 'interior', 
      'toys-tenders': 'toys',
      'sustainability': 'sustainability',
      'services': 'services'
    };
    return mapping[cat] || cat;
  };
  
  // Get features from configs library
  const mappedCategory = mapCategory(category);
  const availableConfigs = getConfigsByCategory(mappedCategory);
  
  // Filter by model availability
  const modelFilteredConfigs = currentYacht 
    ? availableConfigs.filter(config => 
        isConfigAvailableForModel(config.id, currentYacht.model_id)
      )
    : availableConfigs;
  
  const isLoading = false; // No async loading needed

  // Get current selected features
  const selectedFeatures = currentYacht?.configs || [];

  // Handle feature selection
  const handleFeatureSelect = async (id: string) => {
    if (!currentYacht) return;
    await toggleConfig(id);
  };

  // Format features data
  const formattedFeatures = modelFilteredConfigs.map((config) => ({
    id: config.id,
    name: config.name,
    description: config.description || '',
    image: config.image || '',
    category: config.category
  }));

  return {
    features: formattedFeatures,
    selectedFeatures,
    isLoading,
    handleFeatureSelect
  };
};

// Default export for backward compatibility
export default useFeatureSelection;
