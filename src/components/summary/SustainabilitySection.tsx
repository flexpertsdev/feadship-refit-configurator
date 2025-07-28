// ==================================================
// AI EXPLANATION: SustainabilitySection.tsx
// ==================================================
// WHAT: This file contains SustainabilitySection.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';
import Section from './Section';
import ActivityCard from './ActivityCard';

interface SustainabilityOption {
  title: string;
  image?: string;
  description?: string;
}

interface SustainabilitySectionProps {
  options: SustainabilityOption[];
  titleComponent?: React.ReactNode;
}

const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ 
  options,
  titleComponent 
}) => {
  if (!options || options.length === 0) {
    return null;
  }

  // Function to get rotation angle for each item based on its position
  const getRotation = (index: number) => {
    const pattern = [-2, 2]; // Alternating negative and positive rotation
    return pattern[index % pattern.length];
  };
  
  // Function to get pin type based on position
  const getPinType = (index: number): 'left' | 'middle' | 'right' => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length] as 'left' | 'middle' | 'right';
  };
  
  return (
    <Section 
      title={titleComponent ? undefined : "Sustainability"} 
      titleComponent={titleComponent}
      backgroundColor="bg-white"
    >
      <div className="max-w-[1440px] mx-auto relative py-8">
        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {options.map((option, index) => (
            <div 
              key={index}
              className="relative flex justify-center"
            >
              <ActivityCard
                title={option.title}
                image={option.image}
                description={option.description}
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

export default SustainabilitySection;
