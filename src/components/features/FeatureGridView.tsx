// ==================================================
// AI EXPLANATION: FeatureGridView.tsx
// ==================================================
// WHAT: Smart container component that connects FeatureGrid presentation to business logic via useFeatureSelection hook, handling data fetching and state management
// WHY: Separates presentation (FeatureGrid) from business logic (useFeatureSelection), without this you'd mix data fetching with UI rendering
// USED BY: FeaturesPage, SustainabilityPage, ServicesPage - anywhere feature selection grids are displayed
// CRITICAL: NO - Container component that can be modified without breaking core functionality, but changes affect all feature pages
// ==================================================


import React from 'react';
import FeatureGrid from './FeatureGrid';
import useFeatureSelection from '../../hooks/useFeatureSelection';

interface FeatureGridViewProps {
  category: string;  // Only need category now
}

const FeatureGridView: React.FC<FeatureGridViewProps> = ({ 
  category 
}) => {
  const { 
    features, 
    selectedFeatures, 
    isLoading, 
    handleFeatureSelect 
  } = useFeatureSelection({
    category
  });

  return (
    <FeatureGrid
      features={features}
      selectedFeatures={selectedFeatures}
      isLoading={isLoading}
      onSelect={handleFeatureSelect}
    />
  );
};

export default FeatureGridView;
