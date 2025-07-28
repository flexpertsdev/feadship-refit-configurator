// ==================================================
// AI EXPLANATION: ServicesSection.tsx
// ==================================================
// WHAT: This file contains ServicesSection.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';
import Section from './Section';
import ActivityCard from './ActivityCard';

interface Service {
  title: string;
  image?: string;
  description?: string;
}

interface ServicesSectionProps {
  services: Service[];
  titleComponent?: React.ReactNode;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  services,
  titleComponent 
}) => {
  if (!services || services.length === 0) {
    return null;
  }

  // Function to get rotation angle for each item based on its position
  const getRotation = (index: number) => {
    const pattern = [-2, 2, -1, 1];
    return pattern[index % pattern.length];
  };
  
  // Function to get pin type based on position
  const getPinType = (index: number): 'left' | 'middle' | 'right' => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length] as 'left' | 'middle' | 'right';
  };
  
  return (
    <Section 
      title={titleComponent ? undefined : "Services"} 
      titleComponent={titleComponent} 
      backgroundColor="bg-gray-50"
    >
      <div className="max-w-[1440px] mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative flex justify-center"
            >
              <ActivityCard
                title={service.title}
                image={service.image}
                description={service.description}
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

export default ServicesSection;
