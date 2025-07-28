// ==================================================
// AI EXPLANATION: PaintSection.tsx
// ==================================================
// WHAT: Summary component displaying selected paint colors in a responsive grid layout with color preview, part name, paint type, and hex values
// WHY: Without this, users can't review their paint selections on the summary page - shows all chosen colors with details in one view
// USED BY: SummaryPage component to display paint customization choices
// CRITICAL: NO - Display component for summary, doesn't affect paint functionality
// ==================================================


import React from 'react';
import Section from './Section';
import { ColorSelection } from '@/types/paint';

interface PaintSectionProps {
  colors: Record<string, ColorSelection>;
  titleComponent?: React.ReactNode;
}

const PaintSection: React.FC<PaintSectionProps> = ({ colors, titleComponent }) => {
  // Filter out any null/undefined values
  const validColors = Object.entries(colors).filter(([_, color]) => color && color.color);
  
  if (validColors.length === 0) {
    return null;
  }
  
  return (
    <Section title={titleComponent ? undefined : "Paint"} backgroundColor="bg-gray-50" titleComponent={titleComponent}>
      <div className="max-w-[1440px] mx-auto">
        {/* Main container with responsive single row */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {validColors.map(([part, paint], index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
              {/* Color Preview */}
              <div 
                className="h-[160px] md:h-[180px] lg:h-[200px]" 
                style={{ backgroundColor: paint.color }}
              />
              
              {/* Color Details */}
              <div className="p-4">
                <h3 className="font-medium text-primary mb-1 text-sm md:text-base capitalize">
                  {part}
                </h3>
                <p className="text-xs md:text-sm text-primary/70 mb-1">
                  {paint.name || 'Custom Color'}
                </p>
                <p className="text-xs md:text-sm text-primary/70 capitalize mb-1">
                  {paint.type || 'Standard'}
                </p>
                <p className="text-xs md:text-sm font-mono text-primary/50 uppercase">
                  {paint.color}
                </p>
              </div>
            </div>
            ))}
            </div>
            </div>

        {/* Decorative bottom edge */}
        <div className="relative w-full h-12 mt-12">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>
      </div>
    </Section>
  );
};

export default PaintSection;
