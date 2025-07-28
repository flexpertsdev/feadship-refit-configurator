// ==================================================
// AI EXPLANATION: OperatingProfileSection.tsx
// ==================================================
// WHAT: This file contains OperatingProfileSection.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

import React from 'react';
import Section from './Section';

interface OperatingProfileSectionProps {
  operationType?: string;
  titleComponent?: React.ReactNode;
}

const OperatingProfileSection: React.FC<OperatingProfileSectionProps> = ({ 
  operationType,
  titleComponent 
}) => {
  if (!operationType) {
    return null;
  }

  const getOperationDisplay = () => {
    switch(operationType) {
      case 'private':
        return {
          title: 'Private Use',
          description: 'Exclusively for personal enjoyment',
          icon: '🛥️'
        };
      case 'charter':
        return {
          title: 'Charter Operations',
          description: 'Available for charter experiences',
          icon: '⚓'
        };
      default:
        return {
          title: operationType,
          description: 'Custom operating profile',
          icon: '🌊'
        };
    }
  };

  const display = getOperationDisplay();

  return (
    <Section 
      title={titleComponent ? undefined : "Operating Profile"} 
      backgroundColor="bg-gray-50"
      titleComponent={titleComponent}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">{display.icon}</div>
          <h3 className="text-2xl font-bold text-primary mb-2">{display.title}</h3>
          <p className="text-gray-600">{display.description}</p>
        </div>
      </div>
    </Section>
  );
};

export default OperatingProfileSection;