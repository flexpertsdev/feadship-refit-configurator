// ==================================================
// AI EXPLANATION: FeaturesSection.tsx
// ==================================================
// WHAT: Summary component displaying selected yacht features in categorized polaroid-style cards with rotation effects
// WHY: Without this, users can't review their selected features - shows all chosen exterior, interior, toys, and additional features
// USED BY: SummaryPage to display all selected yacht features in organized categories
// CRITICAL: NO - Display component for feature review, doesn't affect feature selection functionality
// ==================================================


import React from 'react';
import Section from './Section';
import ActivityCard from './ActivityCard';

interface Feature {
  title: string;
  image?: string;
  description?: string;
}

interface FeaturesSectionProps {
  features: {
    exterior?: Feature[];
    interior?: Feature[];
    toys?: Feature[];
    additional?: Feature[];
  };
  titleComponent?: React.ReactNode;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  features,
  titleComponent
}) => {
  // Function to get rotation angle for each item based on its position
  const getRotation = (index: number) => {
    const pattern = [-1, 0, 1, 0]; // Subtle alternating rotations
    return pattern[index % pattern.length];
  };
  
  // Function to get pin type based on position
  const getPinType = (index: number): 'left' | 'middle' | 'right' => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length] as 'left' | 'middle' | 'right';
  };
  
  // Categories to display (and their order)
  const categories = ['exterior', 'interior', 'toys', 'additional'];
  const displayCategories = categories.filter(cat => features[cat as keyof typeof features]?.length);
  
  if (displayCategories.length === 0) {
    return null;
  }
  
  return (
    <Section 
      title={titleComponent ? undefined : "Features"} 
      titleComponent={titleComponent}
      backgroundColor="bg-gray-50"
    >
      <div className="max-w-[1440px] mx-auto py-6">
        {/* Tab-style category headers */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <div className="flex space-x-8 sm:space-x-12 lg:space-x-16 overflow-x-auto pb-2">
            {displayCategories.map((category) => (
              <div key={category} className="text-primary font-medium capitalize px-2">
                {category === 'toys' ? 'Toys & Tenders' : category}
              </div>
            ))}
          </div>
        </div>
        
        {/* Grid of polaroid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {displayCategories.map((category) => 
            features[category as keyof typeof features]?.map((feature, index) => (
              <div key={`${category}-${index}`} className="flex justify-center">
                <div className="w-full max-w-[220px]">
                  <ActivityCard 
                    title={feature.title}
                    image={feature.image}
                    description={feature.description}
                    rotation={getRotation(index)}
                    pinType={getPinType(index)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
};

export default FeaturesSection;
