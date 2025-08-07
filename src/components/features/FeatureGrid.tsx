// ==================================================
// AI EXPLANATION: FeatureGrid.tsx
// ==================================================
// WHAT: Presentational component that renders a responsive grid of FeatureCard components with loading skeleton states, handling layout across different screen sizes
// WHY: Without this, feature cards would need manual layout in each page - this provides consistent responsive grid display for all feature selection views
// USED BY: FeatureGridView component (smart container), which is used by FeaturesPage, SustainabilityPage, ServicesPage
// CRITICAL: NO - Pure presentational component, can be modified for UI changes without breaking functionality
// ==================================================


import React, { useState } from 'react';
import StandardFeatureCard, { StandardFeature } from './StandardFeatureCard';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';
import FeatureDetailModal from './FeatureDetailModal';

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
  const [selectedFeatureForModal, setSelectedFeatureForModal] = useState<StandardFeature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle image click - opens modal
  const handleFeatureClick = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      setSelectedFeatureForModal(feature);
      setIsModalOpen(true);
    }
  };

  // Handle direct selection (from button click)
  const handleDirectSelect = (featureId: string) => {
    onSelect(featureId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFeatureForModal(null);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 ipad:grid-cols-3 ipadpro:grid-cols-4 gap-4 tablet:gap-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden shadow-md aspect-[4/3] w-full">
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
    <>
      <div className="grid grid-cols-1 tablet:grid-cols-2 ipad:grid-cols-3 ipadpro:grid-cols-4 gap-4 tablet:gap-6">
        {features.map((feature) => (
          <StandardFeatureCard 
            key={feature.id} 
            feature={feature} 
            isSelected={selectedFeatures.includes(feature.id)} 
            onSelect={handleFeatureClick}  // For image click -> modal
            onDirectSelect={handleDirectSelect}  // For button click -> toggle
          />
        ))}
      </div>
      
      {/* Feature Detail Modal */}
      <FeatureDetailModal
        feature={selectedFeatureForModal}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isSelected={selectedFeatureForModal ? selectedFeatures.includes(selectedFeatureForModal.id) : false}
        onToggleSelect={onSelect}
      />
    </>
  );
};

export default FeatureGrid;
