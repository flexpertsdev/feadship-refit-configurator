// ==================================================
// AI EXPLANATION: VoyageSection.tsx
// ==================================================
// WHAT: Summary component displaying selected voyage destinations in a grid with polaroid-style location cards featuring rotation and pin effects
// WHY: Without this, users can't review their selected cruising destinations on the summary page - shows voyage plan visually
// USED BY: SummaryPage component to display selected destinations/regions
// CRITICAL: NO - Display component for summary, doesn't affect voyage selection functionality
// ==================================================


import React from 'react';
import Section from './Section';
import LocationCard from './LocationCard';

interface Location {
  id?: string;
  name: string;
  image?: string;
  description?: string;
}

interface VoyageSectionProps {
  locations: Location[];
  titleComponent?: React.ReactNode;
}

const VoyageSection: React.FC<VoyageSectionProps> = ({ 
  locations,
  titleComponent 
}) => {
  if (!locations || locations.length === 0) {
    return null;
  }

  // Function to get rotation angle for each item based on its position
  const getRotation = (index: number) => {
    const pattern = [-2, 1, -1, 2];
    return pattern[index % pattern.length];
  };

  // Function to get pin type based on position
  const getPinType = (index: number): 'left' | 'middle' | 'right' => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length] as 'left' | 'middle' | 'right';
  };

  return (
    <Section title={titleComponent ? undefined : "Your Voyage"} backgroundColor="bg-gray-50" titleComponent={titleComponent}>
      <div className="max-w-[1440px] mx-auto">
        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {locations.map((location, index) => (
            <div 
              key={location.id || index}
              className="relative flex justify-center"
            >
              <LocationCard
                name={location.name}
                image={location.image}
                description={location.description}
                rotation={getRotation(index)}
                pinType={getPinType(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default VoyageSection;
