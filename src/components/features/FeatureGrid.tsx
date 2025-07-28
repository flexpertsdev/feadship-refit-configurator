// ==================================================
// AI EXPLANATION: FeatureGrid.tsx
// ==================================================
// WHAT: Presentational component that renders a responsive grid of FeatureCard components with loading skeleton states, handling layout across different screen sizes
// WHY: Without this, feature cards would need manual layout in each page - this provides consistent responsive grid display for all feature selection views
// USED BY: FeatureGridView component (smart container), which is used by FeaturesPage, SustainabilityPage, ServicesPage
// CRITICAL: NO - Pure presentational component, can be modified for UI changes without breaking functionality
// ==================================================


import React from 'react';
import StandardFeatureCard, { StandardFeature } from './StandardFeatureCard';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

interface FeatureGridProps {
  features: StandardFeature[];
  selectedFeatures: string[];
  isLoading: boolean;
  onSelect: (id: string) => void;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ 
  features, 
  selectedFeatures, 
  isLoading, 
  onSelect 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden shadow-md aspect-[4/3]">
            <div className="flex flex-col h-full">
              <Skeleton className="flex-grow" style={{ flex: '2 0 0' }} />
              <div className="p-4 border-t" style={{ flex: '1 0 0' }}>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
      {features.map((feature) => (
        <StandardFeatureCard 
          key={feature.id} 
          feature={feature} 
          isSelected={selectedFeatures.includes(feature.id)} 
          onSelect={onSelect} 
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
