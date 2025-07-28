// ==================================================
// AI EXPLANATION: DesignPreferencesSection.tsx
// ==================================================
// WHAT: This file contains DesignPreferencesSection.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';
import Section from './Section';

interface DesignPreference {
  title: string;
  description: string;
  image?: string;
}

interface DesignPreferencesSectionProps {
  preferences: DesignPreference[];
  titleComponent?: React.ReactNode;
}

const DesignPreferencesSection: React.FC<DesignPreferencesSectionProps> = ({ 
  preferences,
  titleComponent
}) => {
  // Get pin type based on position
  const getPinType = (index: number) => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length];
  };

  // Get rotation angle based on position
  const getRotation = (index: number) => {
    const pattern = [-2, 2, -1, 1];
    return pattern[index % pattern.length];
  };
  
  return (
    <Section 
      title={titleComponent ? undefined : "Design Preferences"} 
      titleComponent={titleComponent}
    >
      <div className="max-w-[1440px] mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {preferences.map((pref, index) => {
            return (
              <div 
                key={index} 
                className="relative flex justify-center"
                style={{
                  transform: `rotate(${getRotation(index)}deg)`,
                  transition: 'none'
                }}
              >
                {/* Pin */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-8 h-8">
                  {getPinType(index) === 'left' && <img src="/assets/summary/LeftPin.svg" className="w-full h-full" alt="Pin" />}
                  {getPinType(index) === 'middle' && <img src="/assets/summary/Pin.svg" className="w-full h-full" alt="Pin" />}
                  {getPinType(index) === 'right' && <img src="/assets/summary/RightPin.svg" className="w-full h-full" alt="Pin" />}
                </div>
                
                {/* Polaroid Frame */}
                <div className="bg-white p-4 shadow-xl max-w-[320px] w-full">
                  <div className="aspect-[4/3] overflow-hidden mb-3 bg-gray-100">
                    {pref.image ? (
                      <img 
                        src={pref.image} 
                        alt={pref.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-primary font-medium mb-1">{pref.description}</h3>
                    {pref.title && (
                      <p className="text-primary/70 text-sm">{pref.title}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default DesignPreferencesSection;
